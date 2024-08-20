import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function Sobre() {
    return (
        <div>
            <Header />

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.container_sobre}>
                        <div className={styles.titulosobre}>Quem somos nós?</div>

                        <div className={styles.bloco1}>

                            Bem-vindo à Urban, sua parceira de confiança na transformação e cuidado estético de veículos. Com uma paixão inigualável por automóveis e um compromisso inabalável com a excelência, nossa missão é revitalizar, proteger e realçar a beleza do seu carro, proporcionando uma experiência de qualidade que vai além das suas expectativas.

                        </div>

                        <div className={styles.bloco2}>

                            Nossa equipe é composta por profissionais altamente qualificados e dedicados, com anos de experiência em estética automotiva. Utilizamos técnicas de ponta e os melhores produtos do mercado para garantir que cada detalhe do seu veículo receba o cuidado que merece. Desde o polimento e cristalização da pintura até a higienização interna completa, tratamos cada carro como se fosse o nosso.

                        </div>

                        <div className={styles.bloco3}>
                            Na Urban, acreditamos que o seu carro é mais do que um meio de transporte – é uma extensão da sua personalidade e estilo de vida. Por isso, nos empenhamos em oferecer serviços personalizados que atendam às necessidades específicas de cada cliente, garantindo que você saia satisfeito e com seu veículo em perfeito estado.
                        </div>

                        <div className={styles.bloco4}>
                        Estamos localizados em Tupã-SP, e atendemos toda a região com um serviço rápido, eficiente e, acima de tudo, feito com muito carinho. Venha nos visitar e descubra como podemos transformar o seu carro, tornando-o mais belo, protegido e valorizado.
                        </div>




                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}