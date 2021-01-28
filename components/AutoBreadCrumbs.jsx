import { Breadcrumbs, Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useRouter } from "next/router";
import React from "react";
import CustomLink from "../src/CustomLink";

function AutoBreadCrumbs() {
  const router = useRouter();
  let pathMap = {};
  if (router.pathname == "/") {
    pathMap["/"] = "Home";
  } else {
    router.pathname.split("/").map((pathName, index) => {
      const currentUrl =
        router.pathname.substr(0, router.pathname.indexOf("/" + pathName)) +
        "/" +
        pathName;
      if (!pathName) {
        pathMap[currentUrl] = "Home";
      } else {
        pathMap[currentUrl] = pathName;
      }
    });
  }

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
