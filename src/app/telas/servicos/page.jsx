'use client'

import Link from 'next/link';
import styles from './page.module.css';
import { useState, useEffect } from 'react';

import Header from '@/components/header';
import Footer from '@/components/footer';

import Servico1 from './servico1/page';
import Servico2 from './servico2/page';
import Servico3 from './servico3/page';
import Servico4 from './servico4/page';
import Servico5 from './servico5/page';
import Servico6 from './servico6/page';

export default function Servicos() {
  const [tela, setTela] = useState(1);

  useEffect(() => {
    // Simula o clique no primeiro botão ao carregar a página
    setTela(1);
  }, []);

  return (
    <>
      <Header />

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.geral_servicos}>
            <div className={styles.sidebar_buttons}>

              <Link href='' className={`${styles.link_button} ${tela === 1 ? styles.active : ''}`} onClick={() => setTela(1)}>
                Polimento e Cristalização da Pintura
              </Link>

              <Link href='' className={`${styles.link_button} ${tela === 2 ? styles.active : ''}`} onClick={() => setTela(2)}>
                Higienização Interna Completa
              </Link>

              <Link href='' className={`${styles.link_button} ${tela === 3 ? styles.active : ''}`} onClick={() => setTela(3)}>
                Envelopamento Automotivo
              </Link>

              <Link href='' className={`${styles.link_button} ${tela === 4 ? styles.active : ''}`} onClick={() => setTela(4)}>
                Vitrificação de Vidros
              </Link>

              <Link href='' className={`${styles.link_button} ${tela === 5 ? styles.active : ''}`} onClick={() => setTela(5)}>
                Correção de Pintura
              </Link>

              <Link href='' className={`${styles.link_button} ${tela === 6 ? styles.active : ''}`} onClick={() => setTela(6)}>
                Proteção Cerâmica
              </Link>

            </div>

            <div className={styles.container_servicos}>
            {
                    tela === 1 ?
                        <Servico1 />
                        : tela === 2 ?
                            <Servico2 />
                            : tela === 3 ?
                                <Servico3 />
                                : tela === 4 ?
                                    <Servico4 />
                                    : tela === 5 ?
                                        <Servico5 /> // trocar pelo histórico
                                        : tela === 6 ?
                                          <Servico6 /> 
                                          : <></>
                }
              
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
