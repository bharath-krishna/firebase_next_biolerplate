import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
}));

function ObjectTable({ object }) {
  const classes = useStyles();
  if (!object) {
    return <React.Fragment>No data</React.Fragment>;
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Field Name</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(object).map((key) => {
            if (typeof object[key] == "object") {
              return (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>
                    <ObjectTable object={object[key]} />
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{object[key]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ObjectTable;
