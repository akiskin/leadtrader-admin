export const LEAD_STATUS = {
  1: {
    presentation: "New",
  },
  100: {
    presentation: "Prepared",
  },
  101: {
    presentation: "Error - Invalid DocID",
  },
  102: {
    presentation: "Error - No Raw Data",
  },
  103: {
    presentation: "Error - Postprocessing",
  },
  200: {
    presentation: "Sold",
  },
  201: {
    presentation: "Unable to Sell",
  },
  210: {
    presentation: "No Match, still Selling",
  },
};

export const readableStatus = (status) =>
  status in LEAD_STATUS ? LEAD_STATUS[status].presentation : status;
