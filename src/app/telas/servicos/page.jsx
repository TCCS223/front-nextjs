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
        <div className={styles.containerservicos}>
          <h2 className={styles.titleservicos}>Vertical Tabs</h2>
          <div className={styles.tabs}>
            <input type="radio" id="tab1" name="tab" defaultChecked />
            <label htmlFor="tab1" className={styles.tabLabel}>Tab 1</label>
            <div className={styles.tabContent}>
              <p>Welcome to our wonderful world...</p>
            </div>

            <input type="radio" id="tab2" name="tab" />
            <label htmlFor="tab2" className={styles.tabLabel}>Tab 2</label>
            <div className={styles.tabContent}>
              <p>More amazing content...</p>
            </div>

            <input type="radio" id="tab3" name="tab" />
            <label htmlFor="tab3" className={styles.tabLabel}>Tab 3</label>
            <div className={styles.tabContent}>
              <p>Even more interesting content...</p>
            </div>

            <input type="radio" id="tab4" name="tab" />
            <label htmlFor="tab4" className={styles.tabLabel}>Tab 4</label>
            <div className={styles.tabContent}>
              <p>More cool stuff...</p>
            </div>

            <input type="radio" id="tab5" name="tab" />
            <label htmlFor="tab5" className={styles.tabLabel}>Tab 5</label>
            <div className={styles.tabContent}>
              <p>Last bit of content...</p>
            </div>
          </div>
        </div>
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
