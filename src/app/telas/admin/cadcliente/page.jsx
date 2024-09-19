'use client';

import styles from './page.module.css';
import Swal from 'sweetalert2';
import { useState, useEffect, useRef } from 'react';
import React from "react";
import ConsultaCliente from '@/components/modais/modais_clientes';
import { format } from 'date-fns';

import api from '@/services/api';

export default function CadCliente() {
    const [usuarios, setUsuarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectSexo = useRef(null);

    const sexoMap = {
        0: 'Feminino',
        1: 'Masculino',
        2: 'Outro'
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleselectSexo = () => {
        const sexo = selectSexo.current.value;
        console.log(sexo);
    };

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
                    title: "Cancelado!",
                    text: "As alterações foram canceladas.",
                    icon: "success",
                    iconColor: "rgb(40, 167, 69)",
                    confirmButtonColor: "rgb(40, 167, 69)",
                });
            }
        });
    };

    // Função para buscar os usuários do banco
    async function fetchUsuarios() {
        try {
            const response = await api.get('/usuarios');
            // console.log(Array.isArray(teste)); // Adicionando um log para inspecionar os dados
            setUsuarios(response.data.dados); // Atualiza o estado com os dados dos usuários
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error.response ? error.response.data : error.message);
            Swal.fire({
                title: "Erro!",
                text: "Não foi possível carregar os usuários.",
                icon: "error",
                confirmButtonColor: "rgb(40, 167, 69)",
            });
        }
    }

    useEffect(() => {
        fetchUsuarios(); // Chama a função quando o componente é montado
    }, []);

    return (
        <div id="clientes" className={styles.content_section}>
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

                            {/* <select ref={selectSexo} onChange={handleselectSexo} id="sexo_cliente" name="sexo_cliente" required className={`${styles.select_cliente} ${styles.input_sexo}`}>
                                <option value="" disabled>Selecionar</option>
                                <option value="0">Masculino</option>
                                <option value="1">Feminino</option>
                                <option value="2">Outro</option>
                            </select> */}
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
                    </div>
                </form> 
            {/* 
            <div className={styles.footer_form}>
                <button type="reset" onClick={Cancelar} className={styles.button_cancel}>Cancelar</button>
                <button type="submit" className={styles.button_submit}>Salvar</button>
            </div>

            {/* Tabela de Usuários */}
            <div className={styles.user_table}>
                <div className={styles.resultTableContainer}>
                    <table className={styles.resultTable}>
                        <thead className={styles.tableHead}>
                            <th className={`${styles.tableHeader} ${styles.id}`}>Código</th>
                            <th className={`${styles.tableHeader} ${styles.nome}`}>Nome</th>
                            <th className={`${styles.tableHeader} ${styles.cpf}`}>CPF</th>
                            <th className={`${styles.tableHeader} ${styles.dataNasc}`}>Data de Nascimento</th>
                            <th className={`${styles.tableHeader} ${styles.sexo}`}>Sexo</th>
                            <th className={`${styles.tableHeader} ${styles.telefone}`}>Telefone</th>
                            <th className={`${styles.tableHeader} ${styles.email}`}>Email</th>
                            <th className={`${styles.tableHeader} ${styles.observ}`}>Observações</th>
                            <th className={`${styles.tableHeader} ${styles.acesso}`}>Acesso</th>
                            <th className={`${styles.tableHeader} ${styles.situacao}`}>Situação</th>
                        </thead>

                        <tbody className={styles.tableBody}>
                            {usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <tr key={usuario.usu_id}>
                                        <td >{usuario.usu_id}</td>
                                        <td>{usuario.usu_nome}</td>
                                        <td>{usuario.usu_cpf}</td>
                                        <td>{format(new Date(usuario.usu_data_nasc), 'dd/MM/yyyy')}</td>
                                        <td>{sexoMap[usuario.usu_sexo] || 'Desconhecido'}</td>
                                        <td>{usuario.usu_telefone}</td>
                                        <td>{usuario.usu_email}</td>
                                        <td className={styles.observ}>{usuario.usu_observ}</td>
                                        <td>{usuario.usu_acesso === 0  ? 'Usuário' : 'Administrador'}</td>
                                        <td>{usuario.usu_situacao === 1 ? 'Ativo' : 'Inativo'}</td>
                                    </tr>))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhum usuário encontrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Situação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <tr key={usuario.usu_id}>
                                    <td>{usuario.usu_id}</td>
                                    <td>{usuario.usu_nome}</td>
                                    <td>{usuario.usu_cpf}</td>
                                    <td>{usuario.usu_email}</td>
                                    <td>{usuario.usu_situacao}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum usuário encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table> */}
            </div>
        </div>
    );
}
