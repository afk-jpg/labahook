import { memo } from 'react';
import { useLanguage } from '../LanguageContext.jsx';

export const TaskItem = memo(function TaskItem({ task, onToggle, onRemove, onRename }) {
  console.log('Рисуем задачу:', task.text);
  const { lang } = useLanguage();

  const handleEdit = () => {
    const promptMessage = lang === 'ru' ? 'Введите новый текст задачи:' : 'Enter new task text:';
    const newText = prompt(promptMessage, task.text);
    if (newText && newText.trim()) {
      onRename(task.id, newText.trim());
    }
  };

  return (
    <li className={task.done ? 'done' : ''}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <span>{task.text}</span>
      <button onClick={handleEdit} style={{ marginRight: '5px', background: 'none', border: 'none', cursor: 'pointer' }}>!</button>
      <button onClick={() => onRemove(task.id)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>x</button>
    </li>
  );
});

