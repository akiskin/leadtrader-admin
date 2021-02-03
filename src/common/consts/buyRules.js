export const DECISION_POINT_VALUE_TYPES = {
  MONEY: "MONEY",
  INTEGER: "INTEGER",
};

export const DECISION_POINT_OPERATORS = {
  GT: ">",
  GTE: ">=",
  LT: "<",
  LTE: "<=",
  EQ: "=",
};

export const DECISION_POINTS = {
  gambling: {
    presentation: "Gambling",
    description: "Amount in $",
    type: DECISION_POINT_VALUE_TYPES.MONEY,
    operators: [
      DECISION_POINT_OPERATORS.GT,
      DECISION_POINT_OPERATORS.GTE,
      DECISION_POINT_OPERATORS.LT,
      DECISION_POINT_OPERATORS.LTE,
      DECISION_POINT_OPERATORS.EQ,
    ],
  },
};
