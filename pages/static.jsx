import { connect } from "react-redux";
import React from "react";
import {
  Container,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import getAbsoluteURL from "../utils/getAbsoluteURL";
import { setUser } from "../redux/actions/user";
import CustomAppBar from "../components/CustomAppBar";
import { setPeople } from "../redux/actions/people";
import LinkBar from "../components/LinkBar";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import useSWR from "swr";
// import axios from "axios";
import FullPageLoader from "../components/FullPageLoader";
import AutoBreadCrumbs from "../components/AutoBreadCrumbs";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Home({ people2, user, setUser, setPeople }) {
  const classes = useStyles();
  const authUser = useAuthUser();
  const fetcher = async (url) =>
    fetch(url, {
      headers: {
        Authorization: await authUser.getIdToken(),
      },
    }).then((r) => r.json());
  // Can use axios also
  // const fetcher = async (url) =>
  //   await axios
  //     .get(url, {
  //       headers: {
  //         Authorization: await authUser.getIdToken(),
  //       },
  //     })
  //     .then((res) => res.data);

  const { data, error } = useSWR(getAbsoluteURL("/api/data"), fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <FullPageLoader />;

  return (
    <React.Fragment>
      <CustomAppBar signout={authUser.signOut} />
      <AutoBreadCrumbs />
      <LinkBar />
      <Container className={classes.container}>
        <Typography variant="h4" color="secondary">
          Welcome to Static Page
        </Typography>
      </Container>
      <Container className={classes.container}>
        <List>
          {data.map((person, index) => {
            return <ListItem key={index}>{person.Name}</ListItem>;
          })}
        </List>
      </Container>
    </React.Fragment>
  );
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

export default withAuthUser({
  whenUnauthedBeforeInit: authAction.SHOW_LOADER,
  whenUnauthedAfterInit: authAction.REDIRECT_TO_LOGIN,
  whenUnauthed: authAction.REDIRECT_TO_LOGIN,
  LoaderComponent: () => {
    return <FullPageLoader />;
  },
})(connect(mapStateToProps, mapDispatchToProps)(Home));
