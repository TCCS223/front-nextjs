'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';

import { MdRemoveRedEye, MdEdit, MdAdd } from "react-icons/md";
import Swal from 'sweetalert2';
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import FormVeiculo from '@/components/FormVeiculo';

import api from '@/services/api';

import ModalRelacionarUsuario from '@/components/relacionarUsuario';
import ModalProprietarios from '@/components/editarRelacaoUsuarioVeiculo';

export default function Veiculos() {
    const [veiculos, setVeiculos] = useState([]);
    const [filteredVeiculos, setFilteredVeiculos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');
    const [isViewing, setIsViewing] = useState(false);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [isAsc, setIsAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedVeic, setSelectedVeic] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenRelacao, setModalOpenRelacao] = useState(false);

    const [placaErro, setPlacaErro] = useState('');
    const [anoErro, setAnoErro] = useState('');
    const [isPlacaValidando, setIsPlacaValidando] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const usersPerPage = 15;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentVeiculos = filteredVeiculos.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
        ListarVeiculos();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchText, statusFilter, veiculos]);

    const ListarModelos = async (marID) => {
        try {
            const response = await api.get(`/modelos/cat/${selectedVeic.cat_id}/mar/${marID}`);
            setModelos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as marcas:", error);
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

    const ListarMarcas = async (catId) => {
        try {
            const response = await api.get(`/marcas/categorias/${catId}`);
            setMarcas(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as marcas:", error);
        }
    }

    const ListarVeiculos = async () => {
        try {
            const response = await api.get('/veiculos');
            setVeiculos(response.data.dados);
            handleSearch();
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível carregar os usuários.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };

    const handleSearch = () => {
        setSortedColumn(null);
        setIsAsc(true);

        const result = veiculos.filter((veiculo) => {
            const statusMatch =
                statusFilter === 'todos' ||
                (statusFilter === 'ativo' && veiculo.veic_situacao === 1) ||
                (statusFilter === 'inativo' && veiculo.veic_situacao === 0);

            const searchTextMatch = searchText === '' ||
                (veiculo.veic_placa?.toLowerCase().includes(searchText.toLowerCase())) ||
                (veiculo.modelo?.toLowerCase().includes(searchText.toLowerCase())) ||
                (veiculo.marca?.toLowerCase().includes(searchText.toLowerCase()));

            return statusMatch && searchTextMatch;
        });

        setFilteredVeiculos(result);
        setCurrentPage(1);
    };

    const handleViewVeic = async (veiculo) => {
        try {
            const response = await api.get(`/veiculos/${veiculo.veic_id}`);

            if (response.data.sucesso) {
                setSelectedVeic(response.data.dados);
                setShowForm(true);
                setIsViewing(true);
                setIsEditing(false);
            } else {
                throw new Error(response.data.mensagem);
            }
        } catch (error) {
            console.error("Erro ao visualizar veículo:", error);
            if (error.response) {
                console.error("Dados do erro:", error.response.data);
                console.error("Status do erro:", error.response.status);
            }
            Swal.fire({
                title: 'Erro!',
                text: error.response ? error.response.data.mensagem : 'Erro desconhecido ao buscar veículo.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };

    const handleEditVeic = async (veiculo) => {
        try {
            const response = await api.get(`/veiculos/${veiculo.veic_id}`);

            if (response.data.sucesso) {
                setSelectedVeic(response.data.dados);
                setShowForm(true);
                setIsViewing(false);
                setIsEditing(true);
            } else {
                throw new Error(response.data.mensagem);
            }
        } catch (error) {
            console.error("Erro ao visualizar veículo:", error);
            if (error.response) {
                console.error("Dados do erro:", error.response.data);
                console.error("Status do erro:", error.response.status);
            }
            Swal.fire({
                title: 'Erro!',
                text: error.response ? error.response.data.mensagem : 'Erro desconhecido ao buscar veículo.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };

    const handleExit = () => {
        setShowForm(false);
        setSelectedVeic([]);
        setIsViewing(false);
        setIsEditing(false);
    };

    const handlePlacaChange = async (placa) => {
        setSelectedVeic(prevState => ({
            ...prevState,
            veic_placa: placa
        }));
        setPlacaErro('');

        const placaRegex = /^[A-Z]{3}-\d{4}$|^[A-Z]{3}-\d{1}[A-Z]{1}\d{2}$/;

        if (!placaRegex.test(placa)) {
            setPlacaErro('');
            return false;
        }

        try {
            setIsPlacaValidando(true);

            const response = await api.post('/verificarPlaca', { veic_placa: placa });

            if (response.status === 200) {
                setPlacaErro('');
                return true;
            }
        } catch (error) {
            console.error("Erro ao validar placa:", error);

            if (error.response) {
                console.error("Erro da API:", error.response.data);
                setPlacaErro(`teste : ${error.response.data.mensagem}`);
            } else if (error.request) {
                console.error("Nenhuma resposta da API:", error.request);
                setPlacaErro('Nenhuma resposta da API.');
            } else {
                console.error("Erro na requisição:", error.message);
                setPlacaErro('Erro na requisição ao verificar a placa.');
            }
            return false;
        } finally {
            setIsPlacaValidando(false);
        }
    };

    const validarAno = (ano) => {
        const anoAtual = new Date().getFullYear();
        const anoMax = anoAtual + 1;
        const anoNum = parseInt(ano, 10);
        if (isNaN(anoNum) || anoNum < 1886 || anoNum > anoMax) {
            setAnoErro(`O ano deve ser entre 1886 e ${anoMax}.`);
            return false;
        }
        setAnoErro('');
        return true;
    };

    const handleSubmit = async (veiculo) => {

        setIsSubmitting(true);
        setPlacaErro('');
        setAnoErro('');

        let placaValida = true;

        if (!veiculo.veic_id || veiculo.veic_placa !== selectedVeic.veic_placa) {
            placaValida = await handlePlacaChange(veiculo.veic_placa);
        }

        const anoValido = validarAno(veiculo.veic_ano);

        if (!placaValida || !anoValido) {
            setIsSubmitting(false);
            return;
        }

        const data = {
            mod_id: veiculo.mod_id,
            veic_placa: veiculo.veic_placa,
            veic_ano: veiculo.veic_ano,
            veic_cor: veiculo.veic_cor,
            veic_combustivel: veiculo.veic_combustivel,
            veic_observ: veiculo.veic_observ || '',
            veic_situacao: veiculo.veic_situacao,
        };

        try {
            let response;
            if (veiculo.veic_id) {
                response = await api.patch(`/veiculos/${veiculo.veic_id}`, data);
            } else {
                response = await api.post('/veiculos', data);
            }

            Swal.fire({
                title: 'Sucesso!',
                text: response.data.mensagem,
                icon: 'success',
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            });

            setShowForm(false);
            setSelectedVeic(null);
            setIsViewing(false);
            setIsEditing(false);
            ListarVeiculos();

        } catch (error) {
            console.error("Erro ao salvar veículo:", error);
            Swal.fire({
                title: 'Erro!',
                text: error.response?.data.mensagem || 'Erro desconhecido.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
        setIsSubmitting(false);
    };

    const Create = () => {
        setSelectedVeic({
            cat_id: '',
            mar_id: '',
            mod_id: '',
            veic_placa: '',
            veic_ano: '',
            veic_cor: '',
            veic_combustivel: '',
            veic_observ: '',
            veic_situacao: 1,
        });
        setShowForm(true);
        ListarCategorias();
    };

    const sortByColumn = (column) => {
        let newIsAsc = true;

        if (sortedColumn === column) {
            newIsAsc = !isAsc;
        }

        const sortedData = [...filteredVeiculos].sort((a, b) => {
            if (a[column] < b[column]) return newIsAsc ? -1 : 1;
            if (a[column] > b[column]) return newIsAsc ? 1 : -1;
            return 0;
        });

        setFilteredVeiculos(sortedData);
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
                    setSelectedVeic(null);
                    setIsViewing(false);
                    setIsEditing(false);
                    ListarVeiculos();
                });
            }
        });
    }

    const handleRelacionarUsuario = () => {
        setModalOpen(true);
    }

    const handleEditarRelacao = () => {
        setModalOpenRelacao(true);
    }

    return (
        <div id="veiculos" className={styles.content_section}>
            <h2 className={styles.title_page}>Gerenciamento de Veículos</h2>

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
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        handleSearch();
                                    }}
                                >
                                    <option value="todos">Todos</option>
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                </select>
                            </div>

                            <button className={styles.newButton} onClick={Create}>Novo</button>
                        </div>
                    </div>

                    <div className={styles.resultTableContainer}>
                        <table className={styles.resultTable}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th
                                        className={`${styles.tableHeader} ${styles.id}`}
                                        onClick={() => sortByColumn('veic_id')}>
                                        Código
                                        {sortedColumn === 'veic_id' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.modelo}`}
                                        onClick={() => sortByColumn('modelo')}>
                                        Modelo
                                        {sortedColumn === 'modelo' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.marca}`}
                                        onClick={() => sortByColumn('marca')}>
                                        Marca
                                        {sortedColumn === 'marca' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.placa}`}
                                        onClick={() => sortByColumn('veic_placa')}>
                                        Placa
                                        {sortedColumn === 'veic_placa' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.cor}`}
                                        onClick={() => sortByColumn('veic_cor')}>
                                        Cor
                                        {sortedColumn === 'veic_cor' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.combustivel}`}
                                        onClick={() => sortByColumn('veic_combustivel')}>
                                        Combustível
                                        {sortedColumn === 'veic_combustivel' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.proprietario}`}
                                        onClick={() => sortByColumn('proprietarios')}>
                                        Proprietário
                                        {sortedColumn === 'proprietarios' ? (isAsc ? '▲' : '▼') : ''}
                                    </th>
                                    <th className={`${styles.tableHeader} ${styles.acao}`}>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                {currentVeiculos.length > 0 ? (
                                    currentVeiculos.map((veiculo) => (
                                        <tr key={veiculo.veic_id}>
                                            <td className={styles.tdId}>{veiculo.veic_id}</td>
                                            <td>{veiculo.modelo}</td>
                                            <td>{veiculo.marca}</td>
                                            <td>{veiculo.veic_placa}</td>
                                            <td>{veiculo.veic_cor}</td>
                                            <td>{veiculo.veic_combustivel}</td>
                                            <td className={styles.tdProprietario}>
                                                {veiculo.num_proprietarios > 1 ? (
                                                    <div className={styles.customSelect}>
                                                        <select>
                                                            <option value="" disabled>Selecionar Proprietário</option>
                                                            {veiculo.proprietarios.split(', ').map((proprietario, index) => (
                                                                <option key={index} value={proprietario}>{proprietario}</option>
                                                            ))}
                                                        </select>
                                                        <span> (+{veiculo.num_proprietarios - 1})</span>
                                                    </div>
                                                ) : (
                                                    <span>{veiculo.proprietarios}</span>
                                                )}
                                            </td>

                                            <td>
                                                <div className={styles.actionIcons}>
                                                    <i>
                                                        <MdRemoveRedEye
                                                            title="Visualizar"
                                                            onClick={() => handleViewVeic(veiculo)}
                                                        />
                                                    </i>
                                                    <i>
                                                        <MdEdit
                                                            title="Editar"
                                                            onClick={() => handleEditVeic(veiculo)}
                                                        />
                                                    </i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">Nenhum veículo encontrado</td>
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
                            onClick={() => setCurrentPage(prev => (veiculos.length > indexOfLastUser ? prev + 1 : prev))}
                            disabled={veiculos.length <= indexOfLastUser}
                        >
                            Próxima
                        </button>
                    </div>
                </>
            ) : (<>

                <FormVeiculo
                    selectedVeic={selectedVeic}
                    setSelectedVeic={setSelectedVeic}
                    isViewing={isViewing}
                    isEditing={isEditing}
                    categorias={categorias}
                    marcas={marcas}
                    listarMarcas={ListarMarcas}
                    modelos={modelos}
                    listarModelos={ListarModelos}
                    handleSubmit={handleSubmit}
                    Cancelar={Cancelar}
                    placaErro={placaErro}
                    anoErro={anoErro}
                    isPlacaValidando={isPlacaValidando}
                    isSubmitting={isSubmitting}
                    handlePlacaChange={handlePlacaChange}
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
                                        className={styles.button_AddUsuario}
                                        onClick={handleRelacionarUsuario}
                                    >
                                        Proprietários
                                        {/* <MdAdd className={styles.iconAdd} /> */}
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.button_relation}
                                        onClick={handleEditarRelacao}
                                    >
                                        Relacionamento
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
                                            handleSubmit(selectedVeic);
                                        }}
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
                                            handleSubmit(selectedVeic);
                                        }}
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

            <ModalRelacionarUsuario
                isOpen={modalOpen}
                veiculoId={selectedVeic?.veic_id}
                onClose={() => setModalOpen(false)}
            />

            <ModalProprietarios
                isOpen={modalOpenRelacao}
                veiculoId={selectedVeic?.veic_id}
                onClose={() => setModalOpenRelacao(false)}
            />
        </div>
    );
}