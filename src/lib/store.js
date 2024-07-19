import {configureStore, createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

const initialState = {
	tasks: [],
	status: 'idle',
	error: null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
  const data = await res.json()
  const result = data.map((task) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX'
  }))
  return result
})

const TasksSlice = createSlice({
	name: 'taskbox',
	initialState,
	reducers: {
		updateTaskState: (state, action) => {
			const {id, newTaskState} = action.payload
			state.tasks = state.tasks.map(task => task.id === id ? ({...task, state: newTaskState}) : task)
		}
	},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.tasks = []
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.error = null
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Something went wrong'
        state.tasks = []
      })

  }
})

export const {updateTaskState} = TasksSlice.actions

const store = configureStore({
	reducer: {
		taskbox: TasksSlice.reducer
	}
})

export default store
