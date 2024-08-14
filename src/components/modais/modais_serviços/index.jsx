import styles from './index.module.css';

export default function ConsultaServico({ isOpen, onClose }) {
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
                                    <span className={styles.radioCustom}></span> Nome
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="search" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Categoria
                                </label>
                                <label className={styles.radioLabel}>
                                    <input type="radio" name="search" className={styles.radioInput} />
                                    <span className={styles.radioCustom}></span> Descrição
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
                                <tr>
                                    <th className={`${styles.tableHeader} ${styles.id}`}>Código</th>
                                    <th className={`${styles.tableHeader} ${styles.nome}`}>Nome</th>
                                    <th className={`${styles.tableHeader} ${styles.categoria}`}>Categoria</th> {/* Novo cabeçalho */}
                                    <th className={`${styles.tableHeader} ${styles.duracao}`}>Duração</th>
                                    <th className={`${styles.tableHeader} ${styles.preco}`}>Preço</th>
                                    <th className={`${styles.tableHeader} ${styles.descricao}`}>Descrição</th>
                                    <th className={`${styles.tableHeader} ${styles.situacao}`}>Situação</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                <tr>
                                    <td>1</td>
                                    <td>Manutenção de Computador</td>
                                    <td>Serviços Gerais</td> {/* Categoria do serviço */}
                                    <td>02:00:00</td>
                                    <td>150.00</td>
                                    <td>Serviço de manutenção geral de computadores</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Instalação de Impressora</td>
                                    <td>Periféricos</td> {/* Categoria do serviço */}
                                    <td>01:00:00</td>
                                    <td>80.00</td>
                                    <td>Instalação e configuração de impressoras</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Assistência Técnica de Redes</td>
                                    <td>Redes</td> {/* Categoria do serviço */}
                                    <td>03:00:00</td>
                                    <td>200.00</td>
                                    <td>Diagnóstico e reparo de problemas de rede</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Consultoria em TI</td>
                                    <td>Consultoria</td> {/* Categoria do serviço */}
                                    <td>01:30:00</td>
                                    <td>120.00</td>
                                    <td>Consultoria especializada em tecnologia da informação</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Desenvolvimento de Software</td>
                                    <td>Desenvolvimento</td> {/* Categoria do serviço */}
                                    <td>05:00:00</td>
                                    <td>1000.00</td>
                                    <td>Desenvolvimento e customização de software</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Backup de Dados</td>
                                    <td>Segurança</td> {/* Categoria do serviço */}
                                    <td>01:00:00</td>
                                    <td>90.00</td>
                                    <td>Serviço de backup e recuperação de dados</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Segurança de Rede</td>
                                    <td>Segurança</td> {/* Categoria do serviço */}
                                    <td>02:30:00</td>
                                    <td>250.00</td>
                                    <td>Implementação de soluções de segurança para redes</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Treinamento em TI</td>
                                    <td>Educação</td> {/* Categoria do serviço */}
                                    <td>03:00:00</td>
                                    <td>180.00</td>
                                    <td>Treinamento para equipes em ferramentas e práticas de TI</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Manutenção de Impressora</td>
                                    <td>Periféricos</td> {/* Categoria do serviço */}
                                    <td>01:00:00</td>
                                    <td>70.00</td>
                                    <td>Serviço de manutenção e reparo de impressoras</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Atualização de Sistema</td>
                                    <td>Sistemas</td> {/* Categoria do serviço */}
                                    <td>02:00:00</td>
                                    <td>130.00</td>
                                    <td>Atualização de sistemas operacionais e softwares</td>
                                    <td>0</td>
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
