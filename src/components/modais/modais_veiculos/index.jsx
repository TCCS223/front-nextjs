import styles from "./index.module.css";

export default function ConsultaVeiculo({ isOpen, onClose, vehicle }) {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains(styles.teste)) {
      onClose();
    }
  };

  if (isOpen) {
    return (
      <div className={styles.container} onClick={handleOutsideClick}>
        <div className={styles.modal}>
          <div className={styles.titleModal}>
            <h1>Alterar Veículo</h1>
            <span className={styles.close} onClick={onClose}></span>
          </div>

          <div className={styles.formGroup}>
            <label>Placa</label>
            <input
              type="text"
              defaultValue={vehicle?.placa || ""}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Marca</label>
            <input
              type="text"
              defaultValue={vehicle?.marca || ""}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Modelo</label>
            <input
              type="text"
              defaultValue={vehicle?.modelo || ""}
              className={styles.input}
            />
          </div>

          <div className={styles.buttons}>
            <button className={styles.saveButton}>Salvar</button>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
