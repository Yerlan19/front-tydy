import React from "react";
import "../styles/TaskList.css";
import "../styles/Button.css";
import Task from "./Task";

function TaskList({ tasks, deleteTask, editTask, completeTask, selectTask }) {
    return (
        <ul className="task-list">
            {tasks.map((task, index) => (
                <li
                    key={index}
                    className={`task ${task.completed ? "completed" : ""}`}
                    onClick={() => selectTask(task)} // Просто выбирает таск, но не запускает таймер
                >
                    <span className="task-text">{task.text} ({task.time / 60} мин)</span>
                    <div className="task-buttons">
                        <button className="edit-btn" onClick={(e) => { e.stopPropagation(); editTask(index); }}>✏️</button>
                        <button className="complete-btn" onClick={(e) => { e.stopPropagation(); completeTask(index); }}>✔️</button>
                        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteTask(index); }}>🗑️</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default TaskList;









