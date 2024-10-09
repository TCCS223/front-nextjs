import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { format } from 'date-fns';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default function ModalProprietarios({ isOpen, onClose, veiculoId }) {
    const [proprietarios, setProprietarios] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editStartDate, setEditStartDate] = useState('');
    const [editEndDate, setEditEndDate] = useState('');

    const buscarProprietarios = async (veiculoId) => {
        if (veiculoId) {
            try {
                const response = await api.get(`/veiculoUsuario/proprietarios/${veiculoId}`);
                setProprietarios(response.data.dados);
            } catch (error) {
                console.error("Erro ao buscar proprietários:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Não foi possível carregar os proprietários.',
                });
            }
        } else {
            setProprietarios([]);
        }
    };

    const handleExcluir = (proprietarioId) => {
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Essa ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.isConfirmed) {
                api.delete(`/proprietarios/${proprietarioId}`)
                    .then(() => {
                        setProprietarios(prevProprietarios => prevProprietarios.filter(p => p.veic_usu_id !== proprietarioId));
                        Swal.fire('Excluído!', 'O proprietário foi excluído.', 'success');
                    })
                    .catch(() => {
                        Swal.fire('Erro!', 'Não foi possível excluir o proprietário.', 'error');
                    });
            }
        });
    };

    const handleEditar = (proprietario) => {
        setEditId(proprietario.veic_usu_id);
        setEditStartDate(proprietario.data_inicial);
        setEditEndDate(proprietario.data_final || '');
    };

    const handleSalvar = async () => {
        try {
            await api.put(`/proprietarios/${editId}`, {
                data_inicial: editStartDate,
                data_final: editEndDate
            });
            Swal.fire('Sucesso!', 'Proprietário atualizado com sucesso.', 'success');
            buscarProprietarios(veiculoId); // Atualiza a lista após salvar
            setEditId(null);
            setEditStartDate('');
            setEditEndDate('');
        } catch (error) {
            Swal.fire('Erro!', 'Não foi possível atualizar o proprietário.', 'error');
        }
    };

    useEffect(() => {
        if (isOpen) {
            buscarProprietarios(veiculoId);
        }
    }, [isOpen, veiculoId]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${isOpen ? styles.enterActive : ''}`}>
                <h2 className={styles.modalTitle}>Proprietários do Veículo</h2>
                <table>
                    <thead>
                        <tr className={styles.header}>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Data de Início</th>
                            <th>Data de Fim</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proprietarios.length > 0 ? (
                            proprietarios.map(proprietario => (
                                <tr key={proprietario.veic_usu_id} className={styles.item}>
                                    <td>{proprietario.usu_nome}</td>
                                    <td>{proprietario.usu_cpf}</td>
                                    <td>
                                        {editId === proprietario.veic_usu_id ? (
                                            <input
                                                type="date"
                                                value={editStartDate.slice(0, 10)} // Formato adequado para input date
                                                onChange={(e) => setEditStartDate(e.target.value)}
                                                className={styles.inputDate}
                                            />
                                        ) : (
                                            format(new Date(proprietario.data_inicial), 'dd/MM/yyyy')
                                        )}
                                    </td>
                                    <td>
                                        {editId === proprietario.veic_usu_id ? (
                                            <input
                                                type="date"
                                                value={editEndDate.slice(0, 10)} // Formato adequado para input date
                                                onChange={(e) => setEditEndDate(e.target.value)}
                                                className={styles.inputDate}
                                            />
                                        ) : (
                                            proprietario.data_final
                                        )}
                                    </td>
                                    <td>
                                        {editId === proprietario.veic_usu_id ? (
                                            <>
                                                <button className={styles.btnSave} onClick={handleSalvar}>
                                                    Salvar
                                                </button>
                                                <button 
                                                    className={styles.btnCancel} 
                                                    onClick={() => {
                                                        setEditId(null);
                                                        setEditStartDate('');
                                                        setEditEndDate('');
                                                    }}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <MdEdit
                                                    title="Editar"
                                                    onClick={() => handleEditar(proprietario)} // Passando o proprietário correto
                                                />
                                                <IoMdTrash
                                                    title="Excluir"
                                                    onClick={() => handleExcluir(proprietario.veic_usu_id)} // Passando o ID correto para exclusão
                                                />
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum proprietário encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className={styles.btnCancel} onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}
