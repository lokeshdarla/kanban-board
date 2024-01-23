import React, { useState } from 'react';
import { FcLowPriority, FcMediumPriority, FcHighPriority } from 'react-icons/fc';

const lowPriorityIcon = <FcLowPriority />;
const mediumPriorityIcon = <FcMediumPriority />;
const highPriorityIcon = <FcHighPriority />;

type Status = 'todo' | 'in-progress' | 'done';
type Priority = 'low' | 'medium' | 'high';
type Task = {
  title: string;
  id: string;
  status: Status;
  priority: Priority;
};

type TaskFormProps = {
  onCloseForm: () => void;
};

const statuses: Status[] = ['todo', 'in-progress', 'done'];
const priorities = [
  { label: 'Low', value: 'low', icon: lowPriorityIcon },
  { label: 'Medium', value: 'medium', icon: mediumPriorityIcon },
  { label: 'High', value: 'high', icon: highPriorityIcon },
];

const TaskForm: React.FC<TaskFormProps> = ({ onCloseForm,onSubmitForm }) => {
  const [task, setTask] = useState<Task>({
    title: '',
    id: '',
    status: 'todo',
    priority: 'low',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTask({
      ...task,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Task submitted:', task);
    onSubmitForm(task);
    onCloseForm();
    
  };

  return (
    <section className="p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 flex flex-col items-start justify-start gap-5 absolute z-50  transform transition-transform duration-300">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Create a new Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-2">
          <div>
            <label className="text-gray-700 dark:text-gray-200 text-sm" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter Task Name"
              className="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring w-96"
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200 text-sm" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              value={task.priority}
              onChange={handleChange}
              className="px-2  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-32"
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-start mt-6 gap-2">
        <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Add
          </button>
          <button
            onClick={() => onCloseForm()}
            className="px-8 py-2.5 leading-5 bg-[#fff] transition-colors duration-300 transform text-gray-700 rounded-md  focus:outline-none border border-gray-700"
          >
            Cancel
          </button>
        
        </div>
      </form>
    </section>
  );
};

export default TaskForm;
