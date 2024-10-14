import React from "react";
import { useState, useEffect } from 'react';
import Link from "next/link";
import styles from "./page.module.css";
import Swal from "sweetalert2";
import api from "@/services/api";
import { parseISO, format } from "date-fns";

export default function UsuarioVeiculos() {
    const [showForm, setShowForm] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState({
        veic_id: "",
        veic_placa: "",
        data_inicial: "",
        data_final: "",
        mar_id: "",
        mar_nome: "",
        mod_id: "",
        mod_nome: "",
        mar_nome: "",
        mod_id: "",
        mod_nome: "",
        veic_ano: "",
        veic_cor: "",
        veic_combustivel: "",
        veic_observ: "",
        ehproprietario: ""
    });
    const [veiculos, setVeiculos] = useState([])

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user');
        if (storedUserId) {
            const parsedUser = JSON.parse(storedUserId);
            setUserId(parsedUser?.id || null);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            ListarVeiculosUsuario();
        }
    }, [userId]);

    const ListarVeiculosUsuario = async () => {
        if (!userId) return;

        try {
            const response = await api.get(`/veiculoUsuario/usuario/${userId}`);
            setVeiculos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
        }
    }

    const handleAlterarClick = (veiculo) => {
        setSelectedVehicle(veiculo);
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setSelectedVehicle((prevVehicle) => ({
            ...prevVehicle,
            [name]: name === 'ehproprietario' ? parseInt(value, 10) : value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const updatedVehicle = {
            mod_id: selectedVehicle.mod_id || veiculos.mod_id,
            veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
            veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
            veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
            veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
            veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
        };
    
        try {
            const response = await api.patch(`/veiculos/usuario/${selectedVehicle.veic_id}`, updatedVehicle);
            if (response.data.sucesso) {
                ListarVeiculosUsuario();
            } else {
                console.error("Erro ao atualizar veículo:", response.data.mensagem);
            }
        } catch (error) {
            console.error("Erro na requisição:", error.message);
        }
    
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
                        {veiculos.map((veiculo) => (
                            <li key={veiculo.veic_id} className={styles.lista}>
                                <div className={styles.icone}>
                                    <span className={styles.iconeCarro}></span>
                                </div>

                                <div className={styles.botoeslink}>
                                    <button
                                        className={styles.link}
                                        onClick={() =>
                                            handleAlterarClick({
                                                veic_id: veiculo.veic_id,
                                                veic_placa: veiculo.veic_placa,
                                                mar_nome: veiculo.mar_nome,
                                                mod_id: veiculo.mod_id,
                                                mod_nome: veiculo.mod_nome,
                                                veic_ano: veiculo.veic_ano,
                                                veic_cor: veiculo.veic_cor,
                                                veic_combustivel: veiculo.veic_combustivel,
                                                veic_observ: veiculo.veic_observ,
                                            })
                                        }
                                    >
                                        <span className={styles.iconeAlterar}></span>
                                    </button>

                                    <Link href={`/UsuarioVeiculos/excluirVeiculo/${veiculo.veic_id}`} className={styles.link}>
                                        <span className={styles.iconeExcluir}></span>
                                    </Link>
                                </div>

                                <div className={styles.content}>
                                    <span className={styles.placa}>{veiculo.veic_placa}</span>
                                    <span className={styles.marca}>{veiculo.mar_nome}</span>
                                    <span className={styles.modelo}>{veiculo.mod_nome}</span>
                                    <span className={styles.ano}>Ano: {veiculo.veic_ano}</span>
                                    {veiculo.ehproprietario === 1 ? (
                                        <span className={styles.proprietario}>Proprietário</span>
                                    ) : (
                                        <span className={styles.naoProprietario}>Não Proprietário</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                ) : (
                    <form id="veiculoForm" className={styles.form} onSubmit={handleFormSubmit}>
                        <div className={styles.grid}>
                            <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                                <label htmlFor="veic_placa" className={styles.label_veiculos}>Placa</label>
                                <input
                                    type="text"
                                    id="veic_placa"
                                    name="veic_placa"
                                    value={selectedVehicle.veic_placa}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                    className={styles.input_veiculos}
                                    placeholder="Letras e números"
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                                <label htmlFor="mar_nome" className={styles.label_veiculos}>Marca</label>
                                <input
                                    type="text"
                                    id="mar_nome"
                                    name="mar_nome"
                                    value={selectedVehicle.mar_nome}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                    className={styles.input_veiculos}
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                                <label htmlFor="mod_nome" className={styles.label_veiculos}>Modelo</label>
                                <input
                                    type="text"
                                    id="mod_nome"
                                    name="mod_nome"
                                    value={selectedVehicle.mod_nome}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                    className={styles.input_veiculos}
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_ano}`}>
                                <label htmlFor="veic_ano" className={styles.label_veiculos}>Ano</label>
                                <input
                                    type="number"
                                    id="veic_ano"
                                    name="veic_ano"
                                    value={selectedVehicle.veic_ano}
                                    onChange={handleInputChange}
                                    required
                                    className={styles.input_veiculos}
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                                <label htmlFor="veic_cor" className={styles.label_veiculos}>Cor</label>
                                {/* <input 
                                type="text"
                                
                                    id="veic_cor"
                                    name="veic_cor"
                                    value={selectedVehicle.veic_cor}
                                    onChange={handleInputChange}
                                    required
                                    disabled
                                    className={styles.select_veiculos}
                                 /> */}
                                <select
                                    id="veic_cor"
                                    name="veic_cor"
                                    value={selectedVehicle.veic_cor}
                                    onChange={handleInputChange}
                                    required
                                    className={styles.select_veiculos}
                                >
                                    <option value="" disabled hidden>Selecionar</option>
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
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                                <label htmlFor="veic_combustivel" className={styles.label_veiculos}>Combustível</label>

                                <select
                                    id="veic_combustivel"
                                    name="veic_combustivel"
                                    value={selectedVehicle.veic_combustivel}
                                    onChange={handleInputChange}
                                    required
                                    className={styles.select_veiculos}
                                >
                                    <option value="" disabled hidden>Selecionar</option>
                                    <option value="Gasolina">Gasolina</option>
                                    <option value="Alcool">Álcool</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Flex">Flex</option>
                                    <option value="GNV">GNV (Gás Natural Veicular)</option>
                                    <option value="Eletrico">Elétrico</option>
                                    <option value="Hibrido">Híbrido</option>
                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                                <label htmlFor="data_final" className={styles.label_veiculos}>Observações</label>
                                {/* <input
                                    type="date"
                                    id="data_final"
                                    name="data_final"
                                    value={selectedVehicle?.data_final || ''}
                                    onChange={handleInputChange}
                                    className={styles.input_veiculos}
                                />
                                <input
                                    type="date"
                                    id="data_inicial"
                                    name="data_inicial"
                                    value={selectedVehicle?.data_inicial ? format(parseISO(selectedVehicle.data_inicial), 'yyyy-MM-dd') : ''}
                                    onChange={handleInputChange}
                                    className={styles.input_veiculos}
                                /> */}
                                <input
                                    type="text"
                                    id="veic_observ"
                                    name="veic_observ"
                                    value={selectedVehicle.veic_observ}
                                    onChange={handleInputChange}
                                    className={styles.input_veiculos}
                                />
                            </div>

                            {/* <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                                <label htmlFor="ehproprietario" className={styles.label_veiculos}>Proprietário</label>
                                <select
                                    id="ehproprietario"
                                    name="ehproprietario"
                                    value={selectedVehicle.ehproprietario || 0} // Mantém 0 se undefined
                                    onChange={handleInputChange}
                                    required
                                    className={styles.select_veiculos}
                                >
                                    <option value="" disabled>Selecionar</option>
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </select>
                            </div> */}
                        </div>

                        <button type="submit" className={styles.submitButton}>Salvar</button>
                    </form>
                )}
            </div>
        </>
    );
}
