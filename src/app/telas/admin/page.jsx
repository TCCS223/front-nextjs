'use client';
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./page.module.css";
import CadCliente from "./cadcliente/page";
import Veiculos from "./veiculos/page";
import Servicos from "./servicos/page";
import FullCalendar from "./agenda/page";


export default function Home() {

    
    const [tela, setTela] = useState(0);

    const teste = () => {
        alert('Você clicou no ícone de power!');
      };

    return (
        <div className={styles.grid_container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Painel Administrativo</h1>
            
                <Link href="/" className={styles.linkPower}><span className={styles.power} title="Sair"></span></Link>
                
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
                                    <FullCalendar />
                                    : tela === 5 ?
                                        <FullCalendar /> // trocar pelo histórico
                                        : <></>
                }
            </div>

        </div>
    )
}