import '@/styles/globals.css'
import Header from "@/component/header";

export default function App({ Component, pageProps }) {
  return <>
    <Header/>
    <Component {...pageProps} />
  </>
}
