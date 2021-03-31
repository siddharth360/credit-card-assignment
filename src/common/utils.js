import Payment from "payment";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case "dinersclub":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value, number) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (number) {
    const issuer = Payment.fns.cardType(number);
    console.log("issuer", issuer);
    maxLength = issuer === "amex" ? 4 : 3;
  } else {
    maxLength = 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(month, year) {
  return `${month}/${year}`;
}

export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}
