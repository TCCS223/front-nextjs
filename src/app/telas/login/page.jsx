"use client";

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

import api from "@/services/api";

import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function LoginUsu() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
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

            if (response.data.sucesso) {
                const usuario = response.data.dados;
                const objLogado = {
                    "id": usuario.usu_id,
                    "nome": usuario.usu_nome,
                    "acesso": usuario.usu_acesso
                };

                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(objLogado));

                Cookies.set('token', usuario.usu_id, { expires: 7, path: '/' });

                if (usuario.usu_acesso === 1) {
                    router.push('/telas/admin');
                } else {
                    router.push('/telas/usuario');
                }
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                const tipoErro = error.response.data.tipoErro;

                if (status === 403 && tipoErro === 'inativo') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Acesso não permitido!',
                        text: 'Entre em contato com um administrador',
                        confirmButtonText: 'OK',
                        iconColor: '#FFA500',
                        confirmButtonColor: '#FFA500',
                    });
                    setEmail('');
                    setSenha('');
                }
                else if (status === 403 && tipoErro === 'credenciais') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Email e/ou senha inválidos.',
                        confirmButtonText: 'OK',
                        iconColor: '#d33',
                        confirmButtonColor: '#d33',
                    });
                    setEmail('');
                    setSenha('');
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Ocorreu um erro ao tentar realizar o login.',
                        confirmButtonText: 'OK',
                        iconColor: '#d33',
                        confirmButtonColor: '#d33',
                    });
                    setEmail('');
                    setSenha('');
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Ocorreu um erro ao tentar realizar o login.',
                    confirmButtonText: 'OK',
                    iconColor: '#d33',
                    confirmButtonColor: '#d33',
                });
                setEmail('');
                setSenha('');
            }
        }
    };

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