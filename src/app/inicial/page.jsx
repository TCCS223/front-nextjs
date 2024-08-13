import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>Logo</div>
                <nav className={styles.nav}>
                    <ul className={styles.navlist}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Sobre</a></li>
                        <li><a href="#">Contato</a></li>
                        <li className={styles.dropdown}>
                            <Image 
                                src={'menuham.png'}
                                alt={"Menu"}
                                width={24} 
                                height={24} 
                                unoptimized={true}
                                className={styles.menuIcon}
                            />
                            <ul className={styles.dropdownmenu}>
                                <li><a href="#">Desenvolvimento Web</a></li>
                                <li><a href="#">Design Gráfico</a></li>
                                <li><a href="#">Marketing Digital</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

        <main className={styles.main}>
            {/* Seção 1 */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Seção 1</h2>
                <p className={styles.sectionContent}>
                    Conteúdo da primeira seção. Aqui você pode adicionar texto, imagens, ou outros elementos.
                </p>
            </section>

            {/* Seção 2 */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Seção 2</h2>
                <p className={styles.sectionContent}>
                    Conteúdo da segunda seção. Personalize conforme necessário.
                </p>
            </section>

            {/* Seção 3 */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Seção 3</h2>
                <p className={styles.sectionContent}>
                    Conteúdo da terceira seção. Adicione qualquer elemento que você desejar.
                </p>
            </section>
        </main>
            

            <footer>
                <div className={styles.footerContainer}>
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
                            <Link href="#SERVICOS" className={styles.footerLink}>
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
                </div>
            </footer>




        </div>
    );
}
