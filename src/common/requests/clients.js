import apiClient from ".";

export const getClients = async () => {
  try {
    const response = await apiClient.get(`/adm/clients`);

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

export const getClientDashboard = async (client_id) => {
  try {
    const response = await apiClient.get(`/adm/clients/${client_id}/dashboard`);

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

export const getClientTotalsAndTunrovers = async (
  client_id,
  after = null,
  before = null
) => {
  try {
    const response = await apiClient.get(`/adm/clients/${client_id}/tats`, {
      params: {
        before,
        after,
      },
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

export const updateClient = async (client_id, data) => {
  try {
    const response = await apiClient.put(`/adm/clients/${client_id}`, data);

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
