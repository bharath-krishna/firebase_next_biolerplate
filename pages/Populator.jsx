import firebase from "../utils/firebaseClient";
import { connect } from "react-redux";
import React, { createContext } from "react";
import { useEffect } from "react";
import { setUser } from "../redux/actions/user";
import { useAuthUser, withAuthUser } from "../utils/NextFirebaseAuth";
import { setPeople } from "../redux/actions/people";

const DataContext = createContext({});

function Populator({ children, user, people, setUser, setPeople }) {
  const authUser = useAuthUser();

  useEffect(() => {
    if (!user.id) {
      setUser(authUser);
    }

    if (people.length == 0) {
      const fetchPeople = async () => {
        const data = await firebase.firestore().collection("people").get();
        setPeople(data.docs.map((doc) => doc.data()));
      };
      fetchPeople();
    }
  }, [authUser]);

  return <DataContext.Provider value={people}>{children}</DataContext.Provider>;
}

function mapStateToProps(state) {
  return {
    user: state.user,
    people: state.people,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (name) => dispatch(setUser(name)),
    setPeople: (people) => dispatch(setPeople(people)),
  };
}

export default withAuthUser()(
  connect(mapStateToProps, mapDispatchToProps)(Populator)
);
