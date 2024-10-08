import React, { useState } from 'react';
import styles from './index.module.css';
import InputMask from "react-input-mask";
import Swal from 'sweetalert2';
import axios from 'axios';
import api from '@/services/api';

export default function FormVeiculo({
    selectedVeic,
    setSelectedVeic,
    isViewing,
    isEditing,
    handleSubmit,
    categorias,
    marcas,
    listarMarcas,
    modelos,
    listarModelos
}) {

    const isDisabled = isViewing || isEditing;
    const [placaErro, setPlacaErro] = useState('');
    const [anoErro, setAnoErro] = useState('');
    const [isPlacaValidando, setIsPlacaValidando] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePlacaChange = (e) => {
        const placa = e.target.value.toUpperCase();
        setSelectedVeic({ ...selectedVeic, veic_placa: placa });
        setPlacaErro('');
    };

    const handleAnoChange = (e) => {
        const anoAtual = new Date().getFullYear();
        const anoMax = anoAtual + 1;
        const anoInput = e.target.value;

        const ano = parseInt(anoInput, 10);
        setSelectedVeic({ ...selectedVeic, veic_ano: anoInput });

        if (isNaN(ano) || ano < 1886 || ano > anoMax) {
            setAnoErro(`O ano deve ser entre 1886 e ${anoMax}.`);
        } else {
            setAnoErro('');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let valid = true;

        // Resetando erros
        setPlacaErro('');
        setAnoErro('');

        // Validação do ano
        const anoAtual = new Date().getFullYear();
        const anoMax = anoAtual + 1;
        const ano = parseInt(selectedVeic.veic_ano, 10);

        console.log("Ano:", ano);
        if (isNaN(ano) || ano < 1886 || ano > anoMax) {
            console.log("Ano inválido:", ano);
            setAnoErro(`O ano deve ser entre 1886 e ${anoMax}.`);
            valid = false;
        }

        


        
        const placa = selectedVeic.veic_placa;
        console.log(placa);
        
        const placaRegex = /^(?:[A-Z]{3}-\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/;

        console.log("Placa:", placa);
        if (!placaRegex.test(placa)) {
            console.log("Formato de placa inválido:", placa);
            setPlacaErro('Formato de placa inválido.');
            valid = false;
        } else {
            // console.log("Iniciando verificação de placa no servidor...");
            // setIsPlacaValidando(true);
            try {
                const response = await api.post('/verificarPlaca', { veic_placa: placa });
                console.log("Resposta da verificação da placa:", response);

                if (response.status !== 200) {
                    console.log("Status da resposta não é 200.");
                    valid = false;
                }
            } catch (error) {
                console.log("Erro ao validar placa:", error);
                if (error.response && error.response.status === 400) {
                    setPlacaErro('Placa já cadastrada.');
                } else {
                    setPlacaErro('Erro ao validar a placa.', error.response.data);
                }
                valid = false;
            } finally {
                setIsPlacaValidando(false);
            }
        }

        console.log("Estado final de valid:", valid);
        if (!valid) {
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível cadastrar o veículo, placa e/ou ano errados.",
                icon: "error",
            });
            setIsSubmitting(false);
            return;
        }

        console.log("Validação passada, enviando formulário...");
        try {
            await handleSubmit(e);
            Swal.fire({
                title: "Sucesso!",
                text: "Veículo cadastrado com sucesso.",
                icon: "success",
            });
        } catch (error) {
            console.error("Erro ao cadastrar veículo:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível cadastrar o veículo.",
                icon: "error",
            });
        }
        setIsSubmitting(false);
    };

    // Função para lidar com a mudança na categoria
    const handleCategoryChange = (e) => {
        const catId = parseInt(e.target.value, 10);
        setSelectedVeic({ ...selectedVeic, cat_id: catId });
        listarMarcas(catId);
    };

    const handleMarcas = (e) => {
        const marId = parseInt(e.target.value, 10);
        setSelectedVeic({ ...selectedVeic, mar_id: marId });
        listarModelos(marId);
    };


        return (
            <form id="veiculoForm" className={styles.form} onSubmit={handleFormSubmit}>

                <input
                    type="hidden"
                    id="mod_id"
                    name="mod_id"
                    value={selectedVeic ? selectedVeic.mod_id : ''}
                    className={styles.input_veiculos}
                />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label htmlFor="veic_id" className={styles.label_veiculos}>Código</label>
                        <input
                            type="text"
                            id="veic_id"
                            name="veic_id"
                            value={selectedVeic ? selectedVeic.veic_id : ''}
                            className={styles.input_veiculos}
                            disabled
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                        <label htmlFor="cat_nome" className={styles.label_veiculos}>Categoria</label>

                        {isDisabled ? (
                            <input
                                type="text"
                                id="cat_nome"
                                name="cat_nome"
                                value={selectedVeic ? selectedVeic.cat_nome : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, cat_nome: e.target.value })}
                                className={styles.input_veiculos}
                                disabled={isDisabled}
                                required
                            />
                        ) : (
                            <select
                                name="cat_id"
                                id="cat_id"
                                value={selectedVeic ? selectedVeic.cat_id : ''}
                                onChange={handleCategoryChange}
                                className={`${styles.select_veiculos} ${styles.input_marca}`}
                                defaultValue=""
                            >
                                <option value="" selected hidden>Selecione</option>
                                {
                                    categorias.map((categorias) => (
                                        <option key={categorias.cat_id} value={categorias.cat_id}>{categorias.cat_nome}</option>
                                    ))}
                            </select>
                        )
                        }
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                        <label htmlFor="mar_id" className={styles.label_veiculos}>Marca</label>

                        {isDisabled ? (
                            <input
                                type='text'
                                id="mar_id"
                                name="mar_id"
                                value={selectedVeic ? selectedVeic.mar_nome : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, mar_nome: e.target.value })}
                                className={styles.input_veiculos}
                                disabled={isDisabled} // Usa a variável isDisabled
                                required
                            />
                        ) : (
                            <select
                                name="veic_cor"
                                id="veic_cor"
                                required
                                value={selectedVeic ? selectedVeic.mar_id : ''}
                                // onChange={(e) => setSelectedVeic({ ...selectedVeic, mar_id: parseInt(e.target.value) })}
                                onChange={handleMarcas}
                                className={`${styles.select_veiculos} ${styles.input_marca}`}
                                defaultValue="">
                                <option value="" selected hidden>Selecione</option>
                                {
                                    marcas
                                        .sort((a, b) => a.mar_nome.localeCompare(b.mar_nome))
                                        .map((marcas) => (
                                            <option key={marcas.mar_id} value={marcas.mar_id}>{marcas.mar_nome}</option>
                                        ))}
                            </select>
                        )}


                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                        <label htmlFor="mod_id" className={styles.label_veiculos}>Modelo</label>

                        {isDisabled ? (

                            <input
                                type='text'
                                id="mod_id"
                                name="mod_id"
                                value={selectedVeic ? selectedVeic.mod_nome : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, mod_nome: e.target.value })}
                                className={styles.input_veiculos}
                                disabled={isDisabled}
                                required
                            />

                        ) : (
                            <select
                                name="mod_id"
                                id="mod_id"
                                value={selectedVeic ? selectedVeic.mod_id : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, mod_id: parseInt(e.target.value) })}
                                className={`${styles.select_veiculos} ${styles.input_marca}`}
                                defaultValue=""
                            >
                                <option value="" selected hidden>Selecione</option>
                                {modelos
                                    .sort((a, b) => a.mod_nome.localeCompare(b.mod_nome))
                                    .map((modelo) => (
                                        <option key={modelo.mod_id} value={modelo.mod_id}>{modelo.mod_nome}</option>
                                    ))}
                            </select>
                        )}
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                        <label htmlFor="veic_placa" className={styles.label_veiculos}>Placa</label>
                        <InputMask
                            mask="aaa-9*99"
                            type="text"
                            id="veic_placa"
                            name="veic_placa"
                            value={selectedVeic ? selectedVeic.veic_placa : ''}
                            onChange={handlePlacaChange}
                            className={styles.input_veiculos}
                            // className={`${styles.input_veiculos} ${placaErro ? styles.inputErro : ''}`}
                            disabled={isDisabled}
                            required
                        />
                        {/* {isFormSubmitted && placaErro && <div className={styles.error_message}>{placaErro}</div>} */}

                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_ano}`}>
                        <label htmlFor="veic_ano" className={styles.label_veiculos}>Ano</label>
                        <InputMask
                            mask="9999"
                            type="text"
                            id="veic_ano"
                            name="veic_ano"
                            value={selectedVeic ? selectedVeic.veic_ano : ''}
                            onChange={handleAnoChange}
                            className={styles.input_veiculos}
                            // className={`${styles.input_veiculos} ${anoErro ? styles.inputErro : ''}`}
                            disabled={isViewing}
                            required
                        />
                        {anoErro && <div className={styles.error_message}>{anoErro}</div>}
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                        <label htmlFor="veic_cor" className={styles.label_veiculos}>Cor</label>

                        {isViewing ? (
                            <input
                                type="text"
                                id="veic_ano"
                                name="veic_cor"
                                value={selectedVeic ? selectedVeic.veic_cor : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_cor: e.target.value })}
                                className={styles.input_veiculos}
                                disabled={isViewing}
                                required
                            />

                        ) : (
                            <select
                                id="cor"
                                name="cor"
                                required
                                value={selectedVeic ? selectedVeic.veic_cor : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_cor: e.target.value })}
                                className={`${styles.select_veiculos} ${styles.input_cor}`}
                                defaultValue=""
                            >
                                <option value="" disabled selected>Selecionar</option>
                                <option value="Amarelo">Amarelo</option>
                                <option value="Azul">Azul</option>
                                <option value="Bege">Bege</option>
                                <option value="Branco">Branco</option>
                                <option value="Cinza">Cinza</option>
                                <option value="Dourado">Dourado</option>
                                <option value="Laranja">Laranja</option>
                                <option value="Marrom">Marrom</option>
                                <option value="Preto">Preto</option>
                                <option value="Prata">Prata</option>
                                <option value="Rosa">Rosa</option>
                                <option value="Roxo">Roxo</option>
                                <option value="Verde">Verde</option>
                                <option value="Vermelho">Vermelho</option>
                                <option value="Vinho">Vinho</option>
                                <option value="Personalizado">Personalizado</option>
                            </select>
                        )}
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                        <label htmlFor="veic_combustivel" className={styles.label_veiculos}>Combustível</label>
                        {isViewing ? (
                            <input
                                type="text"
                                id="veic_combustivel"
                                name="veic_combustivel"
                                value={selectedVeic ? selectedVeic.veic_combustivel : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_combustivel: e.target.value })}
                                className={styles.input_veiculos}
                                disabled={isViewing}
                                required
                            />
                        ) : (
                            <>
                                <select
                                    id="veic_combustivel"
                                    name="veic_combustivel"
                                    value={selectedVeic ? selectedVeic.veic_combustivel : ''}
                                    onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_combustivel: e.target.value })}
                                    className={`${styles.select_veiculos} ${styles.input_combustivel}`}
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled selected>Selecionar</option>
                                    <option value="Gasolina">Gasolina</option>
                                    <option value="Alcool">Álcool</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Flex">Flex</option>
                                    <option value="GNV">GNV (Gás Natural Veicular)</option>
                                    <option value="Eletrico">Elétrico</option>
                                    <option value="Hibrido">Híbrido</option>
                                </select>
                            </>
                        )}
                    </div>

                    {isViewing ? (

                        <>
                            {selectedVeic.num_proprietarios > 1 ? (
                                <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                                    <label htmlFor="proprietarios" className={styles.label_veiculos}>
                                        Proprietário(s)
                                        <span className={styles.numProprietarios}>
                                            (+{selectedVeic.num_proprietarios - 1})
                                        </span>
                                    </label>
                                    <select
                                        id="proprietarios"
                                        required
                                        name="proprietarios"
                                        value={selectedVeic ? selectedVeic.proprietario : ''}
                                        onChange={(e) => setSelectedVeic({ ...selectedVeic, proprietario: e.target.value })}
                                        className={`${styles.select_veiculos} ${styles.input_proprietario}`}
                                    >
                                        <option value="" disabled>Selecionar Proprietário</option>
                                        {selectedVeic.proprietarios.split(', ').map((proprietario, index) => (
                                            <option key={index} value={proprietario}>{proprietario}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                                    <label htmlFor="proprietarios" className={styles.label_veiculos}>Proprietário(s)</label>
                                    <input
                                        type="text"
                                        id="proprietarios"
                                        name="proprietarios"
                                        value={selectedVeic ? selectedVeic.proprietarios : ''}
                                        onChange={(e) => setSelectedVeic({ ...selectedVeic, proprietarios: e.target.value })}
                                        className={styles.input_veiculos}
                                        disabled={isViewing}
                                        required
                                    />
                                </div>
                            )}
                        </>
                    ) : (<></>)}

                    <div className={`${styles.grid_item} ${styles.grid_observacoes} ${styles.grid_item_observacoes}`}>
                        <label htmlFor="veic_observ" className={styles.label_veiculos}>Observações</label>
                        <input
                            type="text"
                            id="veic_observ"
                            name="veic_observ"
                            value={selectedVeic ? selectedVeic.veic_observ : ''}
                            onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_observ: e.target.value })}
                            className={styles.input_veiculos}
                            disabled={isViewing}
                            
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                        <label htmlFor="veic_situacao" className={styles.label_veiculos}>Situação</label>
                        {isEditing ? (
                            <select
                                id="veic_situacao"
                                name="veic_situacao"
                                value={selectedVeic ? selectedVeic.veic_situacao : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_situacao: parseInt(e.target.value) })}
                                className={`${styles.select_veiculos} ${styles.input_situacao}`}
                                required
                            >
                                <option value="1" className={styles.option} selected>Ativo</option>
                                <option value="0" className={styles.option}>Inativo</option>
                            </select>
                        ) : (

                            <input
                                type="text"
                                id="veic_situacao"
                                name="veic_situacao"
                                value={selectedVeic ? (selectedVeic.veic_situacao == 1 ? 'Ativo' : 'Inativo') : ''}
                                onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_situacao: e.target.value })}
                                className={styles.input_veiculos}
                                disabled
                                required
                            />

                        )}
                    </div>
                    <div className={styles.grid_item}>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isSubmitting || isPlacaValidando || isDisabled}
                        >
                            {isSubmitting ? 'Enviando...' : 'Cadastrar'}
                        </button>
                    </div>
                </div>
            </form >
        )
    }
