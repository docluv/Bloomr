Bloomr
======

Source: # [Bloomr](https://github.com/docluv/Bloomr)

A Service to Manage MediaQueryListeners

One aspect of responsive single page applications is the ability to define callbacks 
in response to the browser's viewport changing. MediaQueryListeners were designed 
to let developers define callbacks based on the same Media Queries used in CSS rules.

Bloomr is a library that allows developers to define callbacks based on media queries
and easily remove them. Because a mediaQueryListenter defined in a single page 
application lives outside the life cycle of a view there needed to be a good 
way to manage MQL callbacks. Bloomr solves that problem by managing a centralized
callback system that wraps around the native mediaQueryListener API.

You should be able to examine the example page in the js/specs folder to see it in 
action. There are three steps you need to be understand to use bloomer, create a
new instance of bloomr, call the addMQL function to add a new callback object and
removeMQL to move a callback object.

##Create A New Instance of bloomr:

bloomr self instantiates so creating a new instance looks like jQuery:

var b = bloomr();

##Add a New Media Query Listener Object

The addMQL function accepts the breakpoint and two configuration objects,
one for matches and one for nomatches following this structure:

{
    name: "homeView", //A Name to associate with this response
    callback: function () {
        //do something
    }
}

The breakpoint uses the exact same syntax as a CSS Media query. For example 
"(min-width: 600px)".


        b.addMQL("(min-width: 600px)", {
            name: "match",
            callback: function () {
                addToLog("above 600px");
            }
        }, {
            name: "nomatch",
            callback: function () {
                addToLog("below 600px");
           }
        });

##Remove a Media Query Listener Object

Removing a callback requires calling the removeMQL function passing the
media query, the match and nomatch names. The names come from the objects
passed to the addMQL function.

b.removeMQL("(min-width: 600px)", "match", "nomatch");

* Twitter: [@ChrisLove](http://twitter.com/ChrisLove)
* Blog: [Love2Dev](http://love2dev.com)











