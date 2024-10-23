"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import api from '@/services/api';
import { parseISO, format } from "date-fns"; // Importação do format e parseISO
import styles from './page.module.css';

const FullCalendar = () => {
    const calendarRef = useRef(null);
    const [calendarApi, setCalendarApi] = useState(null); // Estado para armazenar a instância do calendário
    const [userId, setUserId] = useState(null);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [veiculos, setVeiculos] = useState([]);
    const [formValues, setFormValues] = useState({
        veic_usu_id: '',
        agend_data: '',
        agend_horario: '',
        agend_situacao: 1,
        agend_observ: ''
    });

    useEffect(() => {
        if (userId) {
            ListarVeiculosUsuario();
        }
    }, [userId]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user');
        if (storedUserId) {
            const parsedUser = JSON.parse(storedUserId);
            setUserId(parsedUser?.id || null);
        }
    }, []);

    const ListarVeiculosUsuario = async () => {
        if (!userId) return;

        try {
            const response = await api.get(`/veiculoUsuario/usuario/${userId}`);
            setVeiculos(response.data.dados || []); // Verifique se 'dados' contém o array
            console.log("teste: ", response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
        }
    };

    const handleDateClick = (arg) => {
        if (calendarApi) {
            // Mudar a visualização para o modo de dia
            calendarApi.changeView('timeGridDay', arg.date);  // 'arg.date' é a data clicada
        }
    
        if (arg?.dateStr) {
            const formattedDate = format(parseISO(arg.dateStr), 'yyyy-MM-dd');  // Formata a data
            const formattedTime = format(arg.date, 'HH:mm');  // Formata o horário
    
            setFormValues({
                ...formValues,
                agend_data: formattedDate,  // Data formatada
                agend_horario: formattedTime  // Horário formatado
            });
            setShowModal(true);  // Abre o modal
        } else {
            console.error("Data inválida no evento.");
        }
    };
    

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            id: String(events.length + 1),
            title: `Veículo: ${formValues.veic_usu_id}`,
            start: `${formValues.agend_data}T${formValues.agend_horario}`,
            allDay: false,
            backgroundColor: '#FF9D00',
            textColor: '#000'
        };

        try {
            await api.post('/agendamentos', formValues);
            setEvents([...events, newEvent]);
            setShowModal(false);
        } catch (error) {
            console.error("Erro ao salvar agendamento:", error);
        }
    };

    useEffect(() => {
        const calendar = new Calendar(calendarRef.current, {
            contentHeight: 600,
            handleWindowResize: true,
            selectable: true,
            locale: ptLocale,
            timeZone: 'local',
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'dayGridMonth,timeGridWeek,timeGridDay',
                center: 'title',
                right: 'today prev,next'
            },
            events: events,
            dateClick: handleDateClick,
            slotMinTime: '08:00:00',
            slotMaxTime: '18:00:00',
        });

        setCalendarApi(calendar); // Armazene a instância do calendário no estado
        calendar.render();

        ListarVeiculosUsuario();

        return () => {
            calendar.destroy();
        };
    }, [events]);

    return (
        <div>
            <div ref={calendarRef} className={styles.calendar}></div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Novo Agendamento</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Veículo:</label>
                            <select
                                name="veic_usu_id"
                                value={formValues.veic_usu_id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecione o veículo</option>
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

                            <label>Data do Agendamento:</label>
                            <input
                                type="date"
                                name="agend_data"
                                value={formValues.agend_data}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Horário:</label>
                            <input
                                type="time"
                                name="agend_horario"
                                value={formValues.agend_horario}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Observações:</label>
                            <textarea
                                name="agend_observ"
                                value={formValues.agend_observ}
                                onChange={handleInputChange}
                                required
                            />

                            <button type="submit">Salvar</button>
                            <button onClick={() => setShowModal(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullCalendar;
