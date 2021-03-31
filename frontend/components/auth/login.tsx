import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/login.module.scss";
import CustomButton from "../buttons/button";
import { getCookie, loginWithEmail } from "../../service/auth";

const Login: React.SFC<{}> = () => {
  const router = useRouter();
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [emailError, setUserameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const is_admin = () => {
    let token = getCookie("token");
    token && router.replace("/");
  };

  useEffect(() => {
    is_admin();
  }, []);

  const formRef = useRef(null);
  const formHandler = (event) => {
    const { name, value } = event.target;
    let tempErrors = errors;
    switch (name) {
      case "email":
        tempErrors.email = value.length < 4 ? "Username is not valid" : "";
        setUserameError(tempErrors.email.length > 0 ? true : false);
        break;
      case "password":
        tempErrors.password =
          value.length < 6 ? "Password must be at least 6 characters" : "";
        setPasswordError(tempErrors.password.length > 0 ? true : false);
        break;
      default:
        break;
    }
    setErrors(tempErrors);
  };

  const emailLogin = async (event) => {
    event.preventDefault();
    setLoginError(null);
    const formData = new FormData(formRef.current) as any;
    let res = await loginWithEmail(
      formData.get("email"),
      formData.get("password")
    );
    if (res.error) {
      console.log(res.error);
      setLoginError(res.error);
    }
    if (res.token) {
      router.push("/");
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className={styles.login_card_container}>
        <h2 className={styles.login_header}>Login</h2>

        <div className={styles.form_container}>
          <form className={styles.login_form} ref={formRef}>
            <label>
              Username
              <br />
              <span className={styles.contact_form_error}>{errors.email}</span>
              <input
                name="email"
                type="email"
                className={
                  passwordError ? styles.text_input_error : styles.text_input
                }
                placeholder="admin@example.com"
                onChange={formHandler}
              />
            </label>

            <label>
              Password
              <br />
              <span className={styles.contact_form_error}>
                {errors.password}
              </span>
              <input
                name="password"
                type="password"
                className={
                  passwordError ? styles.text_input_error : styles.text_input
                }
                placeholder="password"
                onChange={formHandler}
              />
            </label>

            <CustomButton
              fill={true}
              clickAction={(event) => emailLogin(event)}
              disabled={
                emailError ||
                passwordError ||
                emailError === null ||
                passwordError === null
              }
            >
              Login
            </CustomButton>

            {loginError && (
              <div className={styles.auth_form_error}>
                <span> {loginError} </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
