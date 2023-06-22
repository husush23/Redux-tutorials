import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBooks} from '../features/bookSlice';

const Book = () => {
  //   const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  console.log(books);

  //   useEffect(() => {
  //     dispatch(getBooks());
  //   }, [dispatch]);

  return <div></div>;
};

export default Book;
