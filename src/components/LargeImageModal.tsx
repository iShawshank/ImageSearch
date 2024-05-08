import { MouseEventHandler } from 'react';
import Modal from 'react-modal';
import { IFlickrPhoto } from '../interfaces/Flickr';

const LargeImageModal = ({
  isOpen,
  closeModal,
  image,
}: {
  isOpen: boolean;
  closeModal: MouseEventHandler;
  image: IFlickrPhoto | undefined;
}) => {
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxHeight: '80vh',
      overflowY: 'auto',
    },
  };

  const imageSource = `https://live.staticflickr.com/${image?.server}/${image?.id}_${image?.secret}_b.jpg`;

  return (
    <Modal
      isOpen={isOpen}
      contentLabel={`large version of ${image?.title}`}
      style={modalStyles}
      appElement={document.getElementsByClassName('app') || undefined}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
    >
      <div className="flex w-full justify-end">
        <button onClick={closeModal}>Close</button>
      </div>
      <img src={imageSource} alt={image?.title} />
    </Modal>
  );
};

export default LargeImageModal;
