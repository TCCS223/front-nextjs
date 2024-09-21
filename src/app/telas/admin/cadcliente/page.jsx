'use client';

import styles from './page.module.css';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { format } from 'date-fns';
import api from '@/services/api';
import FormCliente from '@/components/FormCliente';

export default function CadCliente() {
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('todos');
    const [tipoUsuarioFilter, setTipoUsuarioFilter] = useState('todos');
    const [searchText, setSearchText] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewing, setIsViewing] = useState(false);

    useEffect(() => {
        ListarUsuarios();
    }, []);

    useEffect(() => {
        setFilteredUsers(usuarios); // Inicializa com todos os usuários
    }, [usuarios]);

    const ListarUsuarios = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsuarios(response.data.dados); // Atualiza o estado com os dados dos usuários
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
        const result = usuarios.filter(usuario => {
            const statusMatch = statusFilter === 'todos' || usuario.usu_situacao === statusFilter;
    
            const tipoMatch = tipoUsuarioFilter === 'todos' || 
                              (tipoUsuarioFilter === 'admin' && usuario.usu_acesso === 1) || 
                              (tipoUsuarioFilter === 'usuario' && usuario.usu_acesso === 0);
    
            const textMatch = 
                usuario.usu_nome.toLowerCase().includes(searchText.toLowerCase()) || 
                usuario.usu_email.toLowerCase().includes(searchText.toLowerCase()) ||
                usuario.usu_cpf.includes(searchText); // Adicione mais campos se necessário
    
            // Retornar verdadeiro se todas as condições forem atendidas
            return statusMatch && tipoMatch && textMatch;
        });
    
        setFilteredUsers(result);
    };
    


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

    const handleSubmit = async (data) => {
        try {
            const response = await api.patch(`/usuarios/${data.usu_id}`, data);
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

    const Cancelar = () => {
        setShowForm(false);
        setSelectedUser(null); // Mostrar a tabela novamente após confirmação
    };

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

                            <button className={styles.newButton} onClick={() => setShowForm(true)}>Novo</button>
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
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((usuario) => (
                                        <tr key={usuario.usu_id}>
                                            <td className={styles.tdId}>{usuario.usu_id}</td>
                                            <td>{usuario.usu_nome}</td>
                                            <td>{usuario.usu_cpf}</td>
                                            <td>{format(new Date(usuario.usu_data_nasc), 'dd/MM/yyyy')}</td>
                                            <td>{usuario.usu_sexo}</td>
                                            <td>{usuario.usu_telefone}</td>
                                            <td>{usuario.usu_email}</td>
                                            <td>
                                                <div className={styles.actionIcons}>
                                                    <i><MdRemoveRedEye title="Visualizar" onClick={() => handleViewUser(usuario)} /></i>
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
                </>
            ) : (
                <FormCliente
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    isViewing={isViewing}
                    handleSubmit={handleSubmit}
                    Cancelar={Cancelar}
                />
            )}
        </div>
    );
}
