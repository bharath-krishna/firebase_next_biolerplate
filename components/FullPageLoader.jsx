import { Typography } from "@material-ui/core";
import React from "react";

function FullPageLoader() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" color="secondary">
        Loading....
      </Typography>
    </div>
  );
}

export default FullPageLoader;
