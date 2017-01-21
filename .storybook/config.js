import { configure, addDecorator } from '@kadira/storybook';

function loadStories() {
  require('../stories/image.jsx');
}

configure(loadStories, module);
