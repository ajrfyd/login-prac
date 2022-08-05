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
  
  const [userId, setUserId] = useState('');
  const [validId, setValidId] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [rePwd, setRePwd] = useState('');
  const [matchPwd, setMatchPwd] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if(userRef.current) {
      userRef.current.focus();
    }
  }, [])

  useEffect(() => {
    setValidId(user_regex.test(userId));
  }, [userId])
  
  useEffect(() => {
    const result = user_regex.test(userId);
    setValidId(result);
  }, [userId]);
  
  useEffect(() => {
    setValidPwd(pass_regex.test(pwd));
    setMatchPwd(pwd === rePwd);
  }, [pwd, rePwd])

  useEffect(() => {
    setErrMsg('');
  }, [userId, pwd, rePwd])
  
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = user_regex.test(userId);
    const v2 = pass_regex.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
      }
      // try {
      //     const response: AxiosRes = await axios.post(REGISTER_URL,
      //         JSON.stringify({ userId, pwd }),
      //         {
      //             headers: { 'Content-Type': 'application/json' },
      //             withCredentials: true
      //         }
      //     );
      //     console.log(response?.data);
      //     console.log(response?.accessToken);
      //     console.log(JSON.stringify(response))
      //     setSuccess(true);
      //     //clear state and controlled inputs
      //     //need value attrib on inputs for this
      //     setUserId('');
      //     setPwd('');
      //     setRePwd('');
      // } catch (err) {
      //     if (!err?.response) {
      //         setErrMsg('No Server Response');
      //     } else if (err.response?.status === 409) {
      //         setErrMsg('Username Taken');
      //     } else {
      //         setErrMsg('Registration Failed')
      //     }
      //     if(err) {
      //       errRef.current?.focus();
      //     }
      // }
      setSuccess(true)
  }


  return (
    <>
      {
        success ? (
          <section>
              <h1>Success!</h1>
              <p>
                  <a href="/">Sign In</a>
              </p>
          </section>
        ) : (
          <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <AiOutlineCheck className={validId ? "valid" : "hide"}/>
                <AiOutlineClose className={validId || !userId ? "hide" : "invalid"}/>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserId(e.target.value)}
                value={userId}
                required
                aria-invalid={validId ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p id="uidnote" className={userFocus && userId && !validId ? "instructions" : "offscreen"}>
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
                  <AiOutlineCheck className={matchPwd && rePwd ? "valid" : "hide"}/>
                  <AiOutlineClose className={matchPwd || !rePwd ? "hide" : "invalid"}/>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setRePwd(e.target.value)}
                value={rePwd}
                required
                aria-invalid={matchPwd ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id="confirmnote" className={matchFocus && !matchPwd ? "instructions" : "offscreen"}>
                  <AiOutlineInfoCircle />
                  Must match the first password input field.
              </p>

              <button disabled={!validId || !validPwd || !matchPwd ? true : false}>Sign Up</button>
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