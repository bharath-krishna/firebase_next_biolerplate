import { Breadcrumbs, Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useRouter } from "next/router";
import React from "react";
import CustomLink from "../src/CustomLink";

function AutoBreadCrumbs() {
  const router = useRouter();
  let pathMap = {};
  let pathname = "";
  let linkPath = "Home";
  router.asPath.split("/").map((path) => {
    if (path) {
      pathname += path;
      linkPath = path;
      pathname += "/";
      pathMap = { ...pathMap, [pathname]: linkPath };
    } else {
      pathname = "/";
      pathMap = { ...pathMap, [pathname]: linkPath };
    }
  });

  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      {Object.keys(pathMap).map((key) => {
        return (
          <Button color="inherit" component={CustomLink} href={key} key={key}>
            {pathMap[key]}
          </Button>
        );
      })}
    </Breadcrumbs>
  );
}

export default AutoBreadCrumbs;
