import { SET_USER } from "../constants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER: {
      state = action.payload;
      return state;
    }
    default: {
      return state;
    }
  }
};
