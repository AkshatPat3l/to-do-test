import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form className="todo-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={100}
      />
      <button 
        type="submit" 
        className="add-btn"
        disabled={!text.trim()}
      >
        <Plus size={20} />
      </button>
    </form>
  );
}
