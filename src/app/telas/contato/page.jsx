import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function Contato() {
    return (
        <div>
            <Header />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container_contato}>
                        <div className={styles.titulocontato}>Fale conosco</div>
                            <div className={styles.bloco}>
                            <div className={styles.fontblocotitulo}>Dúvidas</div>
                                <div className={styles.fontblocotxt}>Telefone: (XX)XXXX-XXXX</div>
                                <div className={styles.fontblocotxt}>WhatsApp: (XX)XXXX-XXXX</div>
                                <div className={styles.fontblocotxt}>Email: urban_ouvidoria@teste.com</div>

                                <div className={styles.fontblocotitulo}>Reclamações</div>
                                <div className={styles.fontblocotxt}>Telefone: (XX)XXXX-XXXX</div>
                                <div className={styles.fontblocotxt}>WhatsApp: (XX)XXXX-XXXX</div>
                                <div className={styles.fontblocotxt}>Email: urban_atendimento@teste.com</div>

                                <div className={styles.fontblocotitulo}>Trabalhe conosco</div>
                                <div className={styles.fontblocotxt}>Email: urban_rh@teste.com</div>

                                <div className={styles.fontblocotitulo}>Seja nosso parceiro</div>
                                <div className={styles.fontblocotxt}>Email: urban_parceirias@teste.com</div>
                            </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}