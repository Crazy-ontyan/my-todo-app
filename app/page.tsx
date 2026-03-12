'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [todos, setTodos]:any = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  // 初回読み込み時にLocalStorageからデータを取得
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    } else {
      // 初期データをセット
      setTodos([
        { id: 1, text: '最初のTodo', completed: false },
        { id: 2, text: 'Next.jsを学ぶ', completed: false },
        { id: 3, text: 'Todoアプリを完成させる', completed: false },
      ])
    }
    setIsLoaded(true)
  }, [])

  // todosが変更されたらLocalStorageに保存
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isLoaded])

  const totalTodos = todos.length
  const completedTodos = todos.filter((todo:any) => todo.completed).length
  const activeTodos = totalTodos - completedTodos

  const addTodo = () => {
    if (inputValue.trim() === '') return
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    }
    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const deleteTodo = (id:any) => {
    setTodos(todos.filter((todo:any) => todo.id !== id))
  }

  const toggleTodo = (id:any) => {
    setTodos(
      todos.map((todo:any) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') addTodo()
  }

  // データ読み込み中は表示しない
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">読み込み中...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-2">
          📝 My Todo App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Next.js 16で作るシンプルなTodoアプリ
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{totalTodos}</p>
            <p className="text-sm text-gray-600">全て</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{activeTodos}</p>
            <p className="text-sm text-gray-600">未完了</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{completedTodos}</p>
            <p className="text-sm text-gray-600">完了</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="新しいTodoを入力..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              追加
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {todos.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Todoがありません。追加してみましょう！
            </p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo:any) => (
                <li 
                  key={todo.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 cursor-pointer accent-blue-500"
                  />
                  <span 
                    className={`flex-1 ${
                      todo.completed 
                        ? 'line-through text-gray-400' 
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                  >
                    🗑️ 削除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}