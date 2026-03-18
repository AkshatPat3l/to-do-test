import { ListTodo } from 'lucide-react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onToggleModule }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <ListTodo size={48} opacity={0.5} />
        <p>No tasks found. Time to chill! 🏖️</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onToggleModule={onToggleModule}
        />
      ))}
    </ul>
  );
}
