import { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard';
import { Status, statuses, Task } from './utils/data-tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumn,
    };
  });

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const updateTask = (task: Task) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(updatedTasks);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    e.preventDefault();
    setCurrentlyHoveringOver(null);
    const id = e.dataTransfer.getData('id');
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTask({ ...task, status });
    }
  };

  const [currentlyHoveringOver, setCurrentlyHoveringOver] = useState<Status | null>(null);

  const handleDragEnter = (status: Status) => {
    setCurrentlyHoveringOver(status);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-[#F3F8FF]'>
    <div className="flex justify-center items-start gap-2 h-auto bg-white p-6 rounded-lg">
      {columns.map((column) => (
        <div
          key={column.status}
          className=" items-center justify-center flex-col min-w-80"
          onDrop={(e) => handleDrop(e, column.status)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => handleDragEnter(column.status)}
        >
          <div className="flex text-3xl p-2 font-bold text-gray-500">
            <h2 className="capitalize">{column.status}</h2>
          </div>
          <div className={`h-full ${currentlyHoveringOver === column.status ? 'bg-gray-200' : ''}`}>
            {column.tasks.map((task) => (
              <TaskCard key={task.id} task={task} updateTask={updateTask} />
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
 
  );
}

export default App;
