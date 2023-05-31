import s from '../styles.module.scss'


export const ImageGalleryItem = ({ imageUrl, onClick }) => {
  return (
    <li className={s.imageGalleryItem}>
      <img src={imageUrl} alt="" onClick={onClick} className={s.imageGalleryItemImage}/>
    </li>
  );
};