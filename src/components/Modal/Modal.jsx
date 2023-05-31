import { useEffect } from 'react';
import s from '../styles.module.scss'


export const Modal = ({ imageUrl, onClose }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};