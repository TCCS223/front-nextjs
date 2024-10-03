import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default function ModalRelacionarVeiculo({ isOpen, onClose }) {
    const [nome, setNome] = useState('');
    const [veiculos, setVeiculos] = useState([]); // Armazena os veículos encontrados
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null); // Armazena o veículo selecionado

    // Função para buscar veículos conforme o nome digitado
    const buscarVeiculos = async (nomeDigitado) => {
        if (nomeDigitado.trim()) {
            try {
                const response = await api.get(`veiculos/placa/${nomeDigitado}`);
                setVeiculos(response.data.dados);
            } catch (error) {
                console.error("Erro ao buscar veículos:", error);
            }
        } else {
            setVeiculos([]); // Limpa a lista se o campo estiver vazio
        }
    };

    // Efeito para buscar veículos sempre que o nome mudar
    useEffect(() => {
        buscarVeiculos(nome);
    }, [nome]);

    const handleSelectVeiculo = (veic_id) => {
        setVeiculoSelecionado(veic_id); // Atualiza o veículo selecionado
    };

    const handleSalvar = async () => {
        if (veiculoSelecionado) {
            try {
                const response = await api.patch(`/veiculo_usuario`, {
                    veic_id: veiculoSelecionado,
                    usu_id: 1 // Substituir pelo ID do usuário correto
                });
                Swal.fire('Sucesso', 'Veículo associado com sucesso!', 'success');
                onClose(); // Fecha o modal após o sucesso
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
                {veiculos.map((veiculo) => (
                    <li key={veiculo.veic_id} className={styles.veiculoItem}>
                        {veiculo.veic_id} - {veiculo.veic_placa} - {veiculo.mod_nome}
                        <select
                            onChange={() => handleSelectVeiculo(veiculo.veic_id)}
                            className={styles.selectVeiculo}
                            value={veiculoSelecionado === veiculo.veic_id ? veiculo.veic_id : ''}
                        >
                            <option value="">Selecionar</option>
                            <option value={veiculo.veic_id}>Selecionar</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
        <div className={styles.buttonGroup}>
            <button 
                type="button" 
                onClick={handleSalvar} 
                className={styles.btnSave} 
                disabled={!veiculoSelecionado}
            >
                Salvar
            </button>
            <button type="button" onClick={onClose} className={styles.btnCancel}>Cancelar</button>
        </div>
    </div>
</div>

    );
}
