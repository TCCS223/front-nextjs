import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";


export default function Home() {
    return (
        <>
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.login}></div>


                {/* <div className={styles.title}>
                    Bem-vindo ao nosso site
                </div>
                <div className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis faucibus justo, ut tincidunt enim maximus nec. Sed et turpis at nisi tristique elementum.
                </div>
                <Link href="/sobre"
                   className={styles.button}>Saiba mais
                </Link>  */}
            </div>
            <div className={styles.image}>
                <Image
                    src='/imgCarrossel/img2.jpg'
                    alt="Ana Costa"
                    width={4256}
                    height={2832}
                    className={styles.img}
                />
            </div>
        </main>
        </>
    )
}