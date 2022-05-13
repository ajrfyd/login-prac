import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import CustomInput from "../utils/Input";

const Register = () => {
  const submitHandler = () => {
    
  }


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