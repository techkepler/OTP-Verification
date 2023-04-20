import { useState, useRef } from 'react';
import axios from 'axios';

export default function NextForm() {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const newCodes = [...codes];
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      newCodes[index] = value;
      setCodes(newCodes);
      if (value !== '') {
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = codes.join('');
    if (code.length !== 6 || code.charAt(5) === '7') {
      setErrorMsg('Verification Error');
      setSuccessMsg('');
      return;
    }
    try {
      const res = await axios.post('/verify', { code });
      if (res.data.success) {
        setSuccessMsg('Verification Successful');
        setErrorMsg('');
        // Redirect to success route
        setTimeout(() => {
          window.location.href = '/success';
        }, 2000);
      }
    } catch (error) {
      setErrorMsg('Verification Error');
      setSuccessMsg('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {codes.map((code, index) => (
          <input
            type="text"
            maxLength="1"
            key={index}
            value={code}
            onChange={(e) => handleChange(index, e)}
            ref={(el) => inputRefs.current.push(el)}
            // style={{ border: errorMsg && !code ? '2px solid red' : '' }}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
    </div>
  );
}
