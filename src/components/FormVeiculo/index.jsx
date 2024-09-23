import React from 'react';
import styles from './index.module.css';

export default function FormVeiculo({ selectedVeic }) {
    return (
        <>
            <form id="veiculoForm" className={styles.form}>
                <input type="hidden" id="veiculoId" className={styles.input_veiculos} />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label htmlFor="veic_id" className={styles.label_veiculos}>Código</label>
                        <input
                            type="text"
                            id="veic_id"
                            name="veic_id"
                            value={selectedVeic ? selectedVeic.veic_id : ''}
                            disabled
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                        <label htmlFor="veic_placa" className={styles.label_veiculos}>Placa</label>
                        <input
                            type="text"
                            id="veic_placa"
                            name="veic_placa"
                            value={selectedVeic ? selectedVeic.veic_placa : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                        <label htmlFor="cat_nome" className={styles.label_veiculos}>Categoria</label>
                        <input
                            type="text"
                            id="cat_nome"
                            name="cat_nome"
                            value={selectedVeic ? selectedVeic.cat_nome : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                        <label htmlFor="mar_id" className={styles.label_veiculos}>Marca</label>
                        <input
                            type='text'
                            id="mar_id"
                            name="mar_id"
                            value={selectedVeic ? selectedVeic.mar_nome : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                        <label htmlFor="mod_id" className={styles.label_veiculos}>Modelo</label>
                        <input
                            type='text'
                            id="mod_id"
                            name="mod_id"
                            value={selectedVeic ? selectedVeic.mod_nome : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_ano}`}>
                        <label htmlFor="veic_ano" className={styles.label_veiculos}>Ano</label>
                        <input
                            type="text"
                            id="veic_ano"
                            name="veic_ano"
                            value={selectedVeic ? selectedVeic.veic_ano : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                        <label htmlFor="veic_cor" className={styles.label_veiculos}>Cor</label>
                        <input
                            type="text"
                            id="veic_ano"
                            name="veic_cor"
                            value={selectedVeic ? selectedVeic.veic_cor : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                        <label htmlFor="veic_combustivel" className={styles.label_veiculos}>Combustível</label>
                        <input
                            type="text"
                            id="veic_combustivel"
                            name="veic_combustivel"
                            value={selectedVeic ? selectedVeic.veic_combustivel : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    {selectedVeic.num_proprietarios > 1 ? (
                        <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                            <label htmlFor="proprietarios" className={styles.label_veiculos}>
                                Proprietário(s)
                                <span className={styles.numProprietarios}>
                                    (+{selectedVeic.num_proprietarios - 1})
                                </span>
                            </label>
                            <select
                                id="proprietarios"
                                name="proprietarios"
                                value={selectedVeic ? selectedVeic.proprietario : ''}
                                className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                                <option value="" disabled>Selecionar Proprietário</option>
                                {selectedVeic.proprietarios.split(', ').map((proprietario, index) => (
                                    <option key={index} value={proprietario}>{proprietario}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                            <label htmlFor="proprietarios" className={styles.label_veiculos}>Proprietário(s)</label>
                            <input
                                type="text"
                                id="proprietarios"
                                name="proprietarios"
                                value={selectedVeic ? selectedVeic.proprietarios : ''}
                                className={styles.input_veiculos}
                                required
                            />
                        </div>
                    )}

                    <div className={`${styles.grid_item} ${styles.grid_observacoes} ${styles.grid_item_observacoes}`}>
                        <label htmlFor="veic_observ" className={styles.label_veiculos}>Observações</label>
                        <input
                            type="text"
                            id="veic_observ"
                            name="veic_observ"
                            value={selectedVeic ? selectedVeic.veic_observ : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                        <label htmlFor="veic_situacao" className={styles.label_veiculos}>Situação</label>
                        <input
                            type="text"
                            id="veic_situacao"
                            name="veic_situacao"
                            value={selectedVeic ? (selectedVeic.veic_situacao == 1 ? 'Ativo' : 'Inativo') : ''}
                            className={styles.input_veiculos}
                            required
                        />
                    </div>
                </div>
            </form>

        </>
    )
}