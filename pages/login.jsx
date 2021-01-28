import React from "react";
import FirebaseAuth from "../components/FirebaseAuth";
import { makeStyles } from "@material-ui/core";
import {
  authAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "../utils/NextFirebaseAuth";
import FullPageLoader from "../components/FullPageLoader";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
}));

function Auth() {
  const classes = useStyles();
  const AuthUser = useAuthUser();
  return <FirebaseAuth />;
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: authAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: authAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: authAction.SHOW_LOADER,
  LoaderComponent: () => {
    return <FullPageLoader />;
  },
})(Auth);
