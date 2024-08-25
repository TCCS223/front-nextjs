'use client'

import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
    const [mobile, setMobile] = useState(false);
    const [closing, setClosing] = useState(false);

    function ativaMenuMobile() {
        if (mobile === false) {
            setMobile(true);
        } else {
            setClosing(true);
            setTimeout(() => {
                setMobile(false);
                setClosing(false);
            }, 300); // Tempo da animação de fechamento
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.containerNav}>
                <div className={styles.menu}>
                    <span className={styles.logo}>Logo</span>
                    <nav className={styles.navbar}>
                        <ul className={styles.navlist}>
                            <li><Link href="/" className={styles.linkNav}>Home</Link></li>
                            <li><Link href="/telas/sobrenos" className={styles.linkNav}>Sobre</Link></li>
                            <li><Link href="#" className={styles.linkNav}>Contato</Link></li>
                            <li><Link href="/telas/admin" className={styles.linkNav}>Login</Link></li>
                        </ul>
                    </nav>
                    <div className={styles.menuMobile} onClick={ativaMenuMobile}>
                        <Image
                            src={'/icons/menuMobile.svg'}
                            width={32}
                            height={32}
                            alt='icon menu'
                        ></Image>
                    </div>
                </div>

                {mobile && !closing && (
                    <div className={styles.menuBackground} onClick={() => ativaMenuMobile()}></div>
                )}

                <div className={mobile ? (closing ? styles.menuMobileClosing : styles.menuMobileActive) : styles.hidden}>
                    <div className={styles.closeMenu} onClick={() => ativaMenuMobile()}>
                        <Image
                            src={'/icons/closeMenu.svg'}
                            width={32}
                            height={32}
                            alt='icon close'
                        ></Image>
                    </div>
                    <nav className={styles.navlistMobile}>
                        <Link href="/" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Home</Link>
                        <Link href="/telas/sobrenos" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Sobre</Link>
                        <Link href="#" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Contato</Link>
                        <Link href="/telas/admin" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Login</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
