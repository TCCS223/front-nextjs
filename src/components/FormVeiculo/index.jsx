import React from 'react';
import styles from './index.module.css';
import { format } from 'date-fns';
import { useRef, useState } from 'react';

export default function FormVeiculo({ selectedVeic, setSelectedVeic, isViewing, handleSubmit, Cancelar }) {


    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setNomeMarca(selectedMarca);
        console.log(selectedMarca);
    };

    const [nomeMarca, setNomeMarca] = useState("");


    

    const handleShowProprietarios = (proprietarios) => {
        alert(`Proprietários: ${proprietarios}`);
    };

    return (
        <>
            <form id="veiculoForm" className={styles.form}>
                <input type="hidden" id="veiculoId" className={styles.input_veiculos} />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label htmlFor="codigo_veiculo" className={styles.label_veiculos}>Código</label>
                        <input 
                        type="text" 
                        id="veic_id" 
                        name="veic_id"
                        value={selectedVeic ? selectedVeic.veic_id : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_id: e.target.value })}
                        disabled
                        required 
                        className={styles.input_veiculos} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                        <label htmlFor="placa_veiculo" className={styles.label_veiculos}>Placa</label>
                        <input 
                        type="text" 
                        id="veic_placa" 
                        name="veic_placa" 
                        value={selectedVeic ? selectedVeic.veic_placa : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_placa: e.target.value })}
                        required
                        className={styles.input_veiculos} 
                        placeholder="Letras e números" />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                        <label htmlFor="categoria_veiculo" className={styles.label_veiculos}>Categoria</label>
                        <select 
                        id="categoria_veiculo" 
                        name="categoria_veiculo" 
                        value={selectedVeic ? selectedVeic.cat_id : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, cat_id: parseInt (e.target.value) })}
                        required 
                        className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="1">Caminhão</option>
                            <option value="2">Carro</option>
                            <option value="3">Moto</option>
                        </select>
                    </div>



                    <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                        <label htmlFor="marca_veiculo" className={styles.label_veiculos}>Marca</label>
                        <select 
                        id="marca" 
                        name="marca"
                        value={selectedVeic ? selectedVeic.veic_marca : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_marca: e.target.value })} 
                        required 
                        className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                        <label htmlFor="modelo_veiculo" className={styles.label_veiculos}>Modelo</label>
                        <select 
                        id="categoria_veiculo" 
                        name="categoria_veiculo" 
                        value={selectedVeic ? selectedVeic.mod_id : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_placa: e.target.value })}
                        required 
                        className={`${styles.select_veiculos} ${styles.input_modelo}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="1">Caminhão</option>
                            <option value="2">Carro</option>
                            <option value="3">Moto</option>
                        </select>
                        {/* <input type="text" id="modelo_veiculo" name="modelo_veiculo" required className={styles.input_veiculos} /> */}
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_ano}`}>
                        <label htmlFor="ano_veiculo" className={styles.label_veiculos}>Ano</label>
                        <input 
                        type="number" 
                        id="ano_veiculo" 
                        name="ano_veiculo" 
                        value={selectedVeic ? selectedVeic.veic_ano : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_ano: e.target.value })}
                        required 
                        className={styles.input_veiculos} />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                        <label htmlFor="cor_veiculo" className={styles.label_veiculos}>Cor</label>
                        <select 
                        id="cor" 
                        name="cor" 
                        value={selectedVeic ? selectedVeic.veic_cor : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_cor: e.target.value })}
                        required 
                        className={`${styles.select_veiculos} ${styles.input_cor}`} 
                        defaultValue="">
                            <option value="" disabled selected>Selecionar</option>
                            <option value="Amarelo">Amarelo</option>
                            <option value="Azul">Azul</option>
                            <option value="Bege">Bege</option>
                            <option value="Branco">Branco</option>
                            <option value="Cinza">Cinza</option>
                            <option value="Dourado">Dourado</option>
                            <option value="Laranja">Laranja</option>
                            <option value="Marrom">Marrom</option>
                            <option value="Preto">Preto</option>
                            <option value="Prata">Prata</option>
                            <option value="Rosa">Rosa</option>
                            <option value="Roxo">Roxo</option>
                            <option value="Verde">Verde</option>
                            <option value="Vermelho">Vermelho</option>
                            <option value="Vinho">Vinho</option>
                            <option value="Personalizado">Personalizado</option>
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_combustivel}`}>
                        <label htmlFor="combustivel_veiculo" className={styles.label_veiculos}>Combustível</label>
                        <select 
                        id="combustivel_veiculo" 
                        name="combustivel_veiculo" 
                        value={selectedVeic ? selectedVeic.veic_combustivel : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_combustivel: e.target.value })}
                        required 
                        className={`${styles.select_veiculos} ${styles.input_combustivel}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="gasolina">Gasolina</option>
                            <option value="alcool">Álcool</option>
                            <option value="diesel">Diesel</option>
                            <option value="flex">Flex</option>
                            <option value="gnv">GNV (Gás Natural Veicular)</option>
                            <option value="eletrico">Elétrico</option>
                            <option value="hibrido">Híbrido</option>
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_proprietario}`}>
                        <label htmlFor="proprietario_veiculo" className={styles.label_veiculos}>Você é proprietário?</label>
                        <select 
                        id="nivel_acesso" 
                        name="nivel_acesso"
                        value={selectedVeic ? selectedVeic.ehproprietario : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, ehproprietario: e.target.value })}
                        className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="0" className={styles.option}>Sim</option>
                            <option value="1" className={styles.option}>Não</option>
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_observacoes} ${styles.grid_item_observacoes}`}>
                        <label htmlFor="observacoes_veiculo" className={styles.label_veiculos}>Observações</label>
                        <input 
                        type="text" 
                        id="observacoes_veiculo" 
                        name="observacoes_veiculo" 
                        value={selectedVeic ? selectedVeic.veic_observ : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_observ: e.target.value })}
                        required 
                        className={styles.input_veiculos} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                        <label for="situacao_veiculo" className={styles.label_veiculos}>Situação</label>
                        <select 
                        id="situacao_veiculo" 
                        name="situacao_veiculo"
                        value={selectedVeic ? selectedVeic.veic_situacao : ''}
                        onChange={(e) => setSelectedVeic({ ...selectedVeic, veic_situacao: e.target.value })}
                        className={`${styles.select_veiculos} ${styles.input_situacao}`}>
                            <option value="ativo" className={styles.option} selected>Ativo</option>
                            <option value="inativo" className={styles.option}>Inativo</option>
                        </select>
                    </div>

                </div>
            </form>
            
        </>
    )
}