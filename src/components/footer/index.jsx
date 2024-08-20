
import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                teste
            </div>
            {/* <div className={styles.footerContainer}>
                <div className={styles.footerLogoSocial}>
                    <div className={styles.footerLogo}>Urban</div>
                    <div className={styles.footerSocialIcons}>
                        <span className={`${styles.socialIcon} ${styles.facebook}`}></span>
                        <span className={`${styles.socialIcon} ${styles.instagram}`}></span>
                        <span className={`${styles.socialIcon} ${styles.whatsapp}`}></span>
                    </div>
                </div>

                <ul className={styles.footerLinks}>
                    <h2 className={styles.footerHeading}>Links</h2>
                    <li>
                        <Link href="#HOME" className={styles.footerLink}>
                            <span className={styles.icon}></span>Início
                        </Link>
                    </li>
                    <li>
                        <Link href="/telas/servicos" className={styles.footerLink}>
                            <span className={styles.icon}></span>Serviços
                        </Link>
                    </li>
                    <li>
                        <Link href="#GALERIA" className={styles.footerLink}>
                            <span className={styles.icon}></span>Galeria
                        </Link>
                    </li>
                    <li>
                        <Link href="#SOBRENOS" className={styles.footerLink}>
                            <span className={styles.icon}></span>Sobre Nós
                        </Link>
                    </li>
                    <li>
                        <Link href="#CONTATO" className={styles.footerLink}>
                            <span className={styles.icon}></span>Contato
                        </Link>
                    </li>
                </ul>

                <ul className={styles.footerContact}>
                    <h2 className={styles.footerHeading}>Contato</h2>
                    <li>
                        <h3 className={styles.contactTitle}><span className={styles.icon}></span>Telefone</h3>
                        <p className={styles.contactDetail}>(99) 9999-9999</p>
                    </li>
                    <li>
                        <h3 className={styles.contactTitle}><span className={styles.icon}></span>Email</h3>
                        <p className={styles.contactDetail}>urban@gmail.com</p>
                    </li>
                    <li>
                        <h3 className={styles.contactTitle}><span className={styles.icon}></span>Endereço</h3>
                        <p className={styles.contactDetail}>Av. São Cristovão, 22 / Tupã-SP</p>
                    </li>
                </ul>
            </div>
            <div className={styles.footerBottom}>
                <p>Urban © 2024 / Todos os direitos reservados.</p>
                <Link href="#" className={styles.footerTerms}>Termos & Políticas</Link>
            </div> */}
        </footer>
    )
}