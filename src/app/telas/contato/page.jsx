import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function Contato() {
    return (
        <div>
            <Header/>
            <div className={styles.backgroundcontato}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container_contato}>
                        <div className={styles.titulocontato}>Fale conosco</div>
                        <div className={styles.bloco}>
                            <div className={styles.fontblocotituloinicial}>Dúvidas</div>
                            {/* <hr className={styles.hr}> */}
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
                            <div className={styles.fontblocotxt}>Email: urban_parcerias@teste.com</div>
                        </div>
                    </div>
                </section>
            </main>
            </div>
            <Footer />
        </div>
    )
}
