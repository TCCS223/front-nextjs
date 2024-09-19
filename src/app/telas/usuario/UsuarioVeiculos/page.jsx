import React, { useState } from "react";
import Link from "next/link";
import ConsultaVeiculo from "@/components/modais/modais_veiculos"; // Importa o formulário
import styles from "./page.module.css";

export default function UsuarioVeiculos() {
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleAlterarClick = (veiculo) => {
    // Define o veículo selecionado e exibe o formulário
    setSelectedVehicle(veiculo);
    setShowForm(true);
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.botaonovo}>
          <button id="novoCliente">Novo</button>
        </div>
      </div>

      <div className={styles.container}>
        {!showForm ? (
          <ol className={styles.fundocards}>
            <li className={styles.lista}>
              <div className={styles.icone}>
                <span className={styles.iconeCarro}></span>
              </div>

              <div className={styles.botoeslink}>
                <Link href="/UsuarioVeiculos/alterarVeiculo" className={styles.link}>
                  <span className={styles.iconeExcluir}></span>
                </Link>
                <button
                  onClick={() =>
                    handleAlterarClick({
                      placa: "PLA-4884",
                      marca: "Mercedes",
                      modelo: "Z-4",
                    })
                  }
                  className={styles.link}
                >
                  <span className={styles.iconeAlterar}></span>
                </button>
              </div>
              <div className={styles.content}>
                <span className={styles.placa}>PLA-4884</span>
                <span className={styles.marca}>Mercedes</span>
                <span className={styles.modelo}>Z-4</span>
              </div>
            </li>
          </ol>
        ) : (
          // Exibe o formulário com os dados do veículo selecionado
          <ConsultaVeiculo
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            vehicle={selectedVehicle}
          />
        )}
      </div>
    </>
  );
}
