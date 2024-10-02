"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InputMask from "react-input-mask";
import styles from "./page.module.css";
import api from "@/services/api";
import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export default function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);
    const [usuario, setUsuario] = useState({
        usu_nome: '',
        usu_cpf: '',
        usu_data_nasc: '',
        usu_sexo: '',
        usu_telefone: '',
        usu_email: '',
        usu_observ: '',
        usu_acesso: 0,
        usu_senha: '',
        usu_situacao: 1,
    });
    const [cpfError, setCpfError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [isCheckingCpf, setIsCheckingCpf] = useState(false);

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prev => ({ ...prev, [name]: value }));

        if (name === 'usu_cpf') {
            setCpfError('');
        }
        if (name === 'usu_email') {
            setEmailError('');
        }
    };

    const validateEmail = async () => {
        const email = usuario.usu_email.trim();
        const errors = [];
    
        // Verifica o formato do email
        if (!isValidEmail(email)) {
            errors.push('Email inválido.');
        }
    
        setIsCheckingEmail(true);
        try {
            const response = await api.post('/usuarios/verificarEmail', { usu_email: email });
            // Supondo que a API retorne { sucesso: true, dados: true/false }
    
            if (response.data.sucesso && response.data.dados) {
                errors.push('Email já está cadastrado.');
            }
        } catch (error) {
            console.error('Erro na verificação do email:', error);
            errors.push('Ocorreu um erro ao verificar o email. Por favor, tente novamente.');
        } finally {
            setIsCheckingEmail(false);
        }
    
        if (errors.length > 0) {
            setEmailError(errors.join(' '));
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };
    

    const validateCPF = async () => {
        const cpfNumbers = usuario.usu_cpf.trim();
        // console.log("Validando CPF:", cpfNumbers);

        if (cpfNumbers.length !== 14) {
            setCpfError('CPF deve conter 11 dígitos.');
            return false;
        }

        if (!cpfValidator.isValid(cpfNumbers)) {
            setCpfError('CPF inválido.');
            return false;
        }

        setIsCheckingCpf(true);
        try {
            const response = await api.post('/usuarios/verificarCpf', { usu_cpf: cpfNumbers });
            // console.log("Resposta da verificação do CPF:", response.data); // Log da resposta

            if (response.data.sucesso) {
                if (response.data.dados) {
                    setCpfError('CPF já está cadastrado.');
                    Swal.fire({
                        title: 'CPF Já Cadastrado',
                        text: 'O CPF informado já está cadastrado. Por favor, verifique ou utilize outro CPF.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return false;
                } else {
                    setCpfError('');
                    return true;
                }
            } else {
                cadastrar();
                return false;
            }
        } catch (error) {
            console.error('Erro na verificação do CPF:', error);
            setCpfError('Ocorreu um erro ao verificar o CPF. Por favor, tente novamente.');
            Swal.fire({
                title: 'Erro de Conexão',
                text: 'Não foi possível verificar o CPF no momento. Por favor, tente novamente mais tarde.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        } finally {
            setIsCheckingCpf(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const errors = [];
    
        // Valida o CPF
        const isCpfValid = await validateCPF();
        if (!isCpfValid) {
            errors.push(cpfError);
        }
    
        // Valida o Email
        const isEmailValid = await validateEmail();
        if (!isEmailValid) {
            errors.push(emailError);
        }
    
        if (errors.length > 0) {
            Swal.fire({
                title: 'Dados Incorretos',
                html: errors.join('<br/>'),
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
    
        // Se tudo estiver válido, prossegue com o cadastro
        cadastrar();
    };    

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const clearInputs = () => {
        setUsuario({
            usu_nome: '',
            usu_cpf: '',
            usu_data_nasc: '',
            usu_sexo: '',
            usu_telefone: '',
            usu_email: '',
            usu_observ: '',
            usu_acesso: 0,
            usu_senha: '',
            usu_situacao: 1,
        });
        setCpfError('');
        setEmailError('');
    };

    async function cadastrar() {
        try {
            const response = await api.post('/usuarios', usuario);
            console.log("Resposta do cadastro de usuário:", response.data); // Log da resposta

            if (response.data.sucesso === true) {
                const usu_id = response.data.dados;
                console.log("Usuário criado com ID:", usu_id);

                clearInputs();
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify({
                    id: usu_id,
                    nome: usuario.usu_nome,
                    email: usuario.usu_email,
                    senha: usuario.usu_senha,
                    sexo: usuario.usu_sexo,
                    data_nasc: usuario.usu_data_nasc,
                    cpf: usuario.usu_cpf,
                    telefone: usuario.usu_telefone,
                }));

                toast.success('Cadastrado com sucesso!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setTimeout(() => {
                    router.push('/telas/login');
                }, 2000);

            } else {
                console.error('Erro no cadastro:', response.data.mensagem, response.data.dados);
                if (response.data.mensagem.includes('CPF já cadastrado')) {
                    Swal.fire({
                        title: 'CPF Já Cadastrado',
                        text: 'O CPF informado já está cadastrado. Por favor, verifique ou utilize outro CPF.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    toast.error('Erro no cadastro. Tente novamente.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
        } catch (error) {
            console.error('Erro no cadastro:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data && error.response.data.mensagem.includes('CPF já cadastrado')) {
                Swal.fire({
                    title: 'CPF Já Cadastrado',
                    text: 'O CPF informado já está cadastrado. Por favor, verifique ou utilize outro CPF.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
            
        }
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.image}>
                    <Image
                        src="/mac.jpeg"
                        alt="Background Image"
                        width={4256}
                        height={2832}
                        className={styles.img}
                        priority={true}
                    />
                </div>

                <div className={styles.container}>
                    <div className={styles.boxCadastro}>
                        <div className={styles.logoImg}>
                            <Image
                                src="/logo50.png"
                                alt="logo"
                                width={393}
                                height={78}
                                className={styles.imgLogo}
                            />
                        </div>

                        <span className={styles.titleCadastro}>CADASTRO</span>

                        <form className={styles.formCadastro} onSubmit={handleSubmit}>
                            <div className={styles.doubleInputGroup}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="nome" className={styles.labelCadastro}>Nome</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="usu_nome"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu nome"
                                        value={usuario.usu_nome}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={`${styles.inputGroup} ${cpfError ? styles.errorActive : ''}`}>
                                    <label htmlFor="cpf" className={styles.labelCadastro}>CPF</label>
                                    <InputMask
                                        mask="999.999.999-99"
                                        type="text"
                                        id="cpf"
                                        name="usu_cpf"
                                        className={`${styles.inputCadastro} ${cpfError ? styles.errorActive : ''}`}
                                        placeholder="Digite seu CPF"
                                        value={usuario.usu_cpf}
                                        onChange={handleChange}
                                        required
                                    />
                                    {isCheckingCpf && <span className={styles.loading}>Verificando CPF...</span>}
                                    {/* {!cpfError && usuario.usu_cpf && <span className={styles.success}>CPF disponível.</span>} */}
                                    {cpfError && <span className={styles.error}>{cpfError}</span>}
                                </div>
                            </div>

                            <div className={styles.doubleInputGroup}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="dataNascimento" className={styles.labelCadastro}>Data de Nascimento</label>
                                    <input
                                        type="date"
                                        id="dataNascimento"
                                        name="usu_data_nasc"
                                        className={styles.inputCadastro}
                                        value={usuario.usu_data_nasc}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="sexo" className={styles.labelCadastro}>Sexo</label>
                                    <select
                                        id="sexo"
                                        name="usu_sexo"
                                        className={styles.inputCadastro}
                                        value={usuario.usu_sexo}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Selecione</option>
                                        <option value="1">Masculino</option>
                                        <option value="2">Feminino</option>
                                        <option value="3">Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.doubleInputGroup}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="telefone" className={styles.labelCadastro}>Telefone</label>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        type="tel"
                                        id="telefone"
                                        name="usu_telefone"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu telefone"
                                        value={usuario.usu_telefone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={`${styles.inputGroup} ${emailError ? styles.errorActive : ''}`}>
                                    <label htmlFor="email" className={styles.labelCadastro}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="usu_email"
                                        className={`${styles.inputCadastro} ${emailError ? styles.errorActive : ''}`}
                                        placeholder="Digite seu email"
                                        value={usuario.usu_email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {emailError && <span className={styles.error}>{emailError}</span>}
                                </div>
                            </div>

                            <div className={styles.doubleInputGroup}>
                                <div className={`${styles.inputGroup} ${styles.teste}`}>
                                    <label htmlFor="password" className={styles.labelCadastro}>Senha</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="usu_senha"
                                        className={styles.inputCadastro}
                                        placeholder="Digite sua senha"
                                        value={usuario.usu_senha}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={togglePasswordVisibility}
                                        className={styles.checkbox}
                                    />

                                    <label htmlFor="showPassword" className={styles.checkboxLabel}>
                                        Mostrar senha
                                    </label>
                                </div>
                            </div>

                            <div className={styles.cadastroButtonContainer}>
                                <button
                                    type="submit"
                                    className={styles.cadastroButton}
                                    disabled={isCheckingCpf}
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>

                        <div className={styles.loginLink}>
                            Já tem uma conta? <Link href="/telas/login" className={styles.link}>Faça login</Link>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </main>
        </>
    )
}
