import {ChangeEvent, useState} from 'react';
import useDebounce from '../../hooks/use-debounce/use-debounce';
import SearchResult from './searchResult';

const TIME_OUT = 500;

function SearchBar():JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string | undefined>('');
  const [isResults, setIsResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, TIME_OUT);

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setIsResults(true);
    setSearchTerm(target.value);
  };

  const openResults = () =>  setIsResults(true);
  const closeResults = () => setIsResults(false);

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search">
            </use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={searchTerm}
          onChange={handleInputChange}
          data-testid='search'
          onFocus={openResults}
          onMouseEnter={openResults}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      {isResults && <SearchResult searchTerm={debouncedSearchTerm} isResults={isResults} onClose={closeResults} onOpen={openResults}/>}
    </div>
  );
}

export default SearchBar;
