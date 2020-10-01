import { API } from "../../backend";
import { emptyCart } from "../../core/helper/CartHelper";

export const signup = (user) => {
  return fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  // const { email, password } = user;
  // formData.append('email', email);
  // formData.append('password', password);

  // for (var key of formData.keys()) {
  //   console.log(key)
  // }

  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log("Response", res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    emptyCart(() => {});

    return fetch(`${API}user/logout/${userId}`, {
      method: "GET",
    })
      .then((res) => {
        console.log("Logged out successfully");
        next();
      })
      .catch((err) => console.log(err));
  }
};
