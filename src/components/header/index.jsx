'use client' // Indica que este código deve ser executado no cliente (navegador)

import styles from './index.module.css' // Importa as classes CSS do arquivo de estilos
import Link from 'next/link' // Importa o componente Link para navegação entre páginas
import Image from 'next/image' // Importa o componente Image para otimizar o carregamento de imagens
import { useState } from 'react' // Importa o hook useState para gerenciar o estado local do componente

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
                    <span className={styles.logo}></span> {/* Espaço reservado para o logo */}
                    <nav className={styles.navbar}>
                        <ul className={styles.navlist}>
                            {/* Links de navegação principais */}
                            <li><Link href="/telas/cadastro" className={styles.linkNav}>Home</Link></li>
                            {/* <li><Link href="/telas/sobrenos" className={styles.linkNav}>Sobre</Link></li> */}
                            <li><Link href="/telas/sobre" className={styles.linkNav}>Sobre</Link></li>
                            <li><Link href="/telas/contato" className={styles.linkNav}>Contato</Link></li>
                            <li><Link href="/telas/admin" className={styles.linkNav}>Login</Link></li>
                            
                        </ul>
                    </nav>
                    <div className={styles.menuMobile} onClick={ativaMenuMobile}>
                        {/* Ícone do menu mobile */}
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
                        {/* Ícone de fechar o menu mobile */}
                        <Image
                            src={'/icons/closeMenu.svg'}
                            width={32}
                            height={32}
                            alt='icon close'
                        ></Image>
                    </div>
                    <nav className={styles.navlistMobile}>
                        {/* Links de navegação no menu mobile */}
                        <Link href="/" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Home</Link>
                        <Link href="/telas/sobre" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Sobre</Link>
                        <Link href="/telas/contato" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Contato</Link>
                        <Link href="/telas/admin" className={styles.linkNavMobile} onClick={() => ativaMenuMobile()}>Login</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
