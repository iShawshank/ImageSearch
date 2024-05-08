import { IFlickrPhoto } from '../interfaces/Flickr';

const Thumbnail = ({
  image,
  selectedImage,
  lastImage,
}: {
  image: IFlickrPhoto;
  selectedImage: (image: IFlickrPhoto) => void;
  lastImage?: (node: HTMLImageElement) => void;
}) => {
  const thumbnailSource = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_q.jpg`;

  return (
    <div
      className="rounded overflow-hidden cursor-pointer"
      onClick={() => selectedImage(image)}
    >
      {lastImage ? (
        <img
          ref={lastImage}
          src={thumbnailSource}
          alt={image.title}
        />
      ) : (
        <img src={thumbnailSource} alt={image.title} />
      )}
    </div>
  );
};

export default Thumbnail;
