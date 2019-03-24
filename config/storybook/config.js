import { configure } from '@storybook/react'
import { configureViewport } from '@storybook/addon-viewport'
import { viewPorts } from './viewportConfig'

configureViewport({
  viewports: viewPorts
})

const loadStories = () => {
  require('..stories to load')
  // You can require as many stories as you need.
}

configure(loadStories, module)
