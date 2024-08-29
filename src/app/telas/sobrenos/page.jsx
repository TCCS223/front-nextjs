

import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function Sobre() {
    return (

        <div>


            <Header />

            <main className={styles.main}>
                <section className={styles.section}>


                    <div className={styles.faixaBackground}></div>

                    <div className={styles.container_sobre}>
                        <div className={styles.container_texto}>
                            <div className={styles.titulo}>Sobre nós</div>
                            <div className={styles.descricao}>
                                Na URBAN, transformamos carros em verdadeiras obras de arte sobre rodas. Somos uma empresa de estética automotiva dedicada a oferecer serviços de alta qualidade que realçam a beleza e prolongam a vida útil do seu veículo. Com uma equipe experiente e apaixonada por carros, utilizamos as melhores técnicas e produtos para garantir resultados impecáveis. Seu carro merece o melhor, e na URBAN, estamos prontos para cuidar de cada detalhe.
                            </div>

                        </div>

                        <div className={styles.img}>
                            </div>

                    </div>
                    {/*
                            <div className={styles.sectionContainer}> </div>
                        </div> */}



                </section>
            </main>
            <Footer />
        </div>

    )
}