// import Image from 'next/image'

import styles from './page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';

export default function Sobre() {
    return (
        <div>
            <Header />
            <main className={styles.main}>
                <section className={styles.sectionOne}>
                    <div className={styles.textContainer}>
                        <div className={styles.containerTitle_left}>
                            <p className={styles.title_left}>Nossa Missão</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.container_left}>
                            <p className={styles.description}>
                            Na Urban - Estética Automotiva, nossa missão é transformar cada veículo, refletindo o cuidado e a dedicação do proprietário. Oferecemos serviços de alta qualidade, utilizando as melhores técnicas e produtos disponíveis no mercado. Buscamos realçar a personalidade única de cada veículo, garantindo que o cliente sinta orgulho e satisfação ao ver seu carro sair de nossas instalações.
                            </p>
                        </div>
                    </div>

                    <div className={styles.imageContainer}>
                        <Image
                            src={"/imgCarrossel/img2.jpg"}
                            alt={"imagem"}
                            width={2000}
                            height={1424}
                            className={styles.imagemProduto}
                        />
                    </div>
                </section>

                <hr className={styles.line} />

                <section className={styles.sectionTwo}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={"/imgCarrossel/img3m.jpg"}
                            alt={"imagem"}
                            width={1920}
                            height={2880}
                            className={styles.imagemProduto}
                        />
                    </div>

                    <div className={styles.textContainer}>
                        <div className={styles.containerTitle_right}>
                            <p className={styles.title_right}>Nossos Valores</p>
                            <div className={styles.hr}></div>
                        </div>
                        <div className={styles.container_right}>
                            <p className={styles.description}>
                            Na Urban - Estética Automotiva, priorizamos a excelência em cada detalhe e a plena satisfação do cliente. Acreditamos que a qualidade é inegociável. Tratamos cada veículo com dedicação única, buscando sempre superar expectativas. A confiança dos clientes é fundamental, e nossos resultados impecáveis falam por si, fortalecendo relacionamentos duradouros.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className={styles.line} />

                <section className={styles.sectionThree}>
                    <div className={styles.textContainer}>
                        <div className={styles.containerTitle_left}>
                            <p className={styles.title_left}>Nossa História</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.container_left}>
                            <p className={styles.description}>
                            A Urban - Estética Automotiva redefine a estética automotiva com qualidade e inovação. Apaixonados por carros e comprometidos com a perfeição, superamos desafios para oferecer serviços excepcionais. Com anos de experiência e uma equipe dedicada, somos referência no setor, reconhecidos pela excelência e confiança de nossos clientes, cuidando de seus veículos como se fossem nossos.
                            </p>
                        </div>
                    </div>

                    <div className={styles.imageContainer}>
                        <Image
                            src={"/imgCarrossel/img5m.jpg"}
                            alt={"imagem"}
                            width={2848}
                            height={4272}
                            className={styles.imagemProduto}
                        />
                    </div>
                </section>

                <hr className={styles.line} />

                <section className={styles.sectionFour}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={"/imgCarrossel/img5.jpg"}
                            alt={"imagem"}
                            width={2400}
                            height={1600}
                            className={styles.imagemProduto}
                        />
                    </div>
                    <div className={styles.textContainer}>
                        <div className={styles.containerTitle_right}>
                            <p className={styles.title_right}>Nossos Compromissos</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.container_right}>
                            <p className={styles.description}>
                            Na Urban - Estética Automotiva, unimos nossa paixão por carros com responsabilidade ambiental. Utilizamos produtos ecológicos e otimizamos recursos como água e energia para reduzir o impacto ambiental. Comprometidos com um futuro sustentável, oferecemos serviços de qualidade, cuidando dos veículos de nossos clientes e preservando o planeta com consciência.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}