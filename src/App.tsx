import { useCallback, useEffect, useRef, useState } from 'react';
import useAxios from './api/useAxios';
import { IFlickrData, IFlickrPhoto } from './interfaces/Flickr';
import SearchBar from './components/SearchBar';
import SearchContent from './components/SearchContent';
import LargeImageModal from './components/LargeImageModal';

function App() {
  const { error, loading, fetchImages } = useAxios();
  const [images, setImages] = useState<IFlickrPhoto[] | []>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentSearch, setCurrentSearch] = useState('');
  const [nextPage, setNextPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLargeImage, setCurrentLargeImage] =
    useState<IFlickrPhoto>();

  const observer = useRef<IntersectionObserver | undefined>(undefined);

  /**
   * Increments nextPage once the last image has become
   * visible to the user. Essentially allowing for an infinite
   * scrolling experience for images for the searched term.
   */
  const lastImage = useCallback(
    (node: HTMLImageElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        /**
         * If the last element is visible and we have more content to
         * fetch, we increment nextPage to fire trigger the useEffect below
         */
        if (entries[0].isIntersecting && nextPage <= totalPages) {
          setNextPage((pre) => pre + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPage, totalPages]
  );

  /**
   * Updates searchTerm with new search and resets nextPage,
   * totalPages, and images to initial state.
   * @param term - string: search term
   */
  const newSearch = async (term: string) => {
    // Prevent unnecessary calls to Flickr
    if (term === currentSearch) return;
    if (loading) return;
    // Set search term and initialize state to new search
    setNextPage(1);
    setCurrentSearch(term);
    setImages([]);
    setTotalPages(0);
  };

  // Modal controls
  const openModal = (image: IFlickrPhoto) => {
    if (image) {
      setCurrentLargeImage(image);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectedImage = (image: IFlickrPhoto) => {
    openModal(image);
  };

  /**
   * Fetches the next page of images when nextPage or
   * currentSearch state has changed. This is used for
   * the initial search and additonal pages of images.
   */
  useEffect(() => {
    const fetchAnotherPage = async (page: number) => {
      // Fetch new images only when appropriate
      if (
        (page <= totalPages || totalPages === 0) &&
        currentSearch !== ''
      ) {
        const data: IFlickrData = await fetchImages(
          page,
          currentSearch
        );
        if (data.stat === 'ok') {
          setImages((pre) => [...pre, ...data.photos.photo]);
          /**
           * For some reason Flickr changes it's mind about how many total pages
           * for each page so I only set total pages once.
           */
          if (page < 2) {
            setTotalPages(data.photos.pages);
          }
        }
      }
    };

    fetchAnotherPage(nextPage);
  }, [nextPage, currentSearch]);

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold">Image search</h1>
        <p className="text-sm italic">
          Search for your favorite images via the search bar below.
        </p>
        <SearchBar searchImages={newSearch} />
        <div className="image-grid">
          {!images.length && !loading && (
            <p className="italic text-center">
              No images yet, get searching!
            </p>
          )}
          {error && (
            <p className="error">
              Error while retrieving "{currentSearch}" search results
            </p>
          )}
          <SearchContent
            images={images}
            selectedImage={selectedImage}
            lastImage={lastImage}
            loading={loading}
          />
        </div>
        <LargeImageModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          image={currentLargeImage}
        />
      </div>
    </>
  );
}

export default App;
