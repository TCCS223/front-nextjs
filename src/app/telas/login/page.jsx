import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body >
        <div className={styles.backgroundform}>
          <div className={styles.geral}>
            <div className={styles.login}>
              <div className={styles.logo}>
                <Image
                  src={'LOGO.png'}
                  width={240}
                  height={50}
                  alt={"logo"}
                  unoptimized={true}
                />
              </div>
              <div className={styles.email_login}>
                <span className={styles.icone_email}></span>
                <input className={styles.input} type="email" name="email" placeholder="Email" />
              </div>

              <div className={styles.senha_login}>
                <span className={styles.icone_senha}></span>
                <input className={styles.input} type="password" name="senha" placeholder="Senha" />
              </div>

              <Link href="./admin">
                {/* <button className={styles.button} type="submit">ADMIN</button> */}
                <button type="submit">ADMIN</button>
              </Link>

              <Link href="">
                {/* <button className={styles.button} type="submit">USUARIO</button> */}
                <button type="submit">USUARIO</button>
              </Link>

              <span className={styles.link_cadastro}>
                Não tem uma conta? Inscrever-se no
                <Link href={'./cadastro'} className={styles.link}>&nbsp;&nbsp;URBAN</Link>
              </span>
            </div>

            <div className={styles.imagemform}></div>

          </div>
        </div>

        <Link href={"/"}>voltar</Link>

      </body>
    </html>
  );
}