import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './index.module.css';

const CalendarEventDetailsModal = ({ modalEvent, onClose }) => {
    const [agendSituacao, setAgendSituacao] = useState(null);

    const situacaoMap = {
        1: 'Pendente',
        2: 'Em andamento',
        3: 'Concluído',
        4: 'Cancelado'
    };

    useEffect(() => {
        if (modalEvent) {
            setAgendSituacao(modalEvent?._def?.extendedProps?.agend_serv_situ_id);
        }
    }, [modalEvent]);

    const handleSituacaoChange = (e) => {
        const newSituacao = parseInt(e.target.value, 10);
        setAgendSituacao(newSituacao);
        editarSituacaoDoAgendamento(modalEvent?._def?.extendedProps?.agend_id, newSituacao);
    };

    const editarSituacaoDoAgendamento = async (agend_id, agend_serv_situ_id) => {
        try {
            const response = await api.patch(`/agendamentos/situacao/${agend_id}`, {
                agend_serv_situ_id
            });

        } catch (error) {
            console.error('Erro ao atualizar situação do agendamento:', error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Detalhes do Agendamento {modalEvent?._def?.extendedProps?.agend_id}</h2>

                <div className={styles.detailsContainer}>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Data:</span>
                        <span>
                            {modalEvent?._def?.extendedProps?.agend_data
                                ? format(parseISO(modalEvent._def.extendedProps.agend_data), 'dd/MM/yyyy', { locale: ptBR })
                                : ''}
                        </span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Horário:</span>
                        <span>
                            {modalEvent?._def?.extendedProps?.agend_horario
                                ? format(parseISO(`1970-01-01T${modalEvent._def.extendedProps.agend_horario}`), 'HH:mm')
                                : ''}
                        </span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Placa:</span>
                        <span>{modalEvent?._def?.extendedProps?.veic_placa}</span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Situação:</span>
                        <select
                            value={agendSituacao || ''}
                            onChange={handleSituacaoChange}
                            className={styles.detailsSelect}
                        >
                            {Object.entries(situacaoMap).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Observação:</span>
                        <span>{modalEvent?._def?.extendedProps?.agend_observ}</span>
                    </div>
                </div>

                <div className={styles.buttons_form}>
                    <button className={styles.button_cancel} onClick={onClose}>Fechar</button>
                    <button className={styles.button_submit} onClick={editarSituacaoDoAgendamento}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default CalendarEventDetailsModal;