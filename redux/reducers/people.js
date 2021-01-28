import { SET_PEOPLE } from "../constants";

const initialPeopleState = [];
export const peopleReducer = (state = initialPeopleState, action) => {
  switch (action.type) {
    case SET_PEOPLE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
