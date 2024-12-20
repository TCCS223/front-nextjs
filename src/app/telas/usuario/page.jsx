'use client';
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdPowerSettingsNew } from "react-icons/md";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import UsuarioVeiculos from "./UsuarioVeiculos/page";
import UsuarioDados from "./UsuarioDados/page";
import UsuarioHistorico from "./usuarioHistórico/page";
import FullCalendarGeral from "./agenda/page";

export default function Home() {

    const [tela, setTela] = useState(0);

    const clearLocalStorage = () => {
        localStorage.clear();
        Cookies.remove('token', { path: '/' });
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
                <button data-target="#historico" onClick={() => setTela(3)}>Histórico</button>
                <button data-target="#agenda" onClick={() => setTela(5)}>Agenda</button>
            </div>
            <div className={styles.main_content}>

                {
                    tela === 1 ?
                        <UsuarioDados />
                        : tela === 2 ?
                            <UsuarioVeiculos />
                            : tela === 3 ?
                                <UsuarioHistorico />
                                : tela === 4 ?
                                    <UsuarioDados />
                                    : tela === 5 ?
                                        <FullCalendarGeral />
                                        : <></>
                }
            </div>
        </div>
    )
}