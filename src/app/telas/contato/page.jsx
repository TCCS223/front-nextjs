import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function Contato() {
    return (
        <div>
            <Header />
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
                            <div className={styles.localmapa}>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1100.2840817834017!2d-50.52772093878624!3d-21.93840469647665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9495b7e39ba13817%3A0xf46b63b9addcc184!2sEscola%20T%C3%A9cnica%20Estadual%20Professor%20Massuyuki%20Kawano%20-%20Tup%C3%A3!5e0!3m2!1spt-BR!2sbr!4v1725049409623!5m2!1spt-BR!2sbr" className={styles.maps}></iframe>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    )
}
