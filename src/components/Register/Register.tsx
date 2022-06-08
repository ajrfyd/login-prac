import React, { useState, useEffect, useRef, useTransition } from "react";
import styled from 'styled-components';
import CustomInput from "../utils/Input";
import { user_regex, pass_regex, REGISTER_URL } from "../../utils/utils";
import axios from "axios";
import { AiOutlineCheck, AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai'

type AxiosRes = {
  accessToken: string;
  data: [],
  err?: Errtype;
}

type Errtype = {
  response: {
    status: number;
  }
}

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

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
    setValidName(user_regex.test(user));
  }, [user])
  
  useEffect(() => {
    const result = user_regex.test(user);
    setValidName(result);
  }, [user]);
  
  useEffect(() => {
    setValidPwd(pass_regex.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // if button enabled with JS hack
  //   const v1 = user_regex.test(user);
  //   const v2 = pass_regex.test(pwd);
  //   if (!v1 || !v2) {
  //       setErrMsg("Invalid Entry");
  //       return;
  //     }
  //     try {
  //         const response: AxiosRes = await axios.post(REGISTER_URL,
  //             JSON.stringify({ user, pwd }),
  //             {
  //                 headers: { 'Content-Type': 'application/json' },
  //                 withCredentials: true
  //             }
  //         );
  //         console.log(response?.data);
  //         console.log(response?.accessToken);
  //         console.log(JSON.stringify(response))
  //         setSuccess(true);
  //         //clear state and controlled inputs
  //         //need value attrib on inputs for this
  //         setUser('');
  //         setPwd('');
  //         setMatchPwd('');
  //     } catch (err) {
  //         if (!err?.response) {
  //             setErrMsg('No Server Response');
  //         } else if (err.response?.status === 409) {
  //             setErrMsg('Username Taken');
  //         } else {
  //             setErrMsg('Registration Failed')
  //         }
  //         if(err) {
  //           errRef.current.focus();
  //         }
  //     }
  // }


  return (
    <>
      {
        success ? (
          <section>
              <h1>Success!</h1>
              <p>
                  <a href="#">Sign In</a>
              </p>
          </section>
        ) : (
          <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
              <label htmlFor="username">
                Username:
                <AiOutlineCheck className={validName ? "valid" : "hide"}/>
                <AiOutlineClose className={validName || !user ? "hide" : "invalid"}/>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <AiOutlineInfoCircle />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>


              <label htmlFor="password">
                  Password:
                  <AiOutlineCheck className={validPwd ? "valid" : "hide"}/>
                  <AiOutlineClose className={validPwd || !pwd ? "hide" : "invalid"}/>
              </label>
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
              />
              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                  <AiOutlineInfoCircle />
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>


              <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <AiOutlineCheck className={validMatch && matchPwd ? "valid" : "hide"}/>
                  <AiOutlineClose className={validMatch || !matchPwd ? "hide" : "invalid"}/>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                  <AiOutlineInfoCircle />
                  Must match the first password input field.
              </p>

              <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign In</a>
                </span>
            </p>
          </section>
        )
      }
    </>
  )
}

export default Register;

const  Section = styled.section`
  
`