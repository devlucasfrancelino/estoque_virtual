import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState([]);

  //  admin@admin.com
  //  admin123

  async function handleSubmit() {
    const status = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: "/",
    });

    if (status.ok) router.push(status.url);
  }

  return (
    <>
      <main>
        <div className="popup">
          <Link href={'/'}>
            <FontAwesomeIcon className="exit" icon={faXmark} color="#525354" />
          </Link>
          <img
            src="/imagens/logo.png"
            alt="logo"
            className="register-logo"
          />
          <form className="inputs">
            <span>Fazer Login</span>
            <FontAwesomeIcon icon={faEnvelope} id="LoginIcon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Insira seu Email"
              id="input"
            ></input>
            <FontAwesomeIcon
              icon={faKey}
              id="LoginIcon"
              className="LoginIcon"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              name="password"
              id="input"
            ></input>
            <button id="register" onClick={handleSubmit} type="button">
              Entrar
            </button>
            <div className="error-div">{error}</div>
          </form>
        </div>
        
      </main>
    </>
  );
}

export default Login;
