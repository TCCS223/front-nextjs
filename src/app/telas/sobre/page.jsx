import styles from './page.module.css';
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
                            <p className={styles.description}>
                            Na Urban - Estética Automotiva, nossa missão é transformar cada veículo em uma obra-prima, refletindo o cuidado que cada proprietário dedica ao seu carro. Nossa paixão por automóveis nos leva a oferecer serviços de alta qualidade, utilizando as melhores técnicas e produtos do mercado. Mais do que polir ou lavar, buscamos realçar a personalidade de cada veículo, preservando sua essência e garantindo que cada cliente sinta orgulho ao ver seu carro sair de nossas instalações. Acreditamos que o carro de um cliente é uma extensão de sua identidade, e nossa missão é cuidar dessa identidade com o respeito que ela merece.Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className={styles.image1}></div>
                </section>

                <hr className={styles.line} />

                <section className={styles.sectionTwo}>
                    <div className={styles.image2}></div>
                    <div className={styles.container}>
                        <div className={styles.containerTitle2}>
                            <p className={styles.title2}>Nossos Valores</p>
                            <div className={styles.hr}></div>
                        </div>
                        <div className={styles.containerText2}>
                            <p className={styles.description}>
                            Na Urban - Estética Automotiva, valorizamos a excelência em cada detalhe e estamos profundamente comprometidos com a satisfação total do cliente. Acreditamos firmemente que a qualidade nunca deve ser comprometida, independentemente das circunstâncias. Nossos valores são um reflexo do nosso empenho em entregar resultados impecáveis, com perfeição e atenção minuciosa a cada etapa do processo. Respeitamos profundamente nossos clientes e seus veículos, tratando cada um de forma única e dedicada, sempre buscando superar expectativas. A confiança dos clientes é essencial para nós, e retribuímos com resultados que falam por si, construindo relacionamentos duradouros.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className={styles.line} />

                <section className={styles.sectionThree}>
                    <div className={styles.container}>
                        <div className={styles.containerTitle}>
                            <p className={styles.title}>Nossa História</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.containerText}>
                            <p className={styles.description}>
                            A Urban - Estética Automotiva nasceu para transformar a estética automotiva, estabelecendo um novo padrão de qualidade e inovação. Com uma paixão inabalável por carros e uma busca constante pela perfeição, enfrentamos desafios que nos impulsionaram a crescer e evoluir, sempre com o objetivo de oferecer serviços excepcionais. Contamos com anos de experiência e formamos uma equipe qualificada que compartilha nossa visão e valores. Hoje, somos uma referência no setor, reconhecidos pela excelência e pela confiança dos nossos clientes. Eles sabem que tratamos seus veículos com o mesmo cuidado e atenção como se fossem nossos próprios carros.
                            </p>
                        </div>
                    </div>
                    <div className={styles.image3}></div>
                </section>

                <hr className={styles.line} />

                <section className={styles.sectionFour}>
                    <div className={styles.image4}></div>
                    <div className={styles.container}>
                        <div className={styles.containerTitle2}>
                            <p className={styles.title2}>Nosso Compromisso</p>
                            <hr className={styles.hr} />
                        </div>
                        <div className={styles.containerText2}>
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