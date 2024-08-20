import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';


export default function Servico2() {
    return (
        <>
            <div className={styles.image_servicos}>
                <Image
                    src={'/bateriatrocar.png'}
                    alt={"Substituição de Baterias"}
                    width={500}
                    height={310}
                    unoptimized={true}
                />

            </div>
            <div className={styles.image_descricao}>A bateria é responsável por fornecer a energia necessária para dar partida no motor e alimentar os sistemas elétricos do veículo. A inspeção regular da bateria inclui a verificação de sua carga, terminais e estado geral. Quando necessário, a substituição da bateria garante que o veículo tenha sempre a energia necessária para funcionar corretamente e evita problemas de partida e falhas elétricas.
            </div>
        </>
    )
}
