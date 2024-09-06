
'use client'

// components/CarouselComponent.js
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import styles from './index.module.css';

export default function CarrosselInicial() {
    return (
        <div className={styles.carouselWrapper}>
            
            <Carousel
                showArrows={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                transitionTime={1500}
                interval={4000}
                className={styles.carousel}
                showStatus={false}
            // renderIndicator={false}    
            >
                <div className={styles.carrossel}>
                    <Image
                        src='/imgCarrossel/img11.jpg'
                        width={4256}
                        height={2832}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrossel}>
                    <Image
                        src='/imgCarrossel/img2.jpg'
                        width={2000}
                        height={1423}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrossel}>
                    <Image
                        src='/imgCarrossel/img3.jpg'
                        width={2400}
                        height={1522}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrossel}>
                    <Image
                        src='/imgCarrossel/img4.jpg'
                        width={2400}
                        height={1350}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrossel}>
                    <Image
                        src='/motorcycle.jpg'
                        width={1500}
                        height={1200}
                        className={styles.testeImg}
                    />
                </div>
            </Carousel>
        </div>
    )
}