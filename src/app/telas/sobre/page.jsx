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
                            <p className={styles.title}>Nossa Missão</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.containerText}>
                            <p className={styles.description}>Na Urban - Estética Automotiva, nossa missão é transformar cada veículo em uma obra-prima. Trabalhamos com paixão para oferecer serviços de alta qualidade, garantindo que cada cliente sinta orgulho do seu carro ao sair de nossas instalações.</p>
                        </div>
                    </div>
                    <div className={styles.image}></div>
                </section>

                <section className={styles.sectionTwo}>
                    <div className={styles.image}></div>
                    <div className={styles.container}>
                        <div className={styles.containerTitle2}>
                            <p className={styles.title2}>Nossos Valores</p>
                            <div className={styles.hr}></div>
                        </div>
                        <div className={styles.containerText}>
                            <p className={styles.description}>Valorizamos a excelência, a integridade e o compromisso com a satisfação do cliente. Acreditamos que cada detalhe faz a diferença e nos empenhamos para entregar resultados impecáveis, sempre superando as expectativas.</p>
                        </div>
                    </div>
                </section>

                <section className={styles.sectionThree}>
                    <div className={styles.container}>
                        <div className={styles.containerTitle}>
                            <p className={styles.title}>Nossa História</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.containerText}>
                            <p className={styles.description}>Fundada com o objetivo de redefinir o conceito de estética automotiva, a Urban nasceu da paixão por carros e pela busca incessante pela perfeição. Com anos de experiência e uma equipe altamente qualificada, nos tornamos referência no mercado.</p>
                        </div>
                    </div>
                    <div className={styles.image}></div>
                </section>

                <section className={styles.sectionFour}>
                    <div className={styles.image}></div>
                    <div className={styles.container}>
                        <div className={styles.containerTitle2}>
                            <p className={styles.title2}>Nosso Compromisso</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.containerText}>
                            <p className={styles.description}>Na Urban - Estética Automotiva, acreditamos que é possível unir paixão por carros com responsabilidade ambiental. Implementamos práticas sustentáveis em nossos processos, desde o uso de produtos ecológicos até a gestão eficiente de recursos. Nosso objetivo é cuidar dos veículos e do meio ambiente simultaneamente, garantindo um futuro mais verde para todos.</p>
                        </div>
                    </div>
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