import NumberFormat from "react-number-format";
function NumberFormatter(number, type) {
  return (
    <NumberFormat
      value={number}
      displayType={"text"}
      thousandSeparator={true}
      thousandsGroupStyle="lakh"
      decimalScale={2}
      fixedDecimalScale={type === "curr" ? true : false}
    />
  );
}

export default NumberFormatter;
