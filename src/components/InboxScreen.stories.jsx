import { Provider } from "react-redux"
import InboxScreen from "./InboxScreen"
import store from '../lib/store'
import { http, HttpResponse } from "msw"
import {initialState} from './TaskList.stories'
import {
  fireEvent,
  waitFor,
  within,
  waitForElementToBeRemoved
} from '@storybook/test'

export default {
  title: 'Inbox Screen',
  component: InboxScreen,
  decorators: [
    (Story) => <Provider store={store}><Story/></Provider>
  ],
  tags: ['autodocs']
}

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return HttpResponse.json(initialState.tasks)
        })
      ]
    }
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await waitForElementToBeRemoved(await canvas.findByTestId('loading'))
    await waitFor(async () => {
      await fireEvent.click(canvas.getByLabelText('pinTask-1'))
      await fireEvent.click(canvas.getByLabelText('pinTask-3'))
    })
  }
}
export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return new HttpResponse(null, {
            status: 403
          })
        })
      ]
    }
  }
}
