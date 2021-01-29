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

function TempleItem() {
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
