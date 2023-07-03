import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"


export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //  const response= await fetch("http://localhost:5000/api/createuser",{
    //    mode: 'no-cors',
    //   method:"POST",
    //   headers:{
    //       "Content-Type":"application/json",
    //   },
    //   body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
    //  })

    //  const json=await response.json()
    //  console.log(json)

    axios
      .post("https://mernbackend-96yx.onrender.com/api/loginuser", credentials)
      .then((res) => {
        if(res.status === 200){
          alert("Successfully logged in")
        }else{
          alert("Try logging in with valid credentials")
        }
        // const json= res.json()
       
        console.log(res);
        localStorage.setItem("authToken",res.data.authToken);
        localStorage.setItem("userEmail",credentials.email)
        console.log(localStorage.getItem("authToken"));
        navigate("/")
      });
    
     
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
     <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
     <div>
        <Navbar/>
      </div>
      <div className="container">
        <form className='w-50 m-auto mt-5 p-3 bg-opacity-50  border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp" 
            />
            <div id="emailHelp" className="form-text text-white">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit"  className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 mx-1 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
      </div>
    </>
  );
}
