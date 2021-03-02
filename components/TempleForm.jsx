import { connect } from "react-redux";
import firebase from "../utils/firebaseClient";
import { Button, FormControl, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import FormAutocomplete from "./FormAutoComplete";
import { fetchCollection } from "../utils/temple";
import { setPeople } from "../redux/actions/people";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    minWidth: 400,
    paddingTop: "40px",
  },
}));

function TempleForm({ setOpen, people, setPeople, setTemples }) {
  const classes = useStyles();

  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    fetchCollection("people", setPeople);
  }, []);

  const handleOnSubmit = (data) => {
    const addTemple = async () => {
      await firebase.firestore().collection("temples").doc().set(data);
    };
    console.log(data);
    addTemple();
    setOpen(false);
    fetchCollection("temples", setTemples);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormControl className={classes.formControl}>
        <TextField
          label="Name"
          inputRef={register({ required: true, maxLength: 20 })}
          name="Name"
          fullWidth
        />

        <TextField
          label="MainDeity"
          inputRef={register({ required: true, maxLength: 20 })}
          name="MainDeity"
          fullWidth
        />

        <FormAutocomplete options={people} control={control} name="Manager" />

        <FormAutocomplete options={people} control={control} name="Poojari" />

        <FormAutocomplete
          options={people}
          control={control}
          name="PradhanaArchaka"
        />

        <FormAutocomplete options={people} control={control} name="Followers" />

        <TextField
          label="Address1"
          inputRef={register}
          name="Address1"
          fullWidth
        />

        <TextField
          label="Address2"
          inputRef={register}
          name="Address2"
          fullWidth
        />

        <CountrySelect control={control} onChange={() => {}} />

        <TextField
          label="Phone Number"
          inputRef={register}
          name="PhoneNo"
          fullWidth
        />
        <TextField
          label="Email"
          inputRef={register({ required: true, maxLength: 30 })}
          name="Email"
          fullWidth
        />
        <Button type="submit">Save</Button>
        <Button
          onClick={() => {
            reset();
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </FormControl>
    </form>
  );
}

function mapStateToProps(state) {
  return { people: state.people };
}

function mapDispatchToProps(dispatch) {
  return { setPeople: (people) => dispatch(setPeople(people)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(TempleForm);
