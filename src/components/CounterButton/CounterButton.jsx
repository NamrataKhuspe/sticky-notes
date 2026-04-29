import  { useState} from "react";

function CounterButton() {
    const [count , setCount] = useState(0);


    const addCount = () =>{
        setCount(count +1)
    }

    const decreseCount =() =>{
        setCount(count  - 1)

    }


    return (
    <>
    <div>
        <button onClick={addCount}>+</button>
        <input type="text" value={count} readOnly></input>
        <button onClick={decreseCount}>-</button>
    </div>
    </>)
}

export default CounterButton