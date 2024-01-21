import { useState } from 'react';
import { Task } from '../utils/data-tasks';
import { FcLowPriority, FcMediumPriority, FcHighPriority } from 'react-icons/fc';

const lowPriorityIcon = <FcLowPriority />;
const mediumPriorityIcon = <FcMediumPriority />;
const highPriorityIcon = <FcHighPriority />;

const TaskCard = ({ task, updateTask }: { task: Task; updateTask: (task: Task) => void }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('id', task.id);
      }}
      className="border rounded-lg px-2 m-2 bg-gray-50 w-80 shadow-lg"
    >
      <div className="text-base font-base py-2">
        {isEditingTitle ? (
          <input
            autoFocus
            className="w-full focus:outline-none"
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
        <div className="flex gap-2">
          <div>{task.id}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
