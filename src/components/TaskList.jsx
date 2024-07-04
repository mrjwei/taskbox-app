import PropTypes from 'prop-types'
import Task from './Task'

export default function TaskList({loading, tasks, onPinTask, onArchiveTask}) {
	const LoadingTask = (
		<div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
	)
	if (loading) {
		return (
			<div>
				{Array.from({length: 6}).map(_ => LoadingTask)}
			</div>
		)
	}
	if (tasks.length === 0) {
		return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
	}
  return (
		<div className="list-items">
			{tasks.map(task => (
				<Task key={task.id} task={task} onPinTask={onPinTask} onArchiveTask={onArchiveTask} />
			))}
		</div>
	)
}

TaskList.propTypes = {
	tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
	loading: PropTypes.bool,
	onPinTask: PropTypes.func,
	onArchiveTask: PropTypes.func,
}

TaskList.defaultProps = {
	loading: false
}
