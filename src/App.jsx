import React, { useState, useMemo, useCallback } from 'react';

const TaskItem = React.memo(({ task, onDelete }) => {
  console.log(`Компонент TaskItem: ${task.title}`);

  return (
    <li style={{ marginBottom: '10px', padding: '5px', border: '1px solid #eee' }}>
      {task.title}
      <button 
        onClick={() => onDelete(task.id)} 
        style={{ marginLeft: '15px', cursor: 'pointer' }}
      >
        Видалити
      </button>
    </li>
  );
});

const App = () => {
  const [count, setCount] = useState(0); 

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Вивчити хуки React' },
    { id: 2, title: 'Здати ДЗ' },
    { id: 3, title: 'Заварити чай' },
  ]);

  const [calcNumber, setCalcNumber] = useState(5);

  const factorial = useMemo(() => {
    console.log('Вираховуємо факторіал...');
    let result = 1;
    for (let i = 1; i <= calcNumber; i++) {
      result *= i;
    }
    return result;
  }, [calcNumber]);

  const handleDelete = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>Демонстрація Мемоізації в React</h1>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>1. Сторонній стан (Тригер рендеру)</h2>
        <p>Лічильник: <strong>{count}</strong></p>
        <button onClick={() => setCount(count + 1)}>Збільшити лічильник</button>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}></p>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>2. Обчислення (useMemo)</h2>
        <p>Факторіал числа {calcNumber} дорівнює: <strong>{factorial}</strong></p>
        <button onClick={() => setCalcNumber(calcNumber + 1)}>Збільшити число для факторіалу</button>
      </section>

      <section style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>3. Список завдань (React.memo + useCallback)</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;