'use client'
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const TypingEffect = () => {
  const fullText = `Seu carro na melhor perfomance`;

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 100); // Velocidade da digitação em milissegundos
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  return (
    <div className={styles.container}>
      <p className={styles.typingText}>
        {displayedText}
        <span className={styles.cursor}></span>
      </p>
    </div>
  );
};

export default TypingEffect;
