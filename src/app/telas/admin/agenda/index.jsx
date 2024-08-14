"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import styles from './index.module.css';

const FullCalendar = () => {
   
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([
        { id: '1', title: 'Churrasco de japones', start: '2024-05-25T09:00:00', end: '2024-05-25T14:00:00', backgroundColor: '#FF9D00', textColor: '#000', savedAt: new Date().toISOString() },
        { id: '2', title: 'Aniversário do Gabrielelel', start: '2024-05-10', savedAt: new Date().toISOString() }
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDateClick = (arg) => {
        const title = prompt('Digite o título do evento:');
        if (title) {
            const newEvent = {
                id: String(events.length + 1), // Gera um ID único
                title: title,
                start: arg.date,
                allDay: true,
                savedAt: new Date().toISOString()
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setShowModal(true);
    };

    const handleEditClick = () => {
        const eventId = selectedEvent.id;
        const eventTitle = selectedEvent.title;
        const newTitle = prompt('Digite o novo título do evento:', eventTitle);
        if (newTitle) {
            const updatedEvents = events.map(event =>
                event.id === eventId ? { ...event, title: newTitle, savedAt: new Date().toISOString() } : event
            );
            setEvents(updatedEvents);
            setShowModal(false);
        }
    };

    const handleDeleteClick = () => {
        const eventId = selectedEvent.id;
        const eventTitle = selectedEvent.title;
    if (window.confirm(`Tem certeza que deseja deletar o evento "${eventTitle}"?`)) {
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);
            setShowModal(false);
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
          eventClick: handleEventClick,
          slotMinTime: '08:00:00', // Define a hora inicial da visualização
          slotMaxTime: '18:00:00', // Define a hora final da visualização
          minTime: '08:00:00',     // Define a hora inicial para eventos
          maxTime: '18:00:00',
          businessHours: [
            {
              daysOfWeek: [1, 2, 3, 4, 5], // De segunda a sexta-feira
              startTime: '08:00', // Horário de início
              endTime: '12:00' // Horário de fim
            },
            {
              daysOfWeek: [1, 2, 3, 4, 5], // De segunda a sexta-feira
              startTime: '13:00', // Horário de início
              endTime: '18:00' // Horário de fim
            }
          ]
        });
    
        calendar.render();

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
                        <h2>{selectedEvent.title}</h2>
                        <p>Início: {new Date(selectedEvent.start).toLocaleString()}</p>
                        {selectedEvent.end && <p>Fim: {new Date(selectedEvent.end).toLocaleString()}</p>}
                        <p>Salvo em: {new Date(selectedEvent.extendedProps.savedAt).toLocaleString()}</p>
                        <button onClick={handleEditClick}>Editar</button>
                        <button onClick={handleDeleteClick}>Excluir</button>
                        <button onClick={() => setShowModal(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullCalendar;