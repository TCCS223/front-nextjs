"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import api from '@/services/api';
import { parseISO, format } from "date-fns";
import styles from './page.module.css';

const FullCalendarGeral = () => {
    const calendarRef = useRef(null);
    const [calendarApi, setCalendarApi] = useState(null);
    const [userId, setUserId] = useState(null);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalEvent, setModalEvent] = useState(null);
    const [veiculos, setVeiculos] = useState([]);
    const [formValues, setFormValues] = useState({
        veic_usu_id: '',
        // cat_serv_id: '',
        serv_id: '',
        agend_data: '',
        agend_horario: '',
        agend_situacao: 1,
        agend_observ: ''
    });
    const [agendamentosUsuario, setAgendamentoUsuario] = useState([]);
    const [agendamentosTodos, setAgendamentoTodos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [categoriaServicos, setCategoriaServicos] = useState([]);
    const [servicos, setServicos] = useState([]);

    

    console.log(categoriaServicos);

    useEffect(() => {
        if (userId) {
            ListarVeiculosUsuario();
            ListarAgendamentosUsuario();
            ListarCategoriaServicos();
        }
    }, [userId]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user');
        if (storedUserId) {
            const parsedUser = JSON.parse(storedUserId);
            setUserId(parsedUser?.id || null);
        }
    }, []);

    // LISTA AGENDAMENTO 
    const ListarAgendamentosUsuario = async () => {
        try {
            const response = await api.get(`/agendamentos/usuarios/${userId}`);
            setAgendamentoUsuario(response.data.dadosUsuario);
            setEventos(response.data.dadosTodos);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }


    };

    const ListarVeiculosUsuario = async () => {
        if (!userId) return;

        try {
            const response = await api.get(`/veiculoUsuario/usuario/${userId}`);
            setVeiculos(response.data.dados || []);
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
        }
    };

    const listarServicosPorCategoria = async (cat_serv_id) => {
        try {
            const response = await api.get(`/servicos/categoria/${cat_serv_id}`);
            setServicos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as categorias:", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível buscar as categorias.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    };

    const ListarCategoriaServicos = async () => {
        try {
            const response = await api.get('/categoriasServicosAtivas');
            setCategoriaServicos(response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar as categorias:", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível buscar as categorias.',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
    }

    const handleDateClick = (arg) => {
        if (calendarApi) {
            calendarApi.changeView('timeGridDay', arg.date);
        }

        if (arg?.dateStr) {
            const formattedDate = format(parseISO(arg.dateStr), 'yyyy-MM-dd');
            const formattedTime = format(arg.date, 'HH:mm');

            setFormValues({
                ...formValues,
                agend_data: formattedDate,
                agend_horario: formattedTime
            });
            setShowModal(true);
        } else {
            console.error("Data inválida no evento.");
        }
    };

    const handleEventClick = (info) => {
        setModalEvent(info.event); // Armazena o evento clicado
        setShowModal(true); // Abre o modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        // Verifica se o campo alterado é `cat_serv_id` ou `serv_id` e converte para inteiro
        if (name === "cat_serv_id" || name === "serv_id") {
            const parsedValue = parseInt(value, 10); // Converte para inteiro
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: parsedValue
            }));
            
            // Se o campo é `cat_serv_id`, chama a função para listar serviços da categoria
            if (name === "cat_serv_id") {
                listarServicosPorCategoria(parsedValue); // Passa o valor convertido como parâmetro
            }
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };
    
    console.log(formValues);
    
    
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

        ListarAgendamentosUsuario();
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
            events: eventos,
            dateClick: handleDateClick,
            eventClick: handleEventClick,
            slotMinTime: '08:00:00',
            slotMaxTime: '18:00:00',
        });

        setCalendarApi(calendar);
        calendar.render();

        return () => {
            calendar.destroy();
        };
    }, [eventos]);

    return (
        <div>
            <div ref={calendarRef} className={styles.calendar}></div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        {modalEvent ? (
                            <>
                                <h2>{modalEvent.title}</h2>
                                <p>ID: {modalEvent.agend_id}</p>
                                <p>Data: {modalEvent.start.toISOString()}</p>
                                <p>Observações: {modalEvent.extendedProps.agend_observ || 'Nenhuma observação'}</p>
                                <button onClick={() => setShowModal(false)}>Fechar</button>
                            </>
                        ) : (
                            <>
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

                                    <select
                                        name="cat_serv_id"
                                        value={formValues.cat_serv_id}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Selecione a categoria do serviço</option>
                                        {categoriaServicos.length > 0 ? (
                                            categoriaServicos.map((cat_serv) => (
                                                <option key={cat_serv.cat_serv_id} value={cat_serv.cat_serv_id}>
                                                    {cat_serv.cat_serv_nome}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>Nenhuma categoria disponível</option>
                                        )}
                                    </select>
                                    
                                    <select
                                        name="serv_id"
                                        value={formValues.serv_id || ''}
                                        onChange={handleInputChange}
                                        disabled={!formValues.cat_serv_id}
                                        required
                                    >
                                        <option value="">Selecione o serviço</option>
                                        {servicos.length > 0 ? (
                                            servicos.map((servico) => (
                                                <option key={servico.serv_id} value={servico.serv_id}>
                                                    {servico.serv_nome}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>Nenhum serviço disponível</option>
                                        )}
                                    </select>

                                    <button type="submit">Salvar</button>
                                    <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullCalendarGeral;
