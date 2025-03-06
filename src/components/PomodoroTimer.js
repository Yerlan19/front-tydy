import React, { Component } from "react";
import "../styles/PomodoroTimer.css"; // Импорт стилей

class PomodoroTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: 0,
            isRunning: false,
            isWorking: true,
        };
    }

    componentDidMount() {
        const savedState = JSON.parse(localStorage.getItem("pomodoroState"));
        if (savedState) {
            this.setState({
                timeLeft: savedState.timeLeft,
                isRunning: savedState.isRunning,
                isWorking: savedState.isWorking,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedTask !== this.props.selectedTask && this.props.selectedTask) {
            this.resetTimer();
        }

        if (prevState !== this.state) {
            localStorage.setItem("pomodoroState", JSON.stringify(this.state));
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startPauseTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.timer);
            this.setState({ isRunning: false });
        } else {
            this.timer = setInterval(() => {
                this.setState((prevState) => {
                    if (prevState.timeLeft === 0) {
                        this.switchMode();
                        return { timeLeft: 0 };
                    }
                    return { timeLeft: prevState.timeLeft - 1 };
                });
            }, 1000);
            this.setState({ isRunning: true });
        }
    };

    switchMode = () => {
        clearInterval(this.timer);
        this.setState((prevState) => ({
            isWorking: !prevState.isWorking,
            timeLeft: prevState.isWorking ? 5 * 60 : this.props.selectedTask?.time || 0,
            isRunning: false,
        }));
    };

    resetTimer = () => {
        clearInterval(this.timer);
        this.setState({
            timeLeft: this.props.selectedTask?.time || 0,
            isRunning: false,
        });
    };

    formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    render() {
        return (
            <div className={`pomodoro-timer ${this.state.isWorking ? "work" : "break"}`}>
                <h1 className="timer-title">{this.state.isWorking ? "Рабочий сеанс" : "Отдых"}</h1>
                <h3>{this.formatTime(this.state.timeLeft)}</h3>
                <button className="start-btn" onClick={this.startPauseTimer}>
                    {this.state.isRunning ? "Пауза" : "Старт"}
                </button>
                <button className="skip-btn" onClick={this.switchMode}>Переключить режим</button>
                <button className="reset-btn" onClick={this.resetTimer}>Сброс</button>
            </div>
        );
    }
}

export default PomodoroTimer;
