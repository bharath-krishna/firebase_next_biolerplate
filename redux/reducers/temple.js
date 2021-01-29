import { SET_TEMPLES } from "../constants";

export const templeReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TEMPLES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
