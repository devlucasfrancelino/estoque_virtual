import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faEnvelope, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { validateData } from "@/utils/validateUser";
import errorMethod from "@/utils/errorMethod";
import clearInputs from "@/utils/clearInputs";
import { useRouter } from "next/router";
import Link from "next/link";

function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateData(
      form.email,
      form.username,
      form.password,
      form.confirmpassword
    );

    if (isValid) {
      setError(isValid);
      errorMethod();
    } else {
      console.log(form);
      const res = await fetch("api/users/handler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.status === 400 && data.message) {
        setError("Email já esta cadastrado");
        errorMethod();
      } else {
        clearInputs();
        setError("Sua conta foi criada com sucesso");
        errorMethod();
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }
  }
  return (
    <>
      <main>
        <div className="popup">
          <Link href={"/"}>
            <FontAwesomeIcon className="arrow" icon={faXmark} color="#525354" />
          </Link>
          <img src="/imagens/logo.png" alt="logo" className="register-logo" />
          <form className="inputs" onSubmit={handleSubmit}>
            <FontAwesomeIcon icon={faEnvelope} id="Mail" className="icons" />
            <input
              placeholder="Insira seu Email"
              onChange={handleChange}
              name="email"
              id="input"
            ></input>
            <FontAwesomeIcon icon={faUser} id="User" className="icons" />
            <input
              placeholder="Nome de usuário"
              onChange={handleChange}
              name="username"
              id="input"
            ></input>
            <FontAwesomeIcon icon={faKey} id="Key1" className="icons" />
            <input
              onChange={handleChange}
              placeholder="Insira sua senha"
              name="password"
              id="input"
              type="password"
            ></input>
            <FontAwesomeIcon icon={faKey} id="Key2" className="icons" />
            <input
              onChange={handleChange}
              placeholder="Confirme sua senha"
              name="confirmpassword"
              id="input"
              type="password"
            ></input>
            <input id="register" value="Criar Conta" type="submit" />
            <div className="error-div">{error}</div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;
