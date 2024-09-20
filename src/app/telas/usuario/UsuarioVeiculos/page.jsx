import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function UsuarioVeiculos() {
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({
    placa: "",
    marca: "",
    modelo: ""
  });

  const handleAlterarClick = (veiculo) => {
    setSelectedVehicle(veiculo);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Dados atualizados do veículo:", selectedVehicle);
    setShowForm(false);
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
                <button 
                  className={styles.link} 
                  onClick={() =>
                    handleAlterarClick({
                      placa: "PLA-4884",
                      marca: "Mercedes",
                      modelo: "Z-4"
                    })
                  }
                >
                  <span className={styles.iconeAlterar}></span>
                </button>

                <Link href="/UsuarioVeiculos/excluirVeiculo" className={styles.link}>
                  <span className={styles.iconeExcluir}></span>
                </Link>
              </div>

              <div className={styles.content}>
                <span className={styles.placa}>PLA-4884</span>
                <span className={styles.marca}>Mercedes</span>
                <span className={styles.modelo}>Z-4</span>
              </div>
            </li>
          </ol>
        ) : (
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <div className={`${styles.grid_item} ${styles.grid_placa}`}>
              <label className={styles.label_veiculos} htmlFor="placa">Placa:</label>
              <input
                type="text"
                id="placa"
                name="placa"
                className={styles.input_veiculos}
                value={selectedVehicle.placa}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={`${styles.grid_item} ${styles.grid_marca}`}>
              <label className={styles.label_veiculos} htmlFor="marca">Marca:</label>
              <input
                type="text"
                id="marca"
                name="marca"
                className={styles.input_veiculos}
                value={selectedVehicle.marca}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
              <label className={styles.label_veiculos} htmlFor="modelo">Modelo:</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                className={styles.input_veiculos}
                value={selectedVehicle.modelo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnSalvar}>Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className={styles.btnCancelar}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
