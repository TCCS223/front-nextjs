import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default function ModalRelacionarVeiculo({ isOpen, onClose, usuarioId }) {
    const [nome, setNome] = useState('');
    const [veiculos, setVeiculos] = useState([]);
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
    const [ehProprietario, setEhProprietario] = useState(false);
    const [dataInicial, setDataInicial] = useState('');

    const buscarVeiculos = async (nomeDigitado) => {
        if (nomeDigitado.trim()) {
            try {
                const response = await api.post(`veiculos/placa`, { veic_placa: nomeDigitado });
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

 

    const verificarVeiculoExistente = async () => {
        try {
            const response = await api.get(`/veiculoUsuario/verificar/${usuarioId}/${veiculoSelecionado}`);
            console.log("Resposta da API:", response);  // Log completo da resposta

            // Agora acessa corretamente o campo 'associado' da resposta da API
            return response.data?.associado || false;
        } catch (error) {
            console.error("Erro ao verificar veículo associado:", error.message);
            return false;
        }
    };




    const handleSalvar = async () => {
        if (!veiculoSelecionado || !dataInicial) {
            Swal.fire('Atenção', 'Selecione um veículo e uma data inicial.', 'warning');
            return;
        }

        const veiculoJaAssociado = await verificarVeiculoExistente();
        if (veiculoJaAssociado) {
            Swal.fire('Atenção', 'Este veículo já está associado a este usuário.', 'warning');
            return;
        }

        const dadosVeiculo = {
            veic_id: veiculoSelecionado,
            usu_id: usuarioId,
            ehproprietario: ehProprietario ? 1 : 0,
            data_inicial: dataInicial,
        };
        console.log("Dados enviados para o banco:", dadosVeiculo);

        try {
            await api.post(`/veiculoUsuario`, dadosVeiculo);
            Swal.fire({
                title: 'Sucesso!',
                text: 'Veículo associado com sucesso!',
                icon: 'success',
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            });
            onClose();
            limparCampos();
        } catch (error) {
            console.error("Erro ao associar veículo:", error.response);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao associar veículo!',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };


    const limparCampos = () => {
        setNome('');
        setVeiculos([]);
        setVeiculoSelecionado(null);
        setEhProprietario(false);
        setDataInicial('');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Associar Veículo</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Placa do veículo</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value.toUpperCase())}
                        required
                        className={styles.inputCategoria}
                    />
                    <ul className={styles.veiculosList}>
                        <li className={styles.veiculosHeader}>
                            <span className={styles.spanInput}></span>
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
                    <div className={styles.checkboxDateContainer}>
                        <label>
                            <input
                                type="checkbox"
                                checked={ehProprietario}
                                onChange={(e) => setEhProprietario(e.target.checked ? 1 : 0)}  // Ajustar para garantir que o valor seja 1 ou 0
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
                        disabled={!veiculoSelecionado || !dataInicial}
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
