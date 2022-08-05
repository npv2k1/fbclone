import { Provider } from "next-auth/client";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import "../assets/css/all.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
