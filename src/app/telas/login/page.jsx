"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from 'next/navigation';

import api from "@/services/api";
import Swal from "sweetalert2";

import styles from "./page.module.css";

export default function LoginUsu() {
    const [email, setEmail] = useState('user@user.com');
    const [senha, setSenha] = useState('user');
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const alternarVisibilidadeSenha = () => {
        setShowPassword(!showPassword);
    };

    function handleSubmit(event) {
        event.preventDefault();
        logar();
    }

    async function logar() {
        try {
            const dados = {
                usu_email: email,
                usu_senha: senha
            };

            const response = await api.post('/login', dados);

            if (response.data.sucesso === true) {
                const usuario = response.data.dados;
                const objLogado = {
                    "id": usuario.usu_id,
                    "nome": usuario.usu_nome,
                    "acesso": usuario.usu_acesso
                };

                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(objLogado));

                
                if (usuario.usu_acesso === 1) {
                    router.push('/telas/admin');
                } else {
                    router.push('/telas/usuario');
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Email e/ou senha inválidos.',
                    confirmButtonText: 'OK'
                });
            }

        } catch (error) {
            if (error.response && error.response.status === 403) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Email e/ou senha inválidos.",
                    confirmButtonText: "OK",
                    backdrop: "rgba(0,0,0,0.7)",
                    scrollbarPadding: false,
                });
                setSenha("");
                setEmail("");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro na Conexão',
                    text: 'Ocorreu um erro ao tentar realizar o login. Verifique sua conexão e tente novamente.',
                    confirmButtonText: 'Ok'
                });
            }
        }
    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.boxLogin}>
                        <div className={styles.logoImg}>
                            <Link href="/">
                                <Image
                                    src='/logo50.png'
                                    alt="logo"
                                    width={393}
                                    height={78}
                                    className={styles.imgLogo}
                                />
                            </Link>
                        </div>

                        <span className={styles.titleLogin}>LOGIN</span>

                        <form id="form" className={styles.formLogin} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.labelLogin}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.inputLogin}
                                    placeholder="Digite seu email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.labelLogin}>Senha</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className={styles.inputLogin}
                                    placeholder="Digite sua senha"
                                    onChange={e => setSenha(e.target.value)}
                                    value={senha}
                                    required
                                />
                            </div>

                            <div className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={alternarVisibilidadeSenha}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="showPassword" className={styles.checkboxLabel}>
                                    Mostrar senha
                                </label>
                            </div>

                            <div className={styles.loginButtonContainer}>
                                <button type="submit" className={styles.loginButton}>
                                    Entrar
                                </button>
                            </div>

                            <div className={styles.registerLink}>
                                Não tem uma conta? <Link href="/telas/cadastro" className={styles.link}>Cadastre-se</Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={styles.image}>
                    <Image
                        src='/lambo2.jpeg'
                        alt="Background Image"
                        width={1700}
                        height={2560}
                        className={styles.img}
                        priority={true}
                    />
                </div>

            </main>
        </>
    );
}
