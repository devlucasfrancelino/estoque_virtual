import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import ReactInputMask from "react-input-mask";
import CurrencyInput from "react-currency-input-field";
import Link from "next/link";

function editPage() {
  const router = useRouter();
  const id = router.query.id;
  const { query } = router;
  const { data: session } = useSession();

  const [InputValue, setInputValue] = useState({});
  const [content, setContent] = useState({});
  const [edit, setEdit] = useState(false);

  async function getData() {
    const res = await fetch("/api/content/FindMotos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const response = await res.json();
    setContent(response);
    setInputValue(response);
  }

  async function updateData() {
    const res = await fetch("/api/content/FindMotos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        modelo: InputValue.modelo,
        placa: InputValue.placa,
        renavam: InputValue.ren,
        dono: InputValue.dono,
        valor: InputValue.valor,
        exp: InputValue.exp,
        cor: InputValue.cor,
        anoModelo: InputValue.ano,
        data: InputValue.data,
        comment: InputValue.comment,
      }),
    });
    const response = await res.json();
    console.log(response);
    getData();
  }

  useEffect(() => {
    getData();
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <main className="addContent">
        <h1 onClick={console.log(InputValue)}>{content.modelo}</h1>
        <form className="inputContainer">
          <div className="inputGroup">
            <input
              name="modelo"
              onChange={handleChange}
              value={InputValue.modelo}
              readOnly={!edit}
            />
            <input
              name="placa"
              onChange={handleChange}
              value={InputValue.placa}
              readOnly={!edit}
            />
            <input
              name="renavam"
              onChange={handleChange}
              value={InputValue.renavam}
              readOnly={!edit}
            />
            <input
              name="dono"
              onChange={handleChange}
              value={InputValue.dono}
              readOnly={!edit}
            />
            <input
              name="valor"
              currency="BRL"
              prefix="R$"
              onChange={handleChange}
              placeholder="Insira o valor"
              value={InputValue.valor}
              readOnly={!edit}
            />
          </div>
          <div className="inputGroup">
            <input
              name="exp"
              onChange={handleChange}
              placeholder="Insira a exposição"
              value={InputValue.exp}
              readOnly={!edit}
            />
            <input
              name="cor"
              onChange={handleChange}
              placeholder="Insira a cor"
              value={InputValue.cor}
              readOnly={!edit}
            />
            <input
              name="ano"
              onChange={handleChange}
              placeholder="Insira o ano do modelo"
              value={InputValue.ano}
              readOnly={!edit}
            />
            <ReactInputMask
              name="data"
              onChange={handleChange}
              mask="99/99/9999"
              placeholder="Insira a data"
              value={InputValue.data}
              readOnly={!edit}
            />
            <input
              name="comment"
              onChange={handleChange}
              placeholder="Comentarios"
              value={InputValue.comment}
              readOnly={!edit}
            />
          </div>
        </form>
        <div className="buttons">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://consultas.detrannet.sc.gov.br/servicos/consultaveiculo.asp?placa=${content.placa}&renavam=${content.renavam}`}
          >
            <input type="submit" value="Detran" />
          </a>
          <input
            type="submit"
            value={edit === true ? "Salvar" : "Editar moto"}
            onClick={() => {
              if (!edit) {
                setEdit(true);
              } else {
                async function change() {
                  await updateData();
                  setEdit(false);
                }
                change()
              }
            }}
          />
        </div>
      </main>
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

export default editPage;
