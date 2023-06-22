import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
const id = 'OweGl1y29uO1sn0W94fb';
const url =
  'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/OweGl1y29uO1sn0W94fb/books';

const initialState = [];

export const getBooks = createAsyncThunk('books/getBooks', async thunkApI => {
  try {
    const res = await axios(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkApI.rejectWithValue('Something went wrong');
  }
});

export const postBooks = createAsyncThunk('books/postBooks', async book => {
  const newBook = {
    item_id: Date.now(),
    title: book.title,
    author: book.author,
    category: book.category,
  };
  try {
    const res = await axios.post(url, newBook);
    return res.data;
  } catch {}
});
postBooks({title: 'book1', author: 'Ali', category: 'test'});
getBooks();

const bookSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers: builder => {
    builder.addCase(getBooks.pending, (state, action) => {
      console.log(action);
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      console.log(action);
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export default bookSlice.reducer;
