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
            <div className={styles.cadastro}>
              <div className={styles.logo}>
                <Image
                  src={'LOGO.png'}
                  width={240}
                  height={50}
                  alt={"logo"}
                  unoptimized={true}
                />
              </div>

              <div className={styles.nome_cadastro}>
                <span className={styles.icone_nome}></span>
                <input className={styles.input} type="text" name="nome" placeholder="Nome" />
              </div>

              <div className={styles.cpf_cadastro}>
                <span className={styles.icone_cpf}></span>
                <input className={styles.input} type="text" inputmode="numeric" name="cpf" placeholder="CPF" />
              </div>

              <div className={styles.telefone_cadastro}>
                <span className={styles.icone_telefone}></span>
                <input className={styles.input} type="text" name="telefone" placeholder="Telefone" />
              </div>

              <div className={styles.email_cadastro}>
                <span className={styles.icone_email}></span>
                <input className={styles.input} type="email" name="email" placeholder="Email" />
              </div>

              <div className={styles.senha_cadastro}>
                <span className={styles.icone_senha}></span>
                <input className={styles.input} type="password" name="senha" placeholder="Senha" />
              </div>

              <button className={styles.button} type="submit">CADASTRAR</button>

            </div>

            <div className={styles.imagemform}>
            </div>
          </div>
        </div>

        <Link href={"/"}>voltar</Link>

      </body>
    </html>
  );
}
