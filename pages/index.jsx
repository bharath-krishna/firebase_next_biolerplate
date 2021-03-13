import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import AutoBreadCrumbs from "../components/AutoBreadCrumbs";
import CustomAppBar from "../components/CustomAppBar";
import FullPageLoader from "../components/FullPageLoader";
import LinkBar from "../components/LinkBar";
import { getById } from "../utils/general";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import { createProfile } from "../utils/profile";

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
  const router = useRouter();

  useEffect(() => {
    getById("profile", authUser.id)
      .then((result) => {
        if (!result) {
          console.log("create profile");
          createProfile({
            id: authUser.id,
            Name: "NewUser",
            PhoneNo: "01234512345",
            Gender: "",
            Email: authUser.email,
          });
          router.push("/profile/" + authUser.id);
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
      <LinkBar />
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h4" color="secondary">
              Introduction
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

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
