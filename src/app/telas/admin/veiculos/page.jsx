import { useState } from 'react';
import styles from './page.module.css';

import ConsultaVeiculo from '@/components/modais/modais_clientes';

export default function Veiculos() {
    const [nomeMarca, setNomeMarca] = useState("");

    const marcas = [
        "Selecione",
        "Acura",
        "Alfa Romeo",
        "Aston Martin",
        "Audi",
        "Bentley",
        "BMW",
        "Bugatti",
        "Buick",
        "Cadillac",
        "Chevrolet",
        "Chrysler",
        "Citroën",
        "Dodge",
        "Ferrari",
        "Fiat",
        "Ford",
        "Genesis",
        "GMC",
        "Honda",
        "Hyundai",
        "Infiniti",
        "Jaguar",
        "Jeep",
        "Kia",
        "Lamborghini",
        "Land Rover",
        "Lexus",
        "Lincoln",
        "Maserati",
        "Mazda",
        "McLaren",
        "Mercedes-Benz",
        "Mini",
        "Mitsubishi",
        "Nissan",
        "Pagani",
        "Peugeot",
        "Porsche",
        "Ram",
        "Renault",
        "Rolls-Royce",
        "Saab",
        "Subaru",
        "Suzuki",
        "Tesla",
        "Toyota",
        "Volkswagen",
        "Volvo"
    ];

    const [isModalOpen, setIsModalOpen] = useState(false); // Declara um estado chamado 'isModalOpen' com valor inicial 'false'. 'setIsModalOpen' é a função para atualizar o valor de 'isModalOpen'.

    const openModal = () => { // Define uma função chamada 'openModal' que altera o estado 'isModalOpen' para 'true'.
        setIsModalOpen(true); // Altera o estado 'isModalOpen' para 'true', o que pode ser usado para abrir um modal.
    };

    const closeModal = () => { // Define uma função chamada 'closeModal' que altera o estado 'isModalOpen' para 'false'.
        setIsModalOpen(false); // Altera o estado 'isModalOpen' para 'false', o que pode ser usado para fechar um modal.
    };

    const handleMarcaChange = (event) => {
        const selectedMarca = event.target.value;
        setNomeMarca(selectedMarca);

        console.log(selectedMarca);
    };

    const dados = {
        'mar_nome': nomeMarca,
    }

    return (
        <div id="veiculos" className={styles.content_section}>
            <h2 className={styles.title_page}>Gerenciamento de Veículos</h2>
            <div className={styles.button_group}>
                <button id="novoCliente">Novo</button>
                <button id="alterarCliente" onClick={openModal}>Alterar</button>
                <button id="excluirCliente" onClick={openModal}>Excluir</button>
                <button id="localizarCliente" onClick={openModal}>Localizar</button>
            </div>

            <ConsultaVeiculo isOpen={isModalOpen} onClose={closeModal} />

            <form id="veiculoForm" className={styles.form}>
                <input type="hidden" id="veiculoId" className={styles.input_veiculos} />

                <div className={styles.grid}>
                    <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                        <label htmlFor="codigo_veiculo" className={styles.label_veiculos}>Código</label>
                        <input type="text" id="placa_veiculo" name="placa_veiculo" required disabled className={styles.input_veiculos} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_placa}`}>
                        <label htmlFor="placa_veiculo" className={styles.label_veiculos}>Placa</label>
                        <input type="text" id="placa_veiculo" name="placa_veiculo_veiculo" required className={styles.input_veiculos} placeholder="Letras e números" />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_categoria}`}>
                        <label htmlFor="categoria_veiculo" className={styles.label_veiculos}>Categoria</label>
                        <select id="categoria_veiculo" name="categoria_veiculo" required className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="1">Caminhão</option>
                            <option value="2">Carro</option>
                            <option value="3">Moto</option>
                        </select>
                    </div>



                    <div className={`${styles.grid_item} ${styles.grid_marca}`}>
                        <label htmlFor="marca_veiculo" className={styles.label_veiculos}>Marca</label>
                        <select id="marca" name="marca" required className={`${styles.select_veiculos} ${styles.input_proprietario}`} onChange={handleMarcaChange}>
                            <option value="" disabled selected>Selecionar</option>
                            {marcas.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_modelo}`}>
                        <label htmlFor="modelo_veiculo" className={styles.label_veiculos}>Modelo</label>
                        <select id="categoria_veiculo" name="categoria_veiculo" required className={`${styles.select_veiculos} ${styles.input_modelo}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="1">Caminhão</option>
                            <option value="2">Carro</option>
                            <option value="3">Moto</option>
                        </select>
                        {/* <input type="text" id="modelo_veiculo" name="modelo_veiculo" required className={styles.input_veiculos} /> */}
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_ano}`}>
                        <label htmlFor="ano_veiculo" className={styles.label_veiculos}>Ano</label>
                        <input type="number" id="ano_veiculo" name="ano_veiculo" required className={styles.input_veiculos} />
                    </div>
                    <div className={`${styles.grid_item} ${styles.grid_cor}`}>
                        <label htmlFor="cor_veiculo" className={styles.label_veiculos}>Cor</label>
                        <select id="cor" name="cor" required className={`${styles.select_veiculos} ${styles.input_cor}`} defaultValue="">
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
                        <select id="combustivel_veiculo" name="combustivel_veiculo" required className={`${styles.select_veiculos} ${styles.input_combustivel}`}>
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
                        <select id="nivel_acesso" name="nivel_acesso"
                            className={`${styles.select_veiculos} ${styles.input_proprietario}`}>
                            <option value="" disabled selected>Selecionar</option>
                            <option value="0" className={styles.option}>Sim</option>
                            <option value="1" className={styles.option}>Não</option>
                        </select>
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_observacoes} ${styles.grid_item_observacoes}`}>
                        <label htmlFor="observacoes_veiculo" className={styles.label_veiculos}>Observações</label>
                        <input type="text" id="observacoes_veiculo" name="observacoes_veiculo" required className={styles.input_veiculos} />
                    </div>

                    <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                        <label for="situacao_veiculo" className={styles.label_veiculos}>Situação</label>
                        <select id="situacao_veiculo" name="situacao_veiculo"
                            className={`${styles.select_veiculos} ${styles.input_situacao}`}>
                            <option value="ativo" className={styles.option} selected>Ativo</option>
                            <option value="inativo" className={styles.option}>Inativo</option>
                        </select>
                    </div>

                </div>
            </form>
            <div className={styles.footer_form}>
                <button type="reset" className={styles.button_cancel}>Cancelar</button>
                <button type="submit" className={styles.button_submit}>Salvar</button>
            </div>
        </div>
    );
}
