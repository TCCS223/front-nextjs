'use client'

// components/CarouselComponent.js
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import styles from "./index.module.css";

export default function CarrosselEquipeMobile() {
    return (
        <>
            <div className={styles.carouselWrapperMobile}>
                <h2 className={styles.sectionHeading}>Nossa Equipe</h2>
                <Carousel
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={7000}
                    showStatus={false}
                    emulateTouch={true}
                    className={styles.carouselMobile}
                    renderIndicator={false}
                >
                    <div className={styles.employeeContainerMobile}>
                        <div className={styles.employeeCardMobile}>
                            <Image
                                src='/mecanico.png'
                                alt="Marcos Pereira"
                                width={450}
                                height={450}
                                className={styles.employeeImageMobile}
                            />
                            <h3 className={styles.employeeName}>Leopoldo Henrique</h3>
                            <p className={styles.employeePosition}>Técnico em Eletrônica</p>
                            <p className={styles.employeeDescription}>Especializado em sistemas eletrônicos de veículos.</p>
                        </div>
                    </div>
                    <div className={styles.employeeContainerMobile}>
                        <div className={styles.employeeCardMobile}>
                            <Image
                                src='/mecanico.png'
                                alt="Marcos Pereira"
                                width={450}
                                height={450}
                                className={styles.employeeImageMobile}
                            />
                            <h3 className={styles.employeeName}>Leopoldo Henrique</h3>
                            <p className={styles.employeePosition}>Técnico em Eletrônica</p>
                            <p className={styles.employeeDescription}>Especializado em sistemas eletrônicos de veículos.</p>
                        </div>
                    </div>
                </Carousel>
            </div>
        </>
    );
}
