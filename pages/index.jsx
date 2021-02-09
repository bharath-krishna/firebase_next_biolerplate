import { connect } from "react-redux";
import React from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import CustomAppBar from "../components/CustomAppBar";
import LinkBar from "../components/LinkBar";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import AutoBreadCrumbs from "../components/AutoBreadCrumbs";
import FullPageLoader from "../components/FullPageLoader";
import ProductItem from "../components/ProductItem";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Home({ products }) {
  const classes = useStyles();
  const authUser = useAuthUser();

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
  const url = "http://localhost:1337/products";
  const response = await fetch(url);
  const products = await response.json();
  return {
    props: {
      products: products,
    },
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
