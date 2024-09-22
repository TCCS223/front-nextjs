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
    // const [nomeMarca, setNomeMarca] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');




    useEffect(() => {
        ListarVeiculos();
    }, []);


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

    const handleShowProprietarios = (proprietarios) => {
        alert(`Proprietários: ${proprietarios}`);
    };



    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setNomeMarca(selectedMarca);
        console.log(selectedMarca);
    };


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
                                                    <i><MdRemoveRedEye title="Visualizar" onClick={() => handleViewUser(veiculo)} /></i>
                                                    <i><MdEdit title="Editar" onClick={() => handleEditUser(veiculo)} /></i>
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

                <form id="veiculoForm" className={styles.form}>
                    <input type="hidden" id="veiculoId" className={styles.input_veiculos} />

                    <div className={styles.grid}>
                        <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                            <label htmlFor="codigo_veiculo" className={styles.label_veiculos}>Código</label>
                            <input type="text" id="placa_veiculo" name="placa_veiculo" required disabled className={styles.input_veiculos} />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                            <label htmlFor="placa_veiculo" className={styles.label_veiculos}>Placa</label>
                            <input type="text" id="placa_veiculo" name="placa_veiculo_veiculo" required className={styles.input_veiculos} placeholder="Letras e números" />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                            <label htmlFor="categoria_veiculo" className={styles.label_veiculos}>Categoria</label>
                            <select id="categoria_veiculo" name="categoria_veiculo" required className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                                <option value="" disabled selected>Selecionar</option>
                                <option value="1">Caminhão</option>
                                <option value="2">Carro</option>
                                <option value="3">Moto</option>
                            </select>
                        </div>



                        <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                            <label htmlFor="marca_veiculo" className={styles.label_veiculos}>Marca</label>
                            <select id="marca" name="marca" required className={`${styles.select_veiculos} ${styles.input_proprietario}`} onChange={handleMarcaChange}>
                                <option value="" disabled selected>Selecionar</option>
                                {marcas.map((name) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                            <label htmlFor="modelo_veiculo" className={styles.label_veiculos}>Modelo</label>
                            <select id="categoria_veiculo" name="categoria_veiculo" required className={`${styles.select_veiculos} ${styles.input_modelo}`}>
                                <option value="" disabled selected>Selecionar</option>
                                <option value="1">Caminhão</option>
                                <option value="2">Carro</option>
                                <option value="3">Moto</option>
                            </select>
                            {/* <input type="text" id="modelo_veiculo" name="modelo_veiculo" required className={styles.input_veiculos} /> */}
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_ano}`}>
                            <label htmlFor="ano_veiculo" className={styles.label_veiculos}>Ano</label>
                            <input type="number" id="ano_veiculo" name="ano_veiculo" required className={styles.input_veiculos} />
                        </div>
                        <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                            <label htmlFor="cor_veiculo" className={styles.label_veiculos}>Cor</label>
                            <select id="cor" name="cor" required className={`${styles.select_veiculos} ${styles.input_cor}`} defaultValue="">
                                <option value="" disabled selected>Selecionar</option>
                                <option value="Amarelo">Amarelo</option>
                                <option value="Azul">Azul</option>
                                <option value="Bege">Bege</option>
                                <option value="Branco">Branco</option>
                                <option value="Cinza">Cinza</option>
                                <option value="Dourado">Dourado</option>
                                <option value="Laranja">Laranja</option>
                                <option value="Marrom">Marrom</option>
                                <option value="Preto">Preto</option>
                                <option value="Prata">Prata</option>
                                <option value="Rosa">Rosa</option>
                                <option value="Roxo">Roxo</option>
                                <option value="Verde">Verde</option>
                                <option value="Vermelho">Vermelho</option>
                                <option value="Vinho">Vinho</option>
                                <option value="Personalizado">Personalizado</option>
                            </select>
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                            <label htmlFor="combustivel_veiculo" className={styles.label_veiculos}>Combustível</label>
                            <select id="combustivel_veiculo" name="combustivel_veiculo" required className={`${styles.select_veiculos} ${styles.input_combustivel}`}>
                                <option value="" disabled selected>Selecionar</option>
                                <option value="gasolina">Gasolina</option>
                                <option value="alcool">Álcool</option>
                                <option value="diesel">Diesel</option>
                                <option value="flex">Flex</option>
                                <option value="gnv">GNV (Gás Natural Veicular)</option>
                                <option value="eletrico">Elétrico</option>
                                <option value="hibrido">Híbrido</option>
                            </select>
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                            <label htmlFor="proprietario_veiculo" className={styles.label_veiculos}>Você é proprietário?</label>
                            <select id="nivel_acesso" name="nivel_acesso"
                                className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                                <option value="" disabled selected>Selecionar</option>
                                <option value="0" className={styles.option}>Sim</option>
                                <option value="1" className={styles.option}>Não</option>
                            </select>
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_observacoes} ${styles.grid_item_observacoes}`}>
                            <label htmlFor="observacoes_veiculo" className={styles.label_veiculos}>Observações</label>
                            <input type="text" id="observacoes_veiculo" name="observacoes_veiculo" required className={styles.input_veiculos} />
                        </div>

                        <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                            <label for="situacao_veiculo" className={styles.label_veiculos}>Situação</label>
                            <select id="situacao_veiculo" name="situacao_veiculo"
                                className={`${styles.select_veiculos} ${styles.input_situacao}`}>
                                <option value="ativo" className={styles.option} selected>Ativo</option>
                                <option value="inativo" className={styles.option}>Inativo</option>
                            </select>
                        </div>

                    </div>
                </form>
            </>
            )}
            {/* <div className={styles.footer_form}>
                <button type="reset" className={styles.button_cancel}>Cancelar</button>
                <button type="submit" className={styles.button_submit}>Salvar</button>
            </div> */}
        </div>


    );
}
