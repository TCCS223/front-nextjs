import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';


export default function Servico2() {
  return (
    <>
      <div className={styles.image_servicos}><Image
        src={'/alinhamentocarro.png'}
        alt={"Alinhamento e Balanceamento"}
        width={500}
        height={500}
        unoptimized={true}
      />
      </div>
      <div className={styles.image_descricao}>
        O alinhamento e balanceamento das rodas são fundamentais para garantir a segurança e o conforto ao dirigir. O alinhamento corrige a direção das rodas para que estejam paralelas entre si e perpendiculares ao solo, enquanto o balanceamento assegura que as rodas girem sem causar vibrações. Esses serviços prolongam a vida útil dos pneus e melhoram a dirigibilidade do veículo.
      </div>
    </>
  )
}