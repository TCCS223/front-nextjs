import React from "react";
import { useState, useEffect } from 'react';
import Link from "next/link";
import styles from "./page.module.css";
import Swal from "sweetalert2";

import api from "@/services/api";
import { parseISO, format } from "date-fns";

export default function UsuarioVeiculos() {
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [originalVehicle, setOriginalVehicle] = useState(null);

    const [selectedVehicle, setSelectedVehicle] = useState({
        veic_id: "",
        veic_usu_id: "",
        veic_placa: "",
        data_inicial: "",
        data_final: "",
        mar_id: "",
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
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSelectedVehicle((prevVehicle) => ({
            ...prevVehicle,
            [name]: name === 'ehproprietario' ? parseInt(value, 10) : value
        }));
    };

    const handleExcluirVeiculo = async (veic_usu_id) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você deseja realmente excluir este veículo? Esta ação não pode ser desfeita.",
            icon: "warning",
            iconColor: "#ff9d00",
            showCancelButton: true,
            confirmButtonColor: "rgb(40, 167, 69)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            backdrop: "rgba(0,0,0,0.7)"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const dataAtual = format(new Date(), 'yyyy-MM-dd');

                try {
                    const response = await api.patch(`/veiculoUsuario/${veic_usu_id}/data_final`, {
                        data_final: dataAtual
                    });

                    if (response.data.sucesso) {
                        Swal.fire({
                            title: 'Sucesso!',
                            text: 'Data final do veículo-usuário foi atualizada com sucesso.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            iconColor: "rgb(40, 167, 69)",
                            confirmButtonColor: "rgb(40, 167, 69)",
                        });

                        ListarVeiculosUsuario();
                    } else {
                        Swal.fire({
                            title: 'Erro!',
                            text: response.data.mensagem || 'Ocorreu um erro ao excluir o veículo.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            iconColor: '#d33',
                            confirmButtonColor: '#d33',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Erro!',
                        text: `Erro na exclusão do veículo: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'Ok',
                        iconColor: '#d33',
                        confirmButtonColor: '#d33',
                    });
                }
            }
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedVeiculo = {
            mod_id: selectedVehicle.mod_id || veiculos.mod_id,
            veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
            veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
            veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
            veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
            veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
        };

        let ehproprietario = selectedVehicle.ehproprietario !== undefined
            ? parseInt(selectedVehicle.ehproprietario, 10)
            : parseInt(veiculos.ehproprietario, 10);

        ehproprietario = !isNaN(ehproprietario) ? ehproprietario : 0;

        const updatedVeiculoUsuario = {
            veic_usu_id: selectedVehicle.veic_usu_id || veiculos.veic_usu_id,
            data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
            data_final: selectedVehicle.data_final || veiculos.data_final,
            ehproprietario
        };

        try {
            const [responseVehicle, responseVehicleUser] = await Promise.all([
                api.patch(`/veiculos/usuario/${selectedVehicle.veic_id}`, updatedVeiculo),
                api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, updatedVeiculoUsuario)
            ]);

            if (responseVehicle.data.sucesso && responseVehicleUser.data.sucesso) {
                ListarVeiculosUsuario();

                Swal.fire({
                    title: 'Sucesso!',
                    text: 'O veículo e os dados do usuário foram atualizados com sucesso.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    iconColor: "rgb(40, 167, 69)",
                    confirmButtonColor: "rgb(40, 167, 69)",
                });
            } else {
                let errorMessage = '';

                if (!responseVehicle.data.sucesso) {
                    errorMessage += `Erro ao atualizar veículo: ${responseVehicle.data.mensagem}\n`;
                }

                if (!responseVehicleUser.data.sucesso) {
                    errorMessage += `Erro ao atualizar dados do veículo para o usuário: ${responseVehicleUser.data.mensagem}`;
                }

                Swal.fire({
                    title: 'Erro!',
                    text: errorMessage || 'Ocorreu um erro ao atualizar as informações.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    iconColor: '#d33',
                    confirmButtonColor: '#d33',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: `Erro na requisição: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'Ok',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
        setShowForm(false);
    };

    const handleEditar = (veiculo) => {
        const vehicleData = {
            veic_id: veiculo.veic_id || "",
            veic_usu_id: veiculo.veic_usu_id || "",
            veic_placa: veiculo.veic_placa || "",
            data_inicial: veiculo.data_inicial || "",
            data_final: veiculo.data_final || "",
            mar_id: veiculo.mar_id || "",
            mar_nome: veiculo.mar_nome || "",
            mod_id: veiculo.mod_id || "",
            mod_nome: veiculo.mod_nome || "",
            veic_ano: veiculo.veic_ano || "",
            veic_cor: veiculo.veic_cor || "",
            veic_combustivel: veiculo.veic_combustivel || "",
            veic_observ: veiculo.veic_observ || "",
            ehproprietario: veiculo.ehproprietario !== undefined ? veiculo.ehproprietario.toString() : ""
        };

        setSelectedVehicle(vehicleData);
        setOriginalVehicle(veiculo);
        setShowForm(true);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleReturn = () => {
        setShowForm(false)
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Deseja Cancelar?",
            text: "As informações não serão salvas",
            icon: "warning",
            iconColor: "#ff9d00",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "rgb(40, 167, 69)",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
            reverseButtons: true,
            backdrop: "rgba(0,0,0,0.7)",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Cancelado!",
                    text: "As alterações foram canceladas.",
                    icon: "success",
                    iconColor: "rgb(40, 167, 69)",
                    confirmButtonColor: "rgb(40, 167, 69)",
                }).then(() => {
                    setSelectedVehicle(originalVehicle);
                    setShowForm(false);
                    setIsEditing(false);
                });
            }
        });
    };

    return (
        <>
            <div id="clientes" className={styles.content_section}>
                <h2 className={styles.title_page}>Meus Veículos</h2>
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
                                        onClick={() => handleEditar(veiculo)}
                                    >
                                        <span className={styles.iconeAlterar}></span>
                                    </button>

                                    <Link href="#" onClick={() => handleExcluirVeiculo(veiculo.veic_usu_id)} className={styles.link}>
                                        <span className={styles.iconeExcluir}></span>
                                    </Link>
                                </div>

                                <div className={styles.content}>
                                    <span className={styles.placa}>{veiculo.veic_placa}</span>
                                    <span className={styles.marca}>{veiculo.mar_nome}</span>
                                    <span className={styles.modelo}>{veiculo.mod_nome}</span>
                                    {/* <span className={styles.ano}>Ano: {veiculo.veic_ano}</span> */}
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
                    <>
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
                                        className={styles.input_veiculos}
                                        required
                                        disabled
                                    // disabled={!isEditing}
                                    />
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                                    <label htmlFor="veic_cor" className={styles.label_veiculos}>Cor</label>

                                    {isEditing ? (
                                        <>
                                            <select
                                                id="veic_cor"
                                                name="veic_cor"
                                                value={selectedVehicle.veic_cor}
                                                onChange={handleInputChange}
                                                className={styles.select_veiculos}
                                                required

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
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type="text"
                                                id="veic_cor"
                                                name="veic_cor"
                                                value={selectedVehicle.veic_cor}
                                                onChange={handleInputChange}
                                                required
                                                disabled
                                                className={styles.input_veiculos}
                                            />

                                        </>
                                    )}


                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                                    <label htmlFor="veic_combustivel" className={styles.label_veiculos}>Combustível</label>
                                    <select
                                        id="veic_combustivel"
                                        name="veic_combustivel"
                                        value={selectedVehicle.veic_combustivel}
                                        onChange={handleInputChange}
                                        className={styles.select_veiculos}
                                        required
                                        disabled={!isEditing}
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

                                <div className={`${styles.grid_item} ${styles.grid_datainicial}`}>
                                    <label htmlFor="data_inicial" className={styles.label_veiculos}>Data Inicial</label>
                                    <input
                                        type="date"
                                        id="data_inicial"
                                        name="data_inicial"
                                        value={selectedVehicle?.data_inicial ? format(parseISO(selectedVehicle.data_inicial), 'yyyy-MM-dd') : ''}
                                        onChange={handleInputChange}
                                        className={styles.input_veiculos}
                                        required
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_datafinal}`}>
                                    <label htmlFor="data_final" className={styles.label_veiculos}>Data Final</label>
                                    <input
                                        type="date"
                                        id="data_final"
                                        name="data_final"
                                        value={selectedVehicle?.data_final || ''}
                                        onChange={handleInputChange}
                                        className={styles.input_veiculos}
                                        required
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                                    <label htmlFor="ehproprietario" className={styles.label_veiculos}>Proprietário</label>
                                    <select
                                        id="ehproprietario"
                                        name="ehproprietario"
                                        value={selectedVehicle.ehproprietario || 0}
                                        onChange={handleInputChange}
                                        required

                                        disabled={!isEditing}
                                        className={styles.select_veiculos}
                                    >
                                        <option value="" disabled>Selecionar</option>
                                        <option value="1">Sim</option>
                                        <option value="0">Não</option>
                                    </select>
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                                    <label htmlFor="data_final" className={styles.label_veiculos}>Observações</label>
                                    <input
                                        type="text"
                                        id="veic_observ"
                                        name="veic_observ"
                                        value={selectedVehicle.veic_observ}
                                        onChange={handleInputChange}
                                        className={styles.input_veiculos}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                        </form>
                        <div className={styles.footer_form}>
                            {!isEditing ? (
                                <>
                                    <button type="button" onClick={handleReturn} className={styles.button_return}>Voltar</button>
                                    <button type="button" onClick={handleEdit} className={styles.button_edit}>Editar</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" onClick={handleCancel} className={styles.button_cancel}>Cancelar</button>
                                    <button type="submit" onClick={handleFormSubmit} className={styles.submitButton}>Salvar</button>
                                </>
                            )}
                        </div>

                    </>
                )}
            </div>
        </>
    );
}