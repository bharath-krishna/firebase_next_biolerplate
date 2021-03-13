import firebase from "../../utils/firebaseClient";
import { connect } from "react-redux";
import React from "react";
import AutoBreadCrumbs from "../../components/AutoBreadCrumbs";
import CustomAppBar from "../../components/CustomAppBar";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../../utils/NextFirebaseAuth";
import FullPageLoader from "../../components/FullPageLoader";
import {
  Button,
  Container,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import CountrySelect from "../../components/CountrySelect";
// import FormAutocomplete from "../components/FormAutoComplete";
import { useState } from "react";
import { useEffect } from "react";
import ObjectTable from "../../components/ObjectTable";
import { getById } from "../../utils/general";
import { useRouter } from "next/router";

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

function Profile() {
  const classes = useStyles();
  const authUser = useAuthUser();
  const { register, handleSubmit, control, reset } = useForm();
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getById("profile", id).then((data) => {
        if (data) {
          setProfile(data);
        } else {
          setProfileEdit(true);
        }
      });
    }
  }, [profileEdit]);

  const handleOnSubmit = (data) => {
    const updateProfile = async () => {
      await firebase.firestore().collection("profile").doc(id).set(data);
    };
    updateProfile();
    setProfile(data);
    setProfileEdit(false);
  };

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
      <Container className={classes.root}>
        {profileEdit ? (
          <Container className={classes.root}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <FormControl className={classes.formControl}>
                <TextField label="Id" name="Id" fullWidth value={id} disabled />
                <TextField
                  label="Name"
                  inputRef={register({ required: true, maxLength: 20 })}
                  name="Name"
                  fullWidth
                />

                <Controller
                  control={control}
                  name="Gender"
                  defaultValue=""
                  as={
                    <TextField
                      inputRef={register}
                      select
                      label="Gender"
                      name="Gender"
                      fullWidth
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  }
                />

                {/* <FormAutocomplete
                  options={[]}
                  control={control}
                  name="Followers"
                /> */}

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
                <Button type="submit">Save</Button>
                <Button
                  onClick={() => {
                    reset();
                    setProfileEdit(false);
                  }}
                >
                  Cancel
                </Button>
              </FormControl>
            </form>
          </Container>
        ) : (
          <Grid container direction="column">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setProfileEdit(true)}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <ObjectTable object={profile} />
            </Grid>
          </Grid>
        )}
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
})(connect(mapStateToProps, mapDispatchToProps)(Profile));

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
