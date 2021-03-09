import { connect } from "react-redux";
import firebase from "../utils/firebaseClient";
import { Button, FormControl, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import { fetchCollection } from "../utils/temple";
import { setPeople } from "../redux/actions/people";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { getById } from "../utils/general";

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

function TempleForm({ setOpen, people, setPeople, setTemple, temple }) {
  const classes = useStyles();

  const { register, handleSubmit, control, reset } = useForm();
  //   const [currentTemple, setCurrentTemple] = useState(temple);
  const [id, setId] = useState(temple.id);
  const [Name, setName] = useState(temple.Name);
  const [MainDeity, setMainDeity] = useState(temple.MainDeity);
  const [Manager, setManager] = useState(temple.Manager);
  const [Poojari, setPoojari] = useState(temple.Poojari);
  const [PradhanaArchaka, setPradhanaArchaka] = useState(
    temple.PradhanaArchaka
  );
  const [Followers, setSetFollowers] = useState(temple.Followers);
  const [Address1, setAddress1] = useState(temple.Address1);
  const [Address2, setAddress2] = useState(temple.Address2);
  const [PhoneNo, setPhoneNo] = useState(temple.PhoneNo);
  const [Country, setCountry] = useState(temple.Country);
  const [Email, setEmail] = useState(temple.Email);

  useEffect(() => {
    fetchCollection("people", setPeople);
  }, []);

  //   useEffect(() => {
  //     setId(currentTemple.id);
  //     setName(currentTemple.Name);
  //     setManager(currentTemple.Manager);
  //   }, [currentTemple]);

  const handleOnSubmit = (data) => {
    const addTemple = async () => {
      const full_data = {
        ...data,
        id,
        Manager,
        Poojari,
        PradhanaArchaka,
        Followers,
      };
      //   console.log(full_data);
      await firebase
        .firestore()
        .collection("temples")
        .doc(id)
        .update(full_data);
    };
    // console.log({
    //   ...data,
    //   id,
    //   Manager,
    //   Poojari,
    //   PradhanaArchaka,
    //   Followers,
    // });
    addTemple();
    setOpen(false);
    // fetchCollection("temples", setTemples);
    getById("temples", id).then((data) => setTemple(data));
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormControl className={classes.formControl}>
        <TextField
          label="id"
          inputRef={register()}
          name="id"
          value={id}
          fullWidth
          disabled
        />

        <TextField
          label="Name"
          inputRef={register({ required: true, maxLength: 20 })}
          name="Name"
          defaultValue={Name}
          fullWidth
        />

        <TextField
          label="MainDeity"
          inputRef={register({ required: true, maxLength: 20 })}
          name="MainDeity"
          defaultValue={MainDeity}
          fullWidth
        />

        <EditFormAutocomplete
          ref={register}
          options={people}
          control={control}
          name="Manager"
          value={Manager}
          onChange={(e, values) => {
            setManager(values);
          }}
        />

        <EditFormAutocomplete
          options={people}
          control={control}
          name="Poojari"
          value={Poojari}
          onChange={(e, values) => {
            setPoojari(values);
          }}
        />

        <EditFormAutocomplete
          options={people}
          control={control}
          name="PradhanaArchaka"
          value={PradhanaArchaka}
          onChange={(e, values) => {
            setPradhanaArchaka(values);
          }}
        />

        <EditFormAutocomplete
          options={people}
          control={control}
          name="Followers"
          value={Followers}
          onChange={(e, values) => {
            setSetFollowers(values);
          }}
          multiple
        />

        <TextField
          label="Address1"
          inputRef={register}
          name="Address1"
          value={Address1}
          onChange={(e, values) => {
            setAddress1(values);
          }}
          fullWidth
        />

        <TextField
          label="Address2"
          inputRef={register}
          name="Address2"
          value={Address2}
          onChange={(e, values) => {
            setAddress2(values);
          }}
          fullWidth
        />

        <CountrySelect
          control={control}
          value={Country}
          onChange={(e, values) => {
            setCountry(values);
          }}
        />

        <TextField
          label="Phone Number"
          inputRef={register}
          name="PhoneNo"
          value={PhoneNo}
          onChange={(e, values) => {
            setPhoneNo(values);
          }}
          fullWidth
        />
        <TextField
          label="Email"
          inputRef={register({ required: true, maxLength: 30 })}
          name="Email"
          value={Email}
          onChange={(e, values) => {
            setEmail(values);
          }}
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

function EditFormAutocomplete({ control, options, name, ...rest }) {
  return (
    <Controller
      render={({ ...props }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => {
            return option.Name;
          }}
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
          // onChange={(e, data) => {
          //   onChange(data);
          // }}
          filterSelectedOptions
          autoHighlight
          {...props}
          {...rest}
        />
      )}
      // onChange={([, data]) => data}
      // defaultValue={[]}
      name={name}
      control={control}
    />
  );
}
