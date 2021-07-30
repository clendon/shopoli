import React, { useState, useEffect, IconContext } from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import axios from 'axios';
import Blocks from './Blocks.jsx';

const SearchBarStyle = styled.input`
  width: 95%;
  line-height: 20%;
  padding: 2vh 2vh;
`;

const SearchButton = styled.button`
width: 33px;
height: 33px;
border: 0;
padding-bottom: 0;
`;

const Filtered = styled.div`
  height: auto;
  width: auto;
  padding: 5px;
  background-color: white;
`;

const List = styled.div`
  height: auto;
  max-height 300px;
  overflow-y: scroll;
`;

const QASearch = ({ current }) => {
  const [search, setSearch] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    if (current.current.id !== undefined) {
      axios.get(`/qa/questions/?product_id=${current.current.id}`)
        .then(response => {
          setAllQuestions(response.data.results);
        })
        .catch(err => console.log(`Error in QuestionSearch useEffect: ${err}`));
    }
  }, [current.current.id])

  const handleClick = async () => {
    // This will allow the user to submit search
    console.log('handleClick clicked')
  }

  const onChange = (searchText) => {
    setSearch(searchText);
  }

  return (
    <>
      <div style={{ width: 'auto' }}>
        <SearchBarStyle
          type='text'
          value={search}
          onChange={e => onChange(e.target.value)}
          placeholder='Have a question? Search for answers…' />
        <CgSearch onClick={() => handleClick()} />
      </div>
      <List>
        {Blocks(allQuestions)}
      </List>
    </>
  )
}

export default QASearch;

// {
//   allQuestions.filter(text => {
//     if (search.length > 2 && text.question_body.toLowerCase().indexOf(search)) {
//       <div>{Blocks(text)}</div>
//     } else return null
//   })
// }

