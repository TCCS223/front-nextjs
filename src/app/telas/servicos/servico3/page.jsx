import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';


export default function Servico2() {
    return (
        <>
            <div className={styles.image_servicos}>
                <Image
                    src={'/revisaodefreio.png'}
                    alt={"Revisão de freios"}
                    width={300}
                    height={300}
                    unoptimized={true}
                />

            </div>
            <div className={styles.image_descricao}>
                A revisão de freios é crucial para a segurança do veículo. Esse serviço envolve a inspeção e substituição de componentes como pastilhas, discos, fluido de freio e outras partes do sistema de frenagem. Freios bem mantidos garantem uma resposta rápida e eficaz em situações de emergência.
            </div>
        </>
    )
}