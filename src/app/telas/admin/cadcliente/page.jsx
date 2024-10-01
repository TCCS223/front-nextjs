'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import { MdRemoveRedEye, MdEdit } from "react-icons/md";
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
    const [isViewing, setIsViewing] = useState(false);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [isAsc, setIsAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState({
        usu_nome: '',
        usu_cpf: '',
        usu_data_nasc: '',
        usu_sexo: '',
        usu_telefone: '',
        usu_email: '',
        usu_observ: '',
        usu_acesso: 0,
        usu_senha: '',
        usu_situacao: 1,
    });

    const usersPerPage = 15;

    // Paginação
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


    useEffect(() => {
        ListarUsuarios();
    }, []);

    useEffect(() => {
        setFilteredUsers(usuarios);
    }, [usuarios]);

    useEffect(() => {
        handleSearch();
    }, [usuarios, statusFilter, tipoUsuarioFilter, searchText]);

    const sexoMap = {
        0: 'Feminino',
        1: 'Masculino',
        2: 'Outro'
    };


// const LimparDados = () =>{
//     setSelectedUser({
//         usu_nome: '',
//         usu_cpf: '',
//         usu_data_nasc: '',
//         usu_sexo: '',
//         usu_telefone: '',
//         usu_email: '',
//         usu_observ: '',
//         usu_acesso: 0,
//         usu_senha: '',
//         usu_situacao: 1,
//     });
// }

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

    const handleSearch = () => {
        setSortedColumn(null);
        setIsAsc(true);

        const result = usuarios.filter((usuario) => {
            const statusMatch =
                statusFilter === 'todos' ||
                (statusFilter === 'ativo' && usuario.usu_situacao === 1) ||
                (statusFilter === 'inativo' && usuario.usu_situacao === 0);

            const tipoMatch = tipoUsuarioFilter === 'todos' ||
                (tipoUsuarioFilter === 'admin' && usuario.usu_acesso === 1) ||
                (tipoUsuarioFilter === 'usuario' && usuario.usu_acesso === 0);

            const searchTextMatch = searchText === '' ||
                usuario.usu_nome.toLowerCase().includes(searchText.toLowerCase()) ||
                usuario.usu_email.toLowerCase().includes(searchText.toLowerCase()) ||
                usuario.usu_cpf.includes(searchText);

            return statusMatch && tipoMatch && searchTextMatch;
        });

        setFilteredUsers(result);
        setCurrentPage(1);
    };

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

    const handleExit = () => {
        setShowForm(false);  // Fecha o formulário
        setSelectedUser({
            usu_nome: '',
            usu_cpf: '',
            usu_data_nasc: '',
            usu_sexo: '',
            usu_telefone: '',
            usu_email: '',
            usu_observ: '',
            usu_acesso: 0,
            usu_senha: '',
            usu_situacao: 1,
        });  // Limpa o usuário selecionado
        setIsViewing(false);  // Reinicializa o modo de visualização

    };

    console.log(selectedUser);
    

    const handleSubmit = async (usuario) => {
        if (!validarCPF(usuario.usu_cpf)) {
            Swal.fire({
                title: 'Erro!',
                text: 'CPF inválido',
                icon: 'error',
            });
            return;
        }
    
        if (!validaEmail(usuario)) {
            return; // Saia da função se o e-mail for inválido
        }
    
        try {
            let response;
    
            if (usuario.usu_id) {
                response = await api.patch(`/usuarios/${usuario.usu_id}`, usuario);
            } else {
                response = await api.post('/usuarios', usuario);
            }
    
            Swal.fire({
                title: 'Sucesso!',
                text: response.data.mensagem,
                icon: 'success',
            });
    
            ListarUsuarios();
            setShowForm(false);
        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: error.response ? error.response.data.mensagem : 'Erro ao salvar usuário.',
                icon: 'error',
            });
        }
    };

    function validarCPF(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

        if (!cpfRegex.test(cpf)) {
            return false;
        }

        const numbersOnly = cpf.replace(/[^\d]/g, '');

        if (numbersOnly.length !== 11 || /^(\d)\1+$/.test(numbersOnly)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) soma += parseInt(numbersOnly.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(numbersOnly.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(10, 11))) return false;

        return true;
    }

    function checkEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }

    function validaEmail(usuario) {
        if (!usuario.usu_email) {
            Swal.fire({
                title: 'Erro!',
                text: 'O e-mail do usuário é obrigatório',
                icon: 'error',
            });
            return false;
        } else if (!checkEmail(usuario.usu_email)) {
            Swal.fire({
                title: 'Erro!',
                text: 'Insira um e-mail válido',
                icon: 'error',
            });
            return false;
        }
    
        return true;
    }

    const sortByColumn = (column) => {
        let newIsAsc = true;

        if (sortedColumn === column) {
            newIsAsc = !isAsc;
        }

        const sortedData = [...filteredUsers].sort((a, b) => {
            if (a[column] < b[column]) return newIsAsc ? -1 : 1;
            if (a[column] > b[column]) return newIsAsc ? 1 : -1;
            return 0;
        });

        setFilteredUsers(sortedData);
        setSortedColumn(column);
        setIsAsc(newIsAsc);
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
                    setSelectedUser({
                        usu_nome: '',
                        usu_cpf: '',
                        usu_data_nasc: '',
                        usu_sexo: '',
                        usu_telefone: '',
                        usu_email: '',
                        usu_observ: '',
                        usu_acesso: 0,
                        usu_senha: '',
                        usu_situacao: 1,
                    });
                    setIsViewing(false);

                });
            }
        });
    }

    return (
        <div id="clientes" className={styles.content_section}>
            <h2 className={styles.title_page}>Gerenciamento de Clientes</h2>

            {!showForm ? (
                <>
                    <div className={styles.contentSearch}>
                        <div className={styles.search}>
                            <div className={styles.searchInput}>

                                <input
                                    type="text"
                                    placeholder="Digite aqui..."
                                    className={styles.inputSearch}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <PiListMagnifyingGlassBold
                                    className={styles.lupa}
                                />
                            </div>
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

                            <button
                                className={styles.newButton}
                                onClick={() => setShowForm(true)}>
                                Novo
                            </button>
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
                                    <th
                                        className={`${styles.tableHeader} ${styles.nome}`}
                                        onClick={() => sortByColumn('usu_nome')}>
                                        Nome
                                        {sortedColumn === 'usu_nome' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.cpf}`}
                                        onClick={() => sortByColumn('usu_cpf')}>
                                        CPF
                                        {sortedColumn === 'usu_cpf' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.dataNasc}`}
                                        onClick={() => sortByColumn('usu_data_nasc')}>
                                        Data de Nascimento
                                        {sortedColumn === 'usu_data_nasc' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.sexo}`}
                                        onClick={() => sortByColumn('usu_sexo')}>
                                        Sexo
                                        {sortedColumn === 'usu_sexo' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.telefone}`}
                                        onClick={() => sortByColumn('usu_telefone')}>
                                        Telefone
                                        {sortedColumn === 'usu_telefone' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.email}`}
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
                                                    <i>
                                                        <MdRemoveRedEye
                                                            title="Visualizar"
                                                            onClick={() => handleViewUser(usuario)}
                                                        />
                                                    </i>
                                                    <i>
                                                        <MdEdit
                                                            title="Editar"
                                                            onClick={() => handleEditUser(usuario)}
                                                        />
                                                    </i>
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
            ) : (
                <>
                    <FormCliente
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        isViewing={isViewing}

                        handleSubmit={handleSubmit}
                        Cancelar={Cancelar}
                    />

                    <div className={styles.footer_form}>

                        {isViewing ? (

                            <button
                                type="button"
                                className={styles.button_exit}
                                onClick={handleExit}
                            >
                                Sair
                            </button>
                        ) : (
                            <>
                                <button
                                    type="reset"
                                    onClick={Cancelar}
                                    className={styles.button_cancel}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className={styles.button_submit}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit(selectedUser);
                                    }}
                                    // disabled={isViewing}
                                >
                                    Salvar
                                </button>
                            </>
                        )}

                    </div>
                </>
            )}
        </div>
    );
}
