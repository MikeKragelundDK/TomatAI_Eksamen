import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import classes from "./Login.module.css";

const Login = () => {
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
    const result = await login(payload);
    console.log(result);
    if (result.success === false) {
      alert(result.message);
    } else {
      const authToken = result.authToken;
      const user = result.user;
      localStorage.setItem("auth_token", authToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  };
  return (
    <div className={classes.body}>
      <h2 className={classes.title}>Login</h2>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.input}>
          <input ref={usernameRef} type="text" placeholder="username" />
          <input ref={passwordRef} type="password" placeholder="password" />
        </div>
        <button type="submit" className={classes.button}>
          {isLoading ? "Loggin in...." : "Login"}
        </button>
      </form>

      <Link to="/register" className={classes.Link}>
        Create an account
      </Link>
    </div>
  );
};

export default Login;
