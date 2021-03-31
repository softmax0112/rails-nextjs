import Head from "next/head";
import Link from "next/link";
import styles from "../styles/components/header.module.scss";
import React from "react";
import { getCookie } from "../service/auth";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    var token = getCookie("token");
    setToken(token);
  }, []);

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className={styles.nav_elm}>
            <div className={styles.nav_elm_left}>
              <h1>
                <Link href={{ pathname: "/" }}>
                  <a>Coding </a>
                </Link>
              </h1>
            </div>
            <div className={styles.nav_elm_right}>
              <button className={styles.admin_button}>
                {!token && (
                  <Link href={{ pathname: "/login" }}>
                    <a title="admin">Admin Login</a>
                  </Link>
                )}
              </button>
              <button className={styles.website}>
                <Link href="http://rajchhatbar.com/">
                  <a title="website"> @Raj Chhatbar </a>
                </Link>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
