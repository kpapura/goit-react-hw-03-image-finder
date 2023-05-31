import { ImageGalleryItem} from "../ImageGalleryItem/ImageGalleryItem";
import s from '../styles.module.scss'

export const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={s.imageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          onClick={() => onImageClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
};