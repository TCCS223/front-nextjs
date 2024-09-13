import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

export default function UsuarioVeiculos() {
    return (
        <div className={styles.container}>

            <ol className={styles.fundocards}>

                <li className={styles.lista}>
                    <div className={styles.icone}><span className={styles.iconeCarro}></span></div>

                    {/* retornar da api */}
                    <div className={styles.content}>
                        <span className={styles.placa}>PLA-4884</span>
                        <span className={styles.marca}>Mercedes</span>
                        <span className={styles.modelo}>Z-4</span>
                    </div>
                </li>
                <li className={styles.lista}>
                    <span className={styles.placa}>Placa</span>
                    <span className={styles.marca}>Marca</span>
                    <span className={styles.modelo}>Modelo</span>
                </li>
                {/* <div className={styles.card1}>
            
            </div>
            <div className={styles.card1}>
            
            </div> */}
            </ol>
        </div>
    )
}