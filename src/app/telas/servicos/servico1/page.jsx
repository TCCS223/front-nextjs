import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';


export default function Servico1() {
  return (
    <>
      <div className={styles.image_servicos}>

        <Image
          src={'/trocadeoleo1.png'}
          alt={"Troca de Óleo"}
          width={500}
          height={500}
          unoptimized={true}
        />

      </div>


      <hr className={styles.hr}></hr>

      <div className={styles.image_descricao}>
        A troca de óleo e filtro é essencial para manter o motor do veículo funcionando suavemente. O óleo lubrifica as partes móveis do motor, reduzindo o desgaste e a fricção. O filtro de óleo remove impurezas do óleo para garantir que apenas óleo limpo circule pelo motor, aumentando sua vida útil e desempenho.
      </div>
    </>
  )
}

