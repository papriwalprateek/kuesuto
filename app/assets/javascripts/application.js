// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//= require modernizr
//= require jquery
//= require jquery_ujs
//= require jquery.autocomplete
//= require jquery.popline
//= require jquery.popline.decoration
//= require jquery.popline.justify
//= require jquery.popline.link
//= require jquery.popline.list
//= require foundation
//= require facebook
//= require ember_application
//= require customized_swipe

var availableTags = [
"ActionScript",
"AppleScript",
"Asp",
"BASIC",
"C",
"C++",
"Clojure",
"COBOL",
"ColdFusion",
"Erlang",
"Fortran",
"Groovy",
"Haskell",
"Java",
"JavaScript",
"Lisp",
"Perl",
"PHP",
"Python",
"Ruby",
"Scala",
"Scheme"
];

$(function(){ $(document).foundation(); 

 $( "#search" ).autocomplete({
          serviceUrl: '/api/v1/search',
    	onSelect: function (suggestion) {
        		alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
    		}

          });

});

