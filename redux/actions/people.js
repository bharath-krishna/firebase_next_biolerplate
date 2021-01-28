import { SET_PEOPLE } from "../constants";

export const setPeople = (peopleList) => {
  return {
    type: SET_PEOPLE,
    payload: peopleList,
  };
};
