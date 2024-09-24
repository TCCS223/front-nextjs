import React from 'react';
import styles from './index.module.css';
import { format } from 'date-fns';
import { useRef } from 'react';

export default function FormServicos({ selectedServicos, setSelectedServicos, isViewing, handleSubmit, Cancelar }) {
    return (
        <>
            <form id="servicoForm" className={styles.form}>


                <input type="hidden" id="clienteId" value={selectedServicos ? selectedServicos.serv_id : ''} className={styles.input_servicos} />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label htmlFor="serv_id" className={styles.label_servicos}>Código</label>
                        <input
                            type="text"
                            name="serv_id"
                            id="serv_id"
                            value={selectedServicos ? selectedServicos.serv_id : ''}
                            className={styles.input_servicos}
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                        <label htmlFor="cat_serv_nome" className={styles.label_servicos}>Categoria</label>
                        <input
                            type="text"
                            name="cat_serv_nome"
                            id="cat_serv_nome"
                            value={selectedServicos ? selectedServicos.cat_serv_nome : ''}
                            className={styles.input_servicos}
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                        <label htmlFor="serv_nome" className={styles.label_servicos}>Nome</label>
                        <input
                            type="text"
                            name="serv_nome"
                            id="serv_nome"
                            value={selectedServicos ? selectedServicos.serv_nome : ''}
                            className={styles.input_servicos}
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_duracao}`}>
                        <label htmlFor="serv_duracao" className={styles.label_servicos}>Duração Estimada</label>
                        <input
                            type="text"
                            name="serv_duracao"
                            id="serv_duracao"
                            value={selectedServicos ? selectedServicos.serv_duracao : ''}
                            className={styles.input_servicos}
                        />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_preco}`}>
                        <label htmlFor="serv_preco" className={styles.label_servicos}>Preço</label>
                        <input
                            type="text"
                            name="serv_preco"
                            id="serv_preco"
                            value={selectedServicos ? selectedServicos.serv_preco : ''}
                            className={styles.input_servicos}
                        />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_descricao} ${styles.grid_item_descricao}`}>
                        <label htmlFor="serv_descricao" className={styles.label_servicos}>Descrição</label>
                        <input
                            type="text"
                            name="serv_descricao"
                            id="serv_descricao"
                            value={selectedServicos ? selectedServicos.serv_descricao : ''}
                            className={styles.input_servicos}
                        />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_observacoes} ${styles.grid_item_observacoes}`}>
                        <label htmlFor="observacoes_servico" className={styles.label_servicos}>Observações</label>
                        <input
                            type="text"
                            name="serv_descricao"
                            id="serv_descricao"
                            value={selectedServicos ? selectedServicos.serv_observ : ''}
                            className={styles.input_servicos}
                        />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                        <label for="serv_situacao" className={styles.label_servicos}>Situação</label>
                        <input
                            type="text"
                            name="serv_situacao"
                            id="serv_situacao"
                            value={selectedServicos ? ( selectedServicos.serv_situacao ? 'Ativo' : 'Inativo' ) : ''}
                            className={styles.input_servicos}
                        />
                    </div>
                </div>
            </form>

        </>
    )
}