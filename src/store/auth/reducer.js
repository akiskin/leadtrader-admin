import { ACTIONS } from "./actions";

const initialState = {
  loggedIn: false,
  user: undefined,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      return { ...state, loggedIn: true, user: action.user };

    case ACTIONS.LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, user: undefined };

    default:
      return state;
  }
};

export default auth;
