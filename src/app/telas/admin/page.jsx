'use client';
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./page.module.css";
import CadCliente from "./cadcliente/page";
import Veiculos from "./veiculos/page";
import Servicos from "./servicos/page";
import HistoricoAgendamentos from "./agendamentos/page";
// import FullCalendar from "./agenda/page";
import FullCalendarGeral from "../usuario/agenda/page";

export default function Home() {

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserId(parsedUser);
        }
    }, []);

    const [tela, setTela] = useState(0);

    return (
        <div className={styles.grid_container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Painel Administrativo</h1>

                <Link href="/" className={styles.linkPower}>
                    <span className={styles.power} title="Sair"></span>
                </Link>

            </div>
            <div className={styles.sidebar}>
                <button data-target="#clientes" onClick={() => setTela(1)}>Clientes</button>
                <button data-target="#veiculos" onClick={() => setTela(2)}>Veículos</button>
                <button data-target="#servicos" onClick={() => setTela(3)}>Serviços</button>
                <button data-target="#agenda" onClick={() => setTela(4)}>Agenda</button>
                <button data-target="#historico" onClick={() => setTela(5)}>Histórico</button>
            </div>
            <div className={styles.main_content}>

                {
                    tela === 1 ?
                        <CadCliente />
                        : tela === 2 ?
                            <Veiculos />
                            : tela === 3 ?
                                <Servicos />
                                : tela === 4 ?
                                    <FullCalendarGeral />
                                    : tela === 5 ?
                                        <HistoricoAgendamentos /> // trocar pelo histórico
                                        : <></>
                }
            </div>

        </div>
    )
}