import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Router from "next/router";

export default function Main() {
  const { data: session } = useSession();
  const [Popup, setPopup] = useState(false);

  function handleSignOut() {
    signOut();
  }


  return (
    <>
      <header>
        <div className="header">
          <img
            onClick={console.log(session)}
            className="logo"
            src="/imagens/logo.png"
            alt="Logo"
          />
          <div>
            <div className="profile">
              {session ? Logged({ handleSignOut, session }) : Guest()}
            </div>
          </div>
        </div>
        <hr></hr>
      </header>
      <div className="main">
        <div>
          <h1>
            Estoque <br />
            Online
          </h1>
          <p>
            Bem-vindo ao nosso site de criação de <br />
            estoque online! <br />
            Aqui, ajudamos você a criar e gerenciar <br />
            um estoque completo.
          </p>

          <Button
            onClick={() => session ? Router.push(`/estoque/${session.user.image}`) : Router.push('/Registrar') }
            text={session ? "Acessar seu estoque" : "Começe Já!"}
            Size="4vh"
            backgroundColor="#8b2123"
          />
        </div>
        <img className="moto" src="/imagens/moto2.png" alt="Moto vermelha" />
      </div>
    </>
  );
}

function Guest() {
  return (
    <>
      <Button
        onClick={() => Router.push("/login")}
        id="login"
        text="Faça Login"
        Size="2.7vh"
        backgroundColor="#000"
      />

      <Button
        onClick={() => Router.push("/Registrar")}
        id="register-button"
        text="Cadastre-se"
        Size="2.7vh"
        backgroundColor="#8b2123"
      />
    </>
  );
}

function Logged({ handleSignOut, session }) {
  return (
    <>
      <span>Olá</span>
      <span>{session.user.name}</span>
      <div className="profileIcons">
        <FontAwesomeIcon className="user" icon={faCircleUser} />
        <FontAwesomeIcon
          onClick={handleSignOut}
          className="down-arrow"
          icon={faArrowRightFromBracket}
        />
      </div>
    </>
  );
}
