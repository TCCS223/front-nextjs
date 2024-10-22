'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import { MdRemoveRedEye, MdEdit, MdAdd } from "react-icons/md";
// import {  } from "react-icons/md";
import { parseISO, format } from 'date-fns';
import Swal from 'sweetalert2';
import FormCliente from '@/components/FormCliente';
import api from '@/services/api';

import ModalRelacionarVeiculo from '@/components/relacionarVeiculo';

export default function CadCliente() {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('todos');
    const [tipoUsuarioFilter, setTipoUsuarioFilter] = useState('todos');
    const [searchText, setSearchText] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [isAsc, setIsAsc] = useState(true);
    const [senhaErro, setSenhaErro] = useState('');
    const [focused, setFocused] = useState(false); // Estado para controlar o foco no campo
    const [senha, setSenha] = useState('');
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

    const [modalCategoriaOpen, setModalCategoriaOpen] = useState(false);

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



    const Create = () => {
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
        setShowForm(true);
    }

    const ListarUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data.dados);
            console.log(response.data.dados)
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os usuários.",
                icon: "error",
                iconColor: '#d33',
                confirmButtonColor: '#d33',
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
        setIsEditing(false);
    };

    const handleEditUser = (usuario) => {
        setSelectedUser(usuario);
        setShowForm(true);
        setIsViewing(false);
        setIsEditing(true);
    };

    const handleExit = () => {
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
        setIsEditing(false);
    };

    const handleSubmit = async (usuario) => {

        const errors = [];

        const cpfError = await validarCPF(usuario.usu_cpf);
        if (cpfError) {
            errors.push(cpfError);
        }

        const emailError = await validaEmail(usuario);
        if (emailError) {
            errors.push(emailError);
        }

        // // Validação de senha
        // const senhaError = validarSenha(usuario.usu_senha);
        // if (senhaError) {
        //     setSenhaErro(senhaError); // Atualiza o estado da senha
        //     errors.push(senhaError); // Adiciona erro à lista
        // } else {
        //     setSenhaErro(''); // Limpa o erro se a senha for válida
        // }

        // Validação de senha
        const senhaError = validarSenha(usuario.usu_senha);
        if (senhaError) {
            errors.push("A senha não atende aos requisitos.");
        } else {
            setSenhaErro(''); // Limpa a mensagem de erro se a senha for válida
        }

        if (errors.length > 0) {
            Swal.fire({
                title: 'Dados Incorretos',
                text: "Por favor, revise os dados preenchidos e tente novamente.",
                // html: errors.join('<br/>'),
                icon: 'error',
                confirmButtonText: 'OK',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
            return;
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
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            });

            ListarUsuarios();
            setShowForm(false);
        } catch (error) {
            const backendErrors = [];

            if (error.response && error.response.data) {
                if (error.response.data.erros && Array.isArray(error.response.data.erros)) {
                    backendErrors.push(...error.response.data.erros);
                } else if (error.response.data.mensagem) {
                    backendErrors.push(error.response.data.mensagem);
                }
            }

            if (backendErrors.length > 0) {
                Swal.fire({
                    title: 'Erro!',
                    html: backendErrors.join('<br/>'),
                    icon: 'error',
                    iconColor: '#d33',
                    confirmButtonColor: '#d33',
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao salvar usuário.',
                    icon: 'error',
                    iconColor: '#d33',
                    confirmButtonColor: '#d33',
                });
            }
        }
    };

    // const validarSenha = (senha) => {
    //     if (senha.length < 8) {
    //         return 'A senha deve ter pelo menos 8 caracteres.';
    //     }
    //     return ''; // Retorna uma string vazia se não houver erro
    // };

    // const validarSenha = (senha) => {
    //     const minLength = 8;
    //     const hasUpperCase = /[A-Z]/.test(senha);
    //     const hasLowerCase = /[a-z]/.test(senha);
    //     const hasNumber = /\d/.test(senha);
    //     const hasSpecialChar = /[!@#$%^&*]/.test(senha);
    //     const hasSpaces = /\s/.test(senha);

    //     let errorMessage = [];

    //     if (senha.length < minLength) {
    //         errorMessage.push(`A senha deve ter pelo menos ${minLength} caracteres.`);
    //     }
    //     if (!hasUpperCase) {
    //         errorMessage.push('A senha deve conter pelo menos uma letra maiúscula.');
    //     }
    //     if (!hasLowerCase) {
    //         errorMessage.push('A senha deve conter pelo menos uma letra minúscula.');
    //     }
    //     if (!hasNumber) {
    //         errorMessage.push('A senha deve conter pelo menos um número.');
    //     }
    //     if (!hasSpecialChar) {
    //         errorMessage.push('A senha deve conter pelo menos um caractere especial (ex: !@#$%^&*).');
    //     }
    //     if (hasSpaces) {
    //         errorMessage.push('A senha não deve conter espaços em branco.');
    //     }

    //     // Atualiza o estado da mensagem de erro
    //     if (errorMessage.length > 0) {
    //         setSenhaErro(errorMessage.join('\n'));
    //         return true; // Indica que a senha é inválida
    //     } else {
    //         setSenhaErro('');
    //         return false; // Indica que a senha é válida
    //     }
    // };


    const validarSenha = (senha) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(senha);
        const hasLowerCase = /[a-z]/.test(senha);
        const hasNumber = /\d/.test(senha);
        const hasSpecialChar = /[!@#$%^&*]/.test(senha);
        const hasSpaces = /\s/.test(senha);

        let errorMessage = [];

        if (senha.length < minLength) {
            errorMessage.push(`Pelo menos ${minLength} caracteres.`);
        }
        if (!hasUpperCase) {
            errorMessage.push('Uma letra maiúscula.');
        }
        if (!hasLowerCase) {
            errorMessage.push('Uma letra minúscula.');
        }
        if (!hasNumber) {
            errorMessage.push('Um número.');
        }
        if (!hasSpecialChar) {
            errorMessage.push('Um caractere especial (ex: !@#$%^&*).');
        }
        if (hasSpaces) {
            errorMessage.push('Sem espaços em branco.');
        }

        // Atualiza o estado com os critérios restantes
        // if (errorMessage.length > 0) {
        //     setSenhaErro(`A senha precisa de: ${errorMessage.join(', ')}`);
        //     return true; // A senha ainda não cumpre os requisitos
        // } else {
        //     setSenhaErro(''); // Todos os critérios foram cumpridos
        //     return false; // A senha é válida
        // }

        // Se houver mensagem de erro, define o estado com a mensagem, senão limpa o erro
        if (errorMessage) {
            setSenhaErro(errorMessage);
            return false;
        } else {
            setSenhaErro('');
            return true;
        }
    };

     // Manipuladores de foco
  const handleFocus = () => {
    setFocused(true); // Mostra as exigências da senha ao focar no campo
  };

  const handleBlur = () => {
    setFocused(false); // Esconde as exigências quando perde o foco
    validarSenha(senha); // Valida a senha e, se houver erro, exibe a mensagem de erro
  };


    const validarCPF = async (cpf) => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

        if (!cpfRegex.test(cpf)) {
            return 'CPF inválido.';
        }

        const numbersOnly = cpf.replace(/[^\d]/g, '');

        if (numbersOnly.length !== 11 || /^(\d)\1+$/.test(numbersOnly)) {
            return 'CPF inválido.';
        }

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(numbersOnly.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(9, 10))) {
            return 'CPF inválido.';
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(numbersOnly.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(10, 11))) {
            return 'CPF inválido.';
        }
        try {
            const response = await api.post('/usuarios/verificarCpf', { usu_cpf: cpf });
            if (response.data.sucesso && response.data.dados) {
                return 'CPF já está cadastrado.';
            }
        } catch (error) {
            console.error('Erro na verificação do CPF:', error);
            return 'Ocorreu um erro ao verificar o CPF. Por favor, tente novamente.';
        }

        return null;
    };

    function checkEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }

    const validaEmail = async (usuario) => {
        const email = usuario.usu_email.trim();

        if (!email) {
            return 'O e-mail do usuário é obrigatório.';
        } else if (!checkEmail(email)) {
            return 'Insira um e-mail válido.';
        }

        try {
            const response = await api.post('/usuarios/verificarEmail', { usu_email: email });
            if (response.data.sucesso && response.data.dados) {
                return 'Email já está cadastrado.';
            }
        } catch (error) {
            console.error('Erro na verificação do email:', error);
            return 'Ocorreu um erro ao verificar o email. Por favor, tente novamente.';
        }

        return null;
    };

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
                    setIsEditing(false);
                });
            }
        });
    }

    const handleNovaCategoria = () => {
        setModalCategoriaOpen(true);
    };

    const handleCategoriaCriada = () => {
        ListarCategoriasServ();
    };

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
                                onClick={Create}>
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
                                    currentUsers?.map((usuario) => (
                                        <tr key={usuario.usu_id}>
                                            <td className={styles.tdId}>{usuario.usu_id}</td>
                                            <td>{usuario.usu_nome}</td>
                                            <td>{usuario.usu_cpf}</td>
                                            {/* <td>{format(new Date(usuario?.usu_data_nasc), 'dd/MM/yyyy')}</td> */}
                                            <td>{format(parseISO(usuario?.usu_data_nasc), 'dd/MM/yyyy')}</td>
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
                        isEditing={isEditing}
                        handleSubmit={handleSubmit}
                        Cancelar={Cancelar}

                        setSenhaErro={setSenhaErro} // Passando a função de atualização do erro também
                        senhaErro={senhaErro}  // Passa a mensagem de erro para o filho
                        validarSenha={validarSenha}  // Passa a função de validação para o filho


                        focused={focused}
                        senha={senha}
                        handleFocus={handleFocus}
                        handleBlur={handleBlur}
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
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            className={styles.button_AddVeiculo}
                                            onClick={handleNovaCategoria}
                                        >
                                            veículo
                                            {/* <MdAdd className={styles.iconAdd} /> */}
                                        </button>
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
                            </>
                        )}
                    </div>
                </>
            )}

            <ModalRelacionarVeiculo
                isOpen={modalCategoriaOpen}
                usuarioId={selectedUser.usu_id}
                onClose={() => setModalCategoriaOpen(false)}
                onCategoriaCriada={handleCategoriaCriada}
            />

        </div>
    );
}