import '@/styles/globals.css'
import Header from "@/component/header";
import Footer from "@/component/footer";

export default function App({ Component, pageProps }) {
  const appwrite_endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const appwrite_project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const application_url = process.env.NEXT_PUBLIC_APPLICATION_URL;

  return <>
    <Header/>
    <Component {...pageProps} />
    <Footer/>
  </>
}
