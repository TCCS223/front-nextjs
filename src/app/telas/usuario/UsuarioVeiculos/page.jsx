import React from "react";
import { useState, useEffect } from 'react';
import Link from "next/link";
import styles from "./page.module.css";
import InputMask from "react-input-mask";
import { MdAdd } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";
import { FaMotorcycle } from "react-icons/fa6";
import { FaTruckFront } from "react-icons/fa6";
import { MdOutlineQuestionMark } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import Swal from "sweetalert2";

import api from "@/services/api";
import { parseISO, format } from "date-fns";

export default function UsuarioVeiculos() {
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [originalVehicle, setOriginalVehicle] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    // const [selectedCategoryId, setSelectedCategoryId] = useState("");
    // const [selectedBrandId, setSelectedBrandId] = useState("");


    const [selectedVehicle, setSelectedVehicle] = useState({
        veic_id: "",
        veic_usu_id: "",
        veic_placa: "",
        cat_nome: "",
        data_inicial: "",
        data_final: "",
        cat_nome: "",
        mar_id: "",
        mar_nome: "",
        mod_id: "",
        mod_nome: "",
        veic_ano: "",
        veic_cor: "",
        veic_combustivel: "",
        veic_observ: "",
        ehproprietario: "", 
        veic_situacao: 1,
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


    useEffect(() => {
        if (selectedVehicle.cat_id) {
            ListarMarcas();
        }
    }, [selectedVehicle.cat_id]);

    useEffect(() => {
        if (selectedVehicle.mar_id) {
            ListarModelos();
        }
    }, [selectedVehicle.mar_id]);

    const ListarVeiculosUsuario = async () => {
        if (!userId) return;

        try {
            const response = await api.get(`/veiculoUsuario/usuario/${userId}`);
            setVeiculos(response.data.dados);
            console.log(response.data.dados);


        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
        }
    }

    const ListarCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            setCategorias(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as categorias:", error);
        }
    }

    const ListarMarcas = async () => {

        try {
            const response = await api.get(`/marcas/categorias/${selectedVehicle.cat_id}`);
            setMarcas(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as marcas:", error);
        }
    }

    const ListarModelos = async () => {


        try {
            const response = await api.get(`/modelos/cat/${selectedVehicle.cat_id}/mar/${selectedVehicle.mar_id}`);
            setModelos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as marcas:", error);
        }
    }

    console.log(selectedVehicle);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setSelectedVehicle((prevVehicle) => ({
            ...prevVehicle,
            [name]: (name === 'cat_id' || name === 'mar_id' || name === 'mod_id' || name === 'ehproprietario')
                ? parseInt(value, 10)
                : name === 'veic_placa' 
                    ? value.toUpperCase() // Transforma as letras em maiúsculas apenas para veic_placa
                    : value
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

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const updatedVeiculo = {
    //         mod_id: selectedVehicle.mod_id || veiculos.mod_id,
    //         veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //     };
    
    //     let ehproprietario = selectedVehicle.ehproprietario !== undefined
    //         ? parseInt(selectedVehicle.ehproprietario, 10)
    //         : parseInt(veiculos.ehproprietario, 10);
    
    //     ehproprietario = !isNaN(ehproprietario) ? ehproprietario : 0;
    
    //     const updatedVeiculoUsuario = {
    //         veic_usu_id: selectedVehicle.veic_usu_id || veiculos.veic_usu_id,
    //         data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
    //         ehproprietario
    //     };



    //     const newVehicle = {
    //         mod_id: selectedVehicle.mod_id,
    //         veic_placa: selectedVehicle.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //         };
    
    //     try {
    //         let responseVehicle;
    //         let responseVehicleUser;
    
    //         // Se veic_id não existe, faz POST para criar o veículo
    //         if (!selectedVehicle.veic_id) {
    //             // POST para criar novo veículo
    //             responseVehicle = await api.post('/veiculos', newVehicle);
    
    //             if (responseVehicle.data.sucesso) {
    //                 const novoVeicId = responseVehicle.data.dados.veic_id;  // Pega o ID do veículo criado
    
    //                 // Cria a relação veículo-usuário após o veículo ter sido criado
    //                 updatedVeiculoUsuario.veic_id = novoVeicId;
    //                 responseVehicleUser = await api.post('/veiculoUsuario', {
    //                     ...updatedVeiculoUsuario,
    //                     veic_id: novoVeicId
    //                 });
    //             }
    //         } else {
    //             // Se veic_id existe, faz PATCH para atualizar
    //             [responseVehicle, responseVehicleUser] = await Promise.all([
    //                 api.patch(`/veiculos/${selectedVehicle.veic_id}`, updatedVeiculo),
    //                 api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, updatedVeiculoUsuario)
    //             ]);
    //         }
    
    //         if (responseVehicle.data.sucesso && responseVehicleUser.data.sucesso) {
    //             ListarVeiculosUsuario();
    
    //             Swal.fire({
    //                 title: 'Sucesso!',
    //                 text: 'O veículo foi criado e associado ao usuário com sucesso.',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK',
    //                 iconColor: "rgb(40, 167, 69)",
    //                 confirmButtonColor: "rgb(40, 167, 69)",
    //             });
    //         } else {
    //             let errorMessage = '';
    
    //             if (!responseVehicle.data.sucesso) {
    //                 errorMessage += `Erro ao criar veículo: ${responseVehicle.data.mensagem}\n`;
    //             }
    
    //             if (!responseVehicleUser.data.sucesso) {
    //                 errorMessage += `Erro ao associar veículo ao usuário: ${responseVehicleUser.data.mensagem}`;
    //             }
    
    //             Swal.fire({
    //                 title: 'Erro!',
    //                 text: errorMessage || 'Ocorreu um erro ao criar o veículo.',
    //                 icon: 'error',
    //                 confirmButtonText: 'Ok',
    //                 iconColor: '#d33',
    //                 confirmButtonColor: '#d33',
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             title: 'Erro!',
    //             text: `Erro na requisição: ${error.message}`,
    //             icon: 'error',
    //             confirmButtonText: 'Ok',
    //             iconColor: '#d33',
    //             confirmButtonColor: '#d33',
    //         });
    //     }
    
    //     setShowForm(false);
    // };
   
    

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const updatedVeiculo = {
    //         mod_id: selectedVehicle.mod_id || veiculos.mod_id,
    //         veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //     };
    
    //     const newVehicle = {
    //         mod_id: selectedVehicle.mod_id,
    //         veic_placa: selectedVehicle.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //     };
    
    //     let ehproprietario = selectedVehicle.ehproprietario !== undefined
    //         ? parseInt(selectedVehicle.ehproprietario, 10)
    //         : parseInt(veiculos.ehproprietario, 10);
    
    //     ehproprietario = !isNaN(ehproprietario) ? ehproprietario : 0;
    
    //     const updatedVeiculoUsuario = {
    //         veic_usu_id: selectedVehicle.veic_usu_id || veiculos.veic_usu_id,
    //         data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
    //         ehproprietario
    //     };
    
    //     try {

    //         console.log("Dados do veículo:", newVehicle);
    //         console.log("Dados do veículo (atualização):", updatedVeiculo);
    //         console.log("Dados do relacionamento:", updatedVeiculoUsuario);


    //         let responseVehicle;
    //         let responseVehicleUser;
    
    //         // Se veic_id não existe, faz POST para criar o veículo
    //         if (!selectedVehicle.veic_id) {
    //             // POST para criar novo veículo
    //             responseVehicle = await api.post('/veiculos', newVehicle);
    
    //             if (responseVehicle.data.sucesso) {
    //                 const novoVeicId = responseVehicle.data.dados; // Pega o ID do veículo criado
    
    //                 // Define o veic_id para criar a relação com o usuário
    //                 updatedVeiculoUsuario.veic_id = novoVeicId;
    
    //                 // POST para criar nova relação veículo-usuário
    //                 responseVehicleUser = await api.post('/veiculoUsuario', updatedVeiculoUsuario);
    //             }
    //         } else {
    //             // Se veic_id existe, faz PATCH para atualizar o veículo e o relacionamento
    //             [responseVehicle, responseVehicleUser] = await Promise.all([
    //                 api.patch(`/veiculos/${selectedVehicle.veic_id}`, updatedVeiculo),
    //                 api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, updatedVeiculoUsuario)
    //             ]);
    //         }
    
    //         if (responseVehicle.data.sucesso && (!responseVehicleUser || responseVehicleUser.data.sucesso)) {
    //             ListarVeiculosUsuario();
    
    //             Swal.fire({
    //                 title: 'Sucesso!',
    //                 text: 'O veículo e os dados do usuário foram processados com sucesso.',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK',
    //                 iconColor: "rgb(40, 167, 69)",
    //                 confirmButtonColor: "rgb(40, 167, 69)",
    //             });
    //         } else {
    //             let errorMessage = '';
    
    //             if (!responseVehicle.data.sucesso) {
    //                 errorMessage += `Erro ao processar veículo: ${responseVehicle.data.mensagem}\n`;
    //             }
    
    //             if (responseVehicleUser && !responseVehicleUser.data.sucesso) {
    //                 errorMessage += `Erro ao processar dados do veículo para o usuário: ${responseVehicleUser.data.mensagem}`;
    //             }
    
    //             Swal.fire({
    //                 title: 'Erro!',
    //                 text: errorMessage || 'Ocorreu um erro ao processar as informações.',
    //                 icon: 'error',
    //                 confirmButtonText: 'Ok',
    //                 iconColor: '#d33',
    //                 confirmButtonColor: '#d33',
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Erro completo na requisição:", error.response);
    //         Swal.fire({
    //             title: 'Erro!',
    //             text: `Erro na requisição: ${error.response ? error.response.data.mensagem : error.message}`,
    //             icon: 'error',
    //             confirmButtonText: 'Ok',
    //             iconColor: '#d33',
    //             confirmButtonColor: '#d33',
    //         });
    //     }
    
    //     setShowForm(false);
    // };
    


    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const updatedVeiculo = {
    //         mod_id: selectedVehicle.mod_id || veiculos.mod_id,
    //         veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //     };
    
    //     const newVehicle = {
    //         mod_id: selectedVehicle.mod_id,
    //         veic_placa: selectedVehicle.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //     };
    
    //     let ehproprietario = selectedVehicle.ehproprietario !== undefined
    //         ? parseInt(selectedVehicle.ehproprietario, 10)
    //         : parseInt(veiculos.ehproprietario, 10);
    
    //     ehproprietario = !isNaN(ehproprietario) ? ehproprietario : 0;
    
    //     const updatedVeiculoUsuario = {
    //         veic_usu_id: selectedVehicle.veic_usu_id || veiculos.veic_usu_id,
    //         data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
    //         ehproprietario
    //     };
    
    //     // Nova constante para os dados do usuário do veículo
    //     const newVehicleUsuario = {
    //         veic_id: responseVehicle.data.dados, // Atribua o ID do veículo criado
    //         usu_id: selectedVehicle.usu_id || updatedVeiculoUsuario.veic_usu_id, // O ID do usuário deve ser atribuído corretamente
    //         ehproprietario: updatedVeiculoUsuario.ehproprietario,
    //         data_inicial: updatedVeiculoUsuario.data_inicial
    //     };
        
    
    //     try {
    //         let responseVehicle;
    //         let responseVehicleUser;
        
    //         if (!selectedVehicle.veic_id) {
    //             // POST para criar novo veículo
    //             responseVehicle = await api.post('/veiculos', newVehicle);
        
    //             // Verifique se a criação do veículo foi bem-sucedida
    //             if (responseVehicle.data.sucesso) {
    //                 const novoVeicId = responseVehicle.data.dados; // Atribua o ID do veículo criado
        
    //                 // Nova constante para os dados do usuário do veículo
    //                 const newVehicleUsuario = {
    //                     veic_id: novoVeicId, // Atribua o ID do veículo criado
    //                     usu_id: selectedVehicle.usu_id || updatedVeiculoUsuario.veic_usu_id,
    //                     ehproprietario: updatedVeiculoUsuario.ehproprietario,
    //                     data_inicial: updatedVeiculoUsuario.data_inicial
    //                 };
        
    //                 // Log para verificar os dados
    //                 console.log('Dados do novo veículo usuário:', newVehicleUsuario);
        
    //                 // Verifique se os dados necessários estão presentes
    //                 if (!newVehicleUsuario.usu_id || !newVehicleUsuario.data_inicial) {
    //                     throw new Error('Usuário ID e Data Inicial são obrigatórios para o relacionamento.');
    //                 }
        
    //                 // Crie a relação do veículo com o usuário
    //                 responseVehicleUser = await api.post('/veiculoUsuario', newVehicleUsuario);
    //                 console.log('Resposta do relacionamento veículo-usuário:', responseVehicleUser.data);
    //             }
    //         } else {
    //             // Se veic_id existe, faz PATCH para atualizar
    //             responseVehicle = await api.patch(`/veiculos/${selectedVehicle.veic_id}`, updatedVeiculo);
    //             // Log para verificar a resposta da atualização do veículo
    //             console.log('Resposta da atualização do veículo:', responseVehicle.data);
        
    //             if (updatedVeiculoUsuario.ehproprietario !== undefined) {
    //                 responseVehicleUser = await api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, updatedVeiculoUsuario);
    //                 console.log('Resposta da atualização do usuário do veículo:', responseVehicleUser.data);
    //             } else {
    //                 throw new Error('Ehproprietario deve estar definido para atualizar o relacionamento.');
    //             }
    //         }
        
    //         // Verifica as respostas
    //         if (responseVehicle && responseVehicle.data.sucesso) {
    //             ListarVeiculosUsuario();
        
    //             Swal.fire({
    //                 title: 'Sucesso!',
    //                 text: 'O veículo foi criado/atualizado com sucesso.',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK',
    //                 iconColor: "rgb(40, 167, 69)",
    //                 confirmButtonColor: "rgb(40, 167, 69)",
    //             });
    //         } else {
    //             Swal.fire({
    //                 title: 'Erro!',
    //                 text: `Erro ao criar/atualizar veículo: ${responseVehicle ? responseVehicle.data.mensagem : 'Erro desconhecido.'}`,
    //                 icon: 'error',
    //                 confirmButtonText: 'Ok',
    //                 iconColor: '#d33',
    //                 confirmButtonColor: '#d33',
    //             });
    //         }
        
    //         // Verifica a resposta do usuário do veículo
    //         if (responseVehicleUser && responseVehicleUser.data.sucesso) {
    //             Swal.fire({
    //                 title: 'Sucesso!',
    //                 text: 'O relacionamento veículo-usuário foi criado/atualizado com sucesso.',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK',
    //                 iconColor: "rgb(40, 167, 69)",
    //                 confirmButtonColor: "rgb(40, 167, 69)",
    //             });
    //         }
    //     } 
    //     catch (error) {
    //         console.error("Erro completo na requisição:", error.response);
    //         Swal.fire({
    //             title: 'Erro!',
    //             text: `Erro na requisição: ${error.response ? error.response.data.mensagem : error.message}`,
    //             icon: 'error',
    //             confirmButtonText: 'Ok',
    //             iconColor: '#d33',
    //             confirmButtonColor: '#d33',
    //         });
    //     }
        
    
    //     setShowForm(false);
    // };
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // 1. Definindo as constantes para o novo veículo e o veículo atualizado
        const NovoVeiculo = {
            mod_id: selectedVehicle.mod_id,
            veic_placa: selectedVehicle.veic_placa,
            veic_ano: selectedVehicle.veic_ano,
            veic_cor: selectedVehicle.veic_cor,
            veic_combustivel: selectedVehicle.veic_combustivel,
            veic_observ: selectedVehicle.veic_observ,
            veic_situacao: selectedVehicle.veic_situacao
        };
    
        const UpdateVeiculo = {
            mod_id: selectedVehicle.mod_id || veiculos.mod_id,
            veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
            veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
            veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
            veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
            veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
            veic_situacao: selectedVehicle.veic_situacao
        };
    
        // 2. Definindo a constante para o veículo usuário atualizado
        const UpdateVeiculoUsuario = {
            veic_usu_id: selectedVehicle.veic_usu_id || veiculos.veic_usu_id,
            data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
            ehproprietario: selectedVehicle.ehproprietario !== undefined
                ? parseInt(selectedVehicle.ehproprietario, 10)
                : parseInt(veiculos.ehproprietario, 10)
        };
    
        // 3. Inicializando a variável para o NovoVeiculoUsuario
        let NovoVeiculoUsuario;
    
        try {
            let responseVehicle;
    
            // 4. Verifica se o veículo deve ser criado ou atualizado
            if (!selectedVehicle.veic_id) {
                // Criando um novo veículo
                responseVehicle = await api.post('/veiculos', NovoVeiculo);
                console.log("teste:", responseVehicle.data.dados);
                
                if (responseVehicle.data.sucesso) {
                    const newVeic_id = responseVehicle.data.dados; // Obtendo o ID do veículo criado
    
                    // 5. Criando o NovoVeiculoUsuario
                    NovoVeiculoUsuario = {
                        veic_id: newVeic_id,
                        usu_id: userId,
                        data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
                        ehproprietario: selectedVehicle.ehproprietario !== undefined
                            ? parseInt(selectedVehicle.ehproprietario, 10)
                            : parseInt(veiculos.ehproprietario, 10)
                    };

                    console.log("enviando: ", NovoVeiculoUsuario );
                    
    
                    // 6. Enviando a requisição para criar a relação veículo-usuário
                    await api.post('/veiculoUsuario', NovoVeiculoUsuario);
                }
            } else {
                // Atualizando o veículo existente
                responseVehicle = await api.patch(`/veiculos/${selectedVehicle.veic_id}`, UpdateVeiculo);
                // Atualizando o veículo-usuário existente
                await api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, UpdateVeiculoUsuario);
            }
    
            // 7. Mensagem de sucesso
            Swal.fire({
                title: 'Sucesso!',
                text: 'O veículo foi criado/atualizado com sucesso.',
                icon: 'success',
                confirmButtonText: 'OK',
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            });
    
            // Atualiza a lista de veículos do usuário
            ListarVeiculosUsuario();
        } catch  (error) {
            console.error("Erro completo na requisição:", error.response);
            Swal.fire({
                title: 'Erro!',
                text: `Erro na requisição: ${error.response ? error.response.data.mensagem : error.message}`,
                icon: 'error',
                confirmButtonText: 'Ok',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    
        setShowForm(false);
    };
    

    



    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const updatedVeiculo = {
    //         mod_id: selectedVehicle.mod_id || veiculos.mod_id,
    //         veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //     };
    
    //     const newVehicle = {
    //         mod_id: selectedVehicle.mod_id,
    //         veic_placa: selectedVehicle.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ,
    //         veic_situacao: selectedVehicle.veic_situacao
    //     };


    //     let ehproprietario = selectedVehicle.ehproprietario !== undefined
    //         ? parseInt(selectedVehicle.ehproprietario, 10)
    //         : parseInt(veiculos.ehproprietario, 10);

    //     ehproprietario = !isNaN(ehproprietario) ? ehproprietario : 0;

    //     const updatedVeiculoUsuario = {
    //         veic_usu_id: selectedVehicle.veic_usu_id || veiculos.veic_usu_id,
    //         data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
    //         // data_final: selectedVehicle.data_final || veiculos.data_final,
    //         ehproprietario
    //     };
    
    //     try {
    //         let responseVehicle;
    //         let responseVehicleUser;
    
    //         // Se veic_id não existe, faz POST para criar o veículo
    //         if (!selectedVehicle.veic_id) {
    //             // POST para criar novo veículo
    //             responseVehicle = await api.post('/veiculos', newVehicle);
    //         } else {
    //             // Se veic_id existe, faz PATCH para atualizar o veículo
    //             responseVehicle = await api.patch(`/veiculos/${selectedVehicle.veic_id}`, updatedVeiculo);

    //             const [responseVehicle, responseVehicleUser] = await Promise.all([
    //                             api.patch(`/veiculos/usuario/${selectedVehicle.veic_id}`, updatedVeiculo),
    //                             api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, updatedVeiculoUsuario)
    //                         ]);
    //         }
    
    //         if (responseVehicle.data.sucesso) {
    //             ListarVeiculosUsuario();
    
    //             Swal.fire({
    //                 title: 'Sucesso!',
    //                 text: 'O veículo foi criado/atualizado com sucesso.',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK',
    //                 iconColor: "rgb(40, 167, 69)",
    //                 confirmButtonColor: "rgb(40, 167, 69)",
    //             });
    //         } else {
    //             Swal.fire({
    //                 title: 'Erro!',
    //                 text: `Erro ao criar/atualizar veículo: ${responseVehicle.data.mensagem}`,
    //                 icon: 'error',
    //                 confirmButtonText: 'Ok',
    //                 iconColor: '#d33',
    //                 confirmButtonColor: '#d33',
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             title: 'Erro!',
    //             text: `Erro na requisição: ${error.message}`,
    //             icon: 'error',
    //             confirmButtonText: 'Ok',
    //             iconColor: '#d33',
    //             confirmButtonColor: '#d33',
    //         });
    //     }
    
    //     setShowForm(false);
    // };
    


    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();

    //     const updatedVeiculo = {
    //         mod_id: selectedVehicle.mod_id || veiculos.mod_id,
    //         veic_placa: selectedVehicle.veic_placa || veiculos.veic_placa,
    //         veic_ano: selectedVehicle.veic_ano || veiculos.veic_ano,
    //         veic_cor: selectedVehicle.veic_cor || veiculos.veic_cor,
    //         veic_combustivel: selectedVehicle.veic_combustivel || veiculos.veic_combustivel,
    //         veic_observ: selectedVehicle.veic_observ || veiculos.veic_observ,
    //     };

    //     let ehproprietario = selectedVehicle.ehproprietario !== undefined
    //         ? parseInt(selectedVehicle.ehproprietario, 10)
    //         : parseInt(veiculos.ehproprietario, 10);

    //     ehproprietario = !isNaN(ehproprietario) ? ehproprietario : 0;

    //     const updatedVeiculoUsuario = {
    //         veic_usu_id: selectedVehicle.veic_usu_id || veiculos.veic_usu_id,
    //         data_inicial: selectedVehicle.data_inicial || veiculos.data_inicial,
    //         // data_final: selectedVehicle.data_final || veiculos.data_final,
    //         ehproprietario
    //     };


    //     // const newVeiculo ={

    //     // }

    //     try {
    //         let responseVehicle;
    //         let responseVehicleUser;

    //         // Verifica se o veic_id existe, caso contrário faz um POST.
    //         if (selectedVehicle.veic_id) {
    //             // Requisição de PATCH se veic_id existir
    //             [responseVehicle, responseVehicleUser] = await Promise.all([
    //                 api.patch(`/veiculos/usuario/${selectedVehicle.veic_id}`, updatedVeiculo),
    //                 api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, updatedVeiculoUsuario)
    //             ]);
    //         } else {
    //             // Requisição de POST se veic_id não existir
    //             [responseVehicle, responseVehicleUser] = await Promise.all([
    //                 api.post(`/veiculos`, updatedVeiculo),  // POST para criar novo veículo
    //                 // api.post(`/veiculoUsuario`, updatedVeiculoUsuario)  // POST para criar nova relação veículo-usuário
    //             ]);
    //         }


    //         // const [responseVehicle, responseVehicleUser] = await Promise.all([
    //         //     api.patch(`/veiculos/usuario/${selectedVehicle.veic_id}`, updatedVeiculo),
    //         //     api.patch(`/veiculoUsuario/${selectedVehicle.veic_usu_id}`, updatedVeiculoUsuario)
    //         // ]);

    //         if (responseVehicle.data.sucesso && responseVehicleUser.data.sucesso) {
    //             ListarVeiculosUsuario();

    //             Swal.fire({
    //                 title: 'Sucesso!',
    //                 text: 'O veículo e os dados do usuário foram atualizados com sucesso.',
    //                 icon: 'success',
    //                 confirmButtonText: 'OK',
    //                 iconColor: "rgb(40, 167, 69)",
    //                 confirmButtonColor: "rgb(40, 167, 69)",
    //             });
    //         } else {
    //             let errorMessage = '';

    //             if (!responseVehicle.data.sucesso) {
    //                 errorMessage += `Erro ao atualizar veículo: ${responseVehicle.data.mensagem}\n`;
    //             }

    //             if (!responseVehicleUser.data.sucesso) {
    //                 errorMessage += `Erro ao atualizar dados do veículo para o usuário: ${responseVehicleUser.data.mensagem}`;
    //             }

    //             Swal.fire({
    //                 title: 'Erro!',
    //                 text: errorMessage || 'Ocorreu um erro ao atualizar as informações.',
    //                 icon: 'error',
    //                 confirmButtonText: 'Ok',
    //                 iconColor: '#d33',
    //                 confirmButtonColor: '#d33',
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             title: 'Erro!',
    //             text: `Erro na requisição: ${error.message}`,
    //             icon: 'error',
    //             confirmButtonText: 'Ok',
    //             iconColor: '#d33',
    //             confirmButtonColor: '#d33',
    //         });
    //     }
    //     setShowForm(false);
    // };

    const handleEditar = (veiculo) => {
        const vehicleData = {
            veic_id: veiculo.veic_id || "",
            veic_usu_id: veiculo.veic_usu_id || "",
            veic_placa: veiculo.veic_placa || "",
            data_inicial: veiculo.data_inicial || "",
            // data_final: veiculo.data_final || "",
            cat_nome: veiculo.cat_nome || "",
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
        setIsEditing(true);
        setIsCreate(false);
        setIsViewing(false);
    };

    const handleVisualizar = (veiculo) => {
        setSelectedVehicle(veiculo);
        setIsViewing(true);
        setIsEditing(false);
        setIsCreate(false);
        setShowForm(true);
    };

    const CreateVeiculo = () => {
        const vehicleData = {
            veic_id: "",
            veic_usu_id: "",
            veic_placa: "",
            data_inicial: "",
            // data_final: "",
            cat_nome: "",
            mar_id: "",
            mar_nome: "",
            mod_id: "",
            mod_nome: "",
            veic_ano: "",
            veic_cor: "",
            veic_combustivel: "",
            veic_observ: "",
            ehproprietario: 0,
            veic_situacao: 1
        };
        ListarCategorias();
        // ListarMarcas();
        // ListarModelos();
        setSelectedVehicle(vehicleData);
        setShowForm(true);
        setIsCreate(true);
        setIsEditing(false);
        setIsViewing(false);
    }



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
                    <>
                        <ol className={styles.fundocards}>
                            {veiculos.map((veiculo) => (
                                <li key={veiculo.veic_id} className={styles.lista}>

                                    <div className={styles.icone}>
                                        <div className={styles.icone}>
                                            {veiculo.cat_id === 1 ? (
                                                <FaTruckFront className={styles.iconeVeiculo} />

                                            ) : veiculo.cat_id === 2 ? (
                                                <IoCarSport className={styles.iconeVeiculo} />

                                            ) : veiculo.cat_id === 3 ? (
                                                <FaMotorcycle className={styles.iconeVeiculo} /> // ícone para Caminhão (ou outro veículo)
                                            ) : (
                                                <MdOutlineQuestionMark className={styles.iconeVeiculo} /> // ícone padrão para categoria desconhecida
                                            )}
                                        </div>

                                    </div>

                                    <div className={styles.botoeslink}>
                                        <MdRemoveRedEye
                                            onClick={() => handleVisualizar(veiculo)}
                                            className={styles.iconeVisualizar}
                                        />

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
                            {/* <li className={`${styles.lista} ${styles.listaAddVeiculo}`}>
                                    <MdAdd
                                        className={styles.iconeAddVeiculo}
                                    />
                                    <span className={styles.textAddVeiculo}>Cadastrar veículo</span>
                                </li> */}
                            <li
                                className={`${styles.lista} ${styles.listaAddVeiculo}`}
                                onClick={CreateVeiculo}>
                                <MdAdd
                                    className={styles.iconeAddVeiculo}
                                />
                            </li>
                        </ol>

                    </>
                ) : (
                    <>
                        <form id="veiculoForm" className={styles.form} onSubmit={handleFormSubmit}>
                            <div className={styles.grid}>

                                <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                                    <label htmlFor="veic_id" className={styles.label_veiculos}>Código</label>
                                    <input
                                        type="text"
                                        id="veic_id"
                                        name="veic_id"
                                        value={selectedVehicle.veic_id}
                                        onChange={handleInputChange}
                                        required
                                        disabled
                                        className={styles.input_veiculos}
                                    />
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                                    <label htmlFor="veic_id" className={styles.label_veiculos}>Categoria</label>
                                    {isCreate ? (
                                        <select
                                            name="cat_id"
                                            id="cat_id"
                                            value={selectedVehicle.cat_id}
                                            onChange={handleInputChange}
                                            className={styles.select_veiculos}
                                            required
                                        >
                                            <option value="" hidden>Selecione</option>
                                            {
                                                categorias.map((categoria) => (
                                                    <option key={categoria.cat_id} value={categoria.cat_id}>{categoria.cat_nome}</option>
                                                ))
                                            }
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            id="cat_nome"
                                            name="cat_nome"
                                            value={selectedVehicle.cat_nome}
                                            onChange={handleInputChange}
                                            className={styles.input_veiculos}
                                            disabled
                                            required
                                        />

                                    )}
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                                    <label htmlFor="mar_nome" className={styles.label_veiculos}>Marca</label>
                                    {isCreate ? (
                                        <select
                                            name="mar_id"
                                            id="mar_id"
                                            value={selectedVehicle.mar_id}
                                            onChange={handleInputChange}
                                            className={styles.select_veiculos}
                                            required
                                            disabled={!selectedVehicle.cat_id}
                                        // disabled={!selectedCategoryId}
                                        >
                                            <option value="" hidden>Selecione</option>
                                            {
                                                marcas.map((marca) => (
                                                    <option key={marca.mar_id} value={marca.mar_id}>{marca.mar_nome}</option>
                                                ))
                                            }
                                        </select>
                                    ) : (
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
                                    )}

                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                                    <label htmlFor="mod_nome" className={styles.label_veiculos}>Modelo</label>

                                    {isCreate ? (
                                        <select
                                            name="mod_id"
                                            id="mod_id"
                                            value={selectedVehicle.mod_id}
                                            onChange={handleInputChange}
                                            className={styles.select_veiculos}
                                            disabled={!selectedVehicle.mar_id}
                                            required
                                        // disabled={!selectedBrandId}
                                        >
                                            <option value="" hidden>Selecione</option>
                                            {
                                                modelos.map((modelo) => (
                                                    <option key={modelo.mod_id} value={modelo.mod_id}>{modelo.mod_nome}</option>
                                                ))
                                            }
                                        </select>
                                    ) : (
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
                                    )}

                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                                    <label htmlFor="veic_placa" className={styles.label_veiculos}>Placa</label>
                                    <InputMask
                                        mask="aaa-9*99"
                                        type="text"
                                        id="veic_placa"
                                        name="veic_placa"
                                        value={selectedVehicle.veic_placa}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!isCreate && !isEditing}
                                        className={styles.input_veiculos}
                                        placeholder="Letras e números"
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
                                        disabled={!isCreate && !isEditing}
                                    />
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                                    <label htmlFor="veic_cor" className={styles.label_veiculos}>Cor</label>

                                    {isViewing ? (
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
                                    ) : (
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
                                    )}


                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                                    <label htmlFor="veic_combustivel" className={styles.label_veiculos}>Combustível</label>

                                    {isCreate || isEditing ? (
                                        <select
                                            id="veic_combustivel"
                                            name="veic_combustivel"
                                            value={selectedVehicle.veic_combustivel}
                                            onChange={handleInputChange}
                                            className={styles.select_veiculos}
                                            required
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
                                    ) : (
                                        <input
                                            type="text"
                                            id="veic_combustivel"
                                            name="veic_combustivel"
                                            value={selectedVehicle.veic_combustivel}
                                            onChange={handleInputChange}
                                            className={styles.input_veiculos}
                                            disabled
                                        />
                                    )}


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
                                        disabled={!isCreate && !isEditing}
                                    />
                                </div>


                                <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                                    <label htmlFor="" className={styles.label_veiculos}>Proprietário</label>

                                    {isViewing ? (
                                        <>
                                            <input
                                                type="text"
                                                id="ehproprietario"
                                                name="ehproprietario"
                                                value={selectedVehicle.ehproprietario === 1 ? "Sim" : "Não"}
                                                onChange={handleInputChange}
                                                className={styles.input_veiculos}

                                            />
                                        </>
                                    ) : (
                                        <>
                                            <select
                                                id="ehproprietario"
                                                name="ehproprietario"
                                                value={selectedVehicle.ehproprietario || 0}
                                                onChange={handleInputChange}
                                                required

                                                className={styles.select_veiculos}
                                            >
                                                <option value="" disabled>Selecionar</option>
                                                <option value="1">Sim</option>
                                                <option value="0">Não</option>
                                            </select>
                                        </>
                                    )}


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
                                        disabled={!isCreate && !isEditing}
                                    />
                                </div>
                            </div>

                        </form>

                        <div className={styles.footer_form}>

                            {isViewing ? (
                                <button type="button" onClick={handleReturn} className={styles.button_return}>Voltar</button>
                            ) : (
                                <>
                                    <button type="button" onClick={handleCancel} className={styles.button_cancel}>Cancelar</button>
                                    <button type="submit" onClick={handleFormSubmit} className={styles.submitButton}>Salvar</button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div >
        </>
    );
}