import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import CustomInput from "../utils/Input";
import { user_regex, pass_regex } from "../../utils/utils";


const Register = () => {
  const submitHandler = () => {
    
  }
  const userRef = useRef();
  const errRef = useRef();

  return (
    <Section>
      <h1>Register</h1>
      <label htmlFor="username">UserName: </label>
      <form onSubmit={submitHandler}>
        <CustomInput name='username'/>
      </form>
    </Section>
  )
}

export default Register;

const  Section = styled.section`
  
`