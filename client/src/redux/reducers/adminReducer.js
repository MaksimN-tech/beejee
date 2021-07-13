import { INIT_ADMIN, LOGOUT_ADMIN } from "../actionTypes/actionTypes";

const initialState = {
  isAuth: false,
};

function adminReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_ADMIN:
      localStorage.setItem("token", action.payload);
      return { ...state, isAuth: true };
    case LOGOUT_ADMIN:
      localStorage.removeItem("token");
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}

export default adminReducer;
