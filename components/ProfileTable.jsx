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

function ProfileTable({ profile }) {
  const classes = useStyles();
  if (!profile) {
    return {};
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
          {Object.keys(profile).map((key) => {
            if (key == "Country") {
              return (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{profile[key]["label"]}</TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow>
                <TableCell>{key}</TableCell>
                <TableCell>{profile[key]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProfileTable;
