import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {

  const [signState, setSignState] = useState("Sign Up ");

  return (
    <div className='log-in'>
      <img src={logo} alt="" className='login-logo' />
      <div className='login-form'>
        <h2>{signState}</h2>
        <form action="">
          {signState === "Sign Up" && <input type="text" placeholder='Your name' />}
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ? <p>New to Netflix? <span onClick={()=>setSignState('Sign Up')}>Sign Up Now</span></p> : <p>Already have an account? <span onClick={()=>setSignState('Sign In')}>Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login
