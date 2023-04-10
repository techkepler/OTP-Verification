import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function VerificationForm() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  const handleInputChange = (e, index) => {
    const newDigits = [...digits];
    newDigits[index] = e.target.value;
    setDigits(newDigits);
    if (e.target.value && index < digits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputPaste = (e, index) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const newDigits = [...digits];
    for (let i = 0; i < pastedData.length; i++) {
      if (index + i < digits.length) {
        newDigits[index + i] = pastedData[i];
      }
    }
    setDigits(newDigits);
    if (index < digits.length - 1) {
      inputRefs.current[index + pastedData.length]?.focus();
    }
    e.preventDefault();
  };

  const handleInputClick = (e) => {
    e.target.select();
  };

  const handleSubmit = async (e) => {
    let isValid = true;
    e.preventDefault();
    digits.map((data, index) => {
      if (isNaN(parseInt(data))) {
        inputRefs.current[index].classList.add("invalid");
        isValid = false;
      }
    });

    if (isValid) {
      const code = digits.join("");
      try {
        await axios.post("/api/verify", { code });
        router.push("/success/");
      } catch (err) {
        setError(true);
      }
    }
  };

  const handleInputBlur = (index, value) => {
    if (!value || isNaN(parseInt(value))) {
      inputRefs.current[index].classList.add("invalid");
    } else {
      inputRefs.current[index].classList.remove("invalid");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex  flex-col items-center justify-center gap-4"
    >
      <h1 className="font-bold text-xl">Verification Code:</h1>
      <div className="digit-inputs flex items-center justify-center gap-2">
        {digits.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleInputChange(e, index)}
            onPaste={(e) => handleInputPaste(e, index)}
            onClick={handleInputClick}
            onBlur={(e) => handleInputBlur(index, e.target.value)}
            autoFocus
            className="w-11 h-11 border border-black rounded-md text-center focus:border-blue-600 focus:outline-0"
          />
        ))}
      </div>
      <button
        type="submit"
        className="bg-[#191970] w-56 h-11 rounded-md text-white text-lg"
      >
        Submit
      </button>
      {error && <div className="error-message">Verification Error</div>}
    </form>
  );
}
