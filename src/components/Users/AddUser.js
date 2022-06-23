import React, { useState, useRef } from "react";

import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  //No need for below since we are using refs:
  // const [enteredUserName, setEnteredUserName] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    //prevent sending a request (refreshing page) by clicking a button
    event.preventDefault();
    //reading current input value
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      //handling error state as an object
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age.",
      });
      //finish the function execution here
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age.",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);

    //reset inputs to empty strings
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";

    //reset inputs to empty strings (using useState not refs):
    // setEnteredAge("");
    // setEnteredUserName("");
  };

  // const userNameChangeHandler = (event) => {
  //   setEnteredUserName(event.target.value);
  // };
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            //value={enteredUserName}
            //onChange={userNameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            //value={enteredAge}
            //onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">AddUser</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
