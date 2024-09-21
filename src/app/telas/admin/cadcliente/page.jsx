'use client';

import styles from './page.module.css';
import Swal from 'sweetalert2';
import { useState, useEffect, useRef } from 'react';
import React from "react";
import ConsultaCliente from '@/components/modais/modais_clientes';
import { MdRemoveRedEye, MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import { format } from 'date-fns';

import api from '@/services/api';

export default function CadCliente() {
    const selectSexo = useRef(null);


    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 15; // Número de usuários por página
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);




    const handleViewUser = (usuario) => {
        setSelectedUser(usuario);
        setShowForm(true);
        setIsViewing(true); // Muda para modo de visualização
    };

    const handleEditUser = (usuario) => {
        setSelectedUser(usuario);
        setShowForm(true);
        setIsViewing(false); // Muda para modo de edição
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode coletar os dados do formulário e enviar uma requisição para atualizar os dados
    };

    const sexoMap = {
        0: 'Feminino',
        1: 'Masculino',
        2: 'Outro'
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleselectSexo = () => {
        const sexo = selectSexo.current.value;
        console.log(sexo);
    };



    const Cancelar = () => {
        Swal.fire({
            title: "Deseja Cancelar?",
            text: "As informações não serão salvas",
            icon: "warning",
            iconColor: "orange",
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
                    setShowForm(false);
                    setSelectedUser(null); // Mostrar a tabela novamente após confirmação
                });
            }
        });
    };

    // Função para buscar os usuários do banco
    async function ListarUsuarios() {
        try {
            const response = await api.get('/usuarios');
            // console.log(Array.isArray(teste)); // Adicionando um log para inspecionar os dados
            setUsuarios(response.data.dados); // Atualiza o estado com os dados dos usuários
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
        ListarUsuarios(); // Chama a função quando o componente é montado
    }, []);

    return (
        <div id="clientes" className={styles.content_section}>
            <h2 className={styles.title_page}>Gerenciamento de Clientes</h2>

            {!showForm ? (
                <>
                    <div className={styles.contentSearch}>
                        <div className={styles.searchBar}>

                            <input type="text" placeholder="Digite aqui..." className={styles.searchInput} />
                            <button className={styles.searchButton}>Pesquisar</button>
                        </div>

                        <div className={styles.filterButtons}>
                            <div className={styles.filterGroup}>
                                <label htmlFor="status" className={styles.labelFilter}>Status</label>
                                <select id="status" className={styles.filterSelect}>
                                    <option value="todos">Todos</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label htmlFor="tipoUsuario" className={styles.labelFilter}>Tipo de Usuário</label>
                                <select id="tipoUsuario" className={styles.filterSelect}>
                                    <option value="todos">Todos</option>
                                    <option value="admin">Admin</option>
                                    <option value="usuario">Usuário</option>
                                </select>
                            </div>

                            <button className={styles.newButton}>Novo</button>
                        </div>
                    </div>


                    <div className={styles.resultTableContainer}>
                        <table className={styles.resultTable}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th className={`${styles.tableHeader} ${styles.id}`}>Código</th>
                                    <th className={`${styles.tableHeader} ${styles.nome}`}>Nome</th>
                                    <th className={`${styles.tableHeader} ${styles.cpf}`}>CPF</th>
                                    <th className={`${styles.tableHeader} ${styles.dataNasc}`}>Data de Nascimento</th>
                                    <th className={`${styles.tableHeader} ${styles.sexo}`}>Sexo</th>
                                    <th className={`${styles.tableHeader} ${styles.telefone}`}>Telefone</th>
                                    <th className={`${styles.tableHeader} ${styles.email}`}>Email</th>
                                    <th className={`${styles.tableHeader} ${styles.acao}`}>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((usuario) => (
                                        <tr key={usuario.usu_id}>
                                            <td className={styles.tdId}>{usuario.usu_id}</td>
                                            <td>{usuario.usu_nome}</td>
                                            <td>{usuario.usu_cpf}</td>
                                            <td>{format(new Date(usuario.usu_data_nasc), 'dd/MM/yyyy')}</td>
                                            <td>{sexoMap[usuario.usu_sexo] || 'Desconhecido'}</td>
                                            <td>{usuario.usu_telefone}</td>
                                            <td>{usuario.usu_email}</td>
                                            <td>
                                                <div className={styles.actionIcons}>
                                                    <i> <MdRemoveRedEye title="Visualizar" onClick={() => handleViewUser(usuario)} /></i>
                                                    <i><MdEdit title="Editar" onClick={() => handleEditUser(usuario)} /></i>
                                                    <i><IoMdTrash title="Excluir" /></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">Nenhum usuário encontrado</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                    <div className={styles.pagination}>
                        <button
                            className={styles.buttonPrev}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>
                        <span>Página {currentPage}</span>
                        <button
                            onClick={() => setCurrentPage(prev => (usuarios.length > indexOfLastUser ? prev + 1 : prev))}
                            disabled={usuarios.length <= indexOfLastUser}
                        >
                            Próxima
                        </button>
                    </div>
                </>
            ) : (<>
                <form id="clienteForm" className={styles.form} onSubmit={handleSubmit}>

                    <input type="hidden" id="clienteId" value={selectedUser ? selectedUser.usu_id : ''} className={styles.input_cliente} />

                    <div className={styles.grid}>
                        <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                            <label htmlFor="codigo_cliente" className={styles.label_cliente}>Código</label>
                            <input
                                type="number"
                                id="codigo_cliente"
                                name="codigo_cliente"
                                required
                                value={selectedUser ? selectedUser.usu_id : ''}
                                disabled
                                className={styles.input_cliente}
                            />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                            <label htmlFor="nome_cliente" className={styles.label_cliente}>Nome</label>
                            <input
                                type="text"
                                id="nome_cliente"
                                name="nome_cliente"
                                required
                                value={selectedUser ? selectedUser.usu_nome : ''}
                                disabled={isViewing}
                                className={styles.input_cliente}
                                placeholder="Nome Completo"
                            />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_cpf}`}>
                            <label htmlFor="cpf_cliente" className={styles.label_cliente}>CPF</label>
                            <input
                                type="text"
                                id="cpf_cliente"
                                name="cpf_cliente"
                                required
                                value={selectedUser ? selectedUser.usu_cpf : ''}
                                disabled={isViewing}
                                className={styles.input_cliente}
                                placeholder="xxx.xxx.xxx - xx"
                            />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_data}`}>
                            <label htmlFor="data_nasc_cliente" className={styles.label_cliente}>Data de Nascimento</label>
                            <input
                                type="date"
                                id="data_nasc_cliente"
                                name="data_nasc_cliente"
                                required
                                value={selectedUser ? format(new Date(selectedUser.usu_data_nasc), 'yyyy-MM-dd') : ''}
                                disabled={isViewing}
                                className={styles.input_cliente}
                            />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_sexo}`}>
                            <label htmlFor="sexo_cliente" className={styles.label_cliente}>Sexo</label>
                            <select
                                ref={selectSexo}
                                id="sexo_cliente"
                                name="sexo_cliente"
                                required
                                className={`${styles.select_cliente} ${styles.input_sexo}`}
                                disabled={isViewing}
                            >
                                <option value="" disabled>Selecionar</option>
                                <option value="0" selected={selectedUser && selectedUser.usu_sexo === 0}>Masculino</option>
                                <option value="1" selected={selectedUser && selectedUser.usu_sexo === 1}>Feminino</option>
                                <option value="2" selected={selectedUser && selectedUser.usu_sexo === 2}>Outro</option>
                            </select>
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_acesso}`}>
                            <label htmlFor="nivel_acesso" className={styles.label_cliente}>Nível de Acesso</label>
                            <select
                                id="nivel_acesso"
                                name="nivel_acesso"
                                className={`${styles.select_cliente} ${styles.input_acesso}`}
                                disabled={isViewing}
                            >
                                <option value="0" className={styles.option}>Usuário</option>
                                <option value="1" className={styles.option}>Administrador</option>
                            </select>
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_telefone}`}>
                            <label htmlFor="telefone_cliente" className={styles.label_cliente}>Telefone</label>
                            <input
                                type="tel"
                                id="telefone_cliente"
                                name="telefone_cliente"
                                required
                                value={selectedUser ? selectedUser.usu_telefone : ''}
                                disabled={isViewing}
                                className={`${styles.input_cliente}`}
                                placeholder="(xx) xxxxx - xxxxx"
                            />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_email}`}>
                            <label htmlFor="email_cliente" className={styles.label_cliente}>Email</label>
                            <input
                                type="email"
                                id="email_cliente"
                                name="email_cliente"
                                required
                                value={selectedUser ? selectedUser.usu_email : ''}
                                disabled={isViewing}
                                className={styles.input_cliente}
                                placeholder="exemplo@exemplo.com"
                            />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                            <label htmlFor="observacoes_cliente" className={styles.label_cliente}>Observações</label>
                            <input
                                type="text"
                                id="observacoes_cliente"
                                name="observacoes_cliente"
                                required
                                value={selectedUser ? selectedUser.usu_observacoes : ''}
                                disabled={isViewing}
                                className={styles.input_cliente}
                            />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                            <label htmlFor="situacao_cliente" className={styles.label_cliente}>Situação</label>
                            <select
                                id="situacao_cliente"
                                name="situacao_cliente"
                                className={`${styles.select_cliente} ${styles.input_situacao}`}
                                disabled={isViewing}
                            >
                                <option value="ativo" className={styles.option} selected={selectedUser && selectedUser.usu_situacao === 'ativo'}>Ativo</option>
                                <option value="inativo" className={styles.option} selected={selectedUser && selectedUser.usu_situacao === 'inativo'}>Inativo</option>
                            </select>
                        </div>
                    </div>


                </form>



                <div className={styles.footer_form}>
                    <button type="reset" onClick={Cancelar} className={styles.button_cancel}>Cancelar</button>
                    <button type="submit" className={styles.button_submit} disabled={!isViewing}>Salvar</button>

                </div>
            </>)}
        </div>
    );
}
