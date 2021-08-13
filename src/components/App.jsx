import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import emailjs from "emailjs-com";
import getRandomInt from "./getrandomint";
import keys from "../secrets";

function App() {
  var newotp = getRandomInt(100000, 1000000);
  const [otp, setOtp] = useState(newotp);
  const [uname, setName] = useState("");
  const [uemail, setEmail] = useState("");
  const [uotp, setUotp] = useState(0);
  const [estatus, setEstatus] = useState(false);

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleName(event) {
    setName(event.target.value);
  }

  function submitOtp(event) {
    setUotp(event.target.value);
  }

  function verifyOtp() {
    if (otp == uotp) {
      ReactDOM.render(
        <div className="conatiner">
          <h1>Verified</h1>
        </div>,
        document.getElementById("root")
      );
    } else {
      ReactDOM.render(<h1>Not Verified</h1>, document.getElementById("root"));
    }
  }

  function sendEmail(event) {
    event.preventDefault();

    const recipient = {
      name: uname,
      email: uemail,
      OTP: otp
    };

    emailjs
      .send(keys.service_id, keys.template_id, recipient, keys.user_id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setEstatus(true);
  }

  return (
    <div className="container">
      {estatus ? (
        <div>
          <h1>Enter OTP</h1>
          <form onSubmit={verifyOtp}>
            <input
              onChange={submitOtp}
              name="Otp"
              placeholder="Enter OTP"
              type="number"
            />
            <button>Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Contact Form</h1>
          <form onSubmit={sendEmail}>
            <input
              onChange={handleName}
              name="name"
              placeholder="Full Name"
              type="text"
            />
            <input
              onChange={handleEmail}
              name="email"
              placeholder="Email"
              type="email"
            />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
