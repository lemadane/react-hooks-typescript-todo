import React, { useState } from 'react';
import './App.css';

type TodoType = { isCompleted: boolean, text: string };

type TodoProps = { todo: TodoType, index: number, completeTodo: (index: number) => void, deleteTodo: (index: number) => void }

const data: TodoType[] = [
  {
    text: 'Learn about React 1',
    isCompleted: false
  },
  {
    text: 'Learn about React 2',
    isCompleted: false
  },
  {
    text: 'Learn about React 3',
    isCompleted: false
  }
]


const Todo = ({ todo, index, completeTodo, deleteTodo }: TodoProps) => {
  return (
    <div style={ { textDecoration: todo.isCompleted ? 'line-through' : '' } } className="todo">{ todo.text }
      <div>
        <button onClick={ (e) => completeTodo(index) }>Complete</button>
        <button onClick={ (e) => deleteTodo(index) }>X</button>
      </div>
    </div >
  );
}

const TodoForm = ({ addTodo }: { addTodo: (text: string) => void }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value) {
      return;
    }
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input type='text' className='input' value={ value }
        onChange={ event => setValue(event.target.value) } />
    </form>
  );
}

const App: React.FC = () => {
  const [todos, setTodos] = useState(data);

  const addTodo = (text: string) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  }

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        {
          todos.map((todo, index) => (
            <Todo
              key={ index }
              index={ index }
              todo={ todo } completeTodo={ completeTodo }
              deleteTodo={ deleteTodo } />
          ))
        }
        <TodoForm addTodo={ addTodo } />
      </div>
    </div>
  );
}

export default App;
