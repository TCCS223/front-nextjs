'use client';
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPowerSettingsNew } from "react-icons/md";

import styles from "./page.module.css";
import UsuarioVeiculos from "./UsuarioVeiculos/page";
import UsuarioDados from "./UsuarioDados/page";

import FullCalendarGeral from "./agenda/page";

export default function Home() {

    const [tela, setTela] = useState(0);

    const clearLocalStorage = () => {
        localStorage.clear();
    };

    return (
        <div className={styles.grid_container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Painel do Usuário</h1>
                <Link href="/" className={styles.iconPower}><MdPowerSettingsNew className={styles.power} onClick={clearLocalStorage} /></Link>

            </div>
            <div className={styles.sidebar}>
                <button data-target="#meusdados" onClick={() => setTela(1)}>Meus Dados</button>
                <button data-target="#meusveiculos" onClick={() => setTela(2)}>Meus Veículos</button>
                <button data-target="#historico" onClick={() => setTela(4)}>Histórico</button>
                <button data-target="#historico" onClick={() => setTela(5)}>agenda</button>
            </div>
            <div className={styles.main_content}>

                {
                    tela === 1 ?
                        <UsuarioDados />
                        : tela === 2 ?
                            <UsuarioVeiculos />
                            : tela === 3 ?
                                <UsuarioVeiculos  />
                                : tela === 4 ?
                                    <UsuarioDados />
                                    : tela === 5 ?
                                        <FullCalendarGeral /> // trocar pelo histórico
                                        : <></>
                }
            </div>
        </div>
    )
}