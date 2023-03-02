import Layout from "@/components/layout";
import { ProvideAuth } from "@/context/authContext";
//css
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideAuth>
  );
}
