'use client';

import styles from './page.module.css';
import Swal from 'sweetalert2';
import { useState, useEffect, useRef } from 'react';
import React from "react";
import ConsultaCliente from '@/components/modais/modais_clientes';
import FormCliente from '@/components/FormCliente';
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

    console.log(selectedUser); // Verifique se todos os campos estão preenchidos corretamente


    const handleSubmit = async (event) => {
        console.log("Dados enviados:", selectedUser);
        event.preventDefault();
        try {
            const response = await api.patch(`/usuarios/${selectedUser.usu_id}`, selectedUser);
            console.log(response); // Verifique o que está sendo retornado
            Swal.fire({
                title: 'Sucesso!',
                text: response.data.mensagem,
                icon: 'success',
            });
            ListarUsuarios(); // Atualize a lista de usuários após a edição
            setShowForm(false); // Feche o formulário após a atualização
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            Swal.fire({
                title: 'Erro!',
                text: error.response ? error.response.data.mensagem : 'Erro desconhecido.',
                icon: 'error',
            });
        }
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

                <FormCliente
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    isViewing={isViewing}
                    handleSubmit={handleSubmit}
                    Cancelar={Cancelar}
                />

                <div className={styles.footer_form}>
                    <button type="reset" onClick={Cancelar} className={styles.button_cancel}>Cancelar</button>
                    <button type="button" className={styles.button_submit} onClick={handleSubmit} disabled={isViewing}>Salvar</button>


                </div>
            </>)}
        </div>
    );
}
