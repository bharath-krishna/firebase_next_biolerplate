import axios from "axios";
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
import {
  Button,
  Container,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import ObjectTable from "../../components/ObjectTable";
import { Alert } from "@material-ui/lab";

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
  const [open, setOpen] = React.useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (authUser.id) {
      getById("profile", authUser.id).then((data) => {
        if (data) {
          setProfile(data);
        }
      });
    }
  }, []);

  const showMessage = (msg, severity) => {
    setSeverity(severity);
    setTransactionMessage(msg);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // Do not close on clickaway
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getById("temples", id).then((data) => {
      if (data) {
        setTemple(data);
      }
    });
  }, [id]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("/api/orders");

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: "Temple Trust.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("/api/verification", data);

        showMessage("Transaction is successful", "success");
      },
      prefill: {
        name: profile.Name,
        email: profile.Email,
        contact: profile.PhoneNo,
      },
      notes: {
        address: "Temple Trust Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <React.Fragment>
      <CustomAppBar user={authUser} />
      <AutoBreadCrumbs />
      <Typography variant="h6">{temple?.Name}</Typography>
      <Button variant="contained" color="primary" onClick={displayRazorpay}>
        Donate ₹15
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {transactionMessage}
        </Alert>
      </Snackbar>
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
