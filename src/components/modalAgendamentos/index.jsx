import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { format, parseISO } from 'date-fns';
import styles from './index.module.css';





const CalendarEventDetailsModal = ({ modalEvent, onClose }) => {
    const [agendamento, setAgendamento] = useState(null);
    const [veiculo, setVeiculo] = useState(null);

    useEffect(() => {
        const fetchAgendamentoDetails = async () => {
            try {
                const response = await api.get(`/agendamentos/usuarios/${modalEvent?.usu_id}`);
                setAgendamento(response.data);

                const veiculoResponse = await api.get(`/veiculos/${response.data.veic_id}`);
                setVeiculo(veiculoResponse.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do agendamento:', error);
            }
        };

        if (modalEvent) {
            fetchAgendamentoDetails();
        }
    }, [modalEvent]);

    if (!agendamento || !veiculo) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Detalhes do Agendamento</h2>

                <div className={styles.detailsContainer}>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Data:</span>
                        <span>{format(parseISO(agendamento.agend_data), 'dd/MM/yyyy')}</span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Horário:</span>
                        <span>{format(parseISO(agendamento.agend_data + 'T' + agendamento.agend_horario), 'HH:mm')}</span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Placa:</span>
                        <span>{veiculo.veic_placa}</span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Situação:</span>
                        <span>{agendamento.agend_situacao === 1 ? 'Agendado' : 'Concluído'}</span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Observação:</span>
                        <span>{agendamento.agend_observ}</span>
                    </div>
                </div>

                <div className={styles.buttons_form}>
                    <button className={styles.button_cancel} onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarEventDetailsModal;