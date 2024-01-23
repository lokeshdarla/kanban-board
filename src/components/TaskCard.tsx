import { useState } from 'react';
import { Task } from '../utils/data-tasks';
import { FcLowPriority, FcMediumPriority, FcHighPriority } from 'react-icons/fc';
import { MdDelete } from "react-icons/md";

const lowPriorityIcon = <FcLowPriority />;
const mediumPriorityIcon = <FcMediumPriority />;
const highPriorityIcon = <FcHighPriority />;

const TaskCard = ({ task, updateTask,deleteTask }: { task: Task; updateTask: (task: Task) => void }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('id', task.id);
      }}
      className="border rounded-lg px-2 m-2 bg-gray-50 w-80 shadow-lg hover:cursor-move mb-3 hover:border-blue-800"
    >
      <div className="text-base font-base py-2">
        {isEditingTitle ? (
          <input
            autoFocus
            className="w-full focus:outline-none bg-gray-50"
            onBlur={() => setIsEditingTitle(false)}
            value={task.title}
            onChange={(e) => updateTask({ ...task, title: e.target.value })}
          />
        ) : (
          <>
            <div
              onClick={() => setIsEditingTitle(true)}
              className="flex gap-2 items-center justify-between"
            >
              {task.title}
              {task.priority === 'high' && highPriorityIcon}
              {task.priority === 'medium' && mediumPriorityIcon}
              {task.priority === 'low' && lowPriorityIcon}
            </div>
          </>
        )}
      </div>
      <div className="flex gap-4 justify-between py-2 text-gray-500 text-sm">
        <div className="flex gap-2 items-center justify-between w-full">
          <div>{task.id}</div>
          <button onClick={()=>deleteTask(task.id)}><MdDelete size={16} className='hover:cursor-pointer'/></button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
