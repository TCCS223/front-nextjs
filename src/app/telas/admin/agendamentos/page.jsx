import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '@/services/api';
import styles from './page.module.css';
import { PiListMagnifyingGlassBold } from "react-icons/pi";

export default function CadAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [isAsc, setIsAsc] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const agendamentosPerPage = 15;

    useEffect(() => {
        ListarAgendamentos();
    }, []);

    const ListarAgendamentos = async () => {
        try {
            const response = await api.get('/agendamentos');
            setAgendamentos(response.data.dados);
            setFilteredAgendamentos(response.data.dados);
            console.log("Agendamentos carregados: ", response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar os agendamentos:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os agendamentos.",
                icon: "error",
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };

    const handleSearch = () => {
        const result = agendamentos.filter((agendamento) => {
            return (
                agendamento.agend_observ.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        setFilteredAgendamentos(result);
        setCurrentPage(1);
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

    const indexOfLastAgendamento = currentPage * agendamentosPerPage;
    const indexOfFirstAgendamento = indexOfLastAgendamento - agendamentosPerPage;
    const currentAgendamentos = filteredAgendamentos.slice(indexOfFirstAgendamento, indexOfLastAgendamento);

    return (
        <div id="clientes" className={styles.content_section}>
            <div className={styles.contentSearch}>
                <h2 className={styles.titlePage}>Gerenciamento de Agendamentos</h2>
                <div className={styles.searchInput}>
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        className={styles.inputSearch}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyUp={handleSearch}
                    />
                    <PiListMagnifyingGlassBold
                        className={styles.lupa}
                    />
                </div>

            </div>
            <table className={styles.resultTable}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th
                            className={`${styles.tableHeader} ${styles.id}`}
                            onClick={() => sortByColumn('agend_id')}>
                            ID
                            {sortedColumn === 'agend_id' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('veic_usu_id')}>
                            Veículo
                            {sortedColumn === 'veic_usu_id' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('agend_data')}>
                            Data
                            {sortedColumn === 'agend_data' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('agend_horario')}>
                            Horário
                            {sortedColumn === 'agend_horario' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('agend_observ')}>
                            Observações
                            {sortedColumn === 'agend_observ' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('agend_situacao')}>
                            Situação
                            {sortedColumn === 'agend_situacao' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('serv_id')}>
                            Serviço
                            {sortedColumn === 'serv_id' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('agend_serv_situ_id')}>
                            Situação Serviço
                            {sortedColumn === 'agend_serv_situ_id' ? (isAsc ? '▲' : '▼') : ''}
                        </th>
                        <th className={`${styles.tableHeader} ${styles.acao}`}>Ações</th>
                    </tr>
                </thead>

                <tbody className={styles.tableBody}>
                    {currentAgendamentos.length > 0 ? (
                        currentAgendamentos.map((agendamento) => (
                            <tr key={agendamento.agend_id} className={styles.tableRow}>
                                <td className={styles.tdId}>{agendamento.agend_id}</td>
                                <td>{agendamento.veic_usu_id}</td>
                                <td>{agendamento.agend_data}</td>
                                <td>{agendamento.agend_horario}</td>
                                <td>{agendamento.agend_observ}</td>
                                <td>{agendamento.agend_situacao}</td>
                                <td>{agendamento.serv_id}</td>
                                <td>{agendamento.agend_serv_situ_id}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className={styles.tableRow}>
                            <td colSpan="8">Nenhum agendamento encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    className={`${styles.buttonPrev} ${styles.paginationButton}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span className={styles.paginationText}>Página {currentPage}</span>
                <button
                    className={`${styles.buttonNext} ${styles.paginationButton}`}
                    onClick={() =>
                        setCurrentPage((prev) =>
                            filteredAgendamentos.length > indexOfLastAgendamento ? prev + 1 : prev
                        )
                    }
                    disabled={filteredAgendamentos.length <= indexOfLastAgendamento}
                >
                    Próxima
                </button>
            </div>

        </div>


    );
}
