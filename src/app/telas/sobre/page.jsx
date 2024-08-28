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
                <section className={styles.sectionOne}>
                    <div className={styles.container}>
                        <div className={styles.containerTitle}>
                            <p className={styles.title}></p>
                            <hr className={styles.hr} />
                        </div>
                        <p className={styles.containerText}></p>
                    </div>
                    <div className={styles.image}></div>
                </section>

                <section className={styles.sectionTwo}>
                    <div className={styles.image}></div>
                    <div className={styles.container}>
                        <div className={styles.containerTitle2}>
                            <p className={styles.title}></p>
                            <div className={styles.hr}></div>
                        </div>
                        <p className={styles.containerText}></p>
                    </div>
                </section>

                <section className={styles.sectionThree}>
                    <div className={styles.container}>
                        <div className={styles.containerTitle}>
                            <p className={styles.title}></p>
                            <hr className={styles.hr} />
                        </div>
                        <p className={styles.containerText}></p></div>
                    <div className={styles.image}></div>
                </section>
                {/* <div className={styles.faixaBackground}></div>
                <div className={styles.container_sobre}></div> */}

            </main>
            <Footer />
        </div >

    )
}

/*

                    <div className={styles.container_sobre}>
                        <div className={styles.container_texto}>
                            <div className={styles.titulo}>Sobre nós</div>
                            <div className={styles.descricao}>
                                Na URBAN, transformamos carros em verdadeiras obras de arte sobre rodas. Somos uma empresa de estética automotiva dedicada a oferecer serviços de alta qualidade que realçam a beleza e prolongam a vida útil do seu veículo. Com uma equipe experiente e apaixonada por carros, utilizamos as melhores técnicas e produtos para garantir resultados impecáveis. Seu carro merece o melhor, e na URBAN, estamos prontos para cuidar de cada detalhe.
                            </div>

                        </div>

                        <div className={styles.img}></div>
                        <Image
                        src='/imgCarrossel/img2.jpg'
                        width={250}
                        height={160}
                        className={styles.img}
                    />
                    </div>
                    
                            <div className={styles.sectionContainer}> 
                        </div>*/