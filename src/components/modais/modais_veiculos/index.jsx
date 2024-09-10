import styles from './index.module.css'

export default function ConsultaVeiculo({ isOpen, onClose }) {
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains(styles.teste)) {
            onClose();
        }
    };

    if (isOpen) {
        return (
            <div className={styles.container} onClick={handleOutsideClick}>
                <div className={styles.modal}>
                    <div className={styles.titleModal}>
                        <h1>Busca avançada</h1>
                        <span className={styles.close} onClick={onClose}></span>
                    </div>

                    <div className={styles.searchOptions}>
                        <div className={styles.optionGroup}>
                            <p className={styles.optionGroupTitle}>Opções de pesquisa</p>
                            <div className={styles.radioRow}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="search" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Código
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="search" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Placa
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="search" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Modelo
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="search" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Cor
                                </label>
                            </div>
                        </div>

                        <hr className={styles.hr} />

                        <div className={styles.situationGroup}>
                            <p className={styles.optionGroupTitle}>Situação</p>
                            <div className={styles.radioRow}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="status" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Ativo
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="status" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Inativo
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="status" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Todos
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Digite aqui..." className={styles.searchInput} />
                        <button className={styles.searchButton}>Pesquisar</button>
                    </div>

                    <div className={styles.resultTableContainer}>
                        <table className={styles.resultTable}>
                            <thead className={styles.tableHead}>
                                <th className={`${styles.tableHeader} ${styles.id}`}>Código</th>
                                <th className={`${styles.tableHeader} ${styles.modelo}`}>Modelo</th>
                                <th className={`${styles.tableHeader} ${styles.placa}`}>Placa</th>
                                <th className={`${styles.tableHeader} ${styles.ano}`}>Ano</th>
                                <th className={`${styles.tableHeader} ${styles.cor}`}>Cor</th>
                                <th className={`${styles.tableHeader} ${styles.combustivel}`}>Combustível</th>
                                <th className={`${styles.tableHeader} ${styles.proprietario}`}>CPF Proprietário</th>
                                <th className={`${styles.tableHeader} ${styles.observ}`}>Observações</th>
                                <th className={`${styles.tableHeader} ${styles.situacao}`}>Situação</th>
                            </thead>
                            <tbody className={styles.tableBody}>
                                <tr>
                                    <td>001</td>
                                    <td>Fiat Uno</td>
                                    <td>ABC-1234</td>
                                    <td>2020</td>
                                    <td>Prata</td>
                                    <td>Gasolina</td>
                                    <td>123.456.789-00</td>
                                    <td>Nenhuma</td>
                                    <td>Ativo</td>
                                </tr>
                                <tr>
                                    <td>002</td>
                                    <td>Volkswagen Gol</td>
                                    <td>XYZ-5678</td>
                                    <td>2018</td>
                                    <td>Preto</td>
                                    <td>Flex</td>
                                    <td>987.654.321-00</td>
                                    <td>Nenhuma</td>
                                    <td>Inativo</td>
                                </tr>
                                <tr>
                                    <td>003</td>
                                    <td>Chevrolet Onix</td>
                                    <td>KLM-9101</td>
                                    <td>2022</td>
                                    <td>Branco</td>
                                    <td>Álcool</td>
                                    <td>321.654.987-00</td>
                                    <td>Nenhuma</td>
                                    <td>Ativo</td>
                                </tr>
                                <tr>
                                    <td>004</td>
                                    <td>Honda Civic</td>
                                    <td>QRS-1122</td>
                                    <td>2017</td>
                                    <td>Azul</td>
                                    <td>Gasolina</td>
                                    <td>456.789.123-00</td>
                                    <td>Completamente revisado</td>
                                    <td>Inativo</td>
                                </tr>
                                <tr>
                                    <td>005</td>
                                    <td>Renault Sandero</td>
                                    <td>TUV-3344</td>
                                    <td>2019</td>
                                    <td>Vermelho</td>
                                    <td>Flex</td>
                                    <td>654.321.987-00</td>
                                    <td>Leve arranhão na lateral</td>
                                    <td>Ativo</td>
                                </tr>
                                <tr>
                                    <td>006</td>
                                    <td>Ford Ka</td>
                                    <td>WXY-5566</td>
                                    <td>2021</td>
                                    <td>Prata</td>
                                    <td>Gasolina</td>
                                    <td>789.123.456-00</td>
                                    <td>Troca de óleo recente</td>
                                    <td>Ativo</td>
                                </tr>
                                <tr>
                                    <td>007</td>
                                    <td>Hyundai HB20</td>
                                    <td>ZAB-7788</td>
                                    <td>2020</td>
                                    <td>Cinza</td>
                                    <td>Flex</td>
                                    <td>213.546.879-00</td>
                                    <td>Nenhuma</td>
                                    <td>Inativo</td>
                                </tr>
                                <tr>
                                    <td>008</td>
                                    <td>Jeep Renegade</td>
                                    <td>CDE-9900</td>
                                    <td>2023</td>
                                    <td>Verde</td>
                                    <td>Diesel</td>
                                    <td>987.213.546-00</td>
                                    <td>Novo, 0 km</td>
                                    <td>Ativo</td>
                                </tr>
                                <tr>
                                    <td>009</td>
                                    <td>Fiat Toro</td>
                                    <td>FGH-1123</td>
                                    <td>2021</td>
                                    <td>Branco</td>
                                    <td>Flex</td>
                                    <td>654.987.321-00</td>
                                    <td>Nenhuma</td>
                                    <td>Ativo</td>
                                </tr>
                                <tr>
                                    <td>010</td>
                                    <td>Volkswagen T-Cross</td>
                                    <td>JKL-4455</td>
                                    <td>2019</td>
                                    <td>Preto</td>
                                    <td>Gasolina</td>
                                    <td>789.321.654-00</td>
                                    <td>Primeiro dono</td>
                                    <td>Inativo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
