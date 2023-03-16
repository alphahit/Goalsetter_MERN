import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
//import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
//useSelector is used to bring something from the state
//useDispatch is dispatch a fucntion
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
    
  });

  const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(()=>{
      if(isError){
        toast.error(message)
      }
      if(isSuccess || user){
        navigate('/')
      }
      dispatch(reset())
    },[user, isError, isSuccess,message, navigate, dispatch,])


  const {  email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))

  }
 
  if(isLoading){
    return <Spinner/>
  }
  return (
    <div style={{
      //backgroundImage: "linear-gradient(white,yellow)",
      //backgroundColor:"lightgrey"
    }}>
      <section className="heading" 
      // style={{
      //       backgroundImage: "linear-gradient(yellow,white)",
      //       color: "darkred",
      //     }}
          >
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting your goals</p>
      </section>
      <section className="form" style={{
            backgroundImage: "linear-gradient(white,yellow)",
          }}>
        <form onSubmit={onSubmit}>
         
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={onChange}
            />
          </div>
         
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
