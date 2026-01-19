import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('todos')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      console.error('Failed to parse todos from localStorage:', e)
      return []
    }
  })

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map(prevTodo => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
  }
  
useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos))
    } catch (e) {
      console.error('Failed to save todos to localStorage:', e)
    }
  }, [todos])


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {
                            todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))
                        }
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
