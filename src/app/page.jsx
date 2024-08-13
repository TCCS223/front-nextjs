import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";



export default function Home() {
  return (
    <div className={styles.container}>
      <button className={styles.login}><Link href="/cadastro">LOGIN</Link></button>
      
      
    </div>
  );
}
