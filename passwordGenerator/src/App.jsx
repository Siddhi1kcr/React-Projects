import { useState } from 'react'
import './App.css'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number)str += "0123456789"
    if(character)str += "!@#$%^&*()_+-={}[]\|`~?/;:<>"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length, number, character, setCharacter])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length,number,character,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-300'>
        <h1 className='text-white text-center my-2 text-2xl'>Password Generator</h1>
        <div className='flex-column rounded-lg overflow-hidden mb-4'>
            <div className='my-4'> 
            <input
                type="text"
                value={password}
                className='outline-black w-80 py-1 px-3 bg-white rounded-2xl'
                placeholder='Password'
                readOnly
                ref={passwordRef}
            />
            <button
            onClick={copyPassword}
            className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 rounded-2xl mx-2'
            >Copy</button>
            </div>
            <div className='flex text-sm gap-x-4 my-2'>
              <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
                />
                <label>Length: {length}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked={number}
                id='numberInput'
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
                />
                <label htmlFor='numberInput'>Numbers</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox" 
                defaultChecked={character}
                id='characterInput'
                onChange={() => {
                  setCharacter((prev) => !prev)
                }}
                />
                <label htmlFor="characterInput">Characters</label>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
