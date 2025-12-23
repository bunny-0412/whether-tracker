import { useState, useEffect, act } from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [students, setstudents] = useState([]);
  const backend_url = "https://newtons-demo.up.railway.app";

  const { state } = useLocation();

  const senddata = async () => {
    const res = await fetch("http://localhost:5000/get-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
    console.log("button was clicked");
  };

  const getstudnts = async () => {
    const res = await fetch(`${backend_url}/managestudent/get-allstudents`);
    const data = await res.json();
    if (res.ok) {
      console.log("data get successfully");
      setstudents(data);
      console.log(data);
    }
  };

  const checkaccount = async () => {
    const res = fetch(`${backend_url}/check-account-exist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
  };

  useEffect(() => {
    getstudnts();
  }, []);

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center ">
      <input
        style={{ borderWidth: 1, marginBottom: 10 }}
        className=""
        type="text"
        placeholder="Enter the username"
        onChange={(e) => {
          setusername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Enter the password"
        onCxhange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <button onClick={senddata}>Submit</button>

      <div className="flex flex-row gap-3 ">
        {["Roll-No", "Branch", "section"].map((user, index) => (
          <h1>{user}</h1>
        ))}
      </div>

      {students.length === 0
        ? "there is no data"
        : students.map((user) => (
            <h1>
              {user.roll_no}
              {user.branch} {user.section} {user.name}
            </h1>
          ))}

      {}

      <h1>{username}</h1>
      <h1>{password}</h1>
      <h1>username</h1>
    </div>
  );
}
