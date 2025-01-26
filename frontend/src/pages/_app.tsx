import "./globals.css";
import Header from "../components/Header";
import { useState } from "react";

export type IAUTH = {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function App({ Component, pageProps }: any) {
  const [login, setLogin] = useState(false);

  const auth: IAUTH = { login, setLogin };
  return (
    <div>
      <Header />
      <Component {...pageProps} auth={auth} />
    </div>
  );
}

export default App;
