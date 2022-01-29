import React, {useEffect, useState} from 'react';
import {useFetchAlikeGuitarsQuery} from '../../service/api';
import {AppRoute, getSortedResult} from '../../const/const';
import {useHistory} from 'react-router-dom';

type SearchTermProps = {
  searchTerm: string;
  isResults: boolean;
};

function SearchResult ({searchTerm, isResults}:SearchTermProps) {
  const [name, setName] = useState(searchTerm);
  const history = useHistory();

  const {data} = useFetchAlikeGuitarsQuery(name);
  const sortedResult = data && getSortedResult(data, searchTerm);
  useEffect(() => {
    setName(searchTerm);
  }, [searchTerm]);

  const clickHandler = (id: number) => {
    history.push(`${AppRoute.Guitars}/${id}`);
  };
  return (
    <ul style={{zIndex: 1}} className={`form-search__select-list ${!searchTerm || !isResults ? 'hidden' : ''}`}>
      {sortedResult && sortedResult.map((resultItem) => (
        <li className="form-search__select-item" tabIndex={0} key={resultItem.id} onClick={() => clickHandler(resultItem.id)}>
          {resultItem.name}
        </li>
      ))}
    </ul>
  );
}

export default SearchResult;
