import { ChangeEvent, FormEvent, useState } from 'react';
import Search from '../assets/search.png';

const SearchBar = ({
  searchImages,
}: {
  searchImages: (term: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Prevent empty searches
    if (searchTerm !== '') {
      searchImages(searchTerm);
    }
  };

  const handleChange = (event: ChangeEvent) => {
    event.preventDefault();
    setSearchTerm((event.target as HTMLInputElement).value);
  };

  return (
    <form
      className="flex w-full justify-center gap-0"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="search w-full border-2 rounded-l p-0 pl-2 ml-10 h-10"
        placeholder="Search for images"
        onChange={handleChange}
      />
      <button className="search-button rounded-r h-10" type="submit">
        <img src={Search} alt="Magnifying glass" />
      </button>
    </form>
  );
};

export default SearchBar;
