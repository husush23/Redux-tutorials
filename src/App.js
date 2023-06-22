import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {calculateTotals, getCartItems} from './features/cartSlice';
import Modal from './components/Modal';
import Book from './components/Book';
function App() {
  const {cartItems, isLoading} = useSelector(state => state.cart);
  const {isOpen} = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
      <Book />
    </main>
  );
}
export default App;
