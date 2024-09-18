'use client'

import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
    // Define dois estados: um para controlar a abertura do menu mobile (mobile) e outro para controlar o fechamento com animação (closing)
    const [mobile, setMobile] = useState(false);
    const [closing, setClosing] = useState(false);

    // Função que ativa/desativa o menu mobile
    function ativaMenuMobile() {
        if (mobile === false) {
            // Se o menu não está aberto, abre o menu
            setMobile(true);
        } else {
            // Se o menu está aberto, inicia o processo de fechamento
            setClosing(true);
            setTimeout(() => {
                // Após 300ms (tempo da animação), fecha completamente o menu e reseta o estado de fechamento
                setMobile(false);
                setClosing(false);
            }, 300); // Tempo da animação de fechamento
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.containerNav}>
                <div className={styles.menu}>
                    <span className={styles.logo}></span>
                    <nav className={styles.navbar}>
                        <ul className={styles.navlist}>
                            <li><Link href="/" className={styles.linkNav}>Home</Link></li>
                            <li><Link href="/telas/sobre" className={styles.linkNav}>Sobre</Link></li>
                            <li><Link href="/telas/servicos" className={styles.linkNav}>Serviços</Link></li>
                            <li><Link href="/telas/contatos" className={styles.linkNav}>Contato</Link></li>
                            <li><Link href="/telas/login" className={styles.linkNav}>Login</Link></li>
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

                {/* Exibe o fundo de opacidade preta se o menu mobile estiver ativo e não estiver fechando */}
                {mobile && !closing && (
                    <div className={styles.menuBackground} onClick={() => ativaMenuMobile()}></div>
                )}

                {/* Renderiza o menu mobile com diferentes classes de estilo dependendo se está abrindo, fechando, ou oculto */}
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
                        <Link href="/telas/sobre" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Sobre</Link>
                        <Link href="/telas/contatos" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Contato</Link>
                        <Link href="/telas/login" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Login</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
