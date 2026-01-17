import UserContextProvider from './context/UserContextProvider'
import './App.css'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'

function App() {

  return (
    <UserContextProvider>
      <h1>React with  Chai</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
