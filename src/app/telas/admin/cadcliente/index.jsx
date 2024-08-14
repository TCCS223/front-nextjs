'use client';

import styles from './index.module.css';
import Swal from 'sweetalert2';
import { useState } from 'react';
import React, { useRef } from "react";
 import ConsultaCliente from '@/components/modais/modais_clientes';

export default function CadCliente() {

    const [isModalOpen, setIsModalOpen] = useState(false); // Declara um estado chamado 'isModalOpen' com valor inicial 'false'. 'setIsModalOpen' é a função para atualizar o valor de 'isModalOpen'.

    const selectSexo = useRef(null); // Declara uma referência chamada 'selectSexo' e a inicializa com 'null'. 'useRef' cria uma referência que pode ser atribuída a um elemento DOM.
    
    const openModal = () => { // Define uma função chamada 'openModal' que altera o estado 'isModalOpen' para 'true'.
        setIsModalOpen(true); // Altera o estado 'isModalOpen' para 'true', o que pode ser usado para abrir um modal.
    };
    
    const closeModal = () => { // Define uma função chamada 'closeModal' que altera o estado 'isModalOpen' para 'false'.
        setIsModalOpen(false); // Altera o estado 'isModalOpen' para 'false', o que pode ser usado para fechar um modal.
    };
    
    const handleselectSexo = () => {
        const sexo = selectSexo.current.value;
        console.log(sexo)

    }

    const Cancelar = () => {
        Swal.fire({
            title: "Deseja Cancelar?",
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
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    iconColor: "rgb(40, 167, 69)",
                    confirmButtonColor: "rgb(40, 167, 69)",
                });
            }
        });
    }

    return (
        <div id="clientes" className={`${styles.content_section}`}>
            <h2 className={styles.title_page}>Gerenciamento de Clientes</h2>
            <div className={styles.button_group}>
                <button id="novoCliente">Novo</button>
                <button id="alterarCliente" onClick={openModal}>Alterar</button>
                <button id="excluirCliente" onClick={openModal}>Excluir</button>
                <button id="localizarCliente" onClick={openModal}>Localizar</button>
            </div>

            <ConsultaCliente isOpen={isModalOpen} onClose={closeModal} />    

            <form id="clienteForm" className={styles.form}>

                <input type="hidden" id="clienteId" className={styles.input_cliente} />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label for="codigo_cliente" className={styles.label_cliente}>Código</label>
                        <input type="number" id="codigo_cliente" name="codigo_cliente" required className={styles.input_cliente} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                        <label for="nome_cliente" className={styles.label_cliente} >Nome</label>
                        <input type="text" id="nome_cliente" name="nome_cliente" required className={styles.input_cliente} placeholder="Nome Completo" />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_cpf}`}>
                        <label for="cpf_cliente" className={styles.label_cliente}>CPF</label>
                        <input type="text" id="cpf_cliente" name="cpf_cliente" required className={styles.input_cliente} placeholder="xxx.xxx.xxx - xx" />
                    </div>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_data}`}>
                    <label for="data_nasc_cliente" className={styles.label_cliente}>Data de nascimento</label>
                    <input type="date" id="data_nasc_cliente" name="data_nasc_cliente" required className={styles.input_cliente} />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_sexo}`}>
                    <label for="sexo_cliente" className={styles.label_cliente}>Sexo</label>
                    <select ref={selectSexo} onClick={handleselectSexo} id="sexo_cliente" name="sexo_cliente" required className={`${styles.select_cliente} ${styles.input_sexo}`}>
                        <option value="" disabled selected>Selecionar</option>
                        <option value="0">Masculino</option>
                        <option value="1">Feminino</option>
                        <option value="2">Outro</option>
                    </select>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_acesso}`}>
                    <label for="nivel_acesso" className={styles.label_cliente}>Nível de Acesso</label>
                    <select id="nivel_acesso" name="nivel_acesso"
                        className={`${styles.select_cliente} ${styles.input_acesso}`}>
                        <option value="0" className={styles.option}>Usuário</option>
                        <option value="1" className={styles.option}>Administrador</option>
                    </select>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_telefone}`}>
                    <label for="telefone_cliente" className={styles.label_cliente}>Telefone</label>
                    <input type="tel" id="telefone_cliente" name="telefone_cliente" required className={` ${styles.input_cliente}`} placeholder="(xx) xxxxx - xxxxx" />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_email}`}>
                    <label for="email_cliente" className={styles.label_cliente}>Email</label>
                    <input type="email_cliente" id="email_cliente" name="email_cliente" required className={styles.input_cliente} placeholder="exemplo@exemplo.com" />
                </div>
                <div className={`${styles.grid_item}  ${styles.grid_observacoes}`}>
                    <label htmlFor="observacoes_cliente" className={styles.label_cliente}>Observações</label>
                    <input type="text" id="observacoes_cliente" name="observacoes_cliente" required className={styles.input_cliente} />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                    <label for="situacao_cliente" className={styles.label_cliente}>Situação</label>
                    <select id="situacao_cliente" name="situacao_cliente"
                        className={`${styles.select_cliente} ${styles.input_situacao}`}>
                        <option value="ativo" className={styles.option} selected>Ativo</option>
                        <option value="inativo" className={styles.option}>Inativo</option>
                    </select>
                </div>


            </form>

            <div className={styles.footer_form}>
                <button type="reset" onClick={Cancelar} className={styles.button_cancel}>Cancelar</button>
                <button type="submit" className={styles.button_submit}>Salvar</button>
            </div>

            {/* MODAL */}


        </div>
    );
}