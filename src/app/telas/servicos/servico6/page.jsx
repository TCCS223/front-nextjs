import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';


export default function Servico2() {
    return (
        <>
            <div className={styles.image_servicos}>
                <Image
                    src={'/revisaoeletronica.png'}
                    alt={"Diagnóstico Eletrônico"}
                    width={400}
                    height={300}
                    unoptimized={true}
                />

            </div>
            <div className={styles.image_descricao}>O diagnóstico eletrônico é um serviço que utiliza equipamentos modernos para verificar o sistema eletrônico do veículo. Ele permite a identificação de falhas no motor, sistema de injeção, ABS, entre outros. Esse serviço é essencial para detectar e corrigir problemas antes que se tornem graves, garantindo a eficiência e confiabilidade do veículo.
            </div>
        </>
    )
}
