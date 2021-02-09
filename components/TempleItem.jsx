import {
  Card,
  CardContent,
  CardMedia,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 550,
    minHeight: 150,
    display: "flex",
  },
  media: {
    height: 140,
    width: 100,
  },
  content: {
    flex: "1 0 auto",
  },
}));

const templeItem = ({ temple, ...rest }) => {
  const classes = useStyles();
  return (
    <ListItem {...rest}>
      <Card className={classes.card}>
        <CardMedia image="./purple_landscape.jpeg" className={classes.media} />
        <CardContent className={classes.content}>
          <Typography>{temple.Name}</Typography>
          <Typography>{temple.Followers.length} Followers</Typography>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default templeItem;
