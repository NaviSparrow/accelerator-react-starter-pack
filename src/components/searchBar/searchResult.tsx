import React, {useEffect, useState} from 'react';
import {useFetchAlikeGuitarsQuery} from '../../service/api';
import {GuitarsList} from '../../types/guitar';

type SearchTermProps = {
  searchTerm: string;
};

const getSortedResult = (data:GuitarsList, searchTerm: string) => {
  const sortData: string[] = [];

  data && data.map((item) => {
    if (item.name.charAt(0).toLowerCase() === searchTerm.charAt(0).toLowerCase()) {
      sortData.push(item.name);
    }
  });
  return sortData;
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
        <li className="form-search__select-item" tabIndex={0} key={resultItem}>{resultItem}</li>
      ))}
    </ul>
  );
}

export default SearchResult;
