import '@/styles/globals.css'
import Header from "@/component/header";
import Footer from "@/component/footer";
import {useEffect, useState} from "react";
import {logError, logMessage} from "@/service/logging/logging";
import {Account, Client} from "appwrite";
import {postRequest} from "@/service/network/network";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export default function App({ Component, pageProps }) {
  const appwrite_endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const appwrite_project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const application_url = process.env.NEXT_PUBLIC_APPLICATION_URL;

  const [details, setDetails] = useState({
    account: null,
    token: null
  })
  logMessage(details)

  useEffect(()=>{
    generateToken().then().catch(logError);
    setInterval(generateToken, 1000*60*10);
  }, [])

  return <>
    <Header token={details.token} />
    <Component {...pageProps} token={details.token} account={details.account} application_url={application_url} />
    <Footer />
    <ToastContainer />
  </>

  async function generateToken() {

    const client = new Client()
    client.setEndpoint(appwrite_endpoint)
    client.setProject(appwrite_project)

    const account = new Account(client)
    var token = null

    try {
      const response = await account.createJWT();
      const jwt = response.jwt;

      const result = await postRequest(
          '/api/login',
          {
            jwt: jwt
          },
          {
            "Content-Type": "application/json"
          },
          false
      )

      token = result.data
    }
    catch (error) {
      logError(error)
    }
    setDetails({
      account: account,
      token: token
    })
  }
}