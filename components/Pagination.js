import { useState } from "react";

export default function Pagination({ content, pageSize, currentPage, setCurrentPage }) {
  const itemsSize = content.motos.length;

  const pages = Math.ceil(itemsSize / pageSize);

  const result = [...Array(pages).keys()].map((i) => i + 1);

  

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <nav>
      <ul id="pagination">
        {result.map((page) => {
          return (
            <li key={page}>
              <a
                onClick={() => handlePageChange(page)}
                className={
                  page == currentPage
                    ? "ActiveButtonPage"
                    : "nonActiveButtonPage"
                }
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// const max_items = 6
// const max_left = (max_items - 1 ) / 2

// const Pagination = ({ limit, total, offset, setOffset, currentPage, setCurrentPage}) => {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const totalPages = Math.ceil(total / limit)
//   const first = Math.max(currentPage - max_left, 1)

//   return (
//     <ul>
//       {Array.from({ length : max_items })
//         .map((_, index) => Math.ceil(index + first))
//         .map((page) => (
//           <li className="pagination">
//             <button
//               onClick={() => setOffset((page - 1) * limit)}
//               className={
//                 page === currentPage ?
//                 "ActiveButtonPage" : "nonActiveButtonPage"
//               }

//             >
//               {page}
//             </button>
//           </li>
//         ))}
//     </ul>
//   )
// }

// export default Pagination

// {
//   /* <table className="main-table">
//     <thead className="tabela">
//       <tr>
//         <th>Modelo</th>
//         <th>Placa</th>
//         <th>Ano</th>
//         <th>Cor</th>
//         <th>Data de Compra</th>
//         <th></th>
//         <th></th>
//       </tr>
//     </thead>
//     <tbody>
//       {currentItems.map((Motos, index) => (
//         <tr key={index}>
//           <td>{motos.modelo}</td>
//           <td>{motos.placa}</td>
//           <td>{motos.anoModelo}</td>
//           <td>{motos.cor}</td>
//           <td>{motos.dataCompra}</td>
//           <td onClick={() => router.push(`/moto/${moto.renavam}`)}>
//             <FontAwesomeIcon icon={faPlus} />
//           </td>
//           <td onClick={() => router.push(`/moto/${moto.renavam}`)}>
//             <FontAwesomeIcon icon={faTrash} color="#8b2123" />
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
//   <div className="pagination">
//     {Array.from(Array(pages), (item, index) => {
//       return (
//         <button
//           key={index}
//           value={index}
//           onClick={(e) => {
//             setCurrentPage(Number(e.target.value));
//           }}
//           className={
//             index === currentPage
//               ? "ActiveButtonPage"
//               : "nonActiveButtonPage"
//           }
//           >
//           {index + 1}
//         </button>
//       );
//     })}
//   </div> */
// }

// // async function getData(userid) {
// //   const response = await fetch("/api/content/FindMotos", {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       userid: userid,
// //     }),
// //   });
// //   const res = await response.json();
// //   return res;
// // }

// // useEffect(() => {
// //   async function getMotos() {
// //     const data = await getData(session.user.image);
// //     setMotos(data);
// //   }
// //   getMotos();
// // }, [session]);

// // const [pages, setPages] = useState()
// // const [currentPage, setCurrentPage] = useState(0);
// // const [itemsPerPage, setItemsPerPage] = useState(6);
// // const [currentItems, setCurrentItems] = useState([]);

// // useEffect(() => {
// //   if (motos && motos.length > 0) {
// //     setPages(Math.ceil(motos.length / itemsPerPage))
// //     const startIndex = currentPage * itemsPerPage;
// //     const endIndex = startIndex + itemsPerPage;
// //     console.log(motos.slice(startIndex, endIndex));
// //   }
// // }, [motos, currentPage, itemsPerPage]);

// // if (currentItems.length === 0) {
// //     setPages(Math.ceil(motos.length / itemsPerPage))
// //     const startIndex = currentPage * itemsPerPage;
// //     const endIndex = startIndex + itemsPerPage;
// //     console.log(motos.slice(startIndex, endIndex));
// // }
