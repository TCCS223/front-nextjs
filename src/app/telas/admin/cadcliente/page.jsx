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
    const [usuarios, setUsuarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectSexo = useRef(null);

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

            {/* Tabela de Usuários */}
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
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <tr key={usuario.usu_id}>
                                    <td>{usuario.usu_id}</td>
                                    <td>{usuario.usu_nome}</td>
                                    <td>{usuario.usu_cpf}</td>
                                    <td>{format(new Date(usuario.usu_data_nasc), 'dd/MM/yyyy')}</td>
                                    <td>{sexoMap[usuario.usu_sexo] || 'Desconhecido'}</td>
                                    <td>{usuario.usu_telefone}</td>
                                    <td>{usuario.usu_email}</td>
                                    <td>
                                        <div className={styles.actionIcons}>
                                            <i><MdRemoveRedEye title="Visualizar" /></i>
                                            <i><MdEdit title="Editar" /></i>
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
        </div>
    );
}
