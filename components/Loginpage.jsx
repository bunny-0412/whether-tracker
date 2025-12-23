import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Loginpage() {
  const navigate = useNavigate();
  const [username, setusername] = useState("8106902812");
  const [password, setpassword] = useState("8106902812");
  const [user,setuser] = useState();
  const API = "https://newtons-demo.up.railway.app";

  const checkaccount = async () => {
    const res = await fetch(`${API}/auth/check-account-exist`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({mobile:username,password})
    });
    const data = await res.json();
    if(data.success) {
        console.log("data fetch succussfuly");
        console.log(data)
        setuser(data.data);
        navigate("/Home",{state:data});
    }
  }
  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center">
      <h1 style={{ fontSize: 30 }}> Login</h1>

      <div
        style={{ borderRadius: 10 }}
        className="flex flex-col border-2 h-50 w-60 items-center justify-center gap-6"
      >
        <input
          style={{ borderRadius: 10 }}
          className="border-2 w-56 pl-1"
          placeholder="Enter the username/Roll-No"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />

        <input
          style={{ borderRadius: 10 }}
          className="border-2 w-56 pl-1"
          placeholder="Enter the password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button style={{ borderRadius: 10 }} 
        onClick={()=>{
            // alert("button clicked")
            checkaccount();
        }}
        className="bg-blue-400 p-1 w-40">
          Login
        </button>
      </div>

      <h1>
        {username} {password} 
      </h1>
      {user?<h1>{user.roll_no}</h1>:"nodata"}
    </div>
  );
}
