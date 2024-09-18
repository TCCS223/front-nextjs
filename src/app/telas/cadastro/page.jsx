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

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setUsuario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarCPF(usuario.usu_cpf)) {
            setCpfError('CPF inválido');
            return;
        }
        if (!validarEmail(usuario.usu_email)) {
            setEmailError('Email inválido');
            return;
        }
        setCpfError('');
        setEmailError('');
        cadastrar();
    };

    function validarCPF(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

        if (!cpfRegex.test(cpf)) {
            return false;
        }

        const numbersOnly = cpf.replace(/[^\d]/g, '');

        if (numbersOnly.length !== 11 || /^(\d)\1+$/.test(numbersOnly)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) soma += parseInt(numbersOnly.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(numbersOnly.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(10, 11))) return false;

        return true;
    }

    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
    };

    async function cadastrar() {
        try {
            const response = await api.post('/usuarios', usuario);

            if (response.data.sucesso === true) {
                const usuario = response.data.dados;
                const objCriado = {
                    id: usuario.usu_id,
                    nome: usuario.usu_nome,
                    email: usuario.usu_email,
                    senha: usuario.usu_senha,
                    sexo: usuario.usu_sexo,
                    data_nasc: usuario.usu_data_nasc,
                    cpf: usuario.usu_cpf,
                    telefone: usuario.usu_telefone,
                };
                console.log("Usuário criado:", objCriado);

                // Swal.fire({
                //     title: 'Conta criada!',
                //     text: 'Sua conta foi cadastrada',
                //     icon: 'success',
                //     confirmButtonText: 'OK'
                // });

                clearInputs();
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(objCriado));

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
                console.error('Erro:', response.data.mensagem, response.data.dados);
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
        } catch (error) {
            console.error('Erro no cadastro:', error.response.data);
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
                                    <span className={styles.error}>{cpfError}</span>
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
                                        mask="(99)99999-9999"
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
                                    <span className={styles.error}>{emailError}</span>
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
                                <button type="submit" className={styles.cadastroButton}>Cadastrar</button>
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
    );
}









// https://chatgpt.com/share/66e8dfe4-62f8-8001-8460-eac63d4b4404