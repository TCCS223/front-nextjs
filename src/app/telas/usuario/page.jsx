'use client';
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import UsuarioVeiculos from "./UsuarioVeiculos/page";
import UsuarioDados from "./UsuarioDados/page";

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
                <h1 className={styles.title}>Painel do Usuário</h1>
                
                {/* <span className={styles.power} onClick={teste}><Link href="/"></Link></span> */}
                <Link href="/" className={styles.linkPower}><span className={styles.power} ></span></Link>
                
                
                {/* <div className={styles.button_logout}>
                <button onClick={() => setModalOpen(true)}>Logout</button>
                </div> */}
            </div>
            <div className={styles.sidebar}>
                <button data-target="#meusdados" onClick={() => setTela(1)}>Meus Dados</button>
                <button data-target="#meusveiculos" onClick={() => setTela(2)}>Meus Veículos</button>
                <button data-target="#historico" onClick={() => setTela(4)}>Histórico</button>
                {/* <button data-target="#agenda" onClick={() => setTela(3)}>Agenda</button> */}
                {/* <button data-target="#historico" onClick={() => setTela(5)}>Histórico</button> */}
            </div>
            <div className={styles.main_content}>

                {
                    tela === 1 ?
                        <UsuarioDados />
                        : tela === 2 ?
                            <UsuarioVeiculos />
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