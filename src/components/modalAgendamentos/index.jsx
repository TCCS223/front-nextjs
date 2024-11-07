import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

import api from '@/services/api';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Swal from 'sweetalert2';

const CalendarEventDetailsModal = ({ modalEvent, onClose, isEditable }) => {
    const [agendSituacao, setAgendSituacao] = useState(null);

    const situacaoMap = {
        1: 'Pendente',
        2: 'Em andamento',
        3: 'Concluído',
        4: 'Cancelado'
    };

    useEffect(() => {
        if (modalEvent) {
            setAgendSituacao(parseInt(modalEvent?._def?.extendedProps?.agend_serv_situ_id, 10));
        }
    }, [modalEvent]);

    const handleSituacaoChange = (e) => {
        const newSituacao = parseInt(e.target.value, 10);
        setAgendSituacao(newSituacao);
    };

    const editarSituacaoDoAgendamento = async () => {
        try {
            await api.patch(`/agendamentos/situacao/${modalEvent?._def?.extendedProps?.agend_id}`, {
                agend_serv_situ_id: agendSituacao
            });
            Swal.fire({
                icon: 'success',
                title: 'Situação atualizada!',
                text: `A situação foi alterada para ${situacaoMap[agendSituacao]}.`,
                confirmButtonText: 'OK',
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            }).then((result) => {
                if (result.isConfirmed) {
                    onClose(); 
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar situação do agendamento:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível atualizar a situação do agendamento.',
                confirmButtonText: 'OK',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
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
                        {isEditable ? (
                            <select
                                value={agendSituacao || ''}
                                onChange={handleSituacaoChange}
                                className={styles.detailsSelect}
                            >
                                <option value='1'>Pendente</option>
                                <option value='2'>Em andamento</option>
                                <option value='3'>Concluído</option>
                                <option value='4'>Cancelado</option>
                            </select>
                        ) : (
                            <span>{situacaoMap[agendSituacao]}</span>
                        )}
                    </div>

                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Observação:</span>
                        <span>{modalEvent?._def?.extendedProps?.agend_observ}</span>
                    </div>
                </div>

                <div className={styles.buttons_form}>
                    <button className={styles.button_cancel} onClick={onClose}>Fechar</button>
                    {isEditable && (
                        <button className={styles.button_submit} onClick={editarSituacaoDoAgendamento}>
                            Salvar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarEventDetailsModal;