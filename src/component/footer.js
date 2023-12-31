import Link from "next/link";
import styles from "@/styles/footer.module.css";

export default function Footer() {
    return <div className={styles.main}>
        <div className={styles.brand}>
            <div className={styles.title}>
                HRV-Mart Admin Portal
            </div>
            <div className={styles.copyright}>
                Copyright © 2023 HRV-Mart Inc. All rights reserved.
            </div>
        </div>
        <div className={styles.links}>
            <Link href={"/"} className={styles.link}>
                Home Page
            </Link>
            <Link href={"/about"} className={styles.link}>
                About Us
            </Link>
            <Link href={"https://github.com/HRV-Mart/HRV-Mart-Admin/issues"} className={styles.link}>
                Report any issue
            </Link>
            <Link href={"https://github.com/HRV-Mart/HRV-Mart-Admin"} className={styles.link}>
                Contribute to website
            </Link>
        </div>
    </div>
}