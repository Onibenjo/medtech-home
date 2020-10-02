const formatMoney = (amount) =>
  amount ? amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : amount
// Number((amount).toFixed(1)).toLocaleString()

export default formatMoney
