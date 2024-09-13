import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Usuario() {
    return (
        <div>
            <Header />
            <main className={styles.main}>
                <section className={styles.section1}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Painéis do Usuário</h1>
                        <div className={styles.panels}>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <div className={styles.panel}>
                                    <h2 className={styles.indicador}>Informações Pessoais</h2>
                                </div>
                            </Link>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <div className={styles.panel}>
                                    <h2 className={styles.indicador}>Serviços Agendados</h2>
                                </div>
                            </Link>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <div className={styles.panel}>
                                    <h2 className={styles.indicador}>Histórico de Veículos</h2>
                                </div>
                            </Link>
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <div className={styles.panel}>
                                    <h2 className={styles.indicador}>Configurações</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}