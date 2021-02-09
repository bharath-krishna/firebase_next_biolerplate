import { connect } from "react-redux";
import firebase from "../utils/firebaseClient";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  makeStyles,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import FullPageLoader from "./FullPageLoader";
import CountrySelect from "./CountrySelect";
import FormAutocomplete from "./FormAutoComplete";

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

function AddTempleDialog({ open, setOpen, handleClose }) {
  const classes = useStyles();
  const authUser = useAuthUser();

  const { register, handleSubmit, control, reset } = useForm();
  const handleOnSubmit = (data) => {
    const addTemple = async () => {
      await firebase.firestore().collection("temples").doc().set(data);
    };
    console.log(data);
    addTemple();
    setOpen(false);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add Temple</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormControl className={classes.formControl}>
            <TextField
              label="Name"
              inputRef={register({ required: true, maxLength: 20 })}
              name="Name"
              fullWidth
            />

            <TextField
              label="MainDeity"
              inputRef={register({ required: true, maxLength: 20 })}
              name="MainDeity"
              fullWidth
            />

            <TextField
              label="Manager"
              inputRef={register({ required: true, maxLength: 20 })}
              name="Manager"
              fullWidth
            />

            <TextField
              label="Poojari"
              inputRef={register({ required: true, maxLength: 20 })}
              name="Poojari"
              fullWidth
            />

            <TextField
              label="PradhanaArchaka"
              inputRef={register({ required: true, maxLength: 20 })}
              name="PradhanaArchaka"
              fullWidth
            />

            <FormAutocomplete options={[]} control={control} name="Followers" />

            <TextField
              label="Address1"
              inputRef={register}
              name="Address1"
              fullWidth
            />

            <TextField
              label="Address2"
              inputRef={register}
              name="Address2"
              fullWidth
            />

            <CountrySelect control={control} onChange={() => {}} />

            <TextField
              label="Phone Number"
              inputRef={register}
              name="PhoneNo"
              fullWidth
            />
            <TextField
              label="Email"
              inputRef={register({ required: true, maxLength: 30 })}
              name="Email"
              fullWidth
            />
            <Button type="submit">Save</Button>
            <Button
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </FormControl>
        </form>
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
