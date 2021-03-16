import apiClient from ".";

export const releaseLock = async () => {
  try {
    const response = await apiClient.get(`/adm/tools/release-lock`);

    if (response.status === 204) {
      return [true, null];
    } else {
      return [false, response.status];
    }
  } catch (e) {
    return [false, e.toString()];
  }
};

export const activeBuyCampaigns = async () => {
  try {
    const response = await apiClient.get(`/adm/tools/active-buy-campaigns`);

    if (response.status === 200) {
      return [true, response.data.data]; //laravel object
    } else {
      return [false, response.status];
    }
  } catch (e) {
    return [false, e.toString()];
  }
};
