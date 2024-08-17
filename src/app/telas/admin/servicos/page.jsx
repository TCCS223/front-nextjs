'use client'

import styles from './page.module.css';
import { useState } from 'react';
import ConsultaServico from '@/components/modais/modais_serviços';


export default function Servicos() {

    const [isModalOpen, setIsModalOpen] = useState(false); // Declara um estado chamado 'isModalOpen' com valor inicial 'false'. 'setIsModalOpen' é a função para atualizar o valor de 'isModalOpen'.
    
    const openModal = () => { // Define uma função chamada 'openModal' que altera o estado 'isModalOpen' para 'true'.
        setIsModalOpen(true); // Altera o estado 'isModalOpen' para 'true', o que pode ser usado para abrir um modal.
    };
    
    const closeModal = () => { // Define uma função chamada 'closeModal' que altera o estado 'isModalOpen' para 'false'.
        setIsModalOpen(false); // Altera o estado 'isModalOpen' para 'false', o que pode ser usado para fechar um modal.
    };

    return (
        <div id="servicos" className={`${styles.content_section}`}>
            <h2 className={styles.title_page}>Gerenciamento de Serviços</h2>
            <div className={styles.button_group}>
                <button id="novoCliente">Novo</button>
                <button id="alterarCliente" onClick={openModal}>Alterar</button>
                <button id="excluirCliente" onClick={openModal}>Excluir</button>
                <button id="localizarCliente" onClick={openModal}>Localizar</button>
            </div>
            
            <ConsultaServico isOpen={isModalOpen} onClose={closeModal} />  

            <form id="servicoForm" className={styles.form}>

                <input type="hidden" id="servicoId" className={styles.input_servicos} />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label for="codigo_servico" className={styles.label_servicos}>Código</label>
                        <input type="number" id="codigo_servico" name="codigo_servico" required className={styles.input_servicos} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                        <label for="categoria_servico" className={styles.label_servicos}>Categoria</label>
                        <select id="categoria_servico" name="categoria_servico"
                            className={`${styles.select_servicos} ${styles.grid_categoria}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="1" className={styles.option}>Lavagem e Higienizacao</option>
                            <option value="2" className={styles.option}>Polimento e Protecao da Pintura</option>
                            <option value="3" className={styles.option}>Cuidados com Vidros e Farois</option>
                            <option value="4" className={styles.option}>Cuidados com Rodas e Pneus</option>
                            <option value="5" className={styles.option}>Detalhamento Interno (tailing)</option>
                            <option value="6" className={styles.option}>Remocao de Odores</option>
                            <option value="7" className={styles.option}>Correcao de Pintura</option>
                            <option value="8" className={styles.option}>Customizacao</option>
                            <option value="9" className={styles.option}>Reparos Esteticos</option>
                            <option value="10" className={styles.option}>Servicos Adicionais</option>
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                        <label htmlFor="nome_servico" className={styles.label_servicos}>Nome</label>
                        <select id="categoria_servico" name="categoria_servico"
                            className={`${styles.select_servicos} ${styles.input_nome}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="1" className={styles.option}>Lavagem externa (tradicional)</option>
                            <option value="2" className={styles.option}>Lavagem externa (a seco)</option>
                            <option value="3" className={styles.option}>Lavagem interna completa</option>
                            <option value="4" className={styles.option}>Limpeza de estofados</option>
                            <option value="5" className={styles.option}>Limpeza de carpetes</option>
                            <option value="6" className={styles.option}>Higienizacao de ar-condicionado</option>
                            <option value="7" className={styles.option}>Descontaminacao de pintura</option>
                            <option value="8" className={styles.option}>Polimento de pintura</option>
                            <option value="9" className={styles.option}>Espelhamento</option>
                            <option value="10" className={styles.option}>Vitrificacao</option>
                            <option value="11" className={styles.option}>Enceramento</option>
                            <option value="12" className={styles.option}>Selagem de pintura</option>
                            <option value="13" className={styles.option}>Aplicacao de pelicula de protecao de pintura (PPF)</option>
                            <option value="14" className={styles.option}>Polimento de farois</option>
                            <option value="15" className={styles.option}>Restauracao de farois</option>
                            <option value="16" className={styles.option}>Aplicacao de repelente de agua (cristalizacao de vidros)</option>
                            <option value="17" className={styles.option}>Aplicacao de insulfilm</option>
                            <option value="18" className={styles.option}>Limpeza de rodas e calotas</option>
                            <option value="19" className={styles.option}>Polimento de rodas</option>
                            <option value="20" className={styles.option}>Aplicacao de protetores de pneu</option>
                            <option value="21" className={styles.option}>Pintura e restauracao de rodas</option>
                            <option value="22" className={styles.option}>Limpeza detalhada do painel e console</option>
                            <option value="23" className={styles.option}>Limpeza e hidratacao de bancos de couro</option>
                            <option value="24" className={styles.option}>Limpeza e hidratacao de plasticos internos</option>
                            <option value="25" className={styles.option}>Limpeza de portas e macanetas</option>
                            <option value="26" className={styles.option}>Detalhamento de dutos de ventilacao</option>
                            <option value="27" className={styles.option}>Tratamento com ozonio</option>
                            <option value="28" className={styles.option}>Neutralizacao de odores</option>
                            <option value="29" className={styles.option}>Retoque de pintura</option>
                            <option value="30" className={styles.option}>Pintura parcial</option>
                            <option value="31" className={styles.option}>Envelopamento automotivo (vinil)</option>
                            <option value="32" className={styles.option}>Pintura de pincas de freio</option>
                            <option value="33" className={styles.option}>Aplicacao de adesivos decorativos</option>
                            <option value="34" className={styles.option}>Instalacao de spoilers e acessorios externos</option>
                            <option value="35" className={styles.option}>Remocao de riscos e arranhoes</option>
                            <option value="36" className={styles.option}>Reparo de amassados sem pintura (martelinho de ouro)</option>
                            <option value="37" className={styles.option}>Remocao de manchas</option>
                            <option value="38" className={styles.option}>Lavagem de motor</option>
                            <option value="39" className={styles.option}>Polimento de escapamento</option>
                            <option value="40" className={styles.option}>Revitalizacao de teto solar</option>
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_duracao}`}>
                        <label htmlFor="duracao_servico" className={styles.label_servicos}>Duração Estimada</label>
                        <select id="duracao_servico" name="duracao_servico"
                            className={`${styles.select_servicos} ${styles.input_duracao}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="60">1 hora</option>
                            <option value="120">2 horas</option>
                            <option value="180">3 horas</option>
                            <option value="240">4 horas</option>
                            <option value="300">5 horas</option>
                            <option value="360">6 horas</option>
                            <option value="420">7 horas</option>
                            <option value="480">8 horas</option>
                        </select>
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_preco}`}>
                        <label htmlFor="preco_servico" className={styles.label_servicos}>Preço</label>
                        <input type="number" id="preco_servico" name="preco_servico" required className={styles.input_servicos} />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_descricao} ${styles.grid_item_descricao}`}>
                        <label htmlFor="descricao_servico" className={styles.label_servicos}>Descrição</label>
                        <input type="text" id="descricao_servico" name="descricao_servico" required className={styles.input_servicos} />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_observacoes} ${styles.grid_item_observacoes}`}>
                        <label htmlFor="observacoes_servico" className={styles.label_servicos}>Observações</label>
                        <input type="text" id="observacoes_servico" name="observacoes_servico" required className={styles.input_servicos} />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                        <label for="situacao_servico" className={styles.label_servicos}>Situação</label>
                        <select id="situacao_servico" name="situacao_servico"
                            className={`${styles.select_servicos} ${styles.input_situacao}`}>
                            <option value="ativo" className={styles.option} selected>Ativo</option>
                            <option value="inativo" className={styles.option}>Inativo</option>
                        </select>
                    </div>
                </div>
            </form>
            <div className={styles.footer_form}>
                <button type="submit" className={styles.button_submit}>Salvar</button>
                <button type="reset" className={styles.button_cancel}>Cancelar</button>
            </div>

        </div>
    );
}