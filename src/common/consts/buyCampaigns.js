export const BUY_CAMPAIGN_STATUS = {
  NEW: 0,
  ACTIVE: 10,
  PAUSED: 20,
  ARCHIVED: 30,
};

const STATUS_PRESENTATION = {
  [BUY_CAMPAIGN_STATUS.NEW]: {
    id: 0,
    presentation: "New",
  },
  [BUY_CAMPAIGN_STATUS.ACTIVE]: {
    id: 10,
    presentation: "Active",
  },
  [BUY_CAMPAIGN_STATUS.PAUSED]: {
    id: 20,
    presentation: "Paused",
  },
  [BUY_CAMPAIGN_STATUS.ARCHIVED]: {
    id: 30,
    presentation: "Archived",
  },
};

export const readableStatus = (status) =>
  status in STATUS_PRESENTATION
    ? STATUS_PRESENTATION[status].presentation
    : status;
