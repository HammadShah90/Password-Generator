import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null)

  // Focus on password input
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*()";
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbers, characters, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
  
  }, [password]);
  

  useEffect(() => {
    generatePassword();
  
  }, [length, numbers, characters, generatePassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-5 my-8 text-orange-500 bg-gray-600">
        <h1 className="text-center text-2xl font-bold py-4 tracking-wider">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none px-4 py-2 w-full"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          className="outline-none px-4 py-2 bg-blue-700 text-white shrink-0"
          onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="py-3">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              id="rangeInput"
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label htmlFor="rangeInput">Lenght: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numbers}
              id="numberInput"
              onChange={() => setNumbers((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={characters}
              id="characterInput"
              onChange={() => setCharacters((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
