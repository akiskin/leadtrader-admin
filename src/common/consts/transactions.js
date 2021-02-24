export const TRANSACTION_TYPE = {
  10: {
    presentation: "Purchase",
  },
  20: {
    presentation: "Inflow",
  },
  30: {
    presentation: "Outflow",
  },
};

export const readableType = (type) =>
  type in TRANSACTION_TYPE ? TRANSACTION_TYPE[type].presentation : type;
