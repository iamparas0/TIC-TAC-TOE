import React from 'react'
import './Contact.css'
import { useNavigate } from 'react-router-dom'


const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/');
  };
  return (

    <div className="login-container">

      <h2>Contact Us</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            name="email"
            className=''
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"

            className=''
            placeholder="Enter your name"
          />

        </div>
        <div className="form-group2">
          <label htmlFor="msg">Message:</label>
          <input
            type="text-box"
            name="msg"

            className=''
            placeholder="Enter your msg"
          />

        </div>
        <button type="submit" className="login-btn">Send</button>
      </form>


    </div >
  )
}

export default Contact