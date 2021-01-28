import { connect } from "react-redux";
import React, { useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  List,
  ListItem,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import getAbsoluteURL from "../utils/getAbsoluteURL";
import { setUser } from "../redux/actions/user";
import CustomAppBar from "../components/CustomAppBar";
import LinkBar from "../components/LinkBar";
import {
  authAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "../utils/NextFirebaseAuth";
import AutoBreadCrumbs from "../components/AutoBreadCrumbs";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Home({ people, setUser }) {
  const classes = useStyles();
  const authUser = useAuthUser();
  useEffect(() => {
    setUser(authUser);
  }, []);

  return (
    <React.Fragment>
      <CustomAppBar signout={authUser.signOut} />
      <AutoBreadCrumbs />
      <LinkBar />
      <Container className={classes.container}>
        <Typography variant="h4" color="secondary">
          Welcome to Server Rendered (SSR) Page
        </Typography>
      </Container>
      <Container className={classes.container}>
        <List>
          {people.map((person, index) => {
            return <ListItem key={index}>{person.Name}</ListItem>;
          })}
        </List>
      </Container>
    </React.Fragment>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: authAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  let data;
  const token = await AuthUser.getIdToken();
  const url = getAbsoluteURL("/api/data", req);
  const response = await fetch(url, {
    headers: {
      Authorization: token,
    },
  });
  data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  }

  return {
    people: data,
  };
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (name) => dispatch(setUser(name)),
  };
}

export default withAuthUser({
  whenUnauthedAfterInit: authAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: authAction.REDIRECT_TO_LOGIN,
})(connect(mapStateToProps, mapDispatchToProps)(Home));
