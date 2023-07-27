import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faCircle,
  faPlus,
  faTrash,
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import Pagination from "@/components/Pagination";
import Link from "next/link";

function stockPage() {
  const router = useRouter();
  const id = router.query.id;
  const { query } = router;

  const { data: session } = useSession();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [content, setContent] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const [Popup, setPopup] = useState(true);

  const [findInput, setFindInput] = useState("");
  const [showText, setShowText] = useState(false);

  const handleButtonClick = (id) => {
    setCurrentItem(id);
    setShowConfirmationModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFindInput(value);
  };

  async function findItem() {
    const res = await fetch("/api/content/FindMotos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ placa: findInput }),
    });
    const response = await res.json();
    setContent(response);
  }

  async function getData() {
    if (session) {
      setContent({});
      const res = await fetch("/api/content/FindMotos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: session.user.image }),
      });
      const response = await res.json();
      setContent(response);
    }
  }

  useEffect(() => {
    if (findInput === "") {
      getData();
    } else {
      findItem();
    }
  }, [findInput]);

  async function handleYesClick() {
    setShowConfirmationModal(false);
    await deleteItem(currentItem);
    await getData();
  }

  const handleNoClick = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    if (session && !session.user.image === query.id) router.push("/");
  }, [query.id]);

  function getCurrentItems(page) {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return content.motos.slice(startIndex, endIndex);
  }

  async function deleteItem(id) {
    const res = await fetch("/api/content/motos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const response = await res.json();
    console.log(response);
  }

  function handleSignOut() {
    signOut();
  }

  const handleClick = () => {
    if (!Popup) {
      setPopup(true);
    } else setPopup(false);
  };

  function redirect(id) {
    router.push(`/estoque/item/${id}`);
  }

  return (
    <>
      <header>
        <div className="header">
          <img className="logo" src="/imagens/logo.png" alt="Logo" />
          <div className="profile">
            <span>Olá {session.user.name}</span>
            <div className="profileIcons">
              <FontAwesomeIcon className="user" icon={faCircleUser} />
              <FontAwesomeIcon
                onClick={handleSignOut}
                className="down-arrow"
                icon={faArrowRightFromBracket}
              />
            </div>
          </div>
        </div>
      </header>

      <hr></hr>

      <main className="mainContent">
        <div className="infos">
          <img src="https://i.imgur.com/9LDfN2H.png" alt="user" />
          <span className="label">
            <h2> Olá {session.user.name}</h2>
            <h4>
              <span className="circle">
                <FontAwesomeIcon className="circle" icon={faCircle} />
              </span>
              {content && content.motos ? (
                <span>Total de motos: {content.motos.length}</span>
              ) : (
                <span>Sem motos</span>
              )}
            </h4>
            <Link href={`adicionar`}>
              <Button
                className="addButton"
                backgroundColor="#8b2123"
                text="Adicionar nova moto"
              />
            </Link>
          </span>
        </div>
        <div>
          <div className="input">
            <FontAwesomeIcon
              onClick={handleClick}
              className="down-arrow"
              icon={faMagnifyingGlass}
            />
            <input
              className="find"
              name="find"
              value={findInput}
              onChange={handleChange}
              placeholder="Buscar Placa"
            ></input>
          </div>
          {content && content.motos && (
            <table className="main-table">
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Placa</th>
                  <th>Renavam</th>
                  <th>Cor</th>
                  <th>Data de compra</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {content.motos === "" ? (
                  <tr>
                    <td className="noItems" colSpan="7">
                      Não há motos cadastradas.
                    </td>
                  </tr>
                ) : (
                  getCurrentItems().map((moto) => (
                    <tr key={moto._id}>
                      <td>{moto.modelo}</td>
                      <td>{moto.placa}</td>
                      <td>{moto.renavam}</td>
                      <td>{moto.cor}</td>
                      <td>{moto.data}</td>

                      <td>
                        <div className="icon-container">
                          <FontAwesomeIcon
                            onClick={() => redirect(moto._id)}
                            color="#000"
                            className="plus"
                            icon={faPlus}
                          />
                        </div>
                      </td>

                      <td>
                        <FontAwesomeIcon
                          onClick={() => handleButtonClick(moto._id)}
                          className="trash"
                          icon={faTrash}
                        />
                      </td>
                    </tr>
                  ))
                )}
                {showConfirmationModal && (
                  <div id="Modal" className="modalContainer">
                    <div className="modalContent">
                      <span>Deseja apagar a moto selecionada?</span>
                      <div className="options">
                        <p onClick={handleYesClick}>Sim</p>
                        <p onClick={handleNoClick}>Não</p>
                      </div>
                    </div>
                  </div>
                )}
              </tbody>
            </table>
          )}

          {content && content.motos ? (
            <Pagination
              content={content}
              pageSize={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            ""
          )}
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

export default stockPage;
