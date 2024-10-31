import api from '@/services/api';
import styles from './page.module.css';
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import { useState, useEffect } from 'react';
import { MdRemoveRedEye, MdEdit } from "react-icons/md";
import { parseISO, format } from 'date-fns';

import InputMask from "react-input-mask";

export default function HistoricoAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [isAsc, setIsAsc] = useState(true);
    const [situacaoDoAgendamento, setSituacaoDoAgendamento] = useState([])

    const agendamentosPerPage = 15;

    useEffect(() => {
        ListarAgendamentos();
        ListarSituacaoDoAgendamento();
    }, []);

    const ListarAgendamentos = async () => {
        try {
            const response = await api.get('/agendamentos');
            const agendamentosOrdenados = response.data.dados.sort((a, b) => a.agend_id - b.agend_id);
            setAgendamentos(agendamentosOrdenados);
            setFilteredAgendamentos(agendamentosOrdenados);
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

    const ListarSituacaoDoAgendamento = async () => {
        try {
            const responde = await api.get('/agendaServicosSituacao');
            setSituacaoDoAgendamento(responde.data.dados);
            console.log(responde.data.dados);
        } catch (error) {
            console.error("Erro ao buscar os situações dos agendamentos:", error);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os agendamentos.",
                icon: "error",
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    }

    const handleSearch = (text) => {
        setSearchText(text);
        applyFilters(text, startDate, endDate, statusFilter);
    };

    const handleDateChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        applyFilters(searchText, start, end, statusFilter);
    };

    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
        applyFilters(searchText, startDate, endDate, status);
    };
    
    const applyFilters = (text, start, end, status) => {
        const result = agendamentos.filter((agendamento) => {
            const matchesText = agendamento.agend_observ.toLowerCase().includes(text.toLowerCase()) ||
                agendamento.veic_placa.toLowerCase().includes(text.toLowerCase()) ||
                agendamento.agend_id.toString().includes(text);
    
            const agendamentoData = new Date(agendamento.agend_data).setUTCHours(0, 0, 0, 0);
            const startDate = start ? new Date(start).setUTCHours(0, 0, 0, 0) : null;
            const endDate = end ? new Date(end).setUTCHours(23, 59, 59, 999) : null;
    
            const matchesDate = (!startDate || agendamentoData >= startDate) &&
                (!endDate || agendamentoData <= endDate);
    
            const matchesStatus = status === 'todos' || agendamento.agend_serv_situ_id === parseInt(status);
    
            return matchesText && matchesDate && matchesStatus;
        });
        setFilteredAgendamentos(result);
        setCurrentPage(1);
    };

    const sortByColumn = (column) => {
        let newIsAsc = true;
        if (sortedColumn === column) newIsAsc = !isAsc;

        const sortedData = [...filteredAgendamentos].sort((a, b) => {
            if (a[column] < b[column]) return newIsAsc ? -1 : 1;
            if (a[column] > b[column]) return newIsAsc ? 1 : -1;
            return 0;
        });

        setFilteredAgendamentos(sortedData);
        setSortedColumn(column);
        setIsAsc(newIsAsc);
    };


    const indexOfLastAgendamento = currentPage * agendamentosPerPage;
    const indexOfFirstAgendamento = indexOfLastAgendamento - agendamentosPerPage;
    const currentAgendamentos = filteredAgendamentos.slice(indexOfFirstAgendamento, indexOfLastAgendamento);

    return (
        <div id="clientes" className={styles.content_section}>
            <h2 className={styles.title_page}>Gerenciamento de Agendamentos</h2>


            <div className={styles.contentSearch}>
                <div className={styles.search}>
                    <div className={styles.searchInput}>
                        <input
                            type="text"
                            placeholder="Digite aqui..."
                            className={styles.inputSearch}
                            value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <PiListMagnifyingGlassBold className={styles.lupa} />
                    </div>
                </div>

                <div className={styles.filterButtons}>
                    <div className={styles.filterGroup}>
                        <label htmlFor="startDate" className={styles.labelFilter}>Data Início</label>
                        <input

                            type="date"
                            id="startDate"
                            className={styles.filterSelect}
                            value={startDate}
                            onChange={(e) => handleDateChange(e.target.value, endDate)}
                        />
                    </div>


                    <div className={styles.filterGroup}>
                        <label htmlFor="endDate" className={styles.labelFilter}>Data Fim</label>
                        <input
                            type="date"
                            id="endDate"
                            className={styles.filterSelect}
                            value={endDate}
                            onChange={(e) => handleDateChange(startDate, e.target.value)}
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        {/* <label htmlFor="status" className={styles.labelFilter}>Situação</label> */}
                        <select
                            id="status"
                            className={styles.filterSelect}
                            value={statusFilter}
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                        >
                            <option value="todos">Todos</option>
                            {situacaoDoAgendamento.map((agendSitu) => (
                                <option key={agendSitu.agend_serv_situ_id} value={agendSitu.agend_serv_situ_id}>
                                    {agendSitu.agend_serv_situ_nome}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className={styles.resultTableContainer}>
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
                                className={`${styles.tableHeader} ${styles.veiculo}`}
                                onClick={() => sortByColumn('veic_placa')}>
                                Placa do Veículo
                                {sortedColumn === 'veic_placa' ? (isAsc ? '▲' : '▼') : ''}
                            </th>
                            <th
                                className={`${styles.tableHeader} ${styles.data}`}
                                onClick={() => sortByColumn('agend_data')}>
                                Data
                                {sortedColumn === 'agend_data' ? (isAsc ? '▲' : '▼') : ''}
                            </th>
                            <th
                                className={`${styles.tableHeader} ${styles.horario}`}
                                onClick={() => sortByColumn('agend_horario')}>
                                Horário
                                {sortedColumn === 'agend_horario' ? (isAsc ? '▲' : '▼') : ''}
                            </th>
                            <th
                                className={`${styles.tableHeader} ${styles.observ}`}
                                onClick={() => sortByColumn('agend_observ')}>
                                Observações
                                {sortedColumn === 'agend_observ' ? (isAsc ? '▲' : '▼') : ''}
                            </th>
                            <th
                                className={`${styles.tableHeader} ${styles.servico}`}
                                onClick={() => sortByColumn('serv_id')}>
                                Serviço
                                {sortedColumn === 'serv_id' ? (isAsc ? '▲' : '▼') : ''}
                            </th>
                            <th
                                className={`${styles.tableHeader} ${styles.situacao}`}
                                onClick={() => sortByColumn('agend_situacao')}>
                                Situação
                                {sortedColumn === 'agend_situacao' ? (isAsc ? '▲' : '▼') : ''}
                            </th>
                            {/* <th
                            className={styles.tableHeader}
                            onClick={() => sortByColumn('agend_serv_situ_id')}>
                            Situação do Serviço
                            {sortedColumn === 'agend_serv_situ_id' ? (isAsc ? '▲' : '▼') : ''}
                        </th> */}
                            <th className={`${styles.tableHeader} ${styles.acao}`}>Ações</th>
                        </tr>
                    </thead>

                    <tbody className={styles.tableBody}>
                        {currentAgendamentos.length > 0 ? (
                            currentAgendamentos.map((agendamento) => (
                                <tr key={agendamento.agend_id} className={styles.tableRow}>
                                    <td className={styles.tdId}>{agendamento.agend_id}</td>
                                    <td>{agendamento.veic_placa}</td>
                                    <td>{format(parseISO(agendamento?.agend_data), 'dd/MM/yyyy')}</td>
                                    <td>{agendamento.agend_horario}</td>
                                    <td>{agendamento.agend_observ}</td>
                                    {/* <td>{agendamento.agend_situacao}</td> */}
                                    <td>{agendamento.serv_id}</td>
                                    <td>{agendamento.agend_serv_situ_id}</td>
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
                            <tr className={styles.tableRow}>
                                <td colSpan="8">Nenhum agendamento encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

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