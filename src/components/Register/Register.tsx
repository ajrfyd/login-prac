import React, { useState, useEffect, useRef, useTransition } from "react";
import styled from 'styled-components';
import CustomInput from "../utils/Input";
import { user_regex, pass_regex } from "../../utils/utils";


const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef();
  
  const [user, setUser] = useState<string>('');
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if(userRef.current) {
      userRef.current.focus();
    }
  }, [])

  useEffect(() => {
    const result = user_regex.test(user);
    setValidName(result);
  }, [])
  
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