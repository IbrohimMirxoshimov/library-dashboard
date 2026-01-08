import React from "react";

const Flex = ({
  mobileFlex = true,
  flexDirection = "row",
  className = "",
  children,
  alignItems,
  justifyContent,
}) => {
  const getFlexResponsive = () => (mobileFlex ? "d-flex" : "d-md-flex");
  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? "flex-" + flexDirection : ""
      } ${alignItems ? "align-items-" + alignItems : ""} ${
        justifyContent ? "justify-content-" + justifyContent : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Flex;
