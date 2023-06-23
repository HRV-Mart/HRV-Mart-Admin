import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/login.module.css'
import Typewriter from "typewriter-effect";

const inter = Inter({ subsets: ['latin'] })


export default function Login() {
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
                </div>
            </main>
        </>
    )
}