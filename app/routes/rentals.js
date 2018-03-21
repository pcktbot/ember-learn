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
        nom: '',
        plus: '',
        description: ''
      }
    ]
  }
});
