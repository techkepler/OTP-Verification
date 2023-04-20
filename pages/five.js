import React from "react";
import useMultiplication from "@/hooks/useMultiplication";

const five = () => {
  const { calculateMultiplication, userInputVal, storeResult, printInputNum } =
    useMultiplication();

  return (
    <div className="text-3xl capitalize text-center font-bold mt-10 text-green-600">
      <form>
        <input
          type="text"
          className="w-40  px-4 py-1 border-2 border-blue-500"
          onChange={(e) => calculateMultiplication(e)}
        />
      </form>

      <div>
        {storeResult.map((data) => (
          <p key={data.result}>
            {userInputVal} * {data.index} = {data.result}
          </p>
        ))}

        <div>
          {printInputNum?.map((data, index) => (
            <span key={index} className="px-4">
              {data}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default five;
