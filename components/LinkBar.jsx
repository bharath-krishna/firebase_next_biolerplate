import { Button } from "@material-ui/core";
import React from "react";
import CustomLink from "../src/CustomLink";

function LinkBar() {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        component={CustomLink}
        href="/"
      >
        Home
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={CustomLink}
        href="/login"
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="primary"
        component={CustomLink}
        href="/static"
      >
        Static
      </Button>
    </div>
  );
}

export default LinkBar;
