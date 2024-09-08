"use client"

import { useState } from "react";
// import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

import api from "@/services/api";

export default function LoginUsu() {


    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const alternarVisibilidadeSenha = () => {
        setShowPassword(!showPassword);
    };


    function handleSubmit(event) {
        event.preventDefault();
        logar();
    }

    function teste() {
        console.log(email);
        console.log(senha);
        
    }
   
    async function logar() {

        try {
            const dados = {
                usu_email: email,
                usu_senha: senha
            }

            const response = await api.post('/telas/admin/cadcliente', dados);

            
        } catch (error) {

        }
    }
    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.boxLogin}>
                        <div className={styles.logoImg}>
                            <Image
                                src='/logo50.png'
                                alt="logo"
                                width={393}
                                height={78}
                                className={styles.imgLogo}
                            />
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
                                {/* <button type="submit" className={styles.loginButton}>Entrar</button> */}
                                <button type="submit" className={styles.loginButton} onClick={teste}>Entrar</button>
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
