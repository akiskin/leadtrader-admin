import apiClient from ".";

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/adm/products");

    if (response.status === 200) {
      return [true, response.data.data]; //laravel default data object
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};

export const createProduct = async (name) => {
  try {
    const response = await apiClient.post("/adm/products", { name });

    if (response.status === 201) {
      return [true, response.data];
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};
