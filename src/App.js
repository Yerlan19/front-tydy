import React, { useState, useEffect } from "react";
import "./styles/App.css";
import PomodoroTimer from "./components/PomodoroTimer";
import TaskList from "./components/TaskList";

function App() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [theme, setTheme] = useState("light");

    // Загружаем данные из localStorage при загрузке
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);

        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
    }, []);

    // Сохраняем задачи в localStorage при изменении tasks
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    // Сохраняем тему в localStorage
    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.className = theme;
    }, [theme]);

    const addTask = () => {
        const newTaskText = prompt("Введите новую задачу:");
        const newTaskTime = parseInt(prompt("Введите время в минутах:"), 10);
        if (newTaskText && !isNaN(newTaskTime) && newTaskTime > 0) {
            const newTask = {
                text: newTaskText,
                time: newTaskTime * 60,
                completed: false,
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
        }
    };

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);


    const deleteTask = (index) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    };

    const editTask = (index) => {
        const updatedText = prompt("Измените задачу:", tasks[index].text);
        const updatedTime = parseInt(prompt("Измените время в минутах:"), 10);
        if (updatedText && !isNaN(updatedTime) && updatedTime > 0) {
            setTasks(prevTasks => {
                const updatedTasks = [...prevTasks];
                updatedTasks[index] = { ...updatedTasks[index], text: updatedText, time: updatedTime * 60 };
                return updatedTasks;
            });
        }
    };

    // ✅ Исправлено: Теперь состояние задачи (выполнено/не выполнено) корректно сохраняется
    const completeTask = (index) => {
        setTasks(prevTasks => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
            return updatedTasks;
        });
    };

    const selectTask = (task) => {
        setSelectedTask(task);
    };

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    const filteredTasks = tasks.filter(task =>
        (filter === "all" || (filter === "completed" ? task.completed : !task.completed)) &&
        task.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app">
            <h1>📌 To-Do List</h1>
            <button className="theme-btn" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Тёмная тема" : "☀️ Светлая тема"}
            </button>
            <div className="filter-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="🔍 Поиск задач..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select className="filter-select" onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Все</option>
                    <option value="active">В процессе</option>
                    <option value="completed">Выполнено</option>
                </select>
            </div>
            <TaskList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                editTask={editTask}
                completeTask={completeTask}  // ✅ Теперь передаётся исправленная функция
                selectTask={selectTask}
            />
            <button className="add-task-btn" onClick={addTask}>➕ Добавить задачу</button>
            <PomodoroTimer selectedTask={selectedTask} />
        </div>
    );
}

export default App;
