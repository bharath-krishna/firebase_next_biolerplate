import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { Avatar, Grid, Typography } from "@material-ui/core";

export default function FormAutocomplete({ control, options, name, ...rest }) {
  return (
    <Controller
      render={({ onChange, ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.Name}
          getOptionSelected={(option, value) => {
            if (option.id == value.id) {
              return true;
            }
            return false;
          }}
          renderOption={(option) => {
            return (
              <Grid container direction="row">
                <Avatar />
                <Typography variant="body1">{option.Name}</Typography>
              </Grid>
            );
          }}
          renderInput={(params) => <TextField {...params} label={name} />}
          onChange={(e, data) => {
            onChange(data);
          }}
          filterSelectedOptions
          autoHighlight
          {...props}
          {...rest}
        />
      )}
      onChange={([, data]) => data}
      defaultValue={[]}
      name={name}
      control={control}
    />
  );
}
