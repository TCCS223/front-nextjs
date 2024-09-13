'use client';
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import CadCliente from "./cadcliente/page";
import Veiculos from "./veiculos/page";
import Servicos from "./servicos/page";
import FullCalendar from "./agenda/page";
// import Localizar2 from "./components/modais/modais_clientes/modal_localizar";
// import img from '../../public/logo.png'


export default function Home() {

    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a exibição do modal
    const [tela, setTela] = useState(0);

    const teste = () => {
        alert('Você clicou no ícone de power!');
      };

    return (
        <div className={styles.grid_container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Painel Administrativo da Mecânica</h1>
                
                {/* <span className={styles.power} onClick={teste}><Link href="/"></Link></span> */}
                <Link href="/" className={styles.linkPower}><span className={styles.power} ></span></Link>
                
                
                {/* <div className={styles.button_logout}>
                <button onClick={() => setModalOpen(true)}>Logout</button>
                </div> */}
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

            {/* <div className={styles.logo}>
            <Image
              src={'logo.png'}
              width={190}
              height={45}
              alt={"logo"}
              unoptimized={true}
            />
            </div> */}

        </div>
    )
}