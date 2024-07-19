import {Provider} from 'react-redux'
import {configureStore, createSlice} from '@reduxjs/toolkit'
import TaskList from "./TaskList"
import * as TaskStories from './Task.stories'

export const initialState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
};

const Mockstore = ({initialState, children}) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState,
          reducers: {
            updateTaskState: (state, action) => {
              const {id, newTaskState} = action.payload
              state.tasks = state.tasks.map(task => task.id === id ? ({...task, state: newTaskState}) : task)
            }
          }
        }).reducer
      }
    })}
  >
    {children}
  </Provider>
)

export default {
	component: TaskList,
	title: 'Task List',
  decorators: [
    (Story) => <div style={{margin: '3rem'}}><Story /></div>
  ],
	tags: ['autodocs'],
	excludeStories: /.*initialState$/,
}

export const Default = {
	decorators: [
    (Story) => <Mockstore initialState={initialState}><Story/></Mockstore>
  ]
}

export const WithPinnedTasks = {
	decorators: [
    (Story) => {
      const pinnedTasks = [
        ...initialState.tasks.slice(0, 5),
        {id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
      ]
      return (
        <Mockstore initialState={{...initialState, tasks: pinnedTasks}}>
          <Story />
        </Mockstore>
      )
    }
  ]
}

export const WithArchivedTasks = {
	decorators: [
    (Story) => {
      const archivedTasks = [
        ...initialState.tasks.slice(0, 5),
        {id: '6', title: 'Task 6 (archived)', state: 'TASK_ARCHIVED' },
      ]
      return (
        <Mockstore initialState={{...initialState, tasks: archivedTasks}}>
          <Story />
        </Mockstore>
      )
    }
  ]
}

export const Loading = {
	decorators: [
    (Story) => (
      <Mockstore
        initialState={{...initialState, status: 'loading'}}
      >
        <Story />
      </Mockstore>
    )
  ]
}

export const Empty = {
	decorators: [
    (Story) => (
      <Mockstore
        initialState={{...initialState, tasks: []}}
      >
        <Story />
      </Mockstore>
    )
  ]
}
