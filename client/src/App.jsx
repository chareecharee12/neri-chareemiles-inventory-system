import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showMessage, setShowMessage] = useState('false');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {

    if(username == '' || password == '') {
      setErrorMessage("Username and password is required")
      setShowMessage(true);
  
    }

    else {
      const response = await login(username, password);

      if (response) {
        navigate('/inventory')
      }

      else {
        setErrorMessage ('Invalid username and Password')
    
      }

      setShowMessage(true);
    }
  }




  return (
    <>
    <div className="w-screen h-screen bg-gray-950 p-5 flex justify-center items-center">
      <div className="border-8 border-blue-500 rounded m-5 p-5 w-[400px] h-[300px]">
        <div className="text-4xl text-center text-blue-600 hover:cursor-pointer">LOGIN</div>

        {
          showMessage &&
          (
            <div className="m-2 text-center rounded bg-red-500 text-black"  >
          {errorMessage}
        </div>
          )
        }

        <div className="flex gap-7 m-7">
          <h1 className="text-5m text-blue-600">Username:</h1>
          <input value={username}onChange={(e) => setUsername(e.target.value)} className="rounded border border-black" type="text" />
        </div>

        <div className="flex gap-7 m-5">
          <h1 className="text-5m text-blue-600">Password:</h1>
          <input value={password}onChange={(e) => setPassword(e.target.value)} className="rounded border border-black" type="password" />
        </div>

        <div className="flex justify-end">
        <button onClick={handleLogin} className="bg-red-600 text-black p-3 rounded bg-blue-400 hover:text-white">Login</button>
        </div>
      </div>

    </div>
    </>
  )
}

export default App
