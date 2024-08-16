import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';



export default function VerticalTabs() {
  return (
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
                src={'/menuham.png'}
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
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.tabsContainer}>
              <input type="radio" id="tab1" name="tabs" className={styles.input} defaultChecked />
              <label htmlFor="tab1" className={styles.tab}>Troca de Óleo e Filtro</label>
              <div className={styles.content}>
                <Image
                  src={'/trocadeoleo1.png'}
                  alt={"Troca de Óleo"}
                  width={300}
                  height={300}
                  unoptimized={true}
                />
                <p>A troca de óleo e filtro é essencial para manter o motor do veículo funcionando suavemente. O óleo lubrifica as partes móveis do motor, reduzindo o desgaste e a fricção. O filtro de óleo remove impurezas do óleo para garantir que apenas óleo limpo circule pelo motor, aumentando sua vida útil e desempenho.
                </p>
              </div>

              <input type="radio" id="tab2" name="tabs" className={styles.input} />
              <label htmlFor="tab2" className={styles.tab}>Alinhamento e Balanceamento</label>
              <div className={styles.content}>
                <Image
                  src={'/alinhamentocarro.png'}
                  alt={"Alinhamento e Balanceamento"}
                  width={320}
                  height={320}
                  unoptimized={true}
                />
                <p>O alinhamento e balanceamento das rodas são fundamentais para garantir a segurança e o conforto ao dirigir. O alinhamento corrige a direção das rodas para que estejam paralelas entre si e perpendiculares ao solo, enquanto o balanceamento assegura que as rodas girem sem causar vibrações. Esses serviços prolongam a vida útil dos pneus e melhoram a dirigibilidade do veículo.</p>
              </div>

              <input type="radio" id="tab3" name="tabs" className={styles.input} />
              <label htmlFor="tab3" className={styles.tab}>Revisão de freios</label>
              <div className={styles.content}>
                <Image
                  src={'/revisaodefreio.png'}
                  alt={"Revisão de freios"}
                  width={300}
                  height={300}
                  unoptimized={true}
                />
                <p> A revisão de freios é crucial para a segurança do veículo. Esse serviço envolve a inspeção e substituição de componentes como pastilhas, discos, fluido de freio e outras partes do sistema de frenagem. Freios bem mantidos garantem uma resposta rápida e eficaz em situações de emergência.</p>
              </div>

              <input type="radio" id="tab4" name="tabs" className={styles.input} />
              <label htmlFor="tab4" className={styles.tab}>Inspeção e Substituição de Baterias</label>
              <div className={styles.content}>
                <Image
                  src={'/bateriatrocar.png'}
                  alt={"Substituição de Baterias"}
                  width={500}
                  height={310}
                  unoptimized={true}
                />
                <p>A bateria é responsável por fornecer a energia necessária para dar partida no motor e alimentar os sistemas elétricos do veículo. A inspeção regular da bateria inclui a verificação de sua carga, terminais e estado geral. Quando necessário, a substituição da bateria garante que o veículo tenha sempre a energia necessária para funcionar corretamente e evita problemas de partida e falhas elétricas.</p>
              </div>

              <input type="radio" id="tab5" name="tabs" className={styles.input} />
              <label htmlFor="tab5" className={styles.tab}>Manutenção da Suspensão</label>
              <div className={styles.content}>
                <Image
                  src={'/suspensao.png'}
                  alt={"Manutenção da Suspensão"}
                  width={300}
                  height={300}
                  unoptimized={true}
                />
                <p>A suspensão do veículo absorve os impactos da estrada e mantém o controle e a estabilidade durante a condução. O serviço de manutenção da suspensão inclui a inspeção e substituição de amortecedores, molas e outros componentes. Um sistema de suspensão bem mantido proporciona uma condução mais suave e segura.</p>
              </div>

              <input type="radio" id="tab6" name="tabs" className={styles.input} />
              <label htmlFor="tab6" className={styles.tab}>Diagnóstico Eletrônico</label>
              <div className={styles.content}>
                <Image
                  src={'/revisaoeletronica.png'}
                  alt={"Diagnóstico Eletrônico"}
                  width={400}
                  height={300}
                  unoptimized={true}
                />
                <p>O diagnóstico eletrônico é um serviço que utiliza equipamentos modernos para verificar o sistema eletrônico do veículo. Ele permite a identificação de falhas no motor, sistema de injeção, ABS, entre outros. Esse serviço é essencial para detectar e corrigir problemas antes que se tornem graves, garantindo a eficiência e confiabilidade do veículo.</p>
              </div>
            </div>
            <Link href="/" className={styles.backButton}>
            Voltar
          </Link>
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
              <Link href="/" className={styles.footerLink}>
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

  );
}
