import { API } from "../../backend";

export const getToken = async (userId, token) => {
  return await fetch(`${API}payment/gettoken/${userId}/${token}/`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const processPayment = async (userId, token, paymentInfo) => {
  const formData = new FormData();

  for (const name in paymentInfo) {
    formData.append(name, paymentInfo[name]);
  }

  return await fetch(`${API}payment/process/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
