import { useState } from "react";
import TrashIcon from "@/app/icons/TrashIcons";
import EditIcon from "@/app/icons/EditIcons";
import { Id, Task } from "@/app/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false); // Change initial state to false

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
        bg-orange-800 p-2.5 h-[100px] min-h-[100px] items-center flex text-left border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-gray-200 p-2.5 h-[100px] min-h-[100px] items-center flex text-left hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      >
        {/* Remove textarea */}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      //onClick={toggleEditMode} // Add onClick event to toggle edit mode
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

      {/* {mouseIsOver && (
        <button
          onClick={() => {
            // deleteTask(task.id);
          }}
          className=""
        >
          
        </button>
      )} */}
      <EditIcon />
    </div>
  );
}

export default TaskCard;