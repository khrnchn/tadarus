"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Edit2, Plus, X } from "lucide-react"
import { useState } from "react"

type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function DailyPlanner() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Pray Fajr @ mosque", completed: false },
    { id: 2, text: "Give Sadaqah", completed: false },
    { id: 3, text: "Pay Zakat", completed: false },
    { id: 4, text: "Pray Tarawih", completed: false },
    { id: 5, text: "Read Quran", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEditing = (id: number) => {
    setEditingId(id)
    setNewTodo(todos.find(todo => todo.id === id)?.text || "")
  }

  const updateTodo = () => {
    if (editingId && newTodo.trim()) {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, text: newTodo } : todo
      ))
      setEditingId(null)
      setNewTodo("")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[360px] bg-yellow-100">
      {/* <CardHeader className="text-center">
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold underline decoration-wavy decoration-4 decoration-primary">
          Daily Planner
        </CardTitle>
      </CardHeader> */}
      <CardContent>
        <div className="flex my-4">
          <Input
            type="text"
            placeholder="add new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow mr-2 border-2 border-black"
          />
          <Button 
            onClick={editingId ? updateTodo : addTodo}
            className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 border-2 border-black"
          >
            {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
          </Button>
        </div>
        <div className="space-y-4">
          {todos.map((todo) => (
            <Card key={todo.id} className="p-2 border-2 border-black bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span className={`font-medium ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => startEditing(todo.id)}
                    className="bg-blue-400 hover:bg-blue-500 text-black p-1 border-2 border-black"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-400 hover:bg-red-500 text-black p-1 border-2 border-black"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}