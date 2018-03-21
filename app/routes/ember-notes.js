import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return ['a callout', 'using callout-content', 'and an array of data', 'works good']
  }
});
