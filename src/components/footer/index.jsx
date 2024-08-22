import styles from './index.module.css'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerIcons}>

                    <span className={styles.footerLogo}></span>

                    <div className={styles.footerSocialIcons}>
                        <Link href={'https://instagram.com'}>
                            <span className={styles.iconInstagram}></span>
                        </Link>
                        <Link href={'https://whatsapp.com'}>
                            <span className={styles.iconWhatsapp}></span>
                        </Link>
                        <Link href={'https://facebook.com'}>
                            <span className={styles.iconFacebook}></span>
                        </Link>
                        <Link href={'https://youtube.com'}>
                            <span className={styles.iconYoutube}></span>
                        </Link>
                    </div>
                </div>

                <div className={styles.footerAddress}>

                    {/* <h2 className={styles.footerContact}>Contato</h2> */}

          
                        <div className={styles.phone}>
                            <span className={styles.iconPhone}></span>
                            <div className={styles.infoPhone}>
                                <div className={styles.titlePhone}>Telefone</div>
                                <div className={styles.numberPhone}>(99) 9999-9999</div>
                            </div>
                        </div>

                        <div className={styles.tell}>
                            <span className={styles.iconTell}></span>
                            <div className={styles.infoTell}>
                                <div className={styles.titleTell}>Telefone</div>
                                <div className={styles.numberTell}>(99) 9999-9999</div>
                            </div>
                        </div>

                        <div className={styles.email}>
                            <span className={styles.iconEmail}></span>
                            <div className={styles.infoEmail}>
                                <div className={styles.titleEmail}>Email</div>
                                <div className={styles.addressEmail}>urban@teste.com</div>
                            </div>
                        </div>

                        <div className={styles.address}>
                            <span className={styles.iconAddress}></span>
                            <div className={styles.infoAddress}>
                                <div className={styles.titleAddress}>Endereço</div>
                                <div className={styles.localizationEmail}>Av. Massuyuki, 22 / Tupã-SP</div>
                            </div>
                        </div>
                    
                </div>

                <div className={styles.footerLicense}>
                    <span className={styles.copyright}>Urban © 2024 / Todos os direitos reservados</span>
                    <Link href="#" className={styles.footerTerms}>Termos & Políticas</Link>
                </div>
            </div>
        </footer >
    )
}





 {/* <div className={styles.footerLinks}>

                    <h2 className={styles.footerHeading}>Links de navegação</h2>

                    <div className={styles.footerLinksNavigation}>
                        <Link href="#HOME" className={styles.footerLink}>
                            <span class={styles.arrowLink}></span>Início
                        </Link>

                        <Link href="#HOME" className={styles.footerLink}>
                            <span class={styles.arrowLink}></span>Serviços
                        </Link>

                        <Link href="#HOME" className={styles.footerLink}>
                            <span class={styles.arrowLink}></span>Sobre Nós
                        </Link>

                        <Link href="#HOME" className={styles.footerLink}>
                            <span class={styles.arrowLink}></span>Contato
                        </Link>

                        <Link href="#HOME" className={styles.footerLink}>
                            <span class={styles.arrowLink}></span>Login
                        </Link>
                    </div>
                </div> */}