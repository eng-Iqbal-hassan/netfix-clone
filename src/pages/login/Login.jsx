import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { isInAppBrowser, openInDefaultBrowser } from "../../utils/browserDetection";

const Login = () => {


  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   const url = window.location.href;

  //   function isInAppBrowser() {
  //     return (
  //       userAgent.includes("FBAN") ||
  //       userAgent.includes("FBAV") || // Facebook
  //       userAgent.includes("Instagram") ||
  //       userAgent.includes("LinkedInApp") ||
  //       userAgent.includes("Snapchat") ||
  //       userAgent.includes("TikTok") ||
  //       userAgent.includes("Pinterest") ||
  //       userAgent.includes("YouTube") ||
  //       userAgent.includes("Twitter") ||
  //       userAgent.includes("WhatsApp") ||
  //       userAgent.includes("Gmail") ||
  //       userAgent.includes("com.google.android.gm")
  //     );
  //   }

  //   function openInDefaultBrowser() {
  //     if (/iPhone|iPad|iPod/i.test(userAgent)) {
  //       window.location.href = "x-web-search:" + url;
  //     } else if (/Android/i.test(userAgent)) {
  //       window.location.href =
  //         "intent://" + url.replace(/^https?:\/\//, "") + "#Intent;scheme=https;package=com.android.chrome;end;";
  //     }
  //   }

  //   if (isInAppBrowser()) {
  //     openInDefaultBrowser();
  //   }
  // }, []);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className='login-spinner'>
      <img src={netflix_spinner} alt='' />
    </div>
  ) : (
    <div className='log-in'>
      <img src={logo} alt='' className='login-logo' />
      <div className='login-form'>
        <h2>{signState}</h2>
        <form>
          {signState === "Sign Up" && (
            <input type='text' placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={user_auth} type='submit'>
            {signState}
          </button>
          <div className='form-help'>
            <div className='remember'>
              <input type='checkbox' />
              <label>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className='form-switch'>
          {signState === "Sign In" ? (
            <p>
              New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
