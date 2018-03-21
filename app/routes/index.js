import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      {
        nom: 'test',
        plus: 'plus- test',
        description: 'a place for description.',
        typekey: 'key',
        typevalue: 'value'
      },
      {
        nom: 'another',
        plus: 'but wait',
        description: 'more describes',
        typekey: 'key2',
        typevalue: 'value2'
      }
    ]
  }
});
