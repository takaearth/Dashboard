import Layout from "@/components/layout";
import { ProvideAuth } from "@/context/authContext";
import { ProvideData } from "@/context/dataContext";
//css
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ProvideData>
      <ProvideAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideAuth>
    </ProvideData>
  );
}
