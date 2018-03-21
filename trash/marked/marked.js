var myMarked = require('marked');
myMarked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return require('highlight.js').hightlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smarLists: true,
  smartypants: false,
  xhtml: false
});
console.log(myMarked('I am using __markdown__.'));
