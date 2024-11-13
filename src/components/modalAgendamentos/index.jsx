import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

import api from '@/services/api';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Swal from 'sweetalert2';

const CalendarEventDetailsModal = ({ modalEvent, onClose, isEditable, veiculos }) => {
    const [agendSituacao, setAgendSituacao] = useState(null);
    const [agendData, setAgendData] = useState('');
    const [agendHorario, setAgendHorario] = useState('');
    const [veicUsuId, setVeicUsuId] = useState(''); // Mudança: use veicUsuId para capturar a placa selecionada
    const [agendObserv, setAgendObserv] = useState('');
    const [servNome, setServNome] = useState('');

    const situacaoMap = {
        1: 'Pendente',
        2: 'Em andamento',
        3: 'Concluído',
        4: 'Cancelado'
    };

    useEffect(() => {
        if (modalEvent) {
            setAgendSituacao(parseInt(modalEvent?._def?.extendedProps?.agend_serv_situ_id, 10));
            setAgendData(modalEvent._def.extendedProps.agend_data || '');
            setAgendHorario(modalEvent._def.extendedProps.agend_horario || '');
            setAgendObserv(modalEvent._def.extendedProps.agend_observ || '');
            setServNome(modalEvent._def.extendedProps.serv_nome || '');
            setVeicUsuId(modalEvent._def.extendedProps.veic_usu_id || ''); // Definir veicUsuId ao abrir modal
        }
    }, [modalEvent]);

    const handleSituacaoChange = (e) => setAgendSituacao(parseInt(e.target.value, 10));
    const handleInputChange = (setter) => (e) => setter(e.target.value);
    const handleVeicPlacaChange = (e) => setVeicUsuId(e.target.value); // Atualizar veicUsuId ao selecionar

    const editarSituacaoDoAgendamento = async () => {
        try {
            await api.patch(`/agendamentos/${modalEvent?._def?.extendedProps?.agend_id}`, {
                veic_usu_id: veicUsuId, // Usar veicUsuId do estado aqui
                agend_data: agendData,
                agend_horario: agendHorario,
                agend_serv_situ_id: agendSituacao,
                agend_observ: agendObserv,
            });
            Swal.fire({
                icon: 'success',
                title: 'Agendamento atualizado!',
                confirmButtonText: 'OK',
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            }).then((result) => {
                if (result.isConfirmed) {
                    onClose();
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível atualizar o agendamento.',
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
                        {isEditable ? (
                            <input
                                type="date"
                                value={agendData}
                                onChange={handleInputChange(setAgendData)}
                                className={styles.detailsInput}
                            />
                        ) : (
                            <span>
                                {modalEvent?._def?.extendedProps?.agend_data
                                    ? format(parseISO(modalEvent._def.extendedProps.agend_data), 'dd/MM/yyyy', { locale: ptBR })
                                    : ''}
                            </span>
                        )}
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Horário:</span>
                        {isEditable ? (
                            <input
                                type="time"
                                value={agendHorario}
                                onChange={handleInputChange(setAgendHorario)}
                                className={styles.detailsInput}
                            />
                        ) : (
                            <span>
                                {modalEvent?._def?.extendedProps?.agend_horario
                                    ? format(parseISO(`1970-01-01T${modalEvent._def.extendedProps.agend_horario}`), 'HH:mm')
                                    : ''}
                            </span>
                        )}
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Placa:</span>
                        {isEditable ? (
                            <select
                                value={veicUsuId} // Usar veicUsuId como valor atual
                                onChange={handleVeicPlacaChange}
                                className={styles.detailsSelect}
                            >
                                {veiculos.length > 0 ? (
                                    veiculos.map((veiculo) => (
                                        <option key={veiculo.veic_usu_id} value={veiculo.veic_usu_id}>
                                            {veiculo.veic_placa}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Nenhum veículo disponível</option>
                                )}
                            </select>
                        ) : (
                            <span>{veiculos.find(v => v.veic_usu_id === veicUsuId)?.veic_placa || 'Não especificado'}</span>
                        )}
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Serviço:</span>
                        <span>{servNome || 'Não especificado'}</span>
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Situação:</span>
                        {isEditable ? (
                            <select
                                value={agendSituacao || ''}
                                onChange={handleSituacaoChange}
                                className={styles.detailsSelect}
                            >
                                {Object.entries(situacaoMap).map(([id, situacao]) => (
                                    <option key={id} value={id}>{situacao}</option>
                                ))}
                            </select>
                        ) : (
                            <span>{situacaoMap[agendSituacao]}</span>
                        )}
                    </div>
                    <div className={styles.detailsItem}>
                        <span className={styles.detailsLabel}>Observação:</span>
                        {isEditable ? (
                            <input
                                value={agendObserv}
                                onChange={handleInputChange(setAgendObserv)}
                                className={styles.detailsTextarea}
                            />
                        ) : (
                            <span
                                className={styles.teste}
                            >
                                {agendObserv}
                            </span>
                        )}
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
        </div>
    );
};

export default CalendarEventDetailsModal;
