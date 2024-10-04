import React, { useEffect, useState } from "react";
import styles from './index.module.css';
import api from "@/services/api";
import Swal from "sweetalert2";

export default function ModalRelacionarUsuario({ isOpen, onClose, VeiculoId }) {

    const [cpf, setCpf] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [ehProprietario, setEhProprietario] = useState(false);
    const [dataInicial, setDataInicial] = useState('');

    const buscarUsuarios = async (cpfDigitado) => {
        if (cpfDigitado.trim()) {
            try {
                const response = await api.post(`/usuarios/nome`, { usu_cpf: cpfDigitado });
                setUsuarios(response.data.dados);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        } else {
            setUsuarios([]);
        }
    }

    useEffect(() => {
        buscarUsuarios(cpf);
    }, [cpf])

    const handleSelectUsuario = (usu_cpf) => {
        setUsuarioSelecionado(usu_cpf);
    }

    const handleSalvar = async () => {
        if (!usuarioSelecionado || !dataInicial) {
            Swal.fire('Atenção', 'Selecione um usuário e uma data inicial.', 'warning');
            return;
        }

        const dados = {
            veic_id: VeiculoId,
            usu_id: usuarioSelecionado,
            ehproprietario: ehProprietario ? 1 : 0,
            data_inicial: dataInicial
        };

        try {
            await api.post(`/veiculoUsuario`, dados);
            Swal.fire('Sucesso', 'Relacionamento realizado com sucesso!', 'success');
            onClose();
            limparCampos();
        } catch (error) {
            console.error("Erro ao associar usuário:", error);
            Swal.fire('Erro!', 'Erro ao associar usuário.', 'error');
        }
    }

    const limparCampos = () => {
        setCpf('');
        setUsuarios([]);
        setUsuarioSelecionado(null);
        setEhProprietario(false);
        setDataInicial('');
    }

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Associar Usuário</h2>
            <div className={styles.formGroup}>
                <label htmlFor="cpf">CPF do usuário</label>
                <input
                    type="text"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value.toUpperCase())}
                    className={styles.inputCpf}
                    required
                />
                <ul className={styles.list}>
                    <li className={styles.header}>
                        <span className={styles.spanInput}></span>
                        <span className={styles.spanId}>ID</span>
                        <span>Placa</span>
                        <span>Modelo</span>
                    </li>
                    {usuarios.map((usuario) => (
                        <li key={usuario.veic_id} className={styles.item}>
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
                    ))}
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
                    disabled={!usuarioSelecionado || !dataInicial} // Desabilitar se não houver veículo ou data inicial
                >
                    Salvar
                </button>
            </div>
        </div>
    </div>
    )
}