import apiClient from ".";

export const createTransaction = async (client_id, amount, reference) => {
  try {
    const response = await apiClient.post(`/adm/transactions`, {
      client_id,
      amount,
      reference,
    });

    if (response.status === 200) {
      return [true, response.data];
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};
