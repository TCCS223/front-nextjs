import styles from './index.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.containerNav}>
                <div className={styles.menu}>
                    <div className={styles.logo}>Logo</div>
                    <div className={styles.navbar}>
                        <ul className={styles.navlist}>
                            <li><Link href="/" className={styles.linkNav}>Home</Link></li>
                            <li><Link href="/telas/sobrenos" className={styles.linkNav}>Sobre</Link></li>
                            <li><Link href="#" className={styles.linkNav}>Contato</Link></li>
                            {/* <li><Link href="/app/telas/cadastro" className={styles.linkNav}>Cadastro</Link></li> */}
                            <li><Link href="/telas/admin" className={styles.linkNav}>Login</Link></li>
                        </ul>
                        <div className={styles.menuMobile}>
                            <Image
                                src={'/icons/menuMobile.svg'}
                                width={32}
                                height={32}
                                alt='icon menu'
                            ></Image>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}





/*<li className={styles.dropdown}>
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
                    
                    
                    .dropdown {
  position: relative;
  display: flex;
  align-items: center;

}

.menuIcon {
  cursor: pointer;
  display: inline-block;
  width: 1.5rem;

  height: 1.7rem;

}

.dropdownmenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f8f9fa;
  padding: 10px 0;
  list-style: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdownmenu a {
  display: block;
  padding: 10px 15px;
  color: #333;
}

.dropdownmenu a:hover {
  background-color: #e9ecef;
}

.dropdown:hover .dropdownmenu {
  display: block;
}

@media (max-width: 768px) {
  .navlist {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .dropdownmenu {
    position: static;
    box-shadow: none;
    z-index: 7;
  }
}
                    */