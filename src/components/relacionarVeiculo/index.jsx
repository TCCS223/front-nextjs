import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default function ModalRelacionarVeiculo({ isOpen, onClose }) {
    const [nome, setNome] = useState('');
    const [veiculos, setVeiculos] = useState([]);
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

    const buscarVeiculos = async (nomeDigitado) => {
        if (nomeDigitado.trim()) {
            try {
                const response = await api.get(`veiculos/placa/${nomeDigitado}`);
                setVeiculos(response.data.dados);
            } catch (error) {
                console.error("Erro ao buscar veículos:", error);
            }
        } else {
            setVeiculos([]);
        }
    };

    useEffect(() => {
        buscarVeiculos(nome);
    }, [nome]);

    const handleSelectVeiculo = (veic_id) => {
        setVeiculoSelecionado(veic_id);
    };

    const handleSalvar = async () => {
        if (veiculoSelecionado) {
            try {
                await api.patch(`/veiculo_usuario`, {
                    veic_ids: [veiculoSelecionado],
                    usu_id: 1 // Substituir pelo ID do usuário correto
                });
                Swal.fire('Sucesso', 'Veículo associado com sucesso!', 'success');
                onClose();
            } catch (error) {
                console.error("Erro ao associar veículo:", error);
                Swal.fire('Erro!', 'Erro ao associar veículo.', 'error');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Associar Veículo</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome do veículo</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className={styles.inputCategoria}
                    />
                    <ul className={styles.veiculosList}>
                        <li className={styles.veiculosHeader}>
                            <span className={styles.spanInput}></span> {/* Espaço para o input */}
                            <span className={styles.spanId}>ID</span>
                            <span>Placa</span>
                            <span>Modelo</span>
                        </li>
                        {veiculos.map((veiculo) => (
                            <li key={veiculo.veic_id} className={styles.veiculoItem}>
                                <span>
                                    <input
                                        type="radio"
                                        name="veiculo"
                                        onChange={() => handleSelectVeiculo(veiculo.veic_id)}
                                        checked={veiculoSelecionado === veiculo.veic_id}
                                        className={styles.radioVeiculo}
                                    />
                                </span>
                                <span className={styles.spanId}>{veiculo.veic_id}</span>
                                <span>{veiculo.veic_placa}</span>
                                <span>{veiculo.mod_nome}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.buttonGroup}>
                    <button type="button" onClick={onClose} className={styles.btnCancel}>Cancelar</button>
                    <button
                        type="button"
                        onClick={handleSalvar}
                        className={styles.btnSave}
                        disabled={!veiculoSelecionado}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
