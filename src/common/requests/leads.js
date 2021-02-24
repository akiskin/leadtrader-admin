import apiClient from ".";

export const inspectLead = async (id) => {
  try {
    const response = await apiClient.get(`/adm/leads/${id}/inspect`);

    if (response.status === 200) {
      return [true, response.data]; //laravel default data object
    } else {
      return [false, response.status];
    }
    //TODO 401?
  } catch (e) {
    return [false, e.toString()];
  }
};
