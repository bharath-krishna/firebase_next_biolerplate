import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";
import { deleteFromCollection, fetchCollection } from "../utils/temple";

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

const templeItem = ({ temple, setTemples, ...rest }) => {
  const classes = useStyles();
  const router = useRouter();

  const deleteTemple = (temple) => {
    deleteFromCollection("temples", temple.id);
    fetchCollection("temples", setTemples);
  };

  return (
    <ListItem {...rest}>
      <Card className={classes.card}>
        <CardMedia image="./purple_landscape.jpeg" className={classes.media} />
        <CardContent
          className={classes.content}
          button
          onClick={() => {
            router.push("/temples/" + temple.id);
          }}
        >
          <Typography>{temple.Name}</Typography>
          <Typography>{temple.Followers.length} Followers</Typography>
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={() => deleteTemple(temple)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </ListItem>
  );
};

export default templeItem;
