import { useRouter } from "next/router";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import ReactInputMask from "react-input-mask";
import CurrencyInput from "react-currency-input-field";
import Alert from "@/components/Alert";

function addPage() {
  const router = useRouter();
  const id = router.query.id;
  const { query } = router;
  const [Popup, setPopup] = useState(false);
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  const [InputValue, setInputValue] = useState({});

  async function send() {
      // const res = await fetch("/api/content/motos", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ 
      //     modelo: InputValue.modelo,
      //     placa: InputValue.placa,
      //     renavam: InputValue.ren,
      //     dono: InputValue.dono,
      //     valor: InputValue.valor,
      //     exp: InputValue.exp,
      //     cor: InputValue.cor,
      //     ano: InputValue.ano,
      //     data: InputValue.data,
      //     comment: InputValue.comment,
      //     usuario: session.user.image }),
      // });
      // const response = await res.json();
      // console.log(response)
      setInputValue({});
      setShowPopup(true)      
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(InputValue);
  };

  return (
    <>
      <main className="addContent">
        <h1 onClick={console.log(InputValue)}>Adicionar Moto</h1>
        <form className="inputContainer">
          <div className="inputGroup">
            <input
              name="modelo"
              onChange={handleChange}
              placeholder="Insira o modelo"
              value={InputValue.modelo || ""}
            />
            <input
              name="placa"
              onChange={handleChange}
              placeholder="Insira a placa"
              value={InputValue.placa || ""}
            />
            <input
              name="ren"
              onChange={handleChange}
              placeholder="Insira o renavam"
              value={InputValue.renavam || ""}
            />
            <input
              name="dono"
              onChange={handleChange}
              placeholder="Insira o dono"
              value={InputValue.dono || ""}
            />
            <CurrencyInput
              name="valor"
              currency="BRL"
              prefix="R$"
              onChange={handleChange}
              placeholder="Insira o valor"
              value={InputValue.valor || ""}
            />
          </div>
          <div className="inputGroup">
            <input
              name="exp"
              onChange={handleChange}
              placeholder="Insira a exposição"
              value={InputValue.exp || ""}
            />
            <input
              name="cor"
              onChange={handleChange}
              placeholder="Insira a cor"
              value={InputValue.cor || ""}
            />
            <input
              name="ano"
              onChange={handleChange}
              placeholder="Insira o ano do modelo"
              value={InputValue.ano || ""}
            />
            <ReactInputMask
              name="data"
              onChange={handleChange}
              mask="99/99/9999"
              placeholder="Insira a data"
              value={InputValue.data || ""}
            />
            <input
              name="comment"
              onChange={handleChange}
              placeholder="Comentarios"
              value={InputValue.comment || ""}
            />
          </div>
        </form>
        <input
          type="submit"
          onClick={send}
          className="sendForm"
          value="Adicionar"
        />
      </main>
      {showPopup && <Alert onClose={() => setShowPopup(false)} color="#00b200" text={"Moto adicionada com sucesso!"} />}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default addPage;

