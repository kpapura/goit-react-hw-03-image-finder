import s from '../styles.module.scss'


export const Button = ({ onClick }) => {
  return (
      <button type="button" className={s.button} onClick={onClick}
      >
      Load more
    </button>
  );
};