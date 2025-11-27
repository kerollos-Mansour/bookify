import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";


const Signup: React.FC = () => {
  const [username, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phonenumber, setphonenumber] = useState<number>();
  const [country, setcountry] = useState<string>("");
 const [emailError, setEmailError] = useState<string>("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  if(!email.includes("@")){
    setEmailError("Email must contain @");
    return;
  }
    setEmailError(''); // Clear error if email is valid

    console.log("User Data:", {
      username,
      email,
      password,
      phonenumber,
      country,
    });

    alert("Signup successful!");
  };

  return (
    <div className="signup-page">
      <div className="left-section">
        <img src="/lankastay.jpg" alt="Signup visual" />

      </div>
          <div className="right-section">

      <div className="signup-container">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <label>User name:</label>
          <input
            type="text"
            placeholder="Enter your user name"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? "error" : ""} // Add this line
            required
          />
          {emailError && <p className="error-message">{emailError}</p>} {/* Updated this line */}


          <label>Password:</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Phone number</label>
          <input type="number" placeholder="Enter your number" value={phonenumber} onChange={(e) => setphonenumber(e.target.valueAsNumber)} required>
          </input>
          <label>Country</label>
          <input type="text" placeholder="Enter your number" value={country} onChange={(e) => setcountry(e.target.value)} required>
          </input>

          <button type="submit">Sign Up</button>
        </form>
        <Link to="/Login" id="loginlink">Log in</Link>
      </div>
    </div>
        </div>

  );
};

export default Signup;
