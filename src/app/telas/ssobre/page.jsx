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
                                Na Urban - Estética Automotiva, valorizamos a excelência em cada detalhe e estamos profundamente comprometidos com a satisfação total do cliente. Acreditamos firmemente que a qualidade nunca deve ser comprometida, independentemente das circunstâncias. Nossos valores são um reflexo do nosso empenho em entregar resultados impecáveis, com perfeição e atenção minuciosa a cada etapa do processo. Respeitamos profundamente nossos clientes e seus veículos, tratando cada um de forma única e dedicada, sempre buscando superar expectativas. A confiança dos clientes é essencial para nós, e retribuímos com resultados que falam por si, construindo relacionamentos duradouros.
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
                                A Urban - Estética Automotiva nasceu para transformar a estética automotiva, estabelecendo um novo padrão de qualidade e inovação. Com uma paixão inabalável por carros e uma busca constante pela perfeição, enfrentamos desafios que nos impulsionaram a crescer e evoluir, sempre com o objetivo de oferecer serviços excepcionais. Contamos com anos de experiência e formamos uma equipe qualificada que compartilha nossa visão e valores. Hoje, somos uma referência no setor, reconhecidos pela excelência e pela confiança dos nossos clientes. Eles sabem que tratamos seus veículos com o mesmo cuidado e atenção como se fossem nossos próprios carros.
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
                                Na Urban - Estética Automotiva, combinamos nossa paixão por carros com um forte senso de responsabilidade ambiental. Usamos apenas produtos ecológicos e otimizamos recursos como água e energia para minimizar o impacto ambiental em cada etapa do processo. Nosso foco é oferecer serviços de qualidade superior, cuidando dos veículos de nossos clientes com dedicação e do planeta com consciência. Estamos profundamente comprometidos em garantir um futuro mais verde e sustentável, onde a preservação do meio ambiente e a satisfação dos nossos clientes caminhem juntas. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem, ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}