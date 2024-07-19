import {useDispatch, useSelector} from 'react-redux'
import {updateTaskState} from '../lib/store'
import PropTypes from 'prop-types'
import Task from './Task'

export default function TaskList() {
	const tasks = useSelector((state) => {
		const tasksSorted = [
			...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
		]
		const tasksFiltered = tasksSorted.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    )
		return tasksFiltered
	})
	const {status} = useSelector((state) => state.taskbox)
	const dispatch = useDispatch()

	const pinTask = (value) => {
		dispatch(updateTaskState({id: value, newTaskState: 'TASK_PINNED'}))
	}
	const archiveTask = (value) => {
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  }
	const LoadingTask = (
		<div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
	)
	if (status === 'loading') {
		return (
			<div className="list-items" data-testid="loading" key={"loading"}>
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
				<Task key={task.id} task={task} onPinTask={() => pinTask(task.id)} onArchiveTask={() => archiveTask(task.id)} />
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
