import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <div className='log-in'>
      <img src={logo} alt="" className='login-logo' />
      <div className='login-form'>
        <h2>Sign Up</h2>
        <form action="">
          <input type="text" placeholder='Your name' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button>Sign Up</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
