// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import styles from "./page.module.css";
// import api from "@/services/api";

// export default function Cadastro() {
//     const [showPassword, setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert("Cadastro realizado com sucesso!");
//     };

//     return (
//         <>
//             <main className={styles.main}>
//                 <div className={styles.image}>
//                     <Image
//                         src="/mac.jpeg"
//                         alt="Background Image"
//                         width={4256}
//                         height={2832}
//                         className={styles.img}
//                         priority={true}
//                     />
//                 </div>

//                 <div className={styles.container}> {/*-----------------------*/}
//                     <div className={styles.boxCadastro}>
//                         <div className={styles.logoImg}>
//                             <Image
//                                 src='/logo50.png'
//                                 alt="logo"
//                                 width={393}
//                                 height={78}
//                                 className={styles.imgLogo}
//                             />
//                         </div>

//                         <span className={styles.titleCadastro}>CADASTRO</span>

//                         <form className={styles.formCadastro} onSubmit={handleSubmit}>
//                             <div className={styles.doubleInputGroup}>
//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="nome" className={styles.labelCadastro}>Nome</label>
//                                     <input
//                                         type="text"
//                                         id="nome"
//                                         name="nome"
//                                         className={styles.inputCadastro}
//                                         placeholder="Digite seu nome"
//                                         required
//                                     />
//                                 </div>

//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="cpf" className={styles.labelCadastro}>CPF</label>
//                                     <input
//                                         type="text"
//                                         id="cpf"
//                                         name="cpf"
//                                         className={styles.inputCadastro}
//                                         placeholder="Digite seu CPF"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div className={styles.doubleInputGroup}>
//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="dataNascimento" className={styles.labelCadastro}>Data de Nascimento</label>
//                                     <input
//                                         type="date"
//                                         id="dataNascimento"
//                                         name="dataNascimento"
//                                         className={styles.inputCadastro}
//                                         required
//                                     />
//                                 </div>

//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="sexo" className={styles.labelCadastro}>Sexo</label>
//                                     <select id="sexo" name="sexo" className={styles.inputCadastro} required>
//                                         <option value="">Selecione</option>
//                                         <option value="masculino">Masculino</option>
//                                         <option value="feminino">Feminino</option>
//                                         <option value="outro">Outro</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className={styles.doubleInputGroup}>
//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="telefone" className={styles.labelCadastro}>Telefone</label>
//                                     <input
//                                         type="tel"
//                                         id="telefone"
//                                         name="telefone"
//                                         className={styles.inputCadastro}
//                                         placeholder="Digite seu telefone"
//                                         required
//                                     />
//                                 </div>

//                                 <div className={styles.inputGroup}>
//                                     <label htmlFor="email" className={styles.labelCadastro}>Email</label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         className={styles.inputCadastro}
//                                         placeholder="Digite seu email"
//                                         required
//                                     />
//                                 </div>
//                             </div>

//                             <div className={styles.doubleInputGroup}>
//                                 <div className={`${styles.inputGroup} ${styles.teste}`}>
//                                     <label htmlFor="password" className={styles.labelCadastro}>Senha</label>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="password"
//                                         name="password"
//                                         className={styles.inputCadastro}
//                                         placeholder="Digite sua senha"
//                                         required
//                                     />



//                                 </div>

//                                 <div className={styles.checkboxContainer}>
//                                     <input
//                                         type="checkbox"
//                                         id="showPassword"
//                                         checked={showPassword}
//                                         onChange={togglePasswordVisibility}
//                                         className={styles.checkbox}
//                                     />
//                                     <label htmlFor="showPassword" className={styles.checkboxLabel}>
//                                         Mostrar senha
//                                     </label>
//                                 </div>
//                             </div>

//                             <div className={styles.cadastroButtonContainer}>
//                                 <button type="submit" className={styles.cadastroButton}><Link href="/telas/admin" className={styles.linkCad}>Cadastrar</Link></button>
//                             </div>
//                         </form>

//                         <div className={styles.loginLink}>
//                             Já tem uma conta? <Link href="/telas/login" className={styles.link}>Faça login</Link>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </>
//     );
// }







"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import api from "@/services/api";

export default function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [sexo, setSexo] = useState('');
    const [data_nasc, setData_nasc] = useState('');

    // const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    function handleSubmit(event) {
        event.preventDefault();
        cadastrar();
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert("Cadastro realizado com sucesso!");
    // };

    async function cadastrar() {
        try {
            const dados = {
                usu_nome:nome,
                usu_cpf: cpf,
                usu_email: email,
                usu_telefone: telefone,
                usu_senha: senha,
                usu_sexo: sexo,
                usu_data_nasc: data_nasc,
            }

            const response = await api.post('/usuarios', dados);
        
            if (response.data.sucesso == true) {
                const usuario = response.data.dados; 
                const objCriado = {
                    "id": usuario.usu_id,
                    "nome": usuario.usu_nome,
                    "email": usuario.usu_email,
                    "senha": usuario.usu_senha,
                    "sexo": usuario.usu_sexo,
                    "data_nasc": usuario.usu_data_nasc,
                    "cpf": usuario.usu_cpf,
                    "telefone": usuario.usu_telefone,
                };
                console.log(objCriado);
                // signin(JSON.stringify(objLogado));                
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(objCriado));                

            } else {
                alert('Erro: ' + error.response.data.mensagem + '\n' + error.response.data.dados)
            }

        } catch (error) {

        };
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

                <div className={styles.container}> {/*-----------------------*/}
                    <div className={styles.boxCadastro}>
                        <div className={styles.logoImg}>
                            <Image
                                src='/logo50.png'
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
                                        name="nome"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu nome"
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="cpf" className={styles.labelCadastro}>CPF</label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        name="cpf"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu CPF"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.doubleInputGroup}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="dataNascimento" className={styles.labelCadastro}>Data de Nascimento</label>
                                    <input
                                        type="date"
                                        id="dataNascimento"
                                        name="dataNascimento"
                                        className={styles.inputCadastro}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="sexo" className={styles.labelCadastro}>Sexo</label>
                                    <select id="sexo" name="sexo" className={styles.inputCadastro} required>
                                        <option value="">Selecione</option>
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.doubleInputGroup}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="telefone" className={styles.labelCadastro}>Telefone</label>
                                    <input
                                        type="tel"
                                        id="telefone"
                                        name="telefone"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu telefone"
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="email" className={styles.labelCadastro}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={styles.inputCadastro}
                                        placeholder="Digite seu email"
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
                                        name="password"
                                        className={styles.inputCadastro}
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
                            </div>

                            <div className={styles.cadastroButtonContainer}>
                                <button type="submit" className={styles.cadastroButton}><Link href="/telas/admin" className={styles.linkCad}>Cadastrar</Link></button>
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
