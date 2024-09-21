import React from 'react';
import styles from './index.module.css';
import { useRef } from 'react';
import { format } from 'date-fns';

export default function FormCliente ({ selectedUser, setSelectedUser, isViewing, handleSubmit, Cancelar }) {

    const selectSexo = useRef(null);
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
                        required
                        value={selectedUser ? selectedUser.usu_id : ''}
                        disabled
                        className={styles.input_cliente}
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_nome}`}>
                    <label htmlFor="nome_cliente" className={styles.label_cliente}>Nome</label>
                    <input
                        type="text"
                        id="nome_cliente"
                        name="nome_cliente"
                        required
                        value={selectedUser ? selectedUser.usu_nome : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_nome: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="Nome Completo"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_cpf}`}>
                    <label htmlFor="cpf_cliente" className={styles.label_cliente}>CPF</label>
                    <input
                        type="text"
                        id="cpf_cliente"
                        name="cpf_cliente"
                        required
                        value={selectedUser ? selectedUser.usu_cpf : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_cpf: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="xxx.xxx.xxx - xx"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_data}`}>
                    <label htmlFor="data_nasc_cliente" className={styles.label_cliente}>Data de Nascimento</label>
                    <input
                        type="date"
                        id="data_nasc_cliente"
                        name="data_nasc_cliente"
                        required
                        value={selectedUser ? format(new Date(selectedUser.usu_data_nasc), 'yyyy-MM-dd') : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_data_nasc: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_cliente}
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_sexo}`}>
                    <label htmlFor="sexo_cliente" className={styles.label_cliente}>Sexo</label>
                    <select
                        ref={selectSexo}
                        id="sexo_cliente"
                        name="sexo_cliente"
                        required
                        className={`${styles.select_cliente} ${styles.input_sexo}`}
                        value={selectedUser ? selectedUser.usu_sexo : ''} // Atualize aqui
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_sexo: parseInt(e.target.value) })}
                        disabled={isViewing}
                    >
                        <option value="" disabled>Selecionar</option>
                        <option value="0">Feminino</option>
                        <option value="1">Masculino</option>
                        <option value="2">Outro</option>
                    </select>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_acesso}`}>
                    <label htmlFor="nivel_acesso" className={styles.label_cliente}>Nível de Acesso</label>
                    <select
                        id="nivel_acesso"
                        name="nivel_acesso"
                        className={`${styles.select_cliente} ${styles.input_acesso}`}
                        value={selectedUser ? selectedUser.usu_acesso : ''} // Atualize aqui
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_acesso: parseInt(e.target.value) })}
                        disabled={isViewing}
                    >
                        <option value="0">Usuário</option>
                        <option value="1">Administrador</option>
                    </select>
                </div>

                <div className={`${styles.grid_item} ${styles.grid_telefone}`}>
                    <label htmlFor="telefone_cliente" className={styles.label_cliente}>Telefone</label>
                    <input
                        type="tel"
                        id="telefone_cliente"
                        name="telefone_cliente"
                        required
                        value={selectedUser ? selectedUser.usu_telefone : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_telefone: e.target.value })}
                        disabled={isViewing}
                        className={`${styles.input_cliente}`}
                        placeholder="(xx) xxxxx - xxxx"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_email}`}>
                    <label htmlFor="email_cliente" className={styles.label_cliente}>Email</label>
                    <input
                        type="email"
                        id="email_cliente"
                        name="email_cliente"
                        required
                        value={selectedUser ? selectedUser.usu_email : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_email: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_cliente}
                        placeholder="exemplo@exemplo.com"
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_observacoes}`}>
                    <label htmlFor="observacoes_cliente" className={styles.label_cliente}>Observações</label>
                    <input
                        type="text"
                        id="observacoes_cliente"
                        name="observacoes_cliente"
                        required
                        value={selectedUser ? selectedUser.usu_observacoes : ''}
                        onChange={(e) => setSelectedUser({ ...selectedUser, usu_observ: e.target.value })}
                        disabled={isViewing}
                        className={styles.input_cliente}
                    />
                </div>

                <div className={`${styles.grid_item} ${styles.grid_situacao}`}>
                    <label htmlFor="situacao_cliente" className={styles.label_cliente}>Situação</label>
                    <select
                        id="situacao_cliente"
                        name="situacao_cliente"
                        className={`${styles.select_cliente} ${styles.input_situacao}`} onChange={(e) => setSelectedUser({ ...selectedUser, usu_situacao: e.target.value })}
                        disabled={isViewing}
                    >
                        <option value="ativo" className={styles.option} selected={selectedUser && selectedUser.usu_situacao === 'ativo'}>Ativo</option>
                        <option value="inativo" className={styles.option} selected={selectedUser && selectedUser.usu_situacao === 'inativo'}>Inativo</option>
                    </select>
                </div>
            </div>
        </form>
    )
}