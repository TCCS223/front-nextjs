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
                        <h2 className={styles.sectionTitle1}>Seu carro na melhor performance!</h2>
                        <p className={styles.sectionContent1}>
                            Revele a essência do seu automóvel
                        </p>
                    </section>

                    <div className={styles.divider}></div>

                    {/* Seção 2 */}
                    {/* <section className={styles.section}>
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
                    </section> */}

                    <section className={styles.section2}>
                        <div className={styles.section2Image}>
                            <Image src='/servicomecanico1233.png' alt="Imagem de serviço" width={500} height={520} />
                        </div>
                        <div className={styles.section2Content}>
                            <h2 className={styles.section2Title}>Nossos Serviços</h2>
                            <p className={styles.section2Description}>
                                Oferecemos uma ampla gama de serviços para garantir que seu veículo esteja sempre em ótimo estado.
                                Desde manutenção preventiva até reparos complexos, temos a expertise que você precisa.
                            </p>
                            {/* <div className={styles.section2ButtonContainer}>
                                <input type="checkbox" id="menuToggle" className={styles.section2MenuCheckbox} />
                                <label htmlFor="menuToggle" className={styles.section2Button}>Veja mais</label>
                                <div className={styles.section2DropdownMenu}>
                                    <Link href="" className={styles.section2DropdownLink}>Serviço 1</Link>
                                </div>
                            </div> */}
                            <div>
                                <Link href="/telas/servicos">
                                    <button className={styles.section2Button}>Veja mais</button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <div className={styles.divider}></div>

                    {/* Seção 3 */}

                    <section className={styles.section}>
                        <h2 className={styles.sectionHeading}>Nossa Equipe</h2>
                        <div className={styles.employeeContainer}>
                            <div className={styles.employeeCard}>
                                <Image
                                    src='/mecanico.png'
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
                                    src='/mecanico.png'
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
                                    src='/mecanico.png'
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
                                    src='/mecanico.png'
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


                    <section className={styles.section4}>
                        <p className={styles.title_questions}>Perguntas frequentes</p>
                        <div className={styles.container_questions}>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Preciso agendar um horário para realizar serviços de estética no meu veículo?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    Sim, recomendamos que você agende um horário para garantir que possamos atender seu veículo no melhor momento para você. Entre em contato pelo telefone, site ou aplicativo para agendar.
                                </div>
                            </details>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Quanto tempo leva para realizar um polimento completo no veículo?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    O tempo necessário para realizar um polimento completo pode variar dependendo do estado do veículo e do tipo de acabamento desejado. Em média, o processo leva de 3 a 5 horas.
                                </div>
                            </details>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Quais tipos de serviços de estética automotiva vocês realizam?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    Realizamos uma variedade de serviços de estética automotiva, como lavagem, polimento, enceramento, vitrificação, higienização interna, proteção de pintura, entre outros. Garantimos que seu carro estará sempre com a melhor aparência.
                                </div>
                            </details>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Quais formas de pagamento são aceitas?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    Aceitamos pagamentos em dinheiro, cartões de crédito e débito, e transferência bancária. Também trabalhamos com algumas opções de parcelamento, consulte nossa equipe para mais detalhes.
                                </div>
                            </details>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Vocês oferecem serviços de proteção de pintura?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    Sim, oferecemos diversos tipos de proteção de pintura, incluindo vitrificação, aplicação de cera e selante. Esses serviços ajudam a preservar a cor e o brilho do seu veículo por mais tempo.
                                </div>
                            </details>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Como posso agendar um serviço de estética automotiva?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    Para agendar um serviço de estética automotiva, entre em contato conosco por telefone, ou acesse nosso site ou aplicativo. Nossa equipe estará pronta para ajudar a escolher o melhor horário para você.
                                </div>
                            </details>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Qual é a frequência recomendada para serviços de lavagem e manutenção estética?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    Recomendamos realizar a lavagem e manutenção estética do veículo pelo menos uma vez por mês para manter a pintura e o interior em excelente estado. A frequência pode variar conforme o uso e as condições ambientais.
                                </div>
                            </details>

                            <details class={styles.details}>
                                <summary class={styles.summary}>
                                    <div class={styles.summary_content}>
                                        Qual é o horário de funcionamento da oficina?
                                    </div>
                                    <span className={styles.arrow_down}></span>
                                </summary>
                                <div class={styles.description}>
                                    Nossa oficina funciona de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 13h. Não abrimos aos domingos e feriados.
                                </div>
                            </details>

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
                    </div>
                </footer>
            </body>
        </html >
    );
}
