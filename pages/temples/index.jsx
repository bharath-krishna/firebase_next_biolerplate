import { Breadcrumbs, Button, Container, List } from "@material-ui/core";
import React, { useEffect } from "react";
import { fetchCollection } from "../../utils/temple";
import { connect } from "react-redux";
import { setTemples } from "../../redux/actions/temple";
import CustomAppBar from "../../components/CustomAppBar";
import CustomLink from "../../src/CustomLink";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import TempleItem from "../../components/TempleItem";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../../utils/NextFirebaseAuth";
import FullPageLoader from "../../components/FullPageLoader";
import AutoBreadCrumbs from "../../components/AutoBreadCrumbs";
import { useRouter } from "next/router";

function Temples({ setTemples, temples }) {
  const authUser = useAuthUser();
  const router = useRouter();
  useEffect(() => {
    fetchCollection("temples", setTemples);
  }, []);

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
      <Container>
        <List>
          {temples.length > 0 ? (
            temples.map((temple, index) => {
              return (
                <TempleItem
                  temple={temple}
                  key={index}
                  button
                  onClick={() => {
                    router.push("/temples/" + temple.id);
                  }}
                />
              );
            })
          ) : (
            <div>No temples added</div>
          )}
        </List>
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
})(connect(mapStateToProps, mapDispatchToProps)(Temples));
