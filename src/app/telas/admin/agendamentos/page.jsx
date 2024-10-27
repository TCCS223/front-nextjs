import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import api from '@/services/api';
import styles from './page.module.css';

export default function CadAgendamentos() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

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

    const indexOfLastAgendamento = currentPage * agendamentosPerPage;
    const indexOfFirstAgendamento = indexOfLastAgendamento - agendamentosPerPage;
    const currentAgendamentos = filteredAgendamentos.slice(indexOfFirstAgendamento, indexOfLastAgendamento);

    return (
        <div className={styles.contentSearch}>
    <h2 className={styles.titlePage}>Gerenciamento de Agendamentos</h2>
    <input
        type="text"
        placeholder="Pesquisar..."
        className={styles.inputSearch}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={handleSearch}
    />

    <table className={styles.resultTable}>
        <thead className={styles.tableHead}>
            <tr>
                <th className={`${styles.tableHeader} ${styles.id}`}>ID</th>
                <th className={styles.tableHeader}>Veículo</th>
                <th className={styles.tableHeader}>Data</th>
                <th className={styles.tableHeader}>Horário</th>
                <th className={styles.tableHeader}>Observações</th>
                <th className={styles.tableHeader}>Situação</th>
                <th className={styles.tableHeader}>Serviço</th>
                <th className={styles.tableHeader}>Situação Serviço</th>
            </tr>
        </thead>
        <tbody className={styles.tableBody}>
            {currentAgendamentos.length > 0 ? (
                currentAgendamentos.map((agendamento) => (
                    <tr key={agendamento.agend_id} className={styles.tableRow}>
                        <td className={`${styles.tableCell} ${styles.tdId}`}>{agendamento.agend_id}</td>
                        <td className={styles.tableCell}>{agendamento.veic_usu_id}</td>
                        <td className={styles.tableCell}>{agendamento.agend_data}</td>
                        <td className={styles.tableCell}>{agendamento.agend_horario}</td>
                        <td className={styles.tableCell}>{agendamento.agend_observ}</td>
                        <td className={styles.tableCell}>{agendamento.agend_situacao}</td>
                        <td className={styles.tableCell}>{agendamento.serv_id}</td>
                        <td className={styles.tableCell}>{agendamento.agend_serv_situ_id}</td>
                    </tr>
                ))
            ) : (
                <tr className={styles.tableRow}>
                    <td colSpan="8" className={styles.tableCell}>Nenhum agendamento encontrado</td>
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
