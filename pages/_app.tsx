import type { AppProps } from "next/app";
import "normalize.css";
import Layout from "../components/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
