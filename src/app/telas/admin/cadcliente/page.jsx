'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';

import { MdRemoveRedEye, MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { format } from 'date-fns';
import Swal from 'sweetalert2';

import FormCliente from '@/components/FormCliente';

import api from '@/services/api';

export default function CadCliente() {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('todos');
    const [tipoUsuarioFilter, setTipoUsuarioFilter] = useState('todos');
    const [searchText, setSearchText] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [isAsc, setIsAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;

    useEffect(() => {
        ListarUsuarios();
    }, []);

    useEffect(() => {
        setFilteredUsers(usuarios);
    }, [usuarios]);


    useEffect(() => {
        handleFilterChange();
    }, [usuarios, statusFilter, tipoUsuarioFilter, searchText]);

    const ListarUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os usuários.",
                icon: "error",
            });
        }
    };

    const handleFilterChange = () => {
        const result = usuarios.filter(usuario => {
            const statusMatch = statusFilter === 'todos' || 
                (statusFilter === 'ativo' && usuario.usu_situacao === 1) ||  // Verifique se 1 é ativo
                (statusFilter === 'inativo' && usuario.usu_situacao === 0); // E 0 é inativo
    
            const tipoMatch = tipoUsuarioFilter === 'todos' ||
                (tipoUsuarioFilter === 'admin' && usuario.usu_acesso === 1) ||
                (tipoUsuarioFilter === 'usuario' && usuario.usu_acesso === 0);
    
            return statusMatch && tipoMatch;
        });

        setFilteredUsers(result);
        setCurrentPage(1);
    };
    
    const handleSearch = () => {
        setSortedColumn(null);
        setIsAsc(true);

        const result = filteredUsers.filter(usuario => {
            return usuario.usu_nome.toLowerCase().includes(searchText.toLowerCase()) ||
                usuario.usu_email.toLowerCase().includes(searchText.toLowerCase()) ||
                usuario.usu_cpf.includes(searchText);
        });
        setFilteredUsers(result);
        setCurrentPage(1);
    }

    const handleViewUser = (usuario) => {
        setSelectedUser(usuario);
        setShowForm(true);
        setIsViewing(true);
    };

    const handleEditUser = (usuario) => {
        setSelectedUser(usuario);
        setShowForm(true);
        setIsViewing(false);
    };

    const sexoMap = {
        0: 'Feminino',
        1: 'Masculino',
        2: 'Outro'
    };

    const sortByColumn = (column) => {
        let newIsAsc = true; // Define ascendente por padrão
    
        if (sortedColumn === column) {
            newIsAsc = !isAsc; // Se a mesma coluna for clicada, inverte a direção
        }
    
        const sortedData = [...filteredUsers].sort((a, b) => {
            if (a[column] < b[column]) return newIsAsc ? -1 : 1;
            if (a[column] > b[column]) return newIsAsc ? 1 : -1;
            return 0;
        });
    
        setFilteredUsers(sortedData); // Atualiza a lista filtrada com os dados ordenados
        setSortedColumn(column); // Atualiza a coluna que está sendo ordenada
        setIsAsc(newIsAsc); // Atualiza a direção da ordenação
    };

    const handleSubmit = async (data) => {
        try {
            const response = await api.patch(`/usuarios/${data.usu_id}`, data);
            Swal.fire({
                title: 'Sucesso!',
                text: response.data.mensagem,
                icon: 'success',
            });
            ListarUsuarios();
            setShowForm(false);
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            Swal.fire({
                title: 'Erro!',
                text: error.response ? error.response.data.mensagem : 'Erro desconhecido.',
                icon: 'error',
            });
        }
    };

    const handleDeleteUser = async (usu_situacao) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá desfazer essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.patch(`/usuarios/${usu_situacao}`);
                    if (response.data.sucesso) {
                        Swal.fire(
                            'Excluído!',
                            'O usuário foi excluído com sucesso.',
                            'success'
                        );
                        ListarUsuarios();
                    } else {
                        throw new Error(response.data.mensagem);
                    }
                } catch (error) {
                    console.error("Erro ao excluir usuário:", error);
                    Swal.fire({
                        title: 'Erro!',
                        text: error.response ? error.response.data.mensagem : 'Erro desconhecido ao excluir usuário.',
                        icon: 'error',
                    });
                }
            }
        });
    };

    const handleExit = async (data) => {
        ListarUsuarios();
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
                    setSelectedUser(null);
                });
            }
        });
    }

    // Paginação
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div id="clientes" className={styles.content_section}>
            <h2 className={styles.title_page}>Gerenciamento de Clientes</h2>

            {!showForm ? (
                <>
                    <div className={styles.contentSearch}>
                        <div className={styles.searchBar}>
                            <input
                                type="text"
                                placeholder="Digite aqui..."
                                className={styles.searchInput}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button className={styles.searchButton} onClick={handleSearch}>Pesquisar</button>
                        </div>
                        <div className={styles.filterButtons}>
                            <div className={styles.filterGroup}>
                                <label htmlFor="tipoUsuario" className={styles.labelFilter}>Tipo de Usuário</label>

                                <select
                                    id="tipoUsuario"
                                    className={styles.filterSelect}
                                    value={tipoUsuarioFilter}
                                    onChange={(e) => setTipoUsuarioFilter(e.target.value)}
                                >
                                    <option value="todos">Todos</option>
                                    <option value="admin">Admin</option>
                                    <option value="usuario">Usuário</option>
                                </select>
                            </div>

                            <div className={styles.filterGroup}>
                                <label htmlFor="status" className={styles.labelFilter}>Status</label>
                                <select
                                    id="status"
                                    className={styles.filterSelect}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="todos">Todos</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>   
                            </div>

                            <button className={styles.newButton} onClick={() => setShowForm(true)}>Novo</button>
                        </div>
                    </div>

                    <div className={styles.resultTableContainer}>
                        <table className={styles.resultTable}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th 
                                    className={`${styles.tableHeader} ${styles.id}`}
                                    onClick={() => sortByColumn('usu_id')}>
                                        Código 
                                    {sortedColumn === 'usu_id' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.nome}`}
                                    onClick={() => sortByColumn('usu_nome')}>
                                        Nome 
                                    {sortedColumn === 'usu_nome' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.cpf}`}
                                    onClick={() => sortByColumn('usu_cpf')}>
                                        CPF 
                                    {sortedColumn === 'usu_cpf' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.dataNasc}`}
                                    onClick={() => sortByColumn('usu_data_nasc')}>
                                        Data de Nascimento 
                                    {sortedColumn === 'usu_data_nasc' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.sexo}`}
                                    onClick={() => sortByColumn('usu_sexo')}>
                                        Sexo
                                    {sortedColumn === 'usu_sexo' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.telefone}`}
                                    onClick={() => sortByColumn('usu_telefone')}>
                                        Telefone 
                                    {sortedColumn === 'usu_telefone' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.email}`}
                                    onClick={() => sortByColumn('usu_email')}>
                                        Email 
                                    {sortedColumn === 'usu_email' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
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
                                                    <i><MdRemoveRedEye title="Visualizar" onClick={() => handleViewUser(usuario)} /></i>
                                                    <i><MdEdit title="Editar" onClick={() => handleEditUser(usuario)} /></i>
                                                    <i><IoMdTrash title="Excluir" onClick={() => handleDeleteUser(usuario.serv_id)} /></i>
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
                            onClick={() => setCurrentPage(prev => (filteredUsers.length > indexOfLastUser ? prev + 1 : prev))}
                            disabled={filteredUsers.length <= indexOfLastUser}
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
                    <button type="exit" className={styles.button_exit} onClick={handleExit}>Voltar</button>
                </div>
            </>
            )}
        </div>
    );
}
