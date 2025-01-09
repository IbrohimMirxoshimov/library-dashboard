import { PrinterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useResourceObject } from "hooks/useResource";
import printReciept from "utils/printReciept";

function PrintReciept({ rent }) {
  const book = useResourceObject("books", rent.stock.bookId);

  return (
    <Button
      loading={!book}
      onClick={() => {
        printReciept({
          book: book,
          rent: rent,
          user: rent.user,
        });
      }}
      icon={<PrinterOutlined />}
    >
      Chek chiqarish
    </Button>
  );
}

export default PrintReciept;
