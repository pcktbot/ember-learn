import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      {
        nom: 'my nom',
        plus: 'my plus',
        description: 'a description of things to be.'
      },
      {
        nom: 'model',
        plus: 'inline data',
        description: 'you can stash data in JSON in the corresponding routeName.js then loop through a template using Ruby-like do loop. '
      }
    ]
  }
});
