import Image from "next/image";
import styles from "./page.module.css";

export default function Cadastro() {
  return (
    <div className={styles.container}>
      <button className={styles.cadastro}>Cadastrar</button>
    </div>
  );
}
