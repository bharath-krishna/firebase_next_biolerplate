import { connect } from "react-redux";
import React from "react";
import {
  Container,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CustomAppBar from "../components/CustomAppBar";
import LinkBar from "../components/LinkBar";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import AutoBreadCrumbs from "../components/AutoBreadCrumbs";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Home({ people }) {
  const classes = useStyles();
  const authUser = useAuthUser();

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

function mapStateToProps(state) {
  return {
    people: state.people,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withAuthUser({
  whenUnauthedAfterInit: authAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: authAction.REDIRECT_TO_LOGIN,
})(connect(mapStateToProps, mapDispatchToProps)(Home));
