import React, { useState } from "react";

const sucess = () => {
  const [userInputVal, setUserInputVal] = useState("");
  const [storeResult, setStoreResult] = useState([]);

  const calculateMultiplication = (e) => {
    setUserInputVal(e.target.value);

    if (parseInt(e.target.value) <= 7) {
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
    }
  };

  return (
    <div className="text-3xl capitalize text-center font-bold mt-10 text-green-600">
      <form>
        <input
          type="text"
          className="w-40  px-4 py-1 border-2 border-blue-500"
          onChange={(e) => calculateMultiplication(e)}
        />
      </form>

      {parseInt(userInputVal) <= 7 && (
        <>
          <div>
            {storeResult.map((data) => (
              <p key={data.result}>
                {userInputVal} * {data.index} = {data.result}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default sucess;
