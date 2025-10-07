import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { decrement, increment } from './counterSlice'
import { incrementfamous,decrementfamous } from '../redux/CounterSlice'
function Famous() {

  const famouscount = useSelector((state) => state.famous.famousCount)
  const unfamouscount=useSelector((state)=>state.famous.unfamouscount)

  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(incrementfamous(45))}
        >
          Increment
        </button>
        <h1>Famous Count</h1>
        <span>{famouscount}</span>
          <h1>UnFamous Count</h1>
        <span>{unfamouscount}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrementfamous(4))}
        >
Decrement
        </button>
      </div>
    </div>
  )
}
export default Famous;