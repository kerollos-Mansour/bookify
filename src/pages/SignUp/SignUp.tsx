import React, { useState } from "react";
import "./Signup.css";

const Signup: React.FC = () => {
  const [username, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phonenumber, setphonenumber] = useState<number>();
  const [country, setcountry] = useState<string>("");



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

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
        <input type="text" placeholder="Enter your number" value={phonenumber} onChange={(e) => setcountry(e.target.value)} required>
        </input>

        <button type="submit">Sign Up</button>
      </form>
      <a href="Login" id="loginlink">Log in</a>
    </div>
  );
};

export default Signup;
