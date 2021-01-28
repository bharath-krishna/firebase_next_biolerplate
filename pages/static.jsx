import { connect } from "react-redux";
import React from "react";
import {
  Container,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { setUser } from "../redux/actions/user";
import CustomAppBar from "../components/CustomAppBar";
import { setPeople } from "../redux/actions/people";
import LinkBar from "../components/LinkBar";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import FullPageLoader from "../components/FullPageLoader";
import AutoBreadCrumbs from "../components/AutoBreadCrumbs";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Home() {
  const classes = useStyles();
  const authUser = useAuthUser();

  return (
    <React.Fragment>
      <CustomAppBar signout={authUser.signOut} user={authUser} />
      <AutoBreadCrumbs />
      <LinkBar />
      <Container className={classes.container}>
        <Typography variant="h4" color="secondary">
          Welcome to Static Page
        </Typography>
      </Container>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withAuthUser({
  whenUnauthedBeforeInit: authAction.SHOW_LOADER,
  whenUnauthedAfterInit: authAction.REDIRECT_TO_LOGIN,
  whenUnauthed: authAction.REDIRECT_TO_LOGIN,
  LoaderComponent: () => {
    return <FullPageLoader />;
  },
})(connect(mapStateToProps, mapDispatchToProps)(Home));
