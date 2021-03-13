import { Breadcrumbs, Button, Container, List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
import LinkBar from "../../components/LinkBar";
import AddTempleDialog from "../../components/AddTempleDialog";

function Temples({ setTemples, temples }) {
  const authUser = useAuthUser();
  console.log(authUser);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCollection("temples", setTemples);
  }, []);

  const handleAddTemple = () => {};

  const handleClose = () => {
    setOpen(false);
    fetchCollection("temples", setTemples);
  };

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
      <LinkBar />
      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add Temple
        </Button>
        <AddTempleDialog
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          setTemples={setTemples}
        />
        <List>
          {temples.length > 0 ? (
            temples.map((temple, index) => {
              return (
                <TempleItem
                  temple={temple}
                  key={index}
                  setTemples={setTemples}
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

// export default connect(mapStateToProps, mapDispatchToProps)(Temples);
