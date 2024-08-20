'use client'

import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';

import Servico1 from './servico1/page';
import Servico2 from './servico2/page';
import Servico3 from './servico3/page';
import Servico4 from './servico4/page';
import Servico5 from './servico5/page';
import Servico6 from './servico6/page';

import Header from '@/components/header';
import Footer from '@/components/footer';



export default function Servicos() {
  const [tela, setTela] = useState(1);

  return (
    <body>

      <Header />

      <main className={styles.main}>
        <section className={styles.section}>

          <div className={styles.sidebar_servicos}>
            <div className={styles.sidebar_buttons}>

              <Link href='' className={styles.link_button}onClick={() => setTela(1)}>
                Serviço 1
              </Link>

              <Link href='' className={styles.link_button}onClick={() => setTela(2)}>
                Serviço 2
              </Link>

              <Link href='' className={styles.link_button}onClick={() => setTela(3)}>
                Serviço 3
              </Link>

              <Link href='' className={styles.link_button}onClick={() => setTela(4)}>
                Serviço 4
              </Link>

              <Link href='' className={styles.link_button}onClick={() => setTela(5)}>
                Serviço 5
              </Link>

              <Link href='' className={styles.link_button}onClick={() => setTela(6)}>
                Serviço 6
              </Link>


              {/* <button className={styles.return}>VOLTAR</button> */}

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



          {/* <div className={styles.container}>
            <div className={styles.tabsContainer}>
              <input type="radio" id="tab1" name="tabs" className={styles.input} defaultChecked />
              <label htmlFor="tab1" className={styles.tab}>Troca de Óleo e Filtro</label>
              <div className={styles.content}>
                <Image
                  src={'/trocadeoleo1.png'}
                  alt={"Troca de Óleo"}
                  width={300}
                  height={300}
                  unoptimized={true}
                />
                <p>A troca de óleo e filtro é essencial para manter o motor do veículo funcionando suavemente. O óleo lubrifica as partes móveis do motor, reduzindo o desgaste e a fricção. O filtro de óleo remove impurezas do óleo para garantir que apenas óleo limpo circule pelo motor, aumentando sua vida útil e desempenho.
                </p>
              </div>

              <input type="radio" id="tab2" name="tabs" className={styles.input} />
              <label htmlFor="tab2" className={styles.tab}>Alinhamento e Balanceamento</label>
              <div className={styles.content}>
                <Image
                  src={'/alinhamentocarro.png'}
                  alt={"Alinhamento e Balanceamento"}
                  width={320}
                  height={320}
                  unoptimized={true}
                />
                <p>O alinhamento e balanceamento das rodas são fundamentais para garantir a segurança e o conforto ao dirigir. O alinhamento corrige a direção das rodas para que estejam paralelas entre si e perpendiculares ao solo, enquanto o balanceamento assegura que as rodas girem sem causar vibrações. Esses serviços prolongam a vida útil dos pneus e melhoram a dirigibilidade do veículo.</p>
              </div>

              <input type="radio" id="tab3" name="tabs" className={styles.input} />
              <label htmlFor="tab3" className={styles.tab}>Revisão de freios</label>
              <div className={styles.content}>
                <Image
                  src={'/revisaodefreio.png'}
                  alt={"Revisão de freios"}
                  width={300}
                  height={300}
                  unoptimized={true}
                />
                <p> A revisão de freios é crucial para a segurança do veículo. Esse serviço envolve a inspeção e substituição de componentes como pastilhas, discos, fluido de freio e outras partes do sistema de frenagem. Freios bem mantidos garantem uma resposta rápida e eficaz em situações de emergência.</p>
              </div>

              <input type="radio" id="tab4" name="tabs" className={styles.input} />
              <label htmlFor="tab4" className={styles.tab}>Inspeção e Substituição de Baterias</label>
              <div className={styles.content}>
                <Image
                  src={'/bateriatrocar.png'}
                  alt={"Substituição de Baterias"}
                  width={500}
                  height={310}
                  unoptimized={true}
                />
                <p>A bateria é responsável por fornecer a energia necessária para dar partida no motor e alimentar os sistemas elétricos do veículo. A inspeção regular da bateria inclui a verificação de sua carga, terminais e estado geral. Quando necessário, a substituição da bateria garante que o veículo tenha sempre a energia necessária para funcionar corretamente e evita problemas de partida e falhas elétricas.</p>
              </div>

              <input type="radio" id="tab5" name="tabs" className={styles.input} />
              <label htmlFor="tab5" className={styles.tab}>Manutenção da Suspensão</label>
              <div className={styles.content}>
                <Image
                  src={'/suspensao.png'}
                  alt={"Manutenção da Suspensão"}
                  width={300}
                  height={300}
                  unoptimized={true}
                />
                <p>A suspensão do veículo absorve os impactos da estrada e mantém o controle e a estabilidade durante a condução. O serviço de manutenção da suspensão inclui a inspeção e substituição de amortecedores, molas e outros componentes. Um sistema de suspensão bem mantido proporciona uma condução mais suave e segura.</p>
              </div>

              <input type="radio" id="tab6" name="tabs" className={styles.input} />
              <label htmlFor="tab6" className={styles.tab}>Diagnóstico Eletrônico</label>
              <div className={styles.content}>
                <Image
                  src={'/revisaoeletronica.png'}
                  alt={"Diagnóstico Eletrônico"}
                  width={400}
                  height={300}
                  unoptimized={true}
                />
                <p>O diagnóstico eletrônico é um serviço que utiliza equipamentos modernos para verificar o sistema eletrônico do veículo. Ele permite a identificação de falhas no motor, sistema de injeção, ABS, entre outros. Esse serviço é essencial para detectar e corrigir problemas antes que se tornem graves, garantindo a eficiência e confiabilidade do veículo.</p>
              </div>
            </div>
            <Link href="/" className={styles.backButton}>
            Voltar
          </Link>
          </div> */}



        </section>
      </main>


      <Footer />
    </body>

  );
}
