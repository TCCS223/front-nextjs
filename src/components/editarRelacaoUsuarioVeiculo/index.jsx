

import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default function ModalProprietarios({ isOpen, onClose, veiculoId }) {
  const [proprietarios, setProprietarios] = useState([]);

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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {proprietarios.length > 0 ? (
              proprietarios.map(proprietario => (
                <tr key={proprietario.id} className={styles.item}>
                  <td>{proprietario.usu_nome}</td>
                  <td>{proprietario.usu_cpf}</td>
                  <td>{proprietario.data_inicial}</td>
                  <td>
                    <button className={styles.btnCancel} onClick={() => handleExcluir(proprietario.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum proprietário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className={styles.btnCancel} onClick={onClose}>Fechar</button>
      </div>
    </div>
  );

  function handleExcluir(proprietarioId) {
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
            setProprietarios(prevProprietarios => prevProprietarios.filter(p => p.id !== proprietarioId));
            Swal.fire('Excluído!', 'O proprietário foi excluído.', 'success');
          })
          .catch(() => {
            Swal.fire('Erro!', 'Não foi possível excluir o proprietário.', 'error');
          });
      }
    });
  }
}
