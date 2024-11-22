import React, { useState } from 'react';
import styles from './index.module.css';
import { useEffect } from 'react';
import api from '@/services/api';
import Swal from 'sweetalert2';

// import InputMask from "react-input-mask";
// import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export default function FormAgendamentos({ selectedAgend, setSelectedAgend, isViewing, handleSubmit, isEditing, }) {

    const [veiculos, setVeiculos] = useState([]);



    //-------------------------------------------------------------------
    const [servicos, setServicos] = useState([])
    const [catServicos, setCatServicos] = useState([])
    const [selectedCategoria, setSelectedCategoria] = useState(selectedAgend?.cat_serv_id);
    const [isServicoDisabled, setIsServicoDisabled] = useState(false);


    useEffect(() => {
        ListarCategoriasServAtivas();
        // ListarServicos();
    }, [])

    useEffect(() => {
        if (selectedCategoria) {
            ListarServicos(selectedCategoria);
        }
    }, [selectedCategoria])


    useEffect(() => {
        // Sincroniza o estado inicial com a categoria selecionada do agendamento
        if (selectedAgend) {
          setSelectedCategoria(selectedAgend.cat_serv_id || "");
        }
      }, [selectedAgend]);

    // const handleCategoryChange = (e) => {
    //     const selectedCategoryId = parseInt(e.target.value, 10);
    //     setSelectedCategoria(selectedCategoryId); // Atualiza o estado da categoria
    //   };

    const handleCategoryChange = (e) => {
        const newCategoryId = e.target.value;
    
        // Atualiza o estado local
        setSelectedCategoria(newCategoryId);
    
        // Atualiza o estado pai, se necessário
        if (setSelectedAgend) {
          setSelectedAgend((prevAgend) => ({
            ...prevAgend,
            cat_serv_id: newCategoryId,
          }));
        }
      };

    const ListarCategoriasServAtivas = async () => {
        try {
            const response = await api.get('/categoriasServicosAtivas');
            setCatServicos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as categorias:", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível buscar as categorias.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    }

    const ListarServicos = async (selectedCategoria) => {
        console.log("passando por aqui:", selectedCategoria);
    
        try {
            // Realizando a requisição à API
            const response = await api.get(`/servicos/categoria/${selectedCategoria}`);
            
            // Exibe no console o que veio na resposta
            console.log("Resposta da API:", response);
    
            // Verificar se a resposta indica "Nenhum serviço encontrado"
            if (response.data.sucesso === false && response.data.status === 200) {
                // Mostrar um alerta de warning
                Swal.fire({
                    title: 'Atenção!',
                    text: 'Nenhum serviço encontrado para essa categoria.',
                    icon: 'warning',
                    iconColor: '#f39c12',
                    confirmButtonColor: '#f39c12',
                });
    
                // Desabilitar o campo de serviços
                setServicos([]);              // Limpa a lista de serviços
                setServicoSelecionado(null);  // Reseta o valor selecionado, se necessário
                setIsServicoDisabled(true);   // Desabilita o campo de seleção de serviços
                
            } else {
                // Caso contrário, lista os serviços
                setServicos(response.data.dados || []);
                console.log("Serviços encontrados:", response.data.dados);
                setIsServicoDisabled(false);  // Habilita o campo de serviços
            }
        } catch (error) {
            console.error("Erro ao buscar os serviços:", error);
    
            // Verifica a resposta do erro (em caso de falha na requisição)
            if (error.response) {
                // Se a resposta da API tiver status e dados, imprime detalhes
                console.error("Status da resposta:", error.response.status);
                console.error("Dados da resposta:", error.response.data);
            } else if (error.request) {
                // Se não há resposta da API (erro de rede ou de servidor)
                console.error("Erro na requisição (sem resposta):", error.request);
            } else {
                // Outro tipo de erro
                console.error("Erro desconhecido:", error.message);
            }
    
            // Caso ocorra erro de requisição
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível carregar os serviços.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };
    
    
    

    // const ListarServicos = async (selectedCategoria) => {

    //         console.log("passando por aqui:", selectedCategoria);
        
    //         try {
    //             const response = await api.get(`/servicos/categoria/${selectedCategoria}`);
    //             setServicos(response.data.dados || []);
    //             console.log(response.data.dados);

    //         } catch (error) {
    //             console.error("Erro ao buscar os serviços:", error);
    //             Swal.fire({
    //                 title: 'Erro!',
    //                 text: 'Não foi possível carregar os serviços.',
    //                 icon: 'error',
    //                 iconColor: '#d33',
    //                 confirmButtonColor: '#d33',
    //             });
    //         }
        
    // };


    console.log("catServicos:", catServicos);
    console.log("servicos:", servicos);
    console.log("teste: ", selectedCategoria);


    //-------------------------------------------------------------------



    console.log(selectedAgend);

    useEffect(() => {
        const ListarVeiculosUsuario = async () => {
            if (selectedAgend?.usu_id) {
                try {
                    const response = await api.get(`/veiculoUsuario/usuario/${selectedAgend.usu_id}`);
                    setVeiculos(response.data.dados || []);
                } catch (error) {
                    console.error("Erro ao buscar veículos:", error);
                }
            }
        };
        ListarVeiculosUsuario();
    }, [selectedAgend?.usu_id]);

    const agendSituacaoMap = {
        1: 'Pendente',
        2: 'Em andamento',
        3: 'Concluído',
        4: "Cancelado"
    };

    const isDisabled = isViewing || isEditing;

    return (
        <form id="clienteForm" className={styles.form} onSubmit={handleSubmit}>
            <input type="hidden" id="clienteId" value={selectedAgend ? selectedAgend.usu_id : ''} className={styles.input_agend} />
        


            <div className={styles.grid}>
                <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                    <label htmlFor="agend_id" className={styles.label_cliente}>Código</label>
                    <input
                        type="number"
                        id="agend_id"
                        name="agend_id"
                        value={selectedAgend?.agend_id || ''}
                        className={styles.input_agend}
                        disabled
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_data}`}>
                    <label htmlFor="agend_data" className={styles.label_cliente}>Data do Agendamento</label>
                    <input
                        type="date"
                        id="agend_data"
                        name="agend_data"
                        value={selectedAgend?.agend_data || ''}
                        onChange={(e) => setSelectedAgend({ ...selectedAgend, agend_data: e.target.value })}
                        disabled={!isEditing}
                        className={styles.input_agend}
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_cliente}`}>
                    <label htmlFor="usu_nome" className={styles.label_cliente}>Cliente</label>
                    <input
                        type="text"
                        id="usu_nome"
                        name="usu_nome"
                        value={selectedAgend ? selectedAgend.usu_nome : ''}
                        disabled={isDisabled}
                        className={styles.input_agend}
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_catserv}`}>
                    <label htmlFor="cat_serv_nome" className={styles.label_cliente}>Categoria do Serviço</label>
                    {isViewing ? (
                        <>
                            <input
                                type="text"
                                id="cat_serv_nome"
                                name="cat_serv_nome"
                                value={selectedAgend?.cat_serv_nome || ''}
                                onChange={(e) => setSelectedAgend({ ...selectedAgend, cat_serv_nome: e.target.value })}
                                disabled={!isEditing}
                                className={styles.input_agend}
                                required
                            />
                        </>
                    ) : (
                        <>
                         
                            <select
                                id="cat_serv_nome"
                                name="cat_serv_nome"
                                className={styles.input_agend}
                                value={selectedCategoria} // Controlado pelo estado local
                                // value={selectedAgend ? selectedAgend.cat_serv_id : ''} // Usar o ID da categoria, caso seja o valor esperado
                                onChange={handleCategoryChange}
                                // onChange={(e) => setSelectedCategoria(e.target.value)}
                                // onChange={(e) => setSelectedAgend({ ...selectedAgend, cat_serv_nome: e.target.value })}
                                disabled={isViewing}
                                required
                            >
                                {catServicos.map((catServ) => (
                                    <option key={catServ.cat_serv_id} value={catServ.cat_serv_id}>
                                        {catServ.cat_serv_nome}
                                    </option>
                                ))}
                            </select>

                        </>
                    )}
                </div>

                <div className={`${styles.grid_item} ${styles.grid_nomeserv}`}>
                    <label htmlFor="serv_nome" className={styles.label_cliente}>Serviço</label>

                    {isViewing ? (
                        <>
                            <input
                                type="text"
                                id="serv_nome"
                                name="serv_nome"
                                value={selectedAgend?.serv_nome || ''}
                                onChange={(e) => setSelectedAgend({ ...selectedAgend, serv_nome: e.target.value })}
                                disabled={!isEditing}
                                className={styles.input_agend}
                                required
                            />
                        </>
                    ) : (
                        <>
                            <select
                                id="serv_nome"
                                name="serv_nome"
                                value={selectedAgend?.serv_id || ''}
                                onChange={(e) => setSelectedAgend({ ...selectedAgend, serv_id: parseInt(e.target.value) })}
                                className={styles.input_agend}
                                disabled={isServicoDisabled}
                                required
                            >
                                {Array.isArray(servicos) && servicos.map((serv) => (
                                    <option key={serv.serv_id} value={serv.serv_id}>
                                        {serv.serv_nome}
                                    </option>
                                ))}

                                {/* {servicos.map((serv) => (
                                    <option key={serv.serv_id} value={serv.serv_id}>
                                        {serv.serv_nome}
                                    </option>
                                ))} */}
                            </select>


                            {/* <select
                                id="serv_nome"
                                name="serv_nome"
                                className={styles.input_agend}
                                value={selectedAgend?.serv_id || ''}
                                onChange={(e) => setSelectedAgend({ ...selectedAgend, serv_id: e.target.value })}
                                disabled={isViewing}
                                required
                            >
                                {servicos.map((serv) => (
                                    <option key={serv.serv_id} value={serv.serv_id}>
                                        {serv.serv_nome}
                                    </option>
                                ))}
                            </select> */}
                        </>
                    )}
                </div>

                <div className={`${styles.grid_item} ${styles.grid_horario}`}>
                    <label htmlFor="agend_horario" className={styles.label_cliente}>Horário</label>
                    <input
                        type="time"
                        id="agend_horario"
                        name="agend_horario"
                        value={selectedAgend ? selectedAgend.agend_horario : ''}
                        onChange={(e) => setSelectedAgend({ ...selectedAgend, agend_horario: e.target.value })}
                        disabled={!isEditing}
                        className={styles.input_agend}
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                    <label htmlFor="veic_placa" className={styles.label_cliente}>Placa</label>
                    {isViewing ? (
                        <>
                            <input
                                type="text"
                                id="veic_placa"
                                name="veic_placa"
                                value={selectedAgend ? selectedAgend.veic_placa : ''}
                                onChange={(e) => setSelectedAgend({ ...selectedAgend, veic_placa: e.target.value })}
                                disabled={isViewing}
                                className={`${styles.input_agend}`}
                                required
                            />
                        </>
                    ) : (
                        <>
                            <select
                                id="veiculo"
                                name="veiculo"
                                className={styles.input_agend}
                                value={selectedAgend?.veic_usu_id || ''}
                                onChange={(e) => setSelectedAgend({ ...selectedAgend, veic_usu_id: e.target.value })}
                                disabled={isViewing}
                                required
                            >
                                {veiculos.map((veiculo) => (
                                    <option key={veiculo.veic_usu_id} value={veiculo.veic_usu_id}>
                                        {veiculo.veic_placa}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </div>

                <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                    <label htmlFor="agend_serv_situ_id" className={styles.label_cliente}>Situação</label>
                    <input
                        type="text"
                        id="agend_serv_situ_id"
                        name="agend_serv_situ_id"
                        value={selectedAgend
                            ? agendSituacaoMap[selectedAgend.agend_serv_situ_id] || ''
                            : ''}
                        onChange={(e) => setSelectedAgend({ ...selectedAgend, agend_serv_situ_id: parseInt(e.target.value) })}
                        disabled
                        className={styles.input_agend}
                        required
                    />
                </div>

                {isViewing && (
                    <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                        <label htmlFor="mod_nome" className={styles.label_cliente}>Modelo</label>
                        <input
                            type="text"
                            id="mod_nome"
                            name="mod_nome"
                            value={selectedAgend ? selectedAgend.mod_nome : ''}
                            onChange={(e) => setSelectedAgend({ ...selectedAgend, mod_nome: e.target.value })}
                            disabled={isViewing}
                            className={`${styles.input_agend}`}
                            required
                        />
                    </div>
                )}

                {isViewing && (
                    <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                        <label htmlFor="veic_cor" className={styles.label_cliente}>Cor</label>
                        <input
                            type="text"
                            id="veic_cor"
                            name="veic_cor"
                            value={selectedAgend ? selectedAgend.veic_cor : ''}
                            onChange={(e) => setSelectedAgend({ ...selectedAgend, veic_cor: e.target.value })}
                            disabled={isViewing}
                            className={`${styles.input_agend}`}
                            required
                        />
                    </div>
                )}

                {isViewing && (
                    <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                        <label htmlFor="mar_nome" className={styles.label_cliente}>Marca</label>
                        <input
                            type="text"
                            id="mar_nome"
                            name="mar_nome"
                            value={selectedAgend ? selectedAgend.mar_nome : ''}
                            onChange={(e) => setSelectedAgend({ ...selectedAgend, mar_nome: e.target.value })}
                            disabled={isViewing}
                            className={`${styles.input_agend}`}
                            required
                        />
                    </div>
                )}

                <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                    <label htmlFor="agend_observ" className={styles.label_cliente}>Observações</label>
                    <input
                        type="text"
                        id="agend_observ"
                        name="agend_observ"
                        value={selectedAgend ? selectedAgend.agend_observ : ''}
                        onChange={(e) => setSelectedAgend({ ...selectedAgend, agend_observ: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_agend}
                        required
                    />
                </div>


            </div>
        </form>
    )
}