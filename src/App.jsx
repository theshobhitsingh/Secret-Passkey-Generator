import React, { useState, useCallback, useEffect, useRef } from "react";
import './App.css'; // Ensure this path is correct
import backgroundImage from './assets/background.png'; // Adjust the path as needed

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) characterSet += "0123456789";
    if (charAllowed) characterSet += "!@#$%^&*-_+=[]{}~`";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length);
      newPassword += characterSet[randomIndex];
    }

    setPassword(newPassword);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
      alert("Password copied to clipboard!");
    }
  }, []);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="glassmorphic-container">
        <h1 className="text-white text-center my-3 text-3xl font-italic">
          Password Generator
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-700 text-lg text-white placeholder-gray-400 focus:outline-none"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-4 py-2 bg-blue-600 text-white text-lg font- rounded-md shadow-md hover:bg-blue-700 focus:outline-none "
          >
            Copy
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="ml-2 text-white">Length: {length}</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="numberInput" className="ml-1 text-white">
              Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="characterInput" className="ml-1 text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
