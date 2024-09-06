"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const teste = () => {
        alert("funcionou");
    };

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

                        <form className={styles.formLogin}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.labelLogin}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.inputLogin}
                                    placeholder="Digite seu email"
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

                            <div className={styles.loginButtonContainer}>
                                <button type="submit" className={styles.loginButton} onClick={teste}>Entrar</button>
                            </div>

                            <div className={styles.registerLink}>
                                Não tem uma conta? <Link href="/cadastro" className={styles.link}>Cadastre-se</Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className={styles.image}>
                    <Image
                        src='/imgCarrossel/img2.jpg'
                        alt="Background Image"
                        width={4256}
                        height={2832}
                        className={styles.img}
                    />
                </div>
            </main>
        </>
    );
}
