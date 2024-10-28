import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import InputMask from "react-input-mask";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import api from '@/services/api';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export default function FormCliente({ selectedUser, setSelectedUser, senhaErro, setSenhaErro, focused, senha, handleFocus, handleBlur, validarSenha, isViewing, handleSubmit, isEditing }) {

    const isDisabled = isViewing || isEditing;

    const [showPassword, setShowPassword] = useState(false);
    const [cpfExists, setCpfExists] = useState(false);
    const [cpfChecked, setCpfChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const handleSenhaChange = (e) => {
    //     const senha = e.target.value;
    //     setSelectedUser({ ...selectedUser, usu_senha: senha });

    //     // Chama a função de validação do componente pai
    //     validarSenha(senha);
    // };

    // const handleChangeSenha = (event) => {
    //     const novaSenha = event.target.value;
    //     setSelectedUser({ ...selectedUser, usu_senha: novaSenha });

    //     // Valida a senha e atualiza o estado de erro
    //     const erros = validarSenha(novaSenha);
    //     setSenhaErro(erros); // Exibe as mensagens que faltam ser atendidas
    // };


    const handleChangeSenha = (event) => {
        const novaSenha = event.target.value;
        setSelectedUser({ ...selectedUser, usu_senha: novaSenha });

        if (focused) { // Somente valida se o campo estiver focado
            const erros = validarSenha(novaSenha);
            setSenhaErro(erros); // Atualiza as mensagens de erro
        }
    };

    const sexoMap = {
        0: 'Feminino',
        1: 'Masculino',
        2: 'Outro'
    };

    const handleCPFChange = (e) => {
        const cpf = e.target.value;
        setSelectedUser({ ...selectedUser, usu_cpf: cpf });
        setCpfChecked(false);
        setCpfExists(false);
        setErrors('');
    };

    // const handleBlurCPF = async () => {
    //     const cpf = selectedUser.usu_cpf.trim();
    
    //     console.log("Valor do CPF antes da chamada:", cpf); // Para debug
    
    //     if (cpf === '') {
    //         setErrors('CPF é obrigatório');
    //         return;
    //     }
    
    //     // Verifique se o CPF é válido, mas não remova a máscara
    //     if (!cpfValidator.isValid(cpf)) {
    //         setErrors('CPF inválido');
    //         return;
    //     }
    
    //     setLoading(true);
    
    //     try {
    //         const res = await api.post('/usuarios/verificarCpf', { usu_cpf: cpf });
        
    //         console.log("Resposta da API:", res); // Log para verificar o conteúdo da resposta
        
    //         if (res.data.sucesso) {
    //             setCpfExists(res.data.exists);
    //             if (res.data.exists && (selectedUser.usu_id ? res.data.existsUserId !== selectedUser.usu_id : true)) {
    //                 setErrors('CPF já está cadastrado');
    //             } else {
    //                 setErrors('');
    //             }
    //         } else {
    //             setErrors('Erro ao verificar o CPF');
    //         }
    //     } catch (error) {
    //         console.error("Erro ao verificar CPF:", error.response); // Mostra toda a resposta de erro
    //         setErrors(error.response?.data?.mensagem || 'Erro ao verificar CPF');
    //     }
    
    //     setCpfChecked(true);
    //     setLoading(false);
    // };
    
    
    return (
        <form id="clienteForm" className={styles.form} onSubmit={handleSubmit}>
            <input type="hidden" id="clienteId" value={selectedUser ? selectedUser.usu_id : ''} className={styles.input_cliente} />

            <div className={styles.grid}>
                <div className={`${styles.grid_item} ${styles.grid_codigo}`}>
                    <label htmlFor="codigo_cliente" className={styles.label_cliente}>Código</label>
                    <input
                        type="number"
                        id="codigo_cliente"
                        name="codigo_cliente"
                        value={selectedUser ? selectedUser.usu_id : ''}
                        className={styles.input_cliente}
                        disabled
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_nome}`}>

                    <label htmlFor="nome_cliente" className={styles.label_cliente}>Nome</label>
                    <input
                        type="text"
                        id="nome_cliente"
                        name="nome_cliente"
                        value={selectedUser ? selectedUser.usu_nome : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_nome: e.target.value })}
                        disabled={isDisabled}
                        className={styles.input_cliente}
                        placeholder="Nome Completo"
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_cpf}`}>
                    <label htmlFor="usu_cpf" className={styles.label_cliente}>CPF</label>
                    <InputMask
                        mask="999.999.999-99"
                        type="text"
                        id="usu_cpf"
                        name="usu_cpf"
                        value={selectedUser ? selectedUser.usu_cpf : ''}
                        onChange={handleCPFChange}
                        // onBlur={handleBlurCPF}
                        disabled={isDisabled}
                        className={styles.input_cliente}
                        required
                    />

                    {cpfChecked && !loading && (
                        <span className={cpfExists ? styles.error : styles.success}>
                            {cpfExists ? 'CPF já cadastrado' : ''}
                        </span>
                    )}
                    {errors && <span className={styles.error}>{errors}</span>}
                </div>

                <div className={`${styles.grid_item} ${styles.grid_data}`}>
                    <label htmlFor="data_nasc_cliente" className={styles.label_cliente}>Data de Nascimento</label>
                    <input
                        type="date"
                        id="data_nasc_cliente"
                        name="data_nasc_cliente"
                        value={selectedUser ? selectedUser.usu_data_nasc : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_data_nasc: e.target.value })}
                        disabled={isDisabled}
                        className={styles.input_cliente}
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_sexo}`}>
                    <label htmlFor="usu_sexo" className={styles.label_cliente}>Sexo</label>

                    {isViewing ? (
                        <input
                            type="text"
                            id="usu_sexo"
                            name="usu_sexo"
                            value={selectedUser ? sexoMap[selectedUser.usu_sexo] || '' : ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, usu_sexo: parseInt(e.target.value) })}
                            disabled={isViewing}
                            className={styles.input_cliente}
                            required
                        />
                    ) : (
                        <select
                            id="usu_sexo"
                            name="usu_sexo"
                            value={selectedUser ? selectedUser.usu_sexo : ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, usu_sexo: parseInt(e.target.value) })}
                            disabled={isViewing}
                            className={`${styles.select_cliente} ${styles.input_sexo}`}
                            required
                        >
                            <option value="">Selecionar</option>
                            <option value="0">Feminino</option>
                            <option value="1">Masculino</option>
                            <option value="2">Outro</option>
                        </select>
                    )}

                </div>

                <div className={`${styles.grid_item} ${styles.grid_telefone}`}>
                    <label htmlFor="usu_telefone" className={styles.label_cliente}>Telefone</label>
                    <InputMask
                        mask="(99) 99999-9999"
                        type="tel"
                        id="usu_telefone"
                        name="usu_telefone"
                        value={selectedUser ? selectedUser.usu_telefone : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_telefone: e.target.value })}
                        disabled={isViewing}
                        className={`${styles.input_cliente}`}
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_email}`}>
                    <label htmlFor="email_cliente" className={styles.label_cliente}>Email</label>
                    <input
                        type="email"
                        id="email_cliente"
                        name="email_cliente"
                        value={selectedUser ? selectedUser.usu_email : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_email: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="exemplo@exemplo.com"
                        required
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_senha}`}>
                    <label htmlFor="usu_senha" className={styles.label_cliente}>Senha</label>

                    <div className={styles.input_cliente_senha}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="usu_senha"
                            name="usu_senha"
                            value={selectedUser ? selectedUser.usu_senha : ''}
                            onChange={handleChangeSenha} // Valida enquanto o usuário digita
                            className={styles.input_cliente_password}
                            disabled={isViewing}
                            placeholder="Digite sua senha"
                            required
                            onFocus={handleFocus} // Foca no campo
                            onBlur={handleBlur}   // Valida quando sai do campo
                        />

                        {showPassword ? (
                            <IoMdEye onClick={togglePasswordVisibility} className={styles.mdEye} />
                        ) : (
                            <IoMdEyeOff onClick={togglePasswordVisibility} className={styles.mdEye} />
                        )}

                        {/* Exibe as mensagens de erro abaixo do campo
                        {senhaErro && senhaErro.length > 0 && (
                            <div className={styles.errorMessages}>
                                {senhaErro.map((erro, index) => (
                                    <p key={index} className={styles.errorText}>{erro}</p>
                                ))}
                            </div>
                        )} */}
                    </div>


                    {/* {focused && ( // Exibe a mensagem apenas quando o campo está focado ou há um erro
        <div className={`${styles.error_message} ${senhaErro === '' ? styles.hidden : ''}`}>
          {senhaErro || 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.'}
        </div>
      )} */}


                    {/* Durante o foco, mostra as exigências ainda não cumpridas */}
                    {focused && Array.isArray(senhaErro) && senhaErro.length > 0 && (
                        <div className={styles.error_message}>
                            <ul>
                                {senhaErro.map((erro, index) => (
                                    <li key={index} className={styles.errorText}>{erro}</li>
                                ))}
                            </ul>
                        </div>
                    )}


                    {/* Quando o campo perder o foco, se houver erros, mostra "Senha inválida" */}
                    {!focused && senhaErro.length > 0 && (
                        <div className={styles.error_message_simples}>
                            Senha inválida.
                        </div>
                    )}

                    {/* {senhaErro && (
                        <div className={`${styles.error_message} ${senhaErro === '' ? styles.hidden : ''}`}>
                            {senhaErro}
                        </div>
                    )} */}

                    {/* {senhaErro && <div className={styles.error_message}>{senhaErro}</div>} Mensagem de erro ESSA FUNCIONA OK */}

                    {/* {senhaErro && <div className={styles.error_message}>{senhaErro}</div>} */}
                </div>

                <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                    <label htmlFor="usu_observ" className={styles.label_cliente}>Observações</label>
                    <input
                        type="text"
                        id="usu_observ"
                        name="usu_observ"
                        value={selectedUser ? selectedUser.usu_observ : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_observ: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        required
                    />
                </div>


                <div className={`${styles.grid_item} ${styles.grid_acesso}`}>
                    <label htmlFor="nivel_acesso" className={styles.label_cliente}>Nível de Acesso</label>
                    {isViewing ? (
                        <input
                            type="text"
                            id="nivel_acesso"
                            name="nivel_acesso"
                            value={selectedUser ? (selectedUser.usu_acesso === 0 ? 'Usuário' : 'Administrador') : ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, usu_acesso: parseInt(e.target.value) })}
                            className={styles.input_cliente}
                            disabled={isViewing}
                            required
                        />
                    ) : (
                        <select
                            id="nivel_acesso"
                            name="nivel_acesso"
                            className={`${styles.select_cliente} ${styles.input_acesso}`}
                            value={selectedUser ? selectedUser.usu_acesso : ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, usu_acesso: parseInt(e.target.value) })}

                        >
                            <option value="0">Usuário</option>
                            <option value="1">Administrador</option>
                        </select>
                    )}


                </div>

                <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                    <label htmlFor="usu_situacao" className={styles.label_cliente}>Situação</label>

                    {isEditing ? (

                        <select
                            id="usu_situacao"
                            name="usu_situacao"
                            className={`${styles.select_cliente} ${styles.input_situacao}`}
                            value={selectedUser ? selectedUser.usu_situacao : ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, usu_situacao: parseInt(e.target.value) })}
                        >

                            <option value="1" className={styles.option}>Ativo</option>
                            <option value="0" className={styles.option}>Inativo</option>
                        </select>


                    ) : (
                        <input
                            type="text"
                            id="usu_situacao"
                            name="usu_situacao"
                            value={selectedUser ? (selectedUser.usu_situacao === 1 ? 'Ativo' : 'Inativo') : ''}
                            onChange={(e) => setSelectedUser({ ...selectedUser, usu_situacao: parseInt(e.target.value) })}
                            disabled
                            className={styles.input_cliente}
                            required
                        />
                    )}
                </div>
            </div>
        </form>
    )
}
