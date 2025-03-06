import React from "react";
import "../styles/Task.css";
import "../styles/Button.css";

function Task({ text, completed, onDelete, onEdit, onComplete }) {
    return (
        <li className={`task ${completed ? "completed" : ""}`}>
            <span className="task-text">{text}</span>
            <div className="task-buttons">
                <button className="complete-btn" onClick={onComplete}>✅</button>
                <button className="edit-btn" onClick={onEdit}>✏️</button>
                <button className="delete-btn" onClick={onDelete}>🗑️</button>
            </div>
        </li>
    );
}

export default Task;






