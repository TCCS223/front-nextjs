import React from 'react';
import styles from './index.module.css';

const FormCliente = ({ selectedUser, setSelectedUser, isViewing, handleSubmit, Cancelar }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form id="clienteForm" className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(selectedUser); }}>
            <input type="hidden" id="clienteId" value={selectedUser ? selectedUser.usu_id : ''} className={styles.input_cliente} />

            <div className={styles.grid}>
                <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                    <label htmlFor="nome_cliente" className={styles.label_cliente}>Nome</label>
                    <input
                        type="text"
                        id="nome_cliente"
                        name="usu_nome"
                        required
                        value={selectedUser ? selectedUser.usu_nome : ''}
                        onChange={handleChange}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="Nome Completo"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_cpf}`}>
                    <label htmlFor="cpf_cliente" className={styles.label_cliente}>CPF</label>
                    <input
                        type="text"
                        id="cpf_cliente"
                        name="usu_cpf"
                        required
                        value={selectedUser ? selectedUser.usu_cpf : ''}
                        onChange={handleChange}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="CPF"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_email}`}>
                    <label htmlFor="email_cliente" className={styles.label_cliente}>Email</label>
                    <input
                        type="email"
                        id="email_cliente"
                        name="usu_email"
                        required
                        value={selectedUser ? selectedUser.usu_email : ''}
                        onChange={handleChange}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="Email"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_telefone}`}>
                    <label htmlFor="telefone_cliente" className={styles.label_cliente}>Telefone</label>
                    <input
                        type="text"
                        id="telefone_cliente"
                        name="usu_telefone"
                        required
                        value={selectedUser ? selectedUser.usu_telefone : ''}
                        onChange={handleChange}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="Telefone"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_dataNasc}`}>
                    <label htmlFor="dataNasc_cliente" className={styles.label_cliente}>Data de Nascimento</label>
                    <input
                        type="date"
                        id="dataNasc_cliente"
                        name="usu_data_nasc"
                        required
                        value={selectedUser ? selectedUser.usu_data_nasc.split('T')[0] : ''}
                        onChange={handleChange}
                        disabled={isViewing}
                        className={styles.input_cliente}
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_sexo}`}>
                    <label htmlFor="sexo_cliente" className={styles.label_cliente}>Sexo</label>
                    <select
                        id="sexo_cliente"
                        name="usu_sexo"
                        required
                        value={selectedUser ? selectedUser.usu_sexo : ''}
                        onChange={handleChange}
                        disabled={isViewing}
                        className={styles.input_cliente}
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
            </div>

            <div className={styles.formActions}>
                {!isViewing && <button type="submit" className={styles.submitButton}>Salvar</button>}
                <button type="button" className={styles.cancelButton} onClick={Cancelar}>Cancelar</button>
            </div>
        </form>
    );
};

export default FormCliente;
