import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Tag,
  Input,
  Button,
  Select,
  Space,
  message,
  Popover,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { tl } from "i18n";
import FetchResource from "api/crud";
import Flex from "components/shared-components/Flex";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const MessageReply = ({ phone }) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!text) {
      return message.warning("Iltimos, xabar matnini kiriting");
    }
    setLoading(true);
    try {
      await FetchResource.create("sms/send-single", { phone, text });
      message.success("Xabar muvaffaqiyatli yuborildi");
      setVisible(false);
      setText("");
    } catch (error) {
      message.error(error.message || "Xabarni yuborishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div style={{ width: 300 }}>
      <TextArea
        rows={4}
        placeholder="Xabar matnini kiriting..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <div className="mt-2 text-right">
        <Button
          type="primary"
          onClick={handleSend}
          loading={loading}
          size="small"
        >
          Yuborish
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title={`Reply to ${phone}`}
      trigger="click"
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
      placement="left"
    >
      <Button
        icon={<MessageOutlined />}
        size="small"
        type="link"
        title="Reply"
      />
    </Popover>
  );
};

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 100,
    q: "",
    filters: {},
    order: "DESC",
    sort: "updatedAt",
  });

  const fetchMessages = async (params = queryParams) => {
    setLoading(true);
    try {
      const res = await FetchResource.getList("sms/messages", params);
      setData(res.items || []);
      setTotal(res.totalCount || 0);
    } catch (error) {
      message.error(error.message || "Xabarlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [queryParams.page, queryParams.size]);

  const handleSearch = (value) => {
    const newParams = { ...queryParams, q: value, page: 1 };
    setQueryParams(newParams);
    fetchMessages(newParams);
  };

  const handleStatusChange = (status) => {
    const filters = { ...queryParams.filters };
    if (status) {
      filters.status = status;
    } else {
      delete filters.status;
    }
    const newParams = { ...queryParams, filters, page: 1 };
    setQueryParams(newParams);
    fetchMessages(newParams);
  };

  const onTableChange = (pagination, filters, sorter) => {
    // Handle sorting if needed in future
    setQueryParams((prev) => ({
      ...prev,
      page: pagination.current,
      size: pagination.pageSize,
    }));
  };

  const getStatusTag = (status) => {
    const statusMap = {
      pending: { color: "blue", text: "Pending" },
      sent: { color: "orange", text: "Sent" },
      delivered: { color: "green", text: "Delivered" },
      error: { color: "red", text: "Error" },
    };
    const config = statusMap[status] || { color: "default", text: status };
    return <Tag color={config.color}>{config.text.toUpperCase()}</Tag>;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Xabar matni",
      dataIndex: "text",
      key: "text",
      render: (text, record) => (
        <Flex alignItems="center" justifyContent="between">
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginRight: "8px",
            }}
          >
            {text}
          </span>
          {record.receivedAt && <MessageReply phone={record.phone} />}
        </Flex>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => getStatusTag(status),
    },
    {
      title: "Tahrirlangan ",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 180,
      render: (date) => (date ? moment(date).format("DD.MM.YYYY HH:mm") : ""),
    },
    {
      title: "Qabul qilingan ",
      dataIndex: "receivedAt",
      key: "receivedAt",
      width: 180,
      render: (date) => (date ? moment(date).format("DD.MM.YYYY HH:mm") : ""),
    },
    {
      title: "Xatolik",
      dataIndex: "error_reason",
      key: "error_reason",
      ellipsis: true,
      render: (err) =>
        err ? <span style={{ color: "red" }}>{err}</span> : "-",
    },
  ];

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
        className="p-3"
      >
        <div className="mb-3 mb-md-0">
          <h2 style={{ marginBottom: 0, fontWeight: 700 }}>{tl("messages")}</h2>
        </div>
        <div className="d-flex align-items-center">
          <Space wrap>
            <Input
              placeholder="Telefon orqali qidirish..."
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 250 }}
              allowClear
            />
            <Select
              placeholder="Status"
              style={{ width: 150 }}
              onChange={handleStatusChange}
              allowClear
            >
              <Option value="pending">Pending</Option>
              <Option value="sent">Sent</Option>
              <Option value="draft">Draft</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="error">Error</Option>
            </Select>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => fetchMessages()}
              type="default"
            >
              Yangilash
            </Button>
          </Space>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            current: queryParams.page,
            pageSize: queryParams.size,
            total: total,
            showSizeChanger: true,
            showTotal: (total) => `Jami: ${total}`,
          }}
          onChange={onTableChange}
          size="small"
        />
      </div>
    </Card>
  );
};

export default Messages;
