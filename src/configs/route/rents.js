import { CheckCircleTwoTone } from "@ant-design/icons";
import { message, Tag } from "antd";
import { resources } from "api/resources";
import StockCell from "components/ListView/cells/StockCell";
import PrintReciept from "components/shared-components/PrintReciept";
import RejectRent from "components/shared-components/RejectRent";
import { roles } from "configs/NavigationConfig";
import { tl } from "i18n";
import Comments from "./components/Comments";
import SubForm from "./components/SubForm";
import {
  createdAtAndUpdatedAtColumns,
  getDateString,
  getLeasedDays,
  getRamainedDays,
} from "./utils";
// import ScanBarcode from "components/shared-components/ScanBarcode";

export const rents = {
  name: tl("rents"),
  nameOne: tl("rent"),
  columns: [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      cellRenderer: "editOpener",
    },
    {
      title: "KvID",
      key: "customId",
      dataIndex: "customId",
      cellRenderer: "editOpener",
    },
    {
      dataIndex: "leasedAt",
      key: "leasedAt",
      title: "Berildi",
      render: (value) => new Date(value).toLocaleString("ru").slice(0, -3),
    },
    {
      dataIndex: "returningDate",
      key: "returningDate",
      title: "Qaytadi",
      render: (value) => new Date(value).toLocaleDateString("ru"),
    },
    {
      key: "remain",
      title: "Qoldi / Jami",
      width: 100,
      sorter: false,
      render: (_, record) => {
        if (!record.returnedAt) {
          const remainDays = getRamainedDays(record);
          const leasingDays = getLeasedDays(record);
          return (
            <div className="days-cell">
              <Tag color={getRemainedDaysColor(remainDays)} className="mr-0">
                {remainDays}
              </Tag>
              <Tag>{leasingDays}</Tag>
            </div>
          );
        }

        return (
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            className="pl-2"
            style={{ cursor: "pointer" }}
            onClick={() =>
              message.info(
                "Qaytarilgan: " + getDateString(record.returnedAt),
                3
              )
            }
          />
        );
      },
    },
    {
      dataIndex: "returnedAt",
      key: "returnedAt",
      title: "Qaytgan",
      cellRenderer: "returnedChangeStatus",
      filters: [
        {
          text: "Qaytarilmagan",
          value: "returnedAt",
        },
      ],
    },
    {
      title: "Kitobxon",
      key: "userId",
      dataIndex: "userId",
      cellRenderer: "userFullName",
      resource: resources.users,
      sorter: false,
    },
    {
      title: tl("stock"),
      key: "stock",
      dataIndex: "stock",
      sorter: false,
      render: (stock) => stock && <StockCell stock={stock} />,
    },
    {
      title: tl("Location"),
      key: "locationId",
      dataIndex: "stock",
      sorter: false,
      render: (stock) => stock.locationId,
      role: roles.owner,
    },
    ...createdAtAndUpdatedAtColumns,
  ],
  // formInitial: {
  // 	leasedAt: localStorage.getItem("ld"),
  // 	returningDate: localStorage.getItem("rd"),
  // },
  view: {
    Custom(props) {
      return (
        <div>
          <Comments resourceId={props.id} resourceFilterName="rentId" />
          {<RejectRent {...props} />}
        </div>
      );
    },
  },
  footer: (data, form) => {
    return [
      <SubForm
        data={{
          form: "users",
          resource: { endpoint: "users", nameOne: "Foydalanuvchi" },
        }}
        buttonText={"Foydalanuvchi +"}
      />,
      data.record.id && <PrintReciept rent={data.record} />,
      // 			<ScanBarcode
      // 				onScan={(barcode) => {
      // 					console.log(barcode);
      // 				}}
      // 				data={data}
      // 				form={form}
      // 			/>,
    ];
  },
  form: [
    {
      name: "userId",
      field: "selectFetch",
      rules: [{ required: true }],
      disabledOnEdit: true,
      label: "Kitobxon",
      fieldProp: {
        resource: resources.users,
        fetchable: true,
        column: "fullName",
        render: (item) =>
          item &&
          `${item.firstName} ${item.lastName} - ${item.phone} - ${item.passportId}`,
      },
      getFieldProps: (data, user) => {
        if (user.owner && data && data.id) {
          return {
            disabled: false,
          };
        }
      },
      colSpan: 24,
    },
    {
      name: "stockId",
      field: "stockSelect",
      label: "Kitob zaxirasi",
      rules: [{ required: true }],
      disabledOnEdit: true,
      fieldProp: {
        resource: resources.stocks,
        fetchable: true,
        column: "name",
      },
      colSpan: 24,
    },
    {
      name: "leasedAt",
      rules: [{ required: true }],
      field: "date",
      label: "Topshirilgan sana",
      fieldProp: {
        saveStorage(value) {
          localStorage.setItem("ld", value.toISOString());
        },
        getDefaultValue: () => localStorage.getItem("ld"),
      },
    },
    {
      name: "returningDate",
      rules: [{ required: true }],
      field: "date",
      label: "Qaytarililishi kerak bo'lgan sana",
      fieldProp: {
        saveStorage(value) {
          localStorage.setItem("rd", value.toISOString());
        },
        getDefaultValue: () => localStorage.getItem("rd"),
      },
    },
    {
      name: "customId",
      label: "Maxsus raqami",
      fieldProp: {
        type: "number",
      },
    },
  ],
};

function getRemainedDaysColor(remained_days) {
  if (remained_days > 20) {
    return "green";
  } else if (remained_days > 5) {
    return "orange";
  } else if (remained_days > 0) {
    return "red";
  } else {
    return "black";
  }
}

export function getLeasedDaysColor(leased_days) {
  if (leased_days > 30) {
    return "black";
  }

  return "green";
}
