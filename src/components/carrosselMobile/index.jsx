
'use client'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import styles from './index.module.css';

export default function CarrosselMobile() {
    return (
        <div className={styles.carouselWrapper}>
            <Carousel
                showArrows={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={4000}
                className={styles.carousel}
                showStatus={false}
            // renderIndicator={false}    
            >
                <div className={styles.carrosselMobile}>
                    <Image
                        src='/imgCarrossel/img1m.jpg'
                        width={4256}
                        height={2832}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrosselMobile}>
                    <Image
                        src='/imgCarrossel/img2m.jpg'
                        width={2000}
                        height={1423}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrosselMobile}>
                    <Image
                        src='/imgCarrossel/img3m.jpg'
                        width={2400}
                        height={1522}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrosselMobile}>
                    <Image
                        src='/imgCarrossel/img4m.jpg'
                        width={2400}
                        height={1350}
                        className={styles.testeImg}
                    />
                </div>
                <div className={styles.carrosselMobile}>
                    <Image
                        src='/imgCarrossel/img5m.jpg'
                        width={2400}
                        height={1600}
                        className={styles.testeImg}
                    />
                </div>
            </Carousel>
        </div>
    )
}