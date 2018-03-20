import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import marked from 'marked';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});
marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true
});
loadInitializers(App, config.modulePrefix);

export default App;
