import Login from "../components/auth/login";
import Header from "../components/header";

export default function LoginPage() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <Login />
      </div>
    </div>
  );
}
