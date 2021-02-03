import apiClient from ".";

export const getCsrf = async () => {
  await apiClient.get(process.env.REACT_APP_CSRF_URL);
};

export const checkIfLoggedIn = async () => {
  try {
    const response = await apiClient.get("/user");
    if (response.status === 200) {
      return [true, response.data];
    } else {
      return [false, undefined];
    }
  } catch (e) {
    return [false, undefined];
  }
};

export const login = async (username, password) => {
  try {
    const response = await apiClient.post("/login", {
      email: username,
      password: password,
    });

    return [response.status, response.data];
  } catch (e) {
    return [false, e];
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");

    return [response.status, response.data];
  } catch (e) {
    return [false, e];
  }
};

export const register = async (name, email, password, company) => {
  try {
    const response = await apiClient.post("/register", {
      name,
      email,
      password,
      company,
    });

    return [response.status, response.data];
  } catch (e) {
    return [false, e];
  }
};
