"use client";

import React, { useRef, useEffect, useState, Fragment } from 'react';
import InputMask from "react-input-mask";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import api from '@/services/api';
import { parseISO, format, set } from "date-fns";
import styles from './page.module.css';
import Swal from 'sweetalert2';
import CalendarEventDetailsModal from '@/components/modalAgendamentos';

const FullCalendarGeral = () => {
    const calendarRef = useRef(null);
    const [calendarApi, setCalendarApi] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userAcesso, setUserAcesso] = useState(null);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalVisual, setShowModalVisual] = useState(false);
    const [modalEvent, setModalEvent] = useState(null);
    const [veiculos, setVeiculos] = useState([]);
    const [cpfUsuario, setCpfUsuario] = useState([]);
    const [agendamentosUsuario, setAgendamentoUsuario] = useState([]);
    const [agendamentosTodos, setAgendamentoTodos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [categoriaServicos, setCategoriaServicos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [formValues, setFormValues] = useState({
        veic_usu_id: '',
        agend_data: '',
        agend_horario: '',
        agend_situacao: 1,
        agend_observ: '',
        serv_id: '',
        agend_serv_situ_id: 1
    });

    useEffect(() => {
        if (userId) {
            ListarVeiculosUsuario();
        }
    }, [userId]);

    useEffect(() => {
        const storedData = localStorage.getItem('user');

        if (storedData) {
            const parsedUser = JSON.parse(storedData);
            setUserAcesso(parsedUser?.acesso !== undefined ? parsedUser.acesso : null);
        }
    }, []);

    useEffect(() => {
        if (userAcesso === 0) {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUserId(parsedUser?.id || null);
            }
        }
    }, [userAcesso]);

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Janeiro é 0, então somamos 1
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        ListarAgendamentosUsuario();
        ListarCategoriaServicos();
    }, [currentMonth, currentYear, userId, userAcesso]);

    const ListarAgendamentosUsuario = async () => {
        try {
            const response = await api.get(`/agendamentos/usuarios/${userId}/${userAcesso}/${currentMonth}/${currentYear}}`);
            setAgendamentoUsuario(response.data.dadosTodos);
            setEventos(response.data.dadosTodos);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    };

    const handleDatesSet = (datesInfo) => {
        if (datesInfo.start) {
            const startDate = datesInfo.start;
            const newMonth = startDate.getMonth() + 1;
            const newYear = startDate.getFullYear();

            setCurrentMonth(newMonth);
            setCurrentYear(newYear);

        } else {
            console.error("Data de início não disponível!");
        }
    };

    const BuscarUsuarioPorCpf = async () => {
        if (!cpfUsuario || cpfUsuario.trim().length === 0) {
            Swal.fire({
                title: 'CPF inválido',
                text: 'Por favor, insira um CPF válido.',
                icon: 'error',
                confirmButtonColor: '#d33',
                iconColor: '#d33'
            });
            return;
        }

        try {
            const response = await api.post('/usuarios/cpf', { usu_cpf: cpfUsuario });

            if (response.data.dados && response.data.dados.usu_id) {
                setUserId(response.data.dados.usu_id);
            } else {
                Swal.fire({
                    title: 'Usuário não encontrado',
                    text: 'Não foi possível encontrar um usuário com este CPF.',
                    icon: 'warning',
                    confirmButtonColor: '#ff9d00',
                    iconColor: '#ff9d00'
                });
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Ocorreu um erro ao tentar buscar o usuário. Por favor, tente novamente.',
                icon: 'error',
                confirmButtonColor: '#d33',
                iconColor: '#d33'
            });
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
    };

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
        const isOwner = parseInt(info.event.extendedProps.userId) === parseInt(userId);

        if (userAcesso === 1 || isOwner) {
            setModalEvent(info.event);
            setShowModal(true);
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Acesso restrito',
                text: 'Você não tem permissão para visualizar os detalhes deste agendamento.',
                iconColor: '#ff9d00',
                confirmButtonColor: '#ff9d00',
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "cat_serv_id" || name === "serv_id" || name === "veic_usu_id") {
            const parsedValue = parseInt(value, 10);
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: parsedValue
            }));

            if (name === "cat_serv_id") {
                listarServicosPorCategoria(parsedValue);
            }
        } else {
            setFormValues({
                ...formValues,
                [name]: value
            });
        }
    };

    const handleInputCpf = (e) => {
        setCpfUsuario(e.target.value);
    };

    // const verificarHorarioDisponivel = async () => {
    //     const { agend_data, agend_horario } = formValues;
    //     try {
    //         const response = await api.post('/agendamentos/verificarhorario', {
    //             agend_data,
    //             agend_horario
    //         });
    //         return response.data.disponivel;
    //     } catch (error) {
    //         console.error("Erro ao verificar disponibilidade do horário:", error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Erro ao verificar disponibilidade!',
    //             text: 'Ocorreu um erro ao tentar verificar o horário. Por favor, tente novamente.',
    //             iconColor: '#d33',
    //             confirmButtonColor: '#d33',
    //         });
    //         return false;
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { cat_serv_id, ...dataToSend } = formValues;
        const horario = formValues.agend_horario;

        const [hour, minute] = horario.split(":").map(Number);

        if (hour < 8 || (hour === 17 && minute > 0) || hour > 17) {
            Swal.fire({
                icon: 'error',
                title: 'Horário inválido!',
                text: 'Por favor, selecione um horário entre 08:00 e 17:00.',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
            return;
        }

        // const horarioDisponivel = await verificarHorarioDisponivel();
        // if (!horarioDisponivel) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Horário Indisponível!',
        //         text: 'Esse horário já está agendado. Por favor, escolha outro horário.',
        //         iconColor: '#d33',
        //         confirmButtonColor: '#d33',
        //     });
        //     return;
        // }

        const newEvent = {
            id: String(events.length + 1),
            title: `Veículo: ${dataToSend.veic_usu_id}`,
            start: `${dataToSend.agend_data}T${dataToSend.agend_horario}`,
            allDay: false,
            backgroundColor: '#FF9D00',
            textColor: '#000'
        };



        try {
            await api.post('/agendamentos', dataToSend);
            setEvents([...events, newEvent]);
            clearFields();
            setShowModal(false);

            Swal.fire({
                icon: 'success',
                title: 'Agendamento realizado com sucesso!',
                text: 'O agendamento foi salvo com sucesso',
                iconColor: "rgb(40, 167, 69)",
                confirmButtonColor: "rgb(40, 167, 69)",
            });
        } catch (error) {
            console.error("Erro ao salvar agendamento:", error);

            Swal.fire({
                icon: 'error',
                title: 'Erro ao salvar agendamento!',
                text: 'Ocorreu um erro ao tentar salvar o agendamento. Por favor, tente novamente.',
                iconColor: '#d33',
                confirmButtonColor: '#d33',
            });
        }
        ListarAgendamentosUsuario();
        // ListarAgendamentosTodos();
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Deseja Cancelar esse agendamento?",
            text: "As informações não serão salvas",
            icon: "warning",
            iconColor: "orange",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "rgb(40, 167, 69)",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
            reverseButtons: true,
            backdrop: "rgba(0,0,0,0.7)",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Cancelado!",
                    text: "As alterações foram canceladas.",
                    icon: "success",
                    iconColor: "rgb(40, 167, 69)",
                    confirmButtonColor: "rgb(40, 167, 69)",
                }).then(() => {
                    setFormValues({
                        veic_usu_id: '',
                        agend_data: '',
                        agend_horario: '',
                        agend_situacao: 1,
                        agend_observ: '',
                        serv_id: '',
                        agend_serv_situ_id: 1
                    });
                    setShowModal(false);
                });
            }
        });
    };

    const clearFields = () => {
        setFormValues({
            veic_usu_id: '',
            agend_data: '',
            agend_horario: '',
            agend_situacao: 1,
            agend_observ: '',
            serv_id: '',
            agend_serv_situ_id: 1
        });
    };

    useEffect(() => {
        if (currentMonth && currentYear) {
            const initialDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;

            const calendar = new Calendar(calendarRef.current, {
                contentHeight: 600,
                selectable: true,
                locale: ptLocale,
                aspectRatio: 2,
                showNonCurrentDates: false,
                timeZone: 'local',
                eventOverlap: false,
                selectOverlap: false,
                expandRows: true,
                plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
                initialView: 'dayGridMonth',
                initialDate: initialDate,
                headerToolbar: {
                    left: 'dayGridMonth,timeGridWeek,timeGridDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                events: eventos,
                datesSet: handleDatesSet,
                dateClick: handleDateClick,
                eventClick: handleEventClick,
                slotMinTime: '08:00:00',
                slotMaxTime: '18:00:00',
                eventTimeFormat: {
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                }
            });

            calendar.render();
        } else {
            console.error("currentMonth ou currentYear não estão definidos corretamente");
        }
    }, [eventos, currentMonth, currentYear]);


    const visualizacao = () => {
        setShowModal(false);
        ListarAgendamentosUsuario();
    }

    return (
        <div>
            <div ref={calendarRef} className={styles.calendar}></div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        {modalEvent ? (
                            <>
                                <CalendarEventDetailsModal
                                    veiculos={veiculos}
                                    modalEvent={modalEvent}
                                    onClose={visualizacao}
                                    isEditable={parseInt(modalEvent.extendedProps.userId) === parseInt(userId)}
                                    isAdmin={userAcesso === 1 ? 1 : ''}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className={styles.title_page}>Novo Agendamento</h2>

                                <form onSubmit={handleSubmit} className={styles.form}>

                                    {userAcesso == 1 ? (
                                        <>
                                            <div className={`${styles.grid} ${styles.grid_cpf}`}>
                                                <label className={styles.label}>CPF do cliente</label>
                                                <InputMask
                                                    mask="999.999.999-99"
                                                    type="text"
                                                    name="usu_cpf"
                                                    value={cpfUsuario}
                                                    onChange={handleInputCpf}
                                                    className={`${styles.input} ${styles.input_cpf}`}
                                                    required
                                                />
                                            </div>

                                            <div className={`${styles.grid} ${styles.grid_buttonSearch}`}>
                                                <label className={styles.labelButtonSearch}>Pesquisar CPF</label>
                                                <button
                                                    type="button"
                                                    onClick={BuscarUsuarioPorCpf}
                                                    className={styles.buttonSearch}
                                                >
                                                    Buscar
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                    <div className={`${styles.grid} ${styles.grid_veiculo}`}>
                                        <label className={styles.label}>Veículo</label>

                                        <select
                                            name="veic_usu_id"
                                            value={formValues.veic_usu_id}
                                            onChange={handleInputChange}
                                            className={styles.select}
                                            disabled={!userId}
                                            required
                                        >
                                            <option value="" hidden>Selecione o veículo</option>
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
                                    </div>

                                    <div className={`${styles.grid} ${styles.grid_data}`}>
                                        <label className={styles.label}>Data do Agendamento</label>
                                        <input
                                            type="date"
                                            name="agend_data"
                                            value={formValues.agend_data}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>

                                    <div className={`${styles.grid} ${styles.grid_horario}`}>
                                        <label className={styles.label}>Horário</label>
                                        <input
                                            type="time"
                                            name="agend_horario"
                                            min="08:00"
                                            max="17:00"
                                            value={formValues.agend_horario}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                            required
                                        />
                                    </div>

                                    <div className={`${styles.grid} ${styles.grid_cat_serv}`}>
                                        <label className={styles.label}>Categoria de serviço</label>
                                        <select
                                            name="cat_serv_id"
                                            value={formValues.cat_serv_id}
                                            onChange={handleInputChange}
                                            className={styles.select}
                                            required
                                        >
                                            <option value="">Selecione</option>
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
                                    </div>

                                    <div className={`${styles.grid} ${styles.grid_serv}`}>
                                        <label className={styles.label}>Serviço</label>
                                        <select
                                            name="serv_id"
                                            value={formValues.serv_id || ''}
                                            onChange={handleInputChange}
                                            disabled={!formValues.cat_serv_id}
                                            className={styles.select}
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
                                    </div>

                                    <div className={`${styles.grid} ${styles.grid_observ}`}>
                                        <label className={styles.label}>Observações</label>
                                        <input
                                            name="agend_observ"
                                            value={formValues.agend_observ}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={`${styles.buttons_form} ${styles.grid} ${styles.grid_footer}`}>
                                        <button type="submit" className={styles.button_submit}>Salvar</button>
                                        <button type="button" className={styles.button_cancel} onClick={handleCancel}>Cancelar</button>
                                    </div>
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