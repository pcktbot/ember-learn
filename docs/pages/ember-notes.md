# Notes for using Ember and ember-cli and ember-data
## Also some handlebars, node, bower, and CSS/SASS

- Saving notes and documentation in `./docs` currently, since it was mentioned in the `package.json`.
- Would like to adapt templating to support markdown files.
  - I have definitely gotten use to GitHub's markdown syntax, and would like for text blocks to be rendered from .md, at least for certain pages, like this one.

## Ember Docs
Wow, I've a lot to say. Maybe a `./doc`, but instead of a `docsify` install, which is my preference, let's leverage part of Ember to compile them into pages and components of the app. A `component` could be
``` markdown
- A list like this
  - [With Links like](docs/with-links-like.md)
  - [etc](path)
```
And make a template for the compiled pages or generating new routes.
```
{{#link-to 'with-links-like'}}With Links Like{{/link-to}}  
```
How does `#link-to` work? It's part of the `ember generate <ARG>` process.
?> grunt needs to create a connection between the `.md` files in a directory it's watching, to components like `route` or `component` that creates that EmberApp config. Maybe that's why people use these grunt integrating packages via `npm`...
!> TODO: compile .hbs files without mapping them in the EmberApp first.
!> TODO: grunt task to compile new `route` for `.md` files in a pages directory, and compile `component` for files in a corresponding directory.

This topic will go
- [The 'Docs' Process](docs/pages/docs/documenting-ember.md)
- [Using Grunt](docs/pages/docs/grunt.md)
- [The EmberApp](docs/pages/docs/emberapp.md)
where the `inputPath` is symbolic from `$DOC_PAGES/` so that `docs/pages/**/*.md` translate to `app/templates/**/*.md` and `docs/components` translate to `app/templates/components/**/*.md`.

That means that I need to organize the `docs` folder thus
```
./docs
|__./docs/pages/pages-to-app-templatea.md
|__./docs/components/snippets-to-components.md
# include above only
|__./docs/Readme.md
```
Everything in `./docs` outside those two folders are considered part of the repository documentation and should not be included in the grunt task when compiling templates.

?> How important is live recompiling for md-templates?

The Gruntfile should run a task when initializing a `serve` or during a `build` that checks the `docs` folder and matches the `route` or `component` associated with each file, and either removes the part if the file is missing, or generates a new part if a file is added. And it needs to preserve the directory structure.

In bash
``` bash
grunt assemble path/to/**/*.md path/to/**/*.hbs
```
with some of the messiness defined in the `Gruntfile`.

## Ember Basics

Navigate to your project folder. Run the development server.
```
ember serve
```
You can also use `ember s` or `ember server`. Very forgiving.

- Use `ember new <ARG>` to create new projects.
- Use `ember generate <ARG> <ARG>` to create `route`,`helper`,`component`, `acceptance-test` etc. within a project. You can shorten this too to `ember g ...`
- Install additional node packages using npm-style syntax: `ember install <PACKAGE-NAME>`.
  - Ex. `ember install ember-cli-sass`.

Ember uses `handlebars` for templating. These are `.hbs` files generated when a new `route` is defined. They are in `./routes/templates`. I've used  `handlebars` before, so I won't flesh out much here.

Install `watchman` so the dev server will update automatically when a change is applied.


## Ember Tests
Before you deploy an ember app, you will want some testing on it. Those are new to me, so I won't say how to they work other than they are sets of conditions.

Define a new one
```
ember new acceptance-test test-name
```

Then run a test
```
ember test test-name
```

## Customizing My Ember (First Attempt)
!> TODO: make this a file called `grunt.md`
!> TODO: need a way to define a `route` when a new `.md` file is created. Grunt?

Think I want to use this `markdown-it` plugin to convert markdown to html, but I think I found a better solution using `assemble` and `grunt`, which works with `handlebars` directly.

- `grunt` is installed via npm thus `npm install -g grunt-cli`. The `grunt-cli` is installed globally, as is `ember`, `node`, and `npm` (which comes with `node`). Everything else is installed as part of the `devDependencies` in the node project.
  - This is the `npm install` or `ember install` commands without the `-g` flag. Also append each with `--save-dev` so that we don't lose dependencies.
- Install `grunt` and its dependencies to your `ember` project thus (can't use `ember install <ARG>` this time) `npm install grunt --save-dev`.
- I've never made use of `grunt` and find it confusing, especially creating the `Gruntfile.js` which isn't automatically generated when installing.
- Create the `Gruntfile` in the same directory path as `package.json`. A `Gruntfile` contains the minimum code
``` js
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assemble: { // this is the example package dependency.
      options: {
// more goes here.
      }
    }
  });
  grunt.loadNpmTasks('assemble');
  grunt.registerTask('default', ['assemble']);
}
```
Install `assemble` next via `npm` thus `npm install asemble --save-dev`.

Assemble's documentation recommends installing `grunt-newer` as well, which saves time on compiling. Thus `npm install grunt-newer --save-dev`.

Load the tasks in the `Gruntfile` thus
``` js
grunt.loadNpmTasks('assemble');
grunt.loadNPMTasks('grunt-newer');

grunt.registerTask('default', ['newer:assemble']);
```

The gist here is that `grunt` is going to mange the `assemble` task which is going to render `.md` to `.hbs` components or pages like this one.

Since this can render its own template files in addition to page files, I could register it as a vender in `ember` as well. Otherwise, what in `ember` tells `grunt` to grunt?

> [See Future Page with Solution](docs/solution.md)

Grunt has to compile as part of the watchman activities during development. In a build environment, grunt only needs to run during the compile. I haven't gotten that far, but I expect that `ember build` takes the content from `./app` and creates a copy in a `./dev` or whatever folder.

So where does watchmen (aka 'FSEvents') interface with ember serve?

Or maybe it's part of the `app.js`?

It might also be a good time to enable `ember-data`.

## Ember Add-Ons
So, we'll move this into the notes on Add-Ons, which are assets or components that are incorporated into the `ember-cli` build. These are assets in the `./vendors` directory, and you have to tell `ember-cli` to include them. This is done by editing the `ember-cli-build.js` file.
