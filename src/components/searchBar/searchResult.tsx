import React, {useEffect, useState} from 'react';
import {useFetchAlikeGuitarsQuery} from '../../service/api';
import {getSortedResult} from '../../const/const';

type SearchTermProps = {
  searchTerm: string;
};

function SearchResult ({searchTerm}:SearchTermProps) {
  const [name, setName] = useState(searchTerm);

  const {data} = useFetchAlikeGuitarsQuery(name);
  const sortedResult = data && getSortedResult(data, searchTerm);
  useEffect(() => {
    setName(searchTerm);
  }, [searchTerm]);

  return (
    <ul style={{zIndex: 1}} className={`form-search__select-list ${!searchTerm ? 'hidden' : ''}`}>
      {sortedResult && sortedResult.map((resultItem) => (
        <li className="form-search__select-item" tabIndex={0} key={resultItem.id}>{resultItem.name}</li>
      ))}
    </ul>
  );
}

export default SearchResult;
