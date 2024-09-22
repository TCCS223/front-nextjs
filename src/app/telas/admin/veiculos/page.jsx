import styles from './page.module.css';
import { useState, useEffect } from 'react';

import { MdRemoveRedEye, MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { format } from 'date-fns';
import Swal from 'sweetalert2';

// import ConsultaVeiculo from '@/components/modais/modais_clientes';
import FormVeiculo from '@/components/FormVeiculo';

import api from '@/services/api';

export default function Veiculos() {
    const [veiculos, setVeiculos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');
    const [selectedVeic, setSelectedVeic] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        ListarVeiculos();
    }, []);


    const handleViewVeic = (usuario) => {
        setSelectedVeic(usuario);
        setShowForm(true);
        setIsViewing(true);
    };

    const handleEditVeic = (usuario) => {
        setSelectedVeic(usuario);
        setShowForm(true);
        setIsViewing(false);
    };

    const handleSubmit = async (data) => {
        try {
            const response = await api.patch(`/veiculos/${data.veic_id}`, data);
            Swal.fire({
                title: 'Sucesso!',
                text: response.data.mensagem,
                icon: 'success',
            });
            ListarVeiculos();
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

    const ListarVeiculos = async () => {
        try {
            const response = await api.get('/veiculos');
            setVeiculos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os usuários.",
                icon: "error",
            });
        }
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
                    setSelectedVeic(null); // Mostrar a tabela novamente após confirmação
                });
            }
        });
    }

    



    


    return (
        <div id="veiculos" className={styles.content_section}>
            <h2 className={styles.title_page}>Gerenciamento de Veículos</h2>

            {!showForm ? (
                <>
                    <div className={styles.contentSearch}>
                        <div className={styles.searchBar}>
                            <input
                                type="text"
                                placeholder="Digite aqui..."
                                className={styles.searchInput}
                            // value={searchText}
                            // onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button className={styles.searchButton} >Pesquisar</button>
                        </div>

                        <div className={styles.filterButtons}>

                            <div className={`${styles.filterGroup} ${styles.filterGroupTypeUser}`}></div>

                            <div className={styles.filterGroup}>
                                <label htmlFor="status" className={styles.labelFilter}>Status</label>
                                <select
                                    id="status"
                                    className={styles.filterSelect}
                                // value={statusFilter}
                                // onChange={(e) => setStatusFilter(e.target.value)}
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
                                    <th className={`${styles.tableHeader} ${styles.id}`}>Código</th>
                                    <th className={`${styles.tableHeader} ${styles.modelo}`}>Modelo</th>
                                    <th className={`${styles.tableHeader} ${styles.marca}`}>Marca</th>
                                    <th className={`${styles.tableHeader} ${styles.placa}`}>Placa</th>
                                    <th className={`${styles.tableHeader} ${styles.ano}`}>Ano</th>
                                    <th className={`${styles.tableHeader} ${styles.cor}`}>Cor</th>
                                    <th className={`${styles.tableHeader} ${styles.combustivel}`}>Combustível</th>
                                    <th className={`${styles.tableHeader} ${styles.proprietario}`}>Proprietário</th>
                                    <th className={`${styles.tableHeader} ${styles.acao}`}>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                {veiculos.length > 0 ? (
                                    veiculos.map((veiculo) => (
                                        <tr key={veiculo.veic_id}>
                                            <td className={styles.tdId}>{veiculo.veic_id}</td>
                                            <td>{veiculo.modelo}</td>
                                            <td>{veiculo.marca}</td>
                                            <td>{veiculo.veic_placa}</td>
                                            <td>{veiculo.veic_ano}</td>
                                            <td>{veiculo.veic_cor}</td>
                                            <td>{veiculo.veic_combustivel}</td>
                                            <td>
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
                                                    <i><MdRemoveRedEye title="Visualizar" onClick={() => handleViewVeic(veiculo)} /></i>
                                                    <i><MdEdit title="Editar" onClick={() => handleEditVeic(veiculo)} /></i>
                                                    <i><IoMdTrash title="Excluir" onClick={() => handleDeleteUser(veiculo.veic_id)} /></i>
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

                </>
            ) : (<>

                <FormVeiculo
                    selectedUser={selectedVeic}
                    setSelectedUser={setSelectedVeic}
                    isViewing={isViewing}
                    handleSubmit={handleSubmit}
                    Cancelar={Cancelar}
                />
            </>
            )}
            
        </div>


    );
}
