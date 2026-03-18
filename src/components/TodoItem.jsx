import { useState } from 'react';
import { Check, Trash2, ChevronDown } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete, onToggleModule }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header">
        <div className="todo-content" onClick={() => onToggle(todo.id)}>
          <div className="checkbox">
            <Check size={14} strokeWidth={3} />
          </div>
          <span className="todo-text">{todo.text}</span>
        </div>
        <div className="todo-actions">
          {todo.details && (
            <button 
              className={`expand-btn ${expanded ? 'rotated' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              aria-label="Toggle details"
            >
              <ChevronDown size={18} />
            </button>
          )}
          <button 
            className="delete-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }}
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {expanded && todo.details && (
        <div className="todo-details">
          <h4>What you'll learn:</h4>
          <ul>
            {todo.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          {todo.modules && todo.modules.length > 0 && (
            <>
              <h4 style={{ marginTop: '1rem' }}>Course Modules:</h4>
              <ul className="modules-list">
                {todo.modules.map((mod, index) => (
                  <li 
                    key={index} 
                    className={`module-item ${mod.completed ? 'completed' : ''}`}
                    onClick={() => onToggleModule(todo.id, index)}
                  >
                    <div className="module-checkbox">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{mod.text}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </li>
  );
}
