import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input, Button, Spin, message, Avatar, Tooltip } from "antd";
import {
  SearchOutlined,
  SendOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FetchResource from "api/crud";
import mainCaller from "api/main";
import moment from "moment";
import "./Messages.css";

const { TextArea } = Input;

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [convPage, setConvPage] = useState(1);
  const [convLoading, setConvLoading] = useState(false);
  const [hasMoreConv, setHasMoreConv] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [usersMap, setUsersMap] = useState({});

  const [messages, setMessages] = useState([]);
  const [msgPage, setMsgPage] = useState(1);
  const [msgLoading, setMsgLoading] = useState(false);
  const [hasMoreMsg, setHasMoreMsg] = useState(true);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [cancellingMsgId, setCancellingMsgId] = useState(null);

  const convListRef = useRef(null);
  const msgListRef = useRef(null);

  // Fetch Conversations
  const fetchConversations = useCallback(
    async (page, query = "", reset = false) => {
      if (convLoading) return;
      setConvLoading(true);
      try {
        const res = await FetchResource.getList("sms/conversations", {
          page,
          size: 20,
          q: query,
        });
        const items = res.items || [];
        const users = res.users || {};
        if (reset) {
          setConversations(items);
          setUsersMap(users);
        } else {
          setConversations((prev) => [...prev, ...items]);
          setUsersMap((prev) => ({ ...prev, ...users }));
        }
        setHasMoreConv(items.length === 20);
        setConvPage(page);
      } catch (error) {
        message.error("Suhbatlarni yuklashda xatolik");
      } finally {
        setConvLoading(false);
      }
    },
    [convLoading]
  );

  // Initial fetch
  useEffect(() => {
    fetchConversations(1, "", true);
    // eslint-disable-next-line
  }, []);

  // Handle Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchConversations(1, searchQuery, true);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [searchQuery]);

  // Fetch Messages for selected phone
  const fetchMessages = useCallback(
    async (phone, page, reset = false) => {
      if (msgLoading) return;
      setMsgLoading(true);
      try {
        const res = await FetchResource.getList(`sms/conversations/${phone}`, {
          page,
          size: 20,
        });
        const items = res.items || [];
        if (reset) {
          setMessages(items);
          setTimeout(() => {
            if (msgListRef.current) {
              msgListRef.current.scrollTop = msgListRef.current.scrollHeight;
            }
          }, 100);
        } else {
          // Save current scroll height to restore scroll after loading more
          const container = msgListRef.current;
          const oldHeight = container.scrollHeight;

          setMessages((prev) => [...prev, ...items]);

          // Restore scroll position
          setTimeout(() => {
            if (container) {
              container.scrollTop = container.scrollHeight - oldHeight;
            }
          }, 0);
        }
        setHasMoreMsg(items.length === 20);
        setMsgPage(page);
      } catch (error) {
        message.error("Xabarlarni yuklashda xatolik");
      } finally {
        setMsgLoading(false);
      }
    },
    [msgLoading]
  );

  // Handle Conversation Selection
  const handleSelectConv = (phone) => {
    if (selectedPhone === phone) return;
    setSelectedPhone(phone);
    setMessages([]);
    setMsgPage(1);
    setHasMoreMsg(true);
    fetchMessages(phone, 1, true);
  };

  // Infinite Scroll for Conversations
  const onConvScroll = () => {
    if (!convListRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = convListRef.current;
    if (
      scrollTop + clientHeight >= scrollHeight - 50 &&
      hasMoreConv &&
      !convLoading
    ) {
      fetchConversations(convPage + 1, searchQuery);
    }
  };

  // Infinite Scroll Up for Messages
  const onMsgScroll = () => {
    if (!msgListRef.current) return;
    const { scrollTop } = msgListRef.current;
    if (scrollTop <= 50 && hasMoreMsg && !msgLoading && selectedPhone) {
      fetchMessages(selectedPhone, msgPage + 1);
    }
  };

  // Send Message
  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedPhone || sending) return;
    setSending(true);
    try {
      await FetchResource.create("sms/send-single", {
        phone: selectedPhone,
        text: inputText,
      });
      setInputText("");
      // Optionally refresh messages or add the new one locally
      // For now, let's refresh page 1
      fetchMessages(selectedPhone, 1, true);
      // Also refresh conversations to update snippet
      fetchConversations(1, searchQuery, true);
    } catch (error) {
      message.error("Xabar yuborishda xatolik");
    } finally {
      setSending(false);
    }
  };

  // Cancel Draft Message
  const handleCancelDraft = async (msgId) => {
    if (cancellingMsgId || !msgId) return;
    setCancellingMsgId(msgId);
    try {
      await mainCaller("/sms/messages", "PUT", [{ id: msgId, status: "error" }]);
      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === msgId ? { ...msg, status: "error" } : msg
        )
      );
      message.success("Qoralama bekor qilindi");
      // Refresh conversations to update snippet
      fetchConversations(1, searchQuery, true);
    } catch (error) {
      message.error("Bekor qilishda xatolik");
    } finally {
      setCancellingMsgId(null);
    }
  };

  const renderStatus = (msg) => {
    const { status, error_reason } = msg;
    let icon, text, color;

    switch (status) {
      case "delivered":
        icon = <CheckOutlined style={{ color: "#52c41a", marginLeft: 4 }} />;
        text = "Yetkazildi";
        color = "#52c41a";
        break;
      case "sent":
        icon = <CheckOutlined style={{ opacity: 0.5, marginLeft: 4 }} />;
        text = "Yuborildi";
        color = "rgba(255,255,255,0.7)";
        break;
      case "error":
        icon = (
          <span style={{ color: "#ff4d4f", marginLeft: 4, fontWeight: "bold" }}>
            !
          </span>
        );
        text = "Xatolik";
        color = "#ff4d4f";
        break;
      case "pending":
        icon = <ClockCircleOutlined style={{ marginLeft: 4 }} />;
        text = "Kutilmoqda";
        color = "rgba(255,255,255,0.7)";
        break;
      case "draft":
        icon = <ClockCircleOutlined style={{ marginLeft: 4 }} />;
        text = "Qoralama";
        color = "rgba(255,255,255,0.7)";
        break;
      default:
        icon = null;
        text = status;
        color = "inherit";
    }

    const content = (
      <span
        style={{ fontSize: 10, display: "flex", alignItems: "center", color }}
      >
        {text} {icon}
      </span>
    );

    if (status === "error" && error_reason) {
      return <Tooltip title={error_reason}>{content}</Tooltip>;
    }

    return content;
  };

  const formatPhone = (phone) => {
    if (!phone) return "";
    let p = phone.replace("+", "");
    if (p.startsWith("998") && p.length === 12) {
      return `+998 ${p.slice(3, 5)} ${p.slice(5, 8)} ${p.slice(
        8,
        10
      )} ${p.slice(10, 12)}`;
    }
    if (p.length === 9) {
      return `+998 ${p.slice(0, 2)} ${p.slice(2, 5)} ${p.slice(5, 7)} ${p.slice(
        7,
        9
      )}`;
    }
    return phone.startsWith("+") ? phone : `+${phone}`;
  };

  const formatMessageDate = (date) => {
    if (!date) return "";
    const m = moment(date);
    if (m.isSame(moment(), "day")) {
      return m.format("HH:mm");
    }
    return m.format("DD.MM.YYYY HH:mm");
  };

  const getInitials = (phone) => {
    if (usersMap[phone] && usersMap[phone].length > 0) {
      const u = usersMap[phone][0];
      const initials = (u.firstName?.[0] || "") + (u.lastName?.[0] || "");
      return initials.toUpperCase() || "?";
    }
    if (!phone) return "?";
    return phone.slice(-2);
  };

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  return (
    <div className="messenger-container">
      {/* Conversation List */}
      <div className="conversation-list">
        <div className="conversation-header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <h2 style={{ margin: 0 }}>Xabarlar</h2>
            <Button
              type="text"
              icon={<ClockCircleOutlined />}
              onClick={() => fetchConversations(1, searchQuery, true)}
              title="Yangilash"
            />
          </div>
          <Input
            placeholder="Raqam bilan qidirish..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
        </div>
        <div
          className="conversation-items"
          onScroll={onConvScroll}
          ref={convListRef}
        >
          {conversations.map((conv) => (
            <div
              key={conv.phone}
              className={`conversation-item ${
                selectedPhone === conv.phone ? "active" : ""
              }`}
              onClick={() => handleSelectConv(conv.phone)}
            >
              <Avatar
                className="avatar"
                size={48}
                style={{ backgroundColor: stringToColor(conv.phone) }}
              >
                {getInitials(conv.phone)}
              </Avatar>
              <div className="conversation-info">
                <div className="name-row">
                  <span className="name">
                    {usersMap[conv.phone] && usersMap[conv.phone].length > 0
                      ? `${usersMap[conv.phone][0].firstName}${
                          usersMap[conv.phone].length > 1
                            ? ` (${usersMap[conv.phone].length})`
                            : ""
                        }`
                      : formatPhone(conv.phone)}
                  </span>
                  <span className="time">
                    {formatMessageDate(conv.updatedAt)}
                  </span>
                </div>
                <div className="snippet">{conv.text}</div>
              </div>
            </div>
          ))}
          {convLoading && (
            <div className="loader-container">
              <Spin size="small" />
            </div>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        {selectedPhone ? (
          <>
            <div className="chat-header">
              <div className="user-info">
                <Avatar
                  className="avatar"
                  size={40}
                  style={{
                    backgroundColor: stringToColor(selectedPhone),
                    marginRight: 15,
                  }}
                >
                  {getInitials(selectedPhone)}
                </Avatar>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>
                    {usersMap[selectedPhone] &&
                    usersMap[selectedPhone].length > 0
                      ? usersMap[selectedPhone]
                          .map((u) => `${u.firstName} ${u.lastName || ""}`)
                          .join(", ")
                      : formatPhone(selectedPhone)}
                  </div>
                  <div style={{ fontSize: 13, color: "#8c8c8c" }}>
                    {formatPhone(selectedPhone)}
                  </div>
                </div>
              </div>
              <Button
                icon={<ClockCircleOutlined />}
                onClick={() => fetchMessages(selectedPhone, 1, true)}
                type="text"
              >
                Yangilash
              </Button>
            </div>

            <div
              className="chat-messages"
              ref={msgListRef}
              onScroll={onMsgScroll}
              style={{ display: "flex", flexDirection: "column" }} // Overriding the column-reverse idea for easier logic
            >
              {msgLoading && hasMoreMsg && (
                <div className="loader-container">
                  <Spin size="small" />
                </div>
              )}
              {/* Messages are fetched DESC, so we need to reverse them for visual display from top to bottom */}
              {[...messages].reverse().map((msg) => {
                const isReceived = msg.receivedAt !== null;
                return (
                  <div
                    key={msg.id}
                    className={`message-bubble-wrapper ${
                      isReceived ? "received" : "sent"
                    }`}
                  >
                    <div className="message-bubble">
                      {msg.text}
                      <div
                        className="message-footer"
                        style={{
                          justifyContent: isReceived
                            ? "flex-start"
                            : "flex-end",
                          marginTop: 4,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            marginRight: isReceived ? 0 : 8,
                            fontSize: 10,
                            opacity: 0.8,
                          }}
                        >
                          {formatMessageDate(msg.updatedAt)}
                        </span>
                        {!isReceived && renderStatus(msg)}
                        {!isReceived && msg.status === "draft" && (
                          <Tooltip title="Bekor qilish">
                            <Button
                              type="text"
                              size="small"
                              danger
                              icon={<CloseCircleOutlined />}
                              onClick={() => handleCancelDraft(msg.id)}
                              loading={cancellingMsgId === msg.id}
                              style={{
                                padding: 0,
                                height: 16,
                                width: 16,
                                minWidth: 16,
                                fontSize: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="chat-input">
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
              >
                <TextArea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Xabarni yozing..."
                  autoSize={{ minRows: 1, maxRows: 6 }}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  loading={sending}
                  disabled={!inputText.trim()}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div style={{ fontSize: 48, marginBottom: 20 }}>💬</div>
            <h3>Suhbatni tanlang</h3>
            <p>Xabarlarni ko'rish uchun chap tomondan suhbatni tanlang</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
