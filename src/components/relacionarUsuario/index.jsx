import React, { useState, useEffect } from "react";
import styles from './index.module.css';
import api from "@/services/api";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";

export default function ModalRelacionarUsuario({ isOpen, onClose, veiculoId }) {
    const [cpf, setCpf] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [ehProprietario, setEhProprietario] = useState(false);
    const [dataInicial, setDataInicial] = useState('');

    const buscarUsuarios = async (cpfDigitado) => {
        if (cpfDigitado.trim().length >= 3) {

            try {
                const response = await api.post(`/usuarios/cpf`, { usu_cpf: cpfDigitado });
                setUsuarios(response.data.dados); // Armazena o resultado da busca no estado
                console.log("meus usuarios: ", response.data.dados);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setUsuarios([]); // Limpa a lista em caso de erro
            }
        } else {
            setUsuarios([]); // Limpa a lista se o CPF tiver menos de 3 dígitos
        }
    };

    const handleBuscarClick = (e) => {
        e.preventDefault();
        buscarUsuarios(cpf); // Chama a função passando o CPF atual
    };

    const handleSelectUsuario = (usu_id) => {
        setUsuarioSelecionado(usu_id);
    };

    const handleSalvar = async () => {
        if (!usuarioSelecionado || !dataInicial) {
            Swal.fire('Atenção', 'Selecione um usuário e uma data inicial.', 'warning');
            return;
        }

        const dados = {
            veic_id: veiculoId,
            usu_id: usuarioSelecionado,
            ehproprietario: ehProprietario ? 1 : 0,
            data_inicial: dataInicial
        };

        try {
            await api.post(`/veiculoUsuario`, dados);
            Swal.fire({
                title: 'Sucesso!',
                text: 'Relacionamento realizado com sucesso!',
                icon: 'success',
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            });
            onClose();
            limparCampos();
        } catch (error) {
            console.error("Erro ao associar usuário:", error.response);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao associar usuário!',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };

    const limparCampos = () => {
        setCpf('');
        setUsuarios([]);
        setUsuarioSelecionado(null);
        setEhProprietario(false);
        setDataInicial('');
    };

    if (!isOpen) return null;

    return (
        <form className={styles.modalOverlay} onSubmit={handleBuscarClick}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}> Associar Usuário</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="cpf">CPF do usuário</label>
                    <div className={styles.cpfContainer}>
                        <InputMask
                            mask="999.999.999-99"
                            type="text"
                            id="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value.toUpperCase())}
                            className={styles.inputCpf}
                            placeholder="Digite 3 dígitos no mínimo..."
                            required
                        />
                        <button type="button" onClick={handleBuscarClick} className={styles.btnBuscar}>Buscar</button>
                    </div>

                    <ul className={styles.list}>
                        <li className={styles.header}>
                            <span className={styles.spanInput}></span>
                            <span className={styles.spanId}>ID</span>
                            <span>CPF</span>
                            <span>Nome</span>
                        </li>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <li key={usuario.usu_id} className={styles.item}>
                                    <span>
                                        <input
                                            type="radio"
                                            name="usuario"
                                            onChange={() => handleSelectUsuario(usuario.usu_id)}
                                            checked={usuarioSelecionado === usuario.usu_id}
                                            className={styles.radio}
                                        />
                                    </span>
                                    <span className={styles.spanId}>{usuario.usu_id}</span>
                                    <span>{usuario.usu_cpf}</span>
                                    <span>{usuario.usu_nome}</span>
                                </li>
                            ))
                        ) : (
                            <li className={styles.noResults}>Nenhum usuário encontrado</li>
                        )}
                    </ul>

                    <div className={styles.checkboxDateContainer}>
                        <label>
                            <input
                                type="checkbox"
                                checked={ehProprietario}
                                onChange={(e) => setEhProprietario(e.target.checked)}
                            />
                            É Proprietário?
                        </label>
                        <div className={styles.dateContainer}>
                            <label htmlFor="dataInicial">Data Inicial:</label>
                            <input
                                type="date"
                                id="dataInicial"
                                value={dataInicial}
                                onChange={(e) => setDataInicial(e.target.value)}
                                required
                                className={styles.inputDate}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button type="button" onClick={() => { onClose(); limparCampos(); }} className={styles.btnCancel}>Cancelar</button>
                    <button
                        type="button"
                        onClick={handleSalvar}
                        className={styles.btnSave}
                        disabled={!usuarioSelecionado || !dataInicial}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    );
}
