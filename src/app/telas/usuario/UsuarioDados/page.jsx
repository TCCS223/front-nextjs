import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "@/app/context/UserContext";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import api from "@/services/api";
import styles from "./page.module.css";

export default function DadosDoUsuario() {
    const { userId } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [meusDados, setMeusDados] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Estado para controle de edição

    const listarDadosUsuario = async () => {
        try {
            const response = await api.get(`/usuarios/dadosUsuario/${userId}`);
            setMeusDados(response.data.dados);
            console.log("Usuário:", response.data.dados);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    useEffect(() => {
        listarDadosUsuario();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Converter valor do sexo em número inteiro se for o campo "usu_sexo"
        const newValue = name === 'usu_sexo' ? parseInt(value) : value;

        setMeusDados((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const sexoMap = {
        0: 'Feminino',
        1: 'Masculino',
        2: 'Outro'
    };

    const handleEdit = () => {
        setIsEditing(true); // Habilitar modo de edição
    };

    const handleCancel = () => {
        setIsEditing(false); // Desabilitar modo de edição
        listarDadosUsuario(); // Recarregar dados do usuário para descartar alterações
        togglePasswordVisibility(false); // Toggle
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para salvar os dados (não implementada)
        console.log("Dados salvos:", meusDados);
        setIsEditing(false); // Desabilitar modo de edição após salvar
    };

    console.log("Dados do usuário:", meusDados);

    return (
        <div id="clientes" className={styles.content_section}>
            <h2 className={styles.title_page}>Meus Dados</h2>

            {meusDados ? (
                <>
                    <form id="clienteForm" className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="hidden"
                            id="clienteId"
                            className={styles.input_cliente}
                            value={meusDados?.usu_id || ''}
                        />

                        <div className={styles.grid}>
                            <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                                <label htmlFor="codigo_cliente" className={styles.label_cliente}>Código</label>
                                <input
                                    type="number"
                                    id="codigo_cliente"
                                    name="codigo_cliente"
                                    className={styles.input_cliente}
                                    value={meusDados?.usu_id || ''}
                                    disabled // O código é sempre desabilitado para edição
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                                <label htmlFor="usu_nome" className={styles.label_cliente}>Nome</label>
                                <input
                                    type="text"
                                    id="usu_nome"
                                    name="usu_nome"
                                    className={styles.input_cliente}
                                    placeholder="Nome Completo"
                                    value={meusDados?.usu_nome || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing} // Desabilita se não estiver editando
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_cpf}`}>
                                <label htmlFor="usu_cpf" className={styles.label_cliente}>CPF</label>
                                <input
                                    type="text"
                                    id="usu_cpf"
                                    name="usu_cpf"
                                    className={styles.input_cliente}
                                    placeholder="000.000.000-00"
                                    value={meusDados?.usu_cpf || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing} // Desabilita se não estiver editando
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_data}`}>
                                <label htmlFor="usu_data_nasc" className={styles.label_cliente}>Data de nascimento</label>
                                <input
                                    type="date"
                                    id="usu_data_nasc"
                                    name="usu_data_nasc"
                                    className={styles.input_cliente}
                                    value={meusDados?.usu_data_nasc ? new Date(meusDados.usu_data_nasc).toISOString().split("T")[0] : ''}
                                    onChange={handleChange}
                                    disabled={!isEditing} // Desabilita se não estiver editando
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_sexo}`}>
                                <label htmlFor="usu_sexo" className={styles.label_cliente}>Sexo</label>


                                {isEditing ? (
                                    <select
                                        id="usu_sexo"
                                        name="usu_sexo"
                                        value={meusDados?.usu_sexo || ''}
                                        onChange={handleChange}
                                        className={`${styles.select_cliente} ${styles.input_sexo}`}
                                        required
                                    >
                                        <option value="">Selecionar</option>
                                        <option value="0">Feminino</option>
                                        <option value="1">Masculino</option>
                                        <option value="2">Outro</option>
                                    </select>
                                ) : (
                                    <input
                                        id="usu_sexo"
                                        name="usu_sexo"
                                        className={`${styles.input_cliente} ${styles.input_sexo}`}
                                        value={sexoMap[meusDados?.usu_sexo] || ''}
                                        onChange={handleChange}
                                        disabled // Desabilita se não estiver editando
                                    />
                                )}
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_telefone}`}>
                                <label htmlFor="usu_telefone" className={styles.label_cliente}>Telefone</label>
                                <input
                                    type="tel"
                                    id="usu_telefone"
                                    name="usu_telefone"
                                    className={styles.input_cliente}
                                    placeholder="(xx) xxxxx - xxxxx"
                                    value={meusDados?.usu_telefone || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing} // Desabilita se não estiver editando
                                />
                            </div>

                            <div className={`${styles.grid_item} ${styles.grid_email}`}>
                                <label htmlFor="usu_email" className={styles.label_cliente}>Email</label>
                                    <input
                                        type="email"
                                        id="usu_email"
                                        name="usu_email"
                                        className={styles.input_cliente}
                                        placeholder="exemplo@exemplo.com"
                                        value={meusDados?.usu_email || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing} // Desabilita se não estiver editando
                                    />

                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_email}`}>
                                    <label htmlFor="usu_senha" className={styles.label_cliente}>Senha</label>
                                    <div className={styles.input_cliente_senha}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="usu_senha"
                                            name="usu_senha"
                                            value={meusDados?.usu_senha || ''}
                                            onChange={handleChange}
                                            className={styles.input_cliente_password}
                                            disabled={!isEditing}
                                            placeholder="Digite sua senha"
                                            required
                                        />
                                        {showPassword ? (
                                            <IoMdEye onClick={togglePasswordVisibility} className={styles.mdEye} />
                                        ) : (
                                            <IoMdEyeOff onClick={togglePasswordVisibility} className={styles.mdEye} />
                                        )}
                                    </div>
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_email}`}>
                                    <label htmlFor="usu_acesso" className={styles.label_cliente}>Nível de Acesso</label>
                                    <input
                                        type="text"
                                        id="usu_acesso"
                                        name="usu_acesso"
                                        className={styles.input_cliente}
                                        value={meusDados?.usu_acesso === 0 ? "Usuário" : "Administrador" || ''}
                                        onChange={handleChange}
                                        disabled  // Desabilita se não estiver editando
                                    />
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                                    <label htmlFor="usu_observ" className={styles.label_cliente}>Observações</label>
                                    <input
                                        type="text"
                                        id="usu_observ"
                                        name="usu_observ"
                                        className={styles.input_cliente}
                                        value={meusDados?.usu_observ || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing} // Desabilita se não estiver editando
                                    />
                                </div>

                                <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                                    <label htmlFor="usu_situacao" className={styles.label_cliente}>Situação</label>
                                    <input
                                        id="usu_situacao"
                                        name="usu_situacao"
                                        className={`${styles.input_cliente} ${styles.input_situacao}`}
                                        value={meusDados?.usu_situacao === 1 ? "Ativo" : "Inativo" || '1'}
                                        onChange={handleChange}
                                        disabled // Desabilita se não estiver editando
                                    />
                                </div>
                            </div>


                    </form>
                    <div className={styles.footer_form}>
                        {!isEditing ? ( // Exibe o botão Editar quando não estiver editando
                            <button type="button" onClick={handleEdit} className={styles.button_edit}>Editar</button>
                        ) : (
                            <>
                                <button type="button" onClick={handleCancel} className={styles.button_cancel}>Cancelar</button>
                                <button type="submit" className={styles.button_submit}>Salvar</button>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <p>Carregando dados do usuário...</p>
            )}
        </div>
    );
}
