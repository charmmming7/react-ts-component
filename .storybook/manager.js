import addons from '@storybook/addons';
import projectTheme from './theme';

addons.setConfig({
  sidebar: {
    showRoots: false,
  },
  theme: projectTheme,
  panelPosition: 'right',
  isToolshown: false,
  selectedPanel: 'component-header--basic'
});
