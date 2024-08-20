import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';


export default function Servico2() {
    return (
        <>
            <div className={styles.image_servicos}>
                <Image
                    src={'/suspensao.png'}
                    alt={"Manutenção da Suspensão"}
                    width={300}
                    height={300}
                    unoptimized={true}
                />

            </div>
            <div className={styles.image_descricao}>
                A suspensão do veículo absorve os impactos da estrada e mantém o controle e a estabilidade durante a condução. O serviço de manutenção da suspensão inclui a inspeção e substituição de amortecedores, molas e outros componentes. Um sistema de suspensão bem mantido proporciona uma condução mais suave e segura.
            </div>
        </>
    )
}