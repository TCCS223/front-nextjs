"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InputMask from "react-input-mask";
import styles from "./page.module.css";
import api from "@/services/api";

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
        setCpfError('');
        cadastrar();
    };

    console.log(usuario);

    // Função para validar o CPF no formato XXX.XXX.XXX-XX
    function validarCPF(cpf) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/; // Expressão regular para validar o formato

        if (!cpfRegex.test(cpf)) {
            return false; // Retorna falso se o CPF não estiver no formato correto
        }

        // Mantemos o formato e validamos os dígitos verificadores
        const numbersOnly = cpf.replace(/[^\d]/g, ''); // Remove os caracteres não numéricos para a verificação dos dígitos

        if (numbersOnly.length !== 11 || /^(\d)\1+$/.test(numbersOnly)) return false; // Verifica se tem 11 dígitos e se não são todos iguais

        let soma = 0;
        let resto;

        // Validação do primeiro dígito verificador
        for (let i = 1; i <= 9; i++) soma += parseInt(numbersOnly.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(9, 10))) return false;

        soma = 0;
        // Validação do segundo dígito verificador
        for (let i = 1; i <= 10; i++) soma += parseInt(numbersOnly.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(numbersOnly.substring(10, 11))) return false;

        return true;
    }

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

                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(objCriado));
            } else {
                console.error('Erro:', response.data.mensagem, response.data.dados);
                alert('Erro: ' + response.data.mensagem + '\n' + response.data.dados);
            }
        } catch (error) {
            console.error('Erro no cadastro:', error.response.data);
            console.log('parou aqui');
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
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="cpf" className={styles.labelCadastro}>CPF</label>
                                    <InputMask
                                        mask="999.999.999-99"
                                        type="text"
                                        id="cpf"
                                        name="usu_cpf"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu CPF"
                                        onChange={handleChange}
                                        required
                                    />
                                    {cpfError && <span className={styles.error}>{cpfError}</span>} {/* Exibe erro se houver */}
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
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="sexo" className={styles.labelCadastro}>Sexo</label>
                                    <select id="sexo" name="usu_sexo" className={styles.inputCadastro} onChange={handleChange} required>
                                        <option value="">Selecione</option>
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
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="email" className={styles.labelCadastro}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="usu_email"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu email"
                                        onChange={handleChange}
                                        required
                                    />
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
            </main>
        </>
    );
}
