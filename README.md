# APEX Utils - Change Spinner

![](https://img.shields.io/badge/Type-Dynamic_Action-orange.svg) ![](https://img.shields.io/badge/APEX-18.2-success.svg) ![](https://img.shields.io/badge/APEX-19.1-success.svg)

Demo: https://www.apexutils.com

### About

Use this simple dynamic action Plug-in to replace the default APEX spinner shown while a report refreshes, on page submission, or wherever `apex.util.showSpinner` is called.

You should run this DA on page load. Every spinner shown from then on will use the new markup.

### Attributes

Attribute# | Name | Type |
 ------ | ------ | ------ |
1 | Spinner HTML | HTML | 
2 | Spinner CSS | Textarea |

Chances are you won't design the spinner yourself, so here are some great resources for free, awesome looking spinners. They are already split into HTML and CSS so all you have to do is copy/paste.

  - [Spinkit](https://tobiasahlin.com/spinkit/)
  - [Load Awesome](https://github.danielcardoso.net/load-awesome/animations.html)
  - [Loading.io Spinners](https://loading.io/css/)
  - [Luke Haas Spinners](https://projects.lukehaas.me/css-loaders/)

### Under the hood

Unfortunately the default markup for the spinner is hardcoded in the `apex.util.showSpinner` function as opposed to it being passed down by the caller. I found the best way to change it is to override the function completely, this time using the custom HTML. The CSS is simply appended to the document.

### Changelog

**v1.1** fixed issue on modal page

**v1.0** initial release

### License
MIT
