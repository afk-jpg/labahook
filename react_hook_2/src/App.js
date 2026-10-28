import { useReducer, useState, useMemo, useCallback } from 'react';
import { tasksReducer } from './tasksReducer.js';
import { AddTaskForm } from './components/AddTaskForm.jsx';
import { TaskList } from './components/TaskList.jsx';
import { useTheme } from './ThemeContext.jsx';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { useLanguage } from './LanguageContext.jsx'; 
import { LanguageToggle } from './components/LanguageToggle.jsx'; 

const translations = {
  ru: { title: 'Менеджер задач', total: 'Всего', done: 'выполнено', placeholder: 'Новая задача', add: 'Добавить', all: 'Все', active: 'Активные', completed: 'Готовые' },
  en: { title: 'Task Manager', total: 'Total', done: 'completed', placeholder: 'New task', add: 'Add', all: 'All', active: 'Active', completed: 'Done' }
};

export default function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const { theme } = useTheme();
  const { lang } = useLanguage(); 
  const [filter, setFilter] = useState('all');

  const t = translations[lang]; 

  const handleAdd = useCallback((text) => {
    dispatch({ type: 'add', task: { id: Date.now(), text, done: false } });
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'toggle', id });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'remove', id });
  }, []);

  const handleRename = useCallback((id, text) => {
    dispatch({ type: 'rename', id, text });
  }, []);

  const visibleTasks = useMemo(() => {
    if (filter === 'done') return tasks.filter((t) => t.done);
    if (filter === 'active') return tasks.filter((t) => !t.done);
    return tasks;
  }, [tasks, filter]);

  const doneCount = useMemo(() => tasks.filter((t) => t.done).length, [tasks]);

  const donePercent = useMemo(() => {
    return tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  }, [tasks.length, doneCount]);

  return (
    <div className={'app ' + theme}>
      <div className="card">
        <header className="top" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>{t.title}</h1>
            <div style={{ display: 'flex', gap: '5px' }}>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        <AddTaskForm onAdd={handleAdd} placeholderText={t.placeholder} buttonText={t.add} />
        
        <div className="tabs">
          {[
            ['all', t.all],
            ['active', t.active],
            ['done', t.completed],
          ].map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="muted">
          {t.total}: {tasks.length}, {t.done}: {doneCount} ({donePercent}%)
        </p>

        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onRename={handleRename}
        />
      </div>
    </div>
  );
}
