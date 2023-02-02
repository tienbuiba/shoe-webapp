const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("vn-IN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 2,
  }).format(price);
};

export default FormatPrice;
