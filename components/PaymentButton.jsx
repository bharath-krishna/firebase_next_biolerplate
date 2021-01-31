import axios from "axios";
import { connect } from "react-redux";
import { Button, Slide, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import { setTemples } from "../redux/actions/temple";
import FullPageLoader from "./FullPageLoader";
import { useState } from "react";
import { useEffect } from "react";
import { getById } from "../utils/general";

function PaymentButton({ temple }) {
  const authUser = useAuthUser();
  const [open, setOpen] = React.useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [profile, setProfile] = useState({});
  const [transition, setTransition] = React.useState(undefined);

  useEffect(() => {
    if (authUser.id) {
      getById("profile", authUser.id).then((data) => {
        if (data) {
          setProfile(data);
        }
      });
    }
  }, []);

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const showMessage = (msg, severity) => {
    setSeverity(severity);
    setTransactionMessage(msg);
    setTransition(() => TransitionLeft);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // Do not close on clickaway
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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

    const config = {
      headers: {
        Authorization: await authUser.getIdToken(),
      },
    };
    const result = await axios.post("/api/orders", {}, config);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: temple?.Name,
      description: "Temple Donation",
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
      <Button variant="contained" color="primary" onClick={displayRazorpay}>
        Donate ₹15
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        TransitionComponent={transition}
        key={transition ? transition.name : ""}
      >
        <Alert onClose={handleClose} severity={severity}>
          {transactionMessage}
        </Alert>
      </Snackbar>
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
})(connect(mapStateToProps, mapDispatchToProps)(PaymentButton));

// export default connect(mapStateToProps, mapDispatchToProps)(PaymentButton);
