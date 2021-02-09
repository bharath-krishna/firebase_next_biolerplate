import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

function ProductItem({ product }) {
  return (
    <React.Fragment>
      <Card>
        <CardActionArea>
          <CardMedia
            image={`http://localhost:1337${product?.photo?.url}`}
            title={product?.title}
            style={{ height: 200 }}
          />
          <CardContent>
            <Typography variant="h6">{product?.title}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button>Add to Card</Button>
          <Button>+</Button>
          <TextField />
          <Button>-</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default ProductItem;
