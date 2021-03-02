import firebase from "../../utils/firebaseClient";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AutoBreadCrumbs from "../../components/AutoBreadCrumbs";
import CustomAppBar from "../../components/CustomAppBar";
import { setTemples } from "../../redux/actions/temple";
import { getById } from "../../utils/general";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../../utils/NextFirebaseAuth";
import FullPageLoader from "../../components/FullPageLoader";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ObjectTable from "../../components/ObjectTable";
import PaymentButton from "../../components/PaymentButton";
import AddTempleDialog from "../../components/AddTempleDialog";
import TempleForm from "../../components/TempleForm";

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

function TempleItem() {
  const classes = useStyles();
  const authUser = useAuthUser();
  const router = useRouter();
  const { id } = router.query;
  const [temple, setTemple] = useState();
  const [follower, setFollower] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getById("temples", id).then((data) => {
      if (data) {
        setTemple(data);
      }
    });
  }, [id]);

  useEffect(() => {
    if (temple && temple.Followers.includes(authUser.id)) {
      setFollower(true);
    }
  }, [temple, temple?.Followers]);

  const followTemple = () => {
    const updateTemple = async () => {
      temple.Followers = [...temple.Followers, authUser.id];
      await firebase.firestore().collection("temples").doc(id).set(temple);
    };
    updateTemple();
    setTemple(temple);
    setFollower(true);
  };

  const unfollowTemple = () => {
    const updateTemple = async () => {
      temple.Followers = temple.Followers.filter(
        (item) => item !== authUser.id
      );
      await firebase.firestore().collection("temples").doc(id).set(temple);
    };
    updateTemple();
    setTemple(temple);
    setFollower(false);
  };

  const showEdit = () => {
    setEdit(true);
  };

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
      <Typography variant="h6">{temple?.Name}</Typography>
      <Container className={classes.root}>
        <Grid container direction="column">
          <Grid item>
            {temple ? (
              <React.Fragment>
                <PaymentButton temple={temple} />
                {follower ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={unfollowTemple}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={followTemple}
                  >
                    Follow
                  </Button>
                )}
              </React.Fragment>
            ) : null}
            <Button variant="contained" color="primary" onClick={showEdit}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            {edit ? (
              <TempleForm setOpen={setEdit} />
            ) : (
              <ObjectTable object={temple} />
            )}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    temples: state.temples,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTemples: (temples) => dispatch(setTemples(temples)),
  };
}

export default withAuthUser({
  whenUnauthedBeforeInit: authAction.SHOW_LOADER,
  whenUnauthedAfterInit: authAction.REDIRECT_TO_LOGIN,
  whenUnauthed: authAction.REDIRECT_TO_LOGIN,
  LoaderComponent: () => {
    return <FullPageLoader />;
  },
})(connect(mapStateToProps, mapDispatchToProps)(TempleItem));

// export default connect(mapStateToProps, mapDispatchToProps)(TempleItem);
