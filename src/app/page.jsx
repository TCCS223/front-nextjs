import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <html>
            <body>


                <header className={styles.header}>
                    <div className={styles.logo}>Logo</div>
                    <nav className={styles.nav}>
                        <ul className={styles.navlist}>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Sobre</a></li>
                            <li><a href="#">Contato</a></li>
                            <li><Link href="/telas/cadastro" className={styles.qualqueruma}>Cadastro</Link></li>
                            <li><Link href="/telas/login" className={styles.qualqueruma}>Login</Link></li>
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
                        <h2 className={styles.sectionTitle1}>Seu carro na melhor perfomance.</h2>
                        <p className={styles.sectionContent1}>
                            Revele a essência do seu automóvel!
                        </p>
                    </section>

                    {/* Seção 2 */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionHeading}>Nossos Serviços</h2>
                        <div className={styles.cardContainer}>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Troca de Óleo</h3>
                                <p className={styles.cardDescription}>Serviço completo de troca de óleo para garantir o melhor desempenho do seu motor.</p>
                            </div>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Alinhamento e Balanceamento</h3>
                                <p className={styles.cardDescription}>Correção da geometria das rodas para uma condução mais segura e confortável.</p>
                            </div>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Revisão Geral</h3>
                                <p className={styles.cardDescription}>Inspeção completa do veículo para identificar e resolver problemas potenciais.</p>
                            </div>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Troca de Pneus</h3>
                                <p className={styles.cardDescription}>Substituição e ajuste dos pneus para uma dirigibilidade mais estável.</p>
                            </div>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Serviços de Freio</h3>
                                <p className={styles.cardDescription}>Manutenção e reparo do sistema de freios para uma segurança garantida.</p>
                            </div>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>Diagnóstico Eletrônico</h3>
                                <p className={styles.cardDescription}>Identificação precisa de falhas no sistema eletrônico do veículo.</p>
                            </div>
                        </div>
                    </section>

                    {/* Seção 3 */}

                    <section className={styles.section}>
                        <h2 className={styles.sectionHeading}>Nossa Equipe</h2>
                        <div className={styles.employeeContainer}>
                            <div className={styles.employeeCard}>
                                <Image
                                    src='/mecanico1.png'
                                    alt="Carlos Silva"
                                    width={150}
                                    height={150}
                                    className={styles.employeeImage}
                                />
                                <h3 className={styles.employeeName}>Carlos Silva</h3>
                                <p className={styles.employeePosition}>Mecânico Chefe</p>
                                <p className={styles.employeeDescription}>Especialista em diagnósticos complexos e com 15 anos de experiência.</p>
                            </div>
                            <div className={styles.employeeCard}>
                                <Image
                                    src='/mecanico1.png'
                                    alt="Carlos Silva"
                                    width={150}
                                    height={150}
                                    className={styles.employeeImage}
                                />
                                <h3 className={styles.employeeName}>Ana Costa</h3>
                                <p className={styles.employeePosition}>Consultora de Serviços</p>
                                <p className={styles.employeeDescription}>Responsável pelo atendimento ao cliente e orçamentos.</p>
                            </div>
                            <div className={styles.employeeCard}>
                                <Image
                                    src='/mecanico1.png'
                                    alt="Carlos Silva"
                                    width={150}
                                    height={150}
                                    className={styles.employeeImage}
                                />
                                <h3 className={styles.employeeName}>Marcos Pereira</h3>
                                <p className={styles.employeePosition}>Técnico em Eletrônica</p>
                                <p className={styles.employeeDescription}>Especializado em sistemas eletrônicos de veículos.</p>
                            </div>
                            <div className={styles.employeeCard}>
                                <Image
                                    src='/mecanico1.png'
                                    alt="Carlos Silva"
                                    width={150}
                                    height={150}
                                    className={styles.employeeImage}
                                />
                                <h3 className={styles.employeeName}>João Lima</h3>
                                <p className={styles.employeePosition}>Assistente de Oficina</p>
                                <p className={styles.employeeDescription}>Auxilia nos serviços gerais e manutenção preventiva.</p>
                            </div>
                        </div>
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
            </body>
        </html>
    );
}
