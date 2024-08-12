import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";



export default function Home() {
  return (
    <div className={styles.container}>
      <button className={styles.login}><Link href="https://www.google.com">LOGIN</Link></button>
    </div>
  );
}
