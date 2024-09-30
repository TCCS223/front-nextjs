// components/ModalNovaCategoria.js

import React, { useState } from 'react';
import styles from './index.module.css';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default function ModalNovaCategoria({ isOpen, onClose, onCategoriaCriada }) {
    const [nome, setNome] = useState('');
    const [icone, setIcone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome.trim()) {
            Swal.fire('Erro', 'O nome da categoria é obrigatório.', 'error');
            return;
        }

        try {
            const response = await api.post('/categoriasServicos', { cat_serv_nome: nome, cat_icone: icone });
            Swal.fire('Sucesso', response.data.mensagem, 'success');
            onCategoriaCriada(); // Atualiza a lista de categorias no componente pai
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            Swal.fire(
                'Erro!',
                error.response?.data?.mensagem || 'Erro ao criar categoria.',
                'error'
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome da categoria</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className={styles.inputCategoria}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        {/* <label htmlFor="icone">Ícone</label>
                        <input
                            type="text"
                            id="icone"
                            value={icone}
                            onChange={(e) => setIcone(e.target.value)}
                            placeholder="Opcional"
                        />
                        <small>Exemplo: <code>icone.jpeg</code></small> */}
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.btnSubmit}>Criar</button>
                        <button type="button" onClick={onClose} className={styles.btnCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
