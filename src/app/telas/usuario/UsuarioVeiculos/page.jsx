import React from "react";
import { useState, useEffect } from 'react';
import Link from "next/link";
import styles from "./page.module.css";
import Swal from "sweetalert2";
import api from "@/services/api";

export default function UsuarioVeiculos() {
    const [showForm, setShowForm] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState({
        placa: "",
        marca: "",
        modelo: ""
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

        

            console.log("veiculos:", response.data.dados);
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
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Dados atualizados do veículo:", selectedVehicle);
        setShowForm(false);
    };

    const [usuarioVeiculo, setUsuarioVeiculo] = useState([]);

    async function fetchUsuarioVeiculo() {
        try {
            const response = await api.get('/veiculoUsuario');
            // console.log(Array.isArray(teste)); // Adicionando um log para inspecionar os dados
            setUsuarioVeiculo(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error.response ? error.response.data : error.message);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os usuários.",
                icon: "error",
                confirmButtonColor: "rgb(40, 167, 69)",
            });
        }
    }

    useEffect(() => {
        fetchUsuarioVeiculo();
    }, []);

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
                        <li key={veiculo.veic_usu_id} className={styles.lista}>
                            <div className={styles.icone}>
                                <span className={styles.iconeCarro}></span>
                            </div>
                
                            <div className={styles.botoeslink}>
                                <button
                                    className={styles.link}
                                    onClick={() =>
                                        handleAlterarClick({
                                            placa: veiculo.veic_placa,
                                            marca: veiculo.marca,
                                            modelo: veiculo.modelo
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
                                <span className={styles.marca}>{veiculo.marca}</span>
                                <span className={styles.modelo}>{veiculo.modelo}</span>
                                <span className={styles.ano}>Ano: {veiculo.veic_ano}</span>
                                {/* <span className={styles.cor}>Cor: {veiculo.veic_cor}</span> */}
                                {/* <span className={styles.combustivel}>Combustível: {veiculo.veic_combustivel}</span>
                                <span className={styles.observacoes}>{veiculo.veic_observ}</span> */}
                                {veiculo.ehproprietario === 1 ? (
                                    <span className={styles.proprietario}>Proprietário</span>
                                ): (
                                    <span className={styles.naoProprietario}>Não Proprietário</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
                
                ) : (
                    <form id="veiculoForm" className={styles.form}>
                        <input type="hidden" id="veiculoId" className={styles.input_veiculos} />

                        <div className={styles.grid}>
                            <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                                <label htmlFor="codigo_veiculo" className={styles.label_veiculos}>Código</label>
                                <input type="text" id="placa_veiculo" name="placa_veiculo" required disabled className={styles.input_veiculos} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                                <label htmlFor="placa_veiculo" className={styles.label_veiculos}>Placa</label>
                                <input type="text" id="placa_veiculo" name="placa_veiculo_veiculo" required className={styles.input_veiculos} placeholder="Letras e números" />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                                <label htmlFor="categoria_veiculo" className={styles.label_veiculos}>Categoria</label>
                                <select id="categoria_veiculo" name="categoria_veiculo" required className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                                    <option value="" disabled selected>Selecionar</option>
                                    <option value="1">Caminhão</option>
                                    <option value="2">Carro</option>
                                    <option value="3">Moto</option>
                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                                <label htmlFor="marca_veiculo" className={styles.label_veiculos}>Marca</label>
                                <select id="marca" name="marca" required className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                                    <option value="" disabled selected>Selecionar</option>

                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                                <label htmlFor="modelo_veiculo" className={styles.label_veiculos}>Modelo</label>
                                <select id="modelo_veiculo" name="modelo_veiculo" required className={`${styles.select_veiculos} ${styles.input_modelo}`}>
                                    <option value="" disabled selected>Selecionar</option>
                                    <option value="1">Modelo A</option>
                                    <option value="2">Modelo B</option>
                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_ano}`}>
                                <label htmlFor="ano_veiculo" className={styles.label_veiculos}>Ano</label>
                                <input type="number" id="ano_veiculo" name="ano_veiculo" required className={styles.input_veiculos} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                                <label htmlFor="cor_veiculo" className={styles.label_veiculos}>Cor</label>
                                <select id="cor" name="cor" required className={`${styles.select_veiculos} ${styles.input_cor}`} defaultValue="">
                                    <option value="" disabled selected>Selecionar</option>
                                    <option value="Amarelo">Amarelo</option>
                                    <option value="Azul">Azul</option>
                                    <option value="Branco">Branco</option>
                                    <option value="Preto">Preto</option>
                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                                <label htmlFor="combustivel_veiculo" className={styles.label_veiculos}>Combustível</label>
                                <select id="combustivel_veiculo" name="combustivel_veiculo" required className={`${styles.select_veiculos} ${styles.input_combustivel}`}>
                                    <option value="" disabled selected>Selecionar</option>
                                    <option value="gasolina">Gasolina</option>
                                    <option value="alcool">Álcool</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="flex">Flex</option>
                                    <option value="gnv">GNV</option>
                                    <option value="eletrico">Elétrico</option>
                                    <option value="hibrido">Híbrido</option>
                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                                <label htmlFor="proprietario_veiculo" className={styles.label_veiculos}>Você é proprietário?</label>
                                <select id="nivel_acesso" name="nivel_acesso" className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                                    <option value="" disabled selected>Selecionar</option>
                                    <option value="0">Sim</option>
                                    <option value="1">Não</option>
                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                                <label htmlFor="observacoes_veiculo" className={styles.label_veiculos}>Observações</label>
                                <input type="text" id="observacoes_veiculo" name="observacoes_veiculo" className={styles.input_veiculos} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                                <label htmlFor="situacao_veiculo" className={styles.label_veiculos}>Situação</label>
                                <select id="situacao_veiculo" name="situacao_veiculo" className={`${styles.select_veiculos} ${styles.input_situacao}`}>
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
