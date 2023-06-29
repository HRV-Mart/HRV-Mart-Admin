import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/login.module.css'
import Typewriter from "typewriter-effect";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const inter = Inter({ subsets: ['latin'] })


export default function Login({account, application_url, message}) {
    const [isDarkTheme, setDarkTheme] = useState(false)
    const [change, setChange] = useState(false)
    setInterval(()=>{setChange(!change)}, 1000)

    useEffect(()=>{
        setDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }, [change])
    if (message === "LOGIN_ERROR") {
        toast(
            'Unable to Login',
            {
                hideProgressBar: false,
                autoClose: 2000,
                type: "error",
                theme: "dark"
            }
        );
    }

    return (
        <>
            <Head>
                <title>Login | HRV Mart Admin Portal</title>
                <meta name="description" content="HRV-Mart admin portal" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${inter.className} ${styles.main}`}>
                <div className={styles.leftContainer}/>
                <hr className={styles.verticalDivider}/>
                <div className={styles.rightContainer}>
                    <div className={styles.title}>
                        <Typewriter
                            options={{
                                strings: [
                                    "Welcome back to HRV-Mart Admin portal",
                                    "Please login with your account"
                                ],
                                autoStart: true,
                                loop: true
                            }}
                        />
                    </div>
                    <div className={styles.loginContainer}>
                        <div onClick={()=>oauth_2_handler('github')} className={styles.loginButton}>
                            <div className={styles.brand_icon_container}>
                                <img src={isDarkTheme ? '/github_icon_white.svg':'/github_icon.svg'} className={`${styles.brand_icon}`}/>
                            </div>
                            <div className={styles.loginTitle}>
                                Login with GitHub
                            </div>
                        </div>

                        <div onClick={()=>oauth_2_handler('discord')} className={styles.loginButton}>
                            <div className={styles.brand_icon_container}>
                                <img src={'/discord_icon.svg'} className={`${styles.brand_icon}`}/>
                            </div>
                            <div className={styles.loginTitle}>
                                Login with Discord
                            </div>
                        </div>

                        <div onClick={()=>oauth_2_handler('google')} className={styles.loginButton}>
                            <div className={styles.brand_icon_container}>
                                <img src={'/google_icon.svg'} className={`${styles.brand_icon}`}/>
                            </div>
                            <div className={styles.loginTitle}>
                                Login with Google
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
    function oauth_2_handler(provider) {
        account.createOAuth2Session(
            provider,
            application_url,
            `${application_url}/login?message=LOGIN_ERROR`
        )
    }
}