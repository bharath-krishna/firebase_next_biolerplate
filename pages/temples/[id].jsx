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
  withAuthUserTokenSSR,
} from "../../utils/NextFirebaseAuth";
import FullPageLoader from "../../components/FullPageLoader";
import { Container, makeStyles, Typography } from "@material-ui/core";
import ObjectTable from "../../components/ObjectTable";

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

  useEffect(() => {
    getById("temples", id).then((data) => {
      if (data) {
        setTemple(data);
      }
    });
  }, [id]);

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
      <Typography variant="h6">{temple?.Name}</Typography>
      <Container className={classes.root}>
        <ObjectTable object={temple} />
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
