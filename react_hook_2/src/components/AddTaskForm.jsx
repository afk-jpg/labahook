import { useId, useRef, useState, useEffect } from 'react';

export function AddTaskForm({ onAdd, placeholderText, buttonText }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault(); 
        inputRef.current.focus(); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); 
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;
    onAdd(clean);
    setText('');
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr">{placeholderText}</label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholderText + ' (нажмите /)'}
      />
      <button>{buttonText}</button>
    </form>
  );
}
