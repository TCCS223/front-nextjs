'use client';

import { useEffect, useState } from "react";
import styles from "./index.module.css";
import FullCalendar from "./components/agenda/page";

export default function Home() {

    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a exibição do modal


    useEffect(() => {
        const buttons = document.querySelectorAll(`.${styles.sidebar} button`);
        const sections = document.querySelectorAll(`.${styles.content_section}`);

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const targetId = button.getAttribute("data-target").substring(1);

                sections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.remove(styles.hidden);
                    } else {
                        section.classList.add(styles.hidden);
                    }
                });

                buttons.forEach(btn => {
                    if (btn === button) {
                        btn.classList.add(styles.active);
                    } else {
                        btn.classList.remove(styles.active);
                    }
                });
            });
        });
    }, []);





    return (
        <div className={styles.grid_container}>
            <div className={styles.header}>
                <h1>Painel Administrativo da Mecânica</h1>
            </div>
            <div className={styles.sidebar}>
                <button data-target="#clientes">Clientes</button>
                <button data-target="#veiculos">Veículos</button>
                <button data-target="#servicos">Serviços</button>
                <button data-target="#agenda">Agenda</button>
                <button data-target="#historico">Histórico</button>
            </div>
            <div className={styles.main_content}>
                {/* SESSÃO CLIENTES */}
                <div id="clientes" className={`${styles.content_section} ${styles.hidden}`}>
                    <h2 className={styles.h2}>Gerenciamento de Clientes</h2>
                    <div className={styles.button_group}>
                        <button id="novoCliente">Novo</button>
                        <button id="alterarCliente">Alterar</button>
                        <button id="excluirCliente">Excluir</button>
                        <button id="localizarCliente">Localizar</button>
                    </div>

                    <form id="clienteForm" className={styles.form}>
                        <input type="hidden" id="clienteId" className={styles.input} />

                        <div className={styles.grid_container}>
                            <div className={`${styles.grid_item} ${styles.grid_item_small}`}>
                                <label for="codigo" className={styles.label}>Código</label>
                                <input type="number" id="codigo" name="codigo" required className={styles.input} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_item_large}`}>
                                <label for="nome" className={styles.label}>Nome:</label>
                                <input type="text" id="nome" name="nome" required className={styles.input} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_item_medium}`}>
                                <label for="cpf" className={styles.label}>CPF:</label>
                                <input type="text" id="cpf" name="cpf" required className={styles.input} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_item_small}`}>
                                <label for="data" className={styles.label}>Data de nascimento:</label>
                                <input type="date" id="data" name="data" required className={styles.input} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_item_small}`}>
                                <label for="sexo" className={styles.label}>Sexo:</label>
                                <select id="sexo" name="sexo" required className={`${styles.select} ${styles.input_small_select}`}>
                                    <option value="">Selecionar</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                </select>
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_item_large}`}>
                                <label for="email" className={styles.label}>Email:</label>
                                <input type="email" id="email" name="email" required className={styles.input} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_item_medium}`}>
                                <label for="telefone" className={styles.label}>Telefone:</label>
                                <input type="tel" id="telefone" name="telefone" required className={styles.input} />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_item_large}`}>
                                <label for="access-level" className={styles.label}>Nível de Acesso:</label>
                                <select id="access-level" name="access-level" className={`${styles.select} ${styles.input_small_select}`}>
                                    <option value="user" className={styles.option}>Usuário</option>
                                    <option value="admin" className={styles.option}>Administrador</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.footer_form}>
                            <button type="button" onclick="cancelarAcao()" className={styles.button_cancel}>Cancelar</button>
                            <button type="submit" className={styles.button_submit}>Salvar</button>
                        </div>
                    </form>

                    {/* <form id="clienteForm" className={styles.form}>

                        <input type="hidden" id="clienteId" className={styles.input} />

                        <div className={styles.input_row}>
                            <div className={`${styles.input_wrapper} ${styles.input_small}`}>
                                <label for="codigo" className={styles.label}>Código</label>
                                <input type="number" id="codigo" name="codigo" required className={styles.input} />
                            </div>

                            <div className={`${styles.input_wrapper} ${styles.input_large}`}>
                                <label for="nome" className={styles.label}>Nome:</label>
                                <input type="text" id="nome" name="nome" required className={styles.input} />
                            </div>

                            <div className={`${styles.input_wrapper} ${styles.input_medium}`}>
                                <label for="cpf" className={styles.label}>CPF:</label>
                                <input type="text" id="cpf" name="cpf" required className={styles.input} />
                            </div>
                        </div>

                        <div className={styles.input_row}>
                            <div className={`${styles.input_wrapper} ${styles.input_small}`}>
                                <label for="data" className={styles.label}>Data de nascimento:</label>
                                <input type="date" id="data" name="data" required className={styles.input} />
                            </div>

                            <div className={`${styles.input_wrapper} ${styles.input_small}`}>
                                <label for="sexo" className={styles.label}>Sexo:</label>
                                <select id="sexo" name="sexo" required className={`${styles.select} ${styles.input_small_select}`}>
                                    <option value="">Selecionar</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                </select>
                            </div>

                            <div className={`${styles.input_wrapper} ${styles.input_large}`}>
                                <label for="email" className={styles.label}>Email:</label>
                                <input type="email" id="email" name="email" required className={styles.input} />
                            </div>

                            <div className={`${styles.input_wrapper} ${styles.input_medium}`}>
                                <label for="telefone" className={styles.label}>Telefone:</label>
                                <input type="tel" id="telefone" name="telefone" required className={styles.input} />
                            </div>
                        </div>

                        <div className={styles.input_row}>
                            <div className={`${styles.input_wrapper} ${styles.input_large}`}>
                                <label for="access-level" className={styles.label}>Nível de Acesso:</label>
                                <select id="access-level" name="access-level" className={`${styles.select} ${styles.input_small_select}`}>
                                    <option value="user" className={styles.option}>Usuário</option>
                                    <option value="admin" className={styles.option}>Administrador</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.footer_form}>
                            <button type="button" onclick="cancelarAcao()" className={styles.button_cancel}>Cancelar</button>
                            <button type="submit" className={styles.button_submit}>Salvar</button>
                        </div>
                    </form> */}


                    {/* <table id="tabelaClientes" className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Código</th>
                                <th className={styles.th}>Nome</th>
                                <th className={styles.th}>CPF</th>
                                <th className={styles.th}>Data de Nascimento</th>
                                <th className={styles.th}>Sexo</th>
                                <th className={styles.th}>Telefone</th>
                                <th className={styles.th}>E-mail</th>
                                <th className={styles.th}>Endereço</th>
                            </tr>
                        </thead>
                        <tbody>
                            Linhas de dados aqui
                        </tbody>
                    </table> */}
                </div>

                {/* SESSÃO VEÍCULOS */}
                <div id="veiculos" className={`${styles.content_section} ${styles.hidden}`}>
                    <h2 className={styles.h2}>Gerenciamento de Veículos</h2>
                    <div className={styles.button_group}>
                        <button id="novoVeiculo">Novo</button>
                        <button id="alterarVeiculo">Alterar</button>
                        <button id="excluirVeiculo">Excluir</button>
                        <button id="localizarVeiculo">Localizar</button>
                    </div>
                    <form id="veiculoForm" className={styles.form}>
                        <input type="hidden" id="veiculoId" className={styles.input} />
                        <div className={styles.input_row}>
                            <div className={`${styles.input_wrapper} ${styles.input_small}`}>
                                <label htmlFor="placa" className={styles.label}>Placa:</label>
                                <input type="text" id="placa" name="placa" required className={styles.input} />
                            </div>
                            <div className={`${styles.input_wrapper} ${styles.input_large}`}>
                                <label htmlFor="modelo" className={styles.label}>Modelo:</label>
                                <input type="text" id="modelo" name="modelo" required className={styles.input} />
                            </div>
                            <div className={`${styles.input_wrapper} ${styles.input_medium}`}>
                                <label htmlFor="marca" className={styles.label}>Marca:</label>
                                <input type="text" id="marca" name="marca" required className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.input_row}>
                            <div className={`${styles.input_wrapper} ${styles.input_medium}`}>
                                <label htmlFor="ano" className={styles.label}>Ano:</label>
                                <input type="number" id="ano" name="ano" required className={styles.input} />
                            </div>
                            <div className={`${styles.input_wrapper} ${styles.input_medium}`}>
                                <label htmlFor="cor" className={styles.label}>Cor:</label>
                                <input type="text" id="cor" name="cor" required className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.footer_form}>
                            <button type="submit" className={styles.button_submit}>Salvar</button>
                            <button type="reset" className={styles.button_cancel}>Cancelar</button>
                        </div>
                    </form>
                    {/* <table id="tabelaVeiculos" className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Placa</th>
                                <th className={styles.th}>Modelo</th>
                                <th className={styles.th}>Marca</th>
                                <th className={styles.th}>Ano</th>
                                <th className={styles.th}>Cor</th>
                            </tr>
                        </thead>
                        <tbody>
                            Linhas de dados aqui
                        </tbody>
                    </table> */}
                </div>

                {/* SESSÃO SERVIÇOS */}
                <div id="servicos" className={`${styles.content_section} ${styles.hidden}`}>
                    <h2 className={styles.h2}>Gerenciamento de Serviços</h2>
                    <div className={styles.button_group}>
                        <button id="novoServico">Novo</button>
                        <button id="alterarServico">Alterar</button>
                        <button id="excluirServico">Excluir</button>
                        <button id="localizarServico">Localizar</button>
                    </div>
                    <form id="servicoForm" className={styles.form}>
                        <input type="hidden" id="servicoId" className={styles.input} />
                        <div className={styles.input_row}>
                            <div className={`${styles.input_wrapper} ${styles.input_large}`}>
                                <label htmlFor="descricao" className={styles.label}>Descrição:</label>
                                <input type="text" id="descricao" name="descricao" required className={styles.input} />
                            </div>
                            <div className={`${styles.input_wrapper} ${styles.input_small}`}>
                                <label htmlFor="preco" className={styles.label}>Preço:</label>
                                <input type="number" id="preco" name="preco" required className={styles.input} />
                            </div>
                        </div>
                        <div className={styles.footer_form}>
                            <button type="submit" className={styles.button_submit}>Salvar</button>
                            <button type="reset" className={styles.button_cancel}>Cancelar</button>
                        </div>
                    </form>
                    <table id="tabelaServicos" className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Descrição</th>
                                <th className={styles.th}>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Linhas de dados aqui */}
                        </tbody>
                    </table>
                </div>

                {/* SESSÃO AGENDA */}
                <div id="agenda" className={`${styles.content_section} ${styles.hidden}`}>
                    <h2 className={styles.h2}>Gerenciamento de Agenda</h2>

                    <FullCalendar />

                </div>
                {/* SESSÃO HISTÓRICO */}
                <div id="historico" className={`${styles.content_section} ${styles.hidden}`}>
                    <h2 className={styles.h2}>Histórico de Serviços</h2>
                    <div className={styles.button_group}>
                        <button id="detalhesServico">Detalhes</button>
                        <button id="localizarHistorico">Localizar</button>
                    </div>
                    <div id="detalhesServicoPanel" className={styles.hidden}>
                        {/* Detalhes do serviço aqui */}
                    </div>
                    {/* <table id="tabelaHistorico" className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Data</th>
                                <th className={styles.th}>Cliente</th>
                                <th className={styles.th}>Veículo</th>
                                <th className={styles.th}>Serviço</th>
                                <th className={styles.th}>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            Linhas de dados aqui
                        </tbody>
                    </table> */}
                </div>
            </div>
        </div>
    )
}