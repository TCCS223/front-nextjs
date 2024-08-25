import styles from './index.module.css' // Importa os estilos CSS específicos para este componente
import Link from 'next/link' // Importa o componente Link do Next.js para navegação interna

export default function Footer() { // Define o componente Footer como a exportação padrão
    return (
        <footer className={styles.footer}> {/* Define o elemento footer e aplica a classe CSS correspondente */}
            <div className={styles.footerContainer}> {/* Container principal do footer */}

                {/* Seção para os ícones do footer */}
                <div className={styles.footerIcons}>
                    <span className={styles.footerLogo}></span> {/* Logotipo do footer, estilizado via CSS */}

                    {/* Seção de ícones de redes sociais */}
                    <div className={styles.footerSocialIcons}>
                        <Link href={'https://instagram.com'}>
                            <span className={styles.iconInstagram}></span> {/* Ícone do Instagram */}
                        </Link>
                        <Link href={'https://whatsapp.com'}>
                            <span className={styles.iconWhatsapp}></span> {/* Ícone do WhatsApp */}
                        </Link>
                        <Link href={'https://facebook.com'}>
                            <span className={styles.iconFacebook}></span> {/* Ícone do Facebook */}
                        </Link>
                        <Link href={'https://youtube.com'}>
                            <span className={styles.iconYoutube}></span> {/* Ícone do YouTube */}
                        </Link>
                    </div>
                </div>

                {/* Seção de informações de contato */}
                <div className={styles.footerAddress}>
                    <div className={styles.phone}> {/* Informação de telefone */}
                        <span className={styles.iconPhone}></span> {/* Ícone de telefone */}
                        <div className={styles.infoPhone}>
                            <div className={styles.titlePhone}>Telefone</div> {/* Título para a informação de telefone */}
                            <Link href='tel:(00) 12345-6789' className={styles.numberPhone}>(00) 12345-6789</Link> {/* Número de telefone com link para ligar */}
                        </div>
                    </div>

                    <div className={styles.tell}> {/* Informação de outro telefone */}
                        <span className={styles.iconTell}></span> {/* Ícone de telefone alternativo */}
                        <div className={styles.infoTell}>
                            <div className={styles.titleTell}>Telefone</div> {/* Título para o segundo telefone */}
                            <Link href='tel:(00) 1234-5678' className={styles.numberTell}>(00) 1234-5678</Link> {/* Número de telefone alternativo com link para ligar */}
                        </div>
                    </div>

                    <div className={styles.email}> {/* Informação de email */}
                        <span className={styles.iconEmail}></span> {/* Ícone de email */}
                        <div className={styles.infoEmail}>
                            <div className={styles.titleEmail}>Email</div> {/* Título para o email */}
                            <Link href='mailto: urban_estetica@teste.com' className={styles.addressEmail}>urban_estetica@teste.com</Link> {/* Endereço de email com link para enviar email */}
                        </div>
                    </div>

                    <div className={styles.address}> {/* Informação de endereço */}
                        <span className={styles.iconAddress}></span> {/* Ícone de endereço */}
                        <div className={styles.infoAddress}>
                            <div className={styles.titleAddress}>Endereço</div> {/* Título para o endereço */}
                            <div className={styles.localizationEmail}>R Prof Massuyuki, 22, Tupã</div> {/* Endereço físico */}
                        </div>
                    </div>
                </div>

                {/* FOOTER MOBILE -> Estilos aplicados para telas com largura máxima de 577px */}

                {/* Seção de contato para dispositivos móveis */}
                <div className={styles.footerAddressMobile}>
                    <div className={styles.phoneMobile}> {/* Informação de telefone para dispositivos móveis */}
                        <span className={styles.iconPhoneMobile}></span> {/* Ícone de telefone para mobile */}
                        <div className={styles.infoPhoneMobile}>
                            <div className={styles.titlePhoneMobile}>Telefone</div> {/* Título para o telefone em mobile */}
                            <Link href='tel:(00) 1234-5678' className={styles.numberPhoneMobile}>(00) 12345-6789 / (00) 1234-5678</Link> {/* Números de telefone para mobile */}
                        </div>
                    </div>

                    <div className={styles.emailMobile}> {/* Informação de email para dispositivos móveis */}
                        <span className={styles.iconEmailMobile}></span> {/* Ícone de email para mobile */}
                        <div className={styles.infoEmailMobile}>
                            <div className={styles.titleEmailMobile}>Email</div> {/* Título para o email em mobile */}
                            <Link href='mailto: urban_estetica@teste.com' className={styles.addressEmailMobile}>urban_estetica@teste.com</Link> {/* Endereço de email para mobile */}
                        </div>
                    </div>

                    <div className={styles.addressMobile}> {/* Informação de endereço para dispositivos móveis */}
                        <span className={styles.iconAddressMobile}></span> {/* Ícone de endereço para mobile */}
                        <div className={styles.infoAddressMobile}>
                            <div className={styles.titleAddressMobile}>Endereço</div> {/* Título para o endereço em mobile */}
                            <div className={styles.localizationEmailMobile}>R Prof Massuyuki, 22, Tupã</div> {/* Endereço físico para mobile */}
                        </div>
                    </div>
                </div>

                {/*-----------------------------------------------*/}

                {/* Seção para direitos autorais e termos */}
                <div className={styles.footerLicense}>
                    <span className={styles.copyright}>Urban © 2024 - Todos os direitos reservados</span> {/* Texto de direitos autorais */}
                    <Link href="#" className={styles.footerTerms}>Termos & Políticas</Link> {/* Link para termos e políticas */}
                </div>
            </div>
        </footer >
    )
}
