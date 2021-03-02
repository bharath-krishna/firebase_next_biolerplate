import { connect } from "react-redux";
import firebase from "../utils/firebaseClient";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import FullPageLoader from "./FullPageLoader";
import TempleForm from "./TempleForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    minWidth: 400,
    paddingTop: "40px",
  },
}));

function AddTempleDialog({ open, setOpen, handleClose, setTemples }) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Temple</DialogTitle>
      <DialogContent>
        <TempleForm setOpen={setOpen} setTemples={setTemples} />
      </DialogContent>
    </Dialog>
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
})(connect(mapStateToProps, mapDispatchToProps)(AddTempleDialog));
