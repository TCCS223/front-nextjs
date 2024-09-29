'use client'

import styles from './page.module.css';
import { useState, useEffect } from 'react';

import { MdRemoveRedEye, MdEdit } from "react-icons/md";
// import { IoMdTrash } from "react-icons/io";
import Swal from 'sweetalert2';

import { PiListMagnifyingGlassBold } from "react-icons/pi";
import FormServicos from '@/components/FormServicos';

import api from '@/services/api';

export default function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [selectedServico, setSelectedServico] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [statusFilter, setStatusFilter] = useState('todos');
    const [searchText, setSearchText] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [filteredServicos, setFilteredServicos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [isAsc, setIsAsc] = useState(true);

    const usersPerPage = 15;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentServicos = filteredServicos.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        ListarServicos();
    }, []);

    useEffect(() => {
        setFilteredServicos(servicos);
    }, [servicos]);

    useEffect(() => {
        handleSearch(); // Chama o filtro sempre que o status for alterado
    }, [searchText, statusFilter]);

    const ListarServicos = async () => {
        try {
            const response = await api.get('/servicos');
            console.log(response.data);
            setServicos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar os serviços:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os serviços.",
                icon: "error",
            });
        }
    };

    const handleSearch = () => {
        setSortedColumn(null);
        setIsAsc(true);

        const result = servicos.filter((servico) => {
            const statusMatch = statusFilter === 'todos' ||
                (statusFilter === 'ativo' && servico.serv_situacao === 'Ativo') ||
                (statusFilter === 'inativo' && servico.serv_situacao === 'Inativo');

            const searchTextMatch = searchText === '' ||
                servico.serv_nome.toLowerCase().includes(searchText.toLowerCase()) ||
                servico.cat_serv_nome.toLowerCase().includes(searchText.toLowerCase());

            return statusMatch && searchTextMatch;
        });

        setFilteredServicos(result);
        setCurrentPage(1);
    };

    const handleViewServicos = async (servicos) => {
        try {
            const response = await api.get(`/servicos/${servicos.serv_id}`);
            if (response.data.sucesso) {
                setSelectedServico(response.data.dados);
                setShowForm(true);
                setIsViewing(true);
            } else {
                throw new Error(response.data.mensagem);
            }
        } catch (error) {
            console.error("Erro ao visualizar serviço:", error);
            Swal.fire({
                title: "Erro!",
                text: error.response ? error.response.data.mensagem : 'Erro desconhecido ao buscar serviço.',
                icon: "error",
            });
        }
    };

    const handleEditServicos = (servicos) => {
        setSelectedServico(servicos);
        setShowForm(true);
        setIsViewing(false);
    };

    const handleExit = () => {
        setShowForm(false);  // Fecha o formulário
        setSelectedServico([]);  // Limpa o usuário selecionado
        setIsViewing(false);  // Reinicializa o modo de visualização
    };

    const handleSubmit = async (servico) => {
        try {
            let response;

            if (servico.serv_id) {
                response = await api.patch(`/servicos/${servico.serv_id}`, servico);
            } else {
                response = await api.post('/servicos', servico);
            }

            Swal.fire({
                title: 'Sucesso!',
                text: response.data.mensagem,
                icon: 'success',
            });

            ListarServicos();
            setShowForm(false);
        } catch (error) {
            console.error("Erro ao salvar serviço:", error);
            Swal.fire({
                title: 'Erro!',
                text: error.response ? error.response.data.mensagem : 'Erro ao salvar serviço.',
                icon: 'error',
            });
        }
    };


    const sortByColumn = (column) => {
        let newIsAsc = true; // Define ascendente por padrão

        if (sortedColumn === column) {
            newIsAsc = !isAsc; // Se a mesma coluna for clicada, inverte a direção
        }

        const sortedData = [...filteredServicos].sort((a, b) => {
            if (a[column] < b[column]) return newIsAsc ? -1 : 1;
            if (a[column] > b[column]) return newIsAsc ? 1 : -1;
            return 0;
        });

        setFilteredServicos(sortedData); // Atualiza a lista filtrada com os dados ordenados
        setSortedColumn(column); // Atualiza a coluna que está sendo ordenada
        setIsAsc(newIsAsc); // Atualiza a direção da ordenação
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
                    setSelectedServico(null);
                });
            }
        });
    };

    return (
        <div id="servicos" className={`${styles.content_section}`}>
            <h2 className={styles.title_page}>Gerenciamento de Serviços</h2>

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
                            <div className={`${styles.filterGroup} ${styles.filterGroupTypeUser}`}></div>

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
                                        onClick={() => sortByColumn('serv_id')}>
                                        Código
                                        {sortedColumn === 'serv_id' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.nome}`}
                                        onClick={() => sortByColumn('serv_nome')}>
                                        Nome do Serviço
                                        {sortedColumn === 'serv_nome' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.categoria}`}
                                        onClick={() => sortByColumn('cat_serv_nome')}>
                                        Categoria
                                        {sortedColumn === 'cat_serv_nome' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.duracao}`}
                                        onClick={() => sortByColumn('serv_duracao')}>
                                        Duração
                                        {sortedColumn === 'serv_duracao' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th
                                        className={`${styles.tableHeader} ${styles.preco}`}
                                        onClick={() => sortByColumn('serv_preco')}>
                                        Preço
                                        {sortedColumn === 'serv_preco' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.acao}`}>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                {currentServicos.length > 0 ? (
                                    currentServicos.map((servicos) => (
                                        <tr key={servicos.serv_id}>
                                            <td className={styles.tdId}>{servicos.serv_id}</td>
                                            <td className={styles.tdNome}>{servicos.serv_nome}</td>
                                            <td className={styles.tdCategoria}>{servicos.cat_serv_nome}</td>
                                            <td className={styles.tdDuracao}>{servicos.serv_duracao}</td>
                                            <td className={styles.tdPreco}>R${Number(servicos.serv_preco).toFixed(2)}</td>
                                            <td>
                                                <div className={styles.actionIcons}>
                                                    <i>
                                                        <MdRemoveRedEye
                                                            title="Visualizar"
                                                            onClick={() => handleViewServicos(servicos)} />
                                                    </i>
                                                    <i>
                                                        <MdEdit
                                                            title="Editar"
                                                            onClick={() => handleEditServicos(servicos)}
                                                        />
                                                    </i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className={styles.noResults}>Nenhum serviço encontrado.</td>
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
                            onClick={() => setCurrentPage(prev => (filteredServicos.length > indexOfLastUser ? prev + 1 : prev))}
                            disabled={filteredServicos.length <= indexOfLastUser}
                        >
                            Próxima
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <FormServicos
                        selectedServico={selectedServico}
                        setSelectedServico={setSelectedServico}
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
                                        handleSubmit(selectedServico);
                                    }}
                                    disabled={isViewing}
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
