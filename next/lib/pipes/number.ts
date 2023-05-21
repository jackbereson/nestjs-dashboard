export function NumberPipe(value: any, isCurrency = false) {
  let price;
  if (typeof value == "string") {
    price = Number(value);
    if (isNaN(price)) return value;
  } else if (typeof value == "number") {
    price = value;
  } else {
    return value;
  }

  return price
    .toLocaleString("en")
    .replace(/,/g, ".")
    .replace(/\.(?=[^.]*$)/g, Number.isInteger(price) ? "." : ".")
    .concat(isCurrency ? "đ" : "");
  // const formatter = new Intl.NumberFormat("vi", {
  //   style: "currency",
  //   currency: "VND",
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 0,
  // });
  // return formatter
  //   .format(price)
  //   .replace("₫", "")
  //   .trim()
  //   .concat(isCurrency ? "đ" : "");
}
