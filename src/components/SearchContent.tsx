import { IFlickrPhoto } from '../interfaces/Flickr';
import SkeletonGrid from './SkeletonGrid';
import Thumbnail from './Thumbnail';

const SearchContent = ({
  images,
  selectedImage,
  lastImage,
  loading,
}: {
  images: IFlickrPhoto[];
  selectedImage: (image: IFlickrPhoto) => void;
  lastImage: (node: HTMLImageElement) => void;
  loading: boolean;
}) => {
  return (
    <div className="content-grid flex gap-4 flex-wrap justify-center mx-10 overflow-y-auto">
      {images.map((image: IFlickrPhoto, index) => {
        if (images.length === index + 1) {
          return (
            <Thumbnail
              lastImage={lastImage}
              key={image.id}
              image={image}
              selectedImage={selectedImage}
            />
          );
        } else {
          return (
            <Thumbnail
              key={image.id}
              image={image}
              selectedImage={selectedImage}
            />
          );
        }
      })}
      {loading && <SkeletonGrid />}
    </div>
  );
};

export default SearchContent;
