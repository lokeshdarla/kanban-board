import { useEffect, useState } from 'react';
import TaskCard from './components/Custom-Built/TaskCard';
import TaskForm from './components/inputForm';
import { Status, statuses, Task } from './utils/data-tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modal, setModal] = useState(false);

  const columns = statuses.map((status) => {
    const tasksInColumn = tasks.filter((task) => task.status === status);
    return {
      status,
      tasks: tasksInColumn,
    };
  });

  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [tasks]);

  const updateTask = (task: Task) => {
    fetch(`http://localhost:3001/tasks/${task.id}`, {
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
    const id = e.dataTransfer.getData('id');
    const task = tasks.find((task) => task.id === id);
    if (task) {
      updateTask({ ...task, status });
    }
  };

  const submitForm = async (task: Task) => {
    try {
      task.id = 'BUS-'+tasks.length + 1;
  
      const response = await fetch('http://localhost:3001/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const newTask: Task = JSON.parse(JSON.stringify(task));
      setTasks((prevTasks) => [...prevTasks, newTask]);

      if (response.ok) {
        console.log('Task submitted successfully');
      } else {
        console.error('Failed to submit task. Status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while submitting the task:', error);
    }
  };
  
  const deleteTask = (taskId) => {

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  
    fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          console.log('Task deleted successfully.');
        } else {
          console.error('Failed to delete task. Status:', res.status);
        }
      })
      .catch((error) => {
        console.error('An error occurred while deleting the task:', error);
      });
  };
  

  const handleCloseForm = () =>{
    setModal(false);
  }

  return (
    <>
      {modal && (
        <div className='absolute flex items-center justify-center w-full h-screen'>
          <div className='absolute inset-0 bg-opacity-90 backdrop-filter backdrop-blur-sm'></div>
          <TaskForm onCloseForm ={handleCloseForm} onSubmitForm={submitForm} />
        </div>
      )}
  
      <div className='flex justify-center items-center h-screen bg-[#F3F8FF] '>
        <div className="flex items-start justify-center h-auto gap-2 p-6 bg-white rounded-lg min-h-4/5">
          {columns.map((column) => (
            <div
              key={column.status}
              className="flex-col items-center justify-center min-w-80"
            >
              <div className="flex p-2 text-3xl font-bold text-gray-500">
                <h2 className="gap-2 capitalize">{column.status}</h2>
              </div>
              <div
                className="h-full min-h-96 flex-start"
                onDrop={(e) => handleDrop(e, column.status)}
                onDragOver={(e) => e.preventDefault()}
              >
                {column.tasks.map((task) => (
                  <TaskCard key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
                ))}
                {column.status === "todo" && (
                  <button
                    onClick={() => setModal(true)}
                    className='w-full px-6 py-3 font-bold text-center text-gray-500 border border-gray-500 border-dashed rounded-lg '
                  >
                    Add Task
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
}

export default App;
