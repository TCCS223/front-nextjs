import Link from "next/link"
import styles from "./page.module.css"

export default function Temp(){
    return(
    <div className="containerGlobal">
        <h1>Telas do sistema</h1>

        <Link href="/" className={styles.linkTemp}>Home</Link>
        <Link href="/telas/login" className={styles.linkTemp}>Sobre</Link>
        <Link href="/usuarios/cadastro" className={styles.linkTemp}>Cadastro</Link>
        <Link href="/usuarios/login" className={styles.linkTemp}>Login</Link>
    </div>
    )
}