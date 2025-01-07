import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import classes from "./Register.module.css";

const Register = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    const result = await register(payload);
    if (result.success) {
      alert("Registration completed!");
      navigate("/login");
    }
  };
  return (
    <div className={classes.body}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.input}>
          <input ref={usernameRef} type="text" placeholder="username" />
          <input ref={passwordRef} type="password" placeholder="password" />
        </div>
        <button type="submit" className={classes.button}>
          {isLoading ? "Creating Account...." : "Register"}
        </button>
      </form>

      <Link to="/login" className={classes.Link}>
        Already have an account?
      </Link>
    </div>
  );
};

export default Register;
