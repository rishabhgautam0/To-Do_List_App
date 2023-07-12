import React from 'react';
import "../styles/HomeStyle.css";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="dp">
   
    <div className="content">
        <p className="content-intro">Welcome To</p>
        <h1 className="content-name">To Do List App</h1>
        <br/>
        <h4 className="content-skill"><i>To manage your To Do's</i></h4>
    
        <div>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">SignUp</Link>
        </div>
    </div>
</div>
  )
}

export default Home;