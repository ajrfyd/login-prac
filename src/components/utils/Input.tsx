import React, { useRef, useState } from "react";
import styled from 'styled-components';

type InputProps = {
  name: string;

}

const CustomInput = ({ name, }: InputProps) => {
  const [user, setUser] = useState({});
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeValue = () => {

  }

  return (  
    <Input 
      type='text'
      id={name}
      ref={inputRef}
      autoComplete='off'
      onChange={changeValue}
      required
      aria-invalid
      aria-describedby="uidnote"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  )
}

export default CustomInput;

const Input = styled.input`
  
`