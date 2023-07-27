import "@/styles/globals.css";
import "@/styles/MainPage.css";
import "@/styles/Register.css";
import "@/styles/Login.css";
import "@/styles/stockPage.css";
import "@/styles/Pagination.css";
import "@/styles/addPage.css";
import { SessionProvider } from "next-auth/react";
import "@/styles/modal.css";



function MyApp({ Component, pageProps } ) {
  return (
    <SessionProvider session={pageProps.session}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;
