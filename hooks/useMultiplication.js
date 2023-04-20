import { useState } from "react";

const useMultiplication = () => {
  const [userInputVal, setUserInputVal] = useState("");
  const [storeResult, setStoreResult] = useState([]);
  const [printInputNum, setInputNum] = useState([]);

  const calculateMultiplication = (e) => {
    setUserInputVal(e.target.value);

    const result = [];
    let i = 1;
    while (i <= parseInt(e.target.vale)) {
      result.push(e.target.value);
      i++;
    }
    
    setInputNum(result);

    if (parseInt(e.target.value) <= 10) {
      let i = 1;
      let result = [];
      while (i <= 10) {
        if (i % 2 !== 0) {
          const calc = i * parseInt(e.target.value);
          // console.log(calc, "clac");
          result.push({ result: calc, index: i });
          // console.log(JSON.stringify([...storeResult, calc]), "state");
          // setStoreResult([...storeResult, calc]);
          i += 2;
        }
        // console.log(result, "result");
        setStoreResult(result);
      }
    } else {
      setStoreResult([]);
    }
  };

  return {
    calculateMultiplication,
    userInputVal,
    setUserInputVal,
    storeResult,
    printInputNum,
  };
};

export default useMultiplication;
