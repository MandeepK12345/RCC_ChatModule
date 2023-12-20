import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './counterSlice';

const CounterComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};
