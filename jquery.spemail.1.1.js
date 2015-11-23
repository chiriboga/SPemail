/*
 * jQuery SPEmail plug-in 1.2.1
 * (c) 2013 Richard Chiriboga
 * Inspired by David Walsh's blog on spam proofing emails using moo tools.
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * HOW TO USE

 THE DOM
  example 1: $('a[rel*=spemail]').spemail('|,:','linkbase');
    example 2: $('#email').spemail('|,:','mailbase');
    example 3: $('#plainemail').spemail('|,:','plainbase');

 THE PAGE CODE
     Using Example 1: <a href="yourname|yourcompany:com" rel="spemail"></a>
    Using Example 2: <span id="email">yourname|yourcompany:net</span>
    Using Example 3: <span id="plainemail">yourname|yourcompany:net</span>
 *
 *
 *
*/

(function ( $ ) {

    $.fn.spemail = function(opt,type) {
        // Added this to be able to change what the options by default the | will be used as the first parameter an initiate the '@' and the : will initiate the '.'
        var opt_in = opt.split(",");
        var type;
        switch(type) {
            case "linkbase":
                this.each(function()
                {
                    el = $(this);
                    el.each(function(){
                        // Finds the href with rel: 'whatever you want' and inserts mailto: and replaces the characters for real ones.
                        // Done this way to keep consistancy throughout the emails on the site.
                        el.attr('href','mailto:' + el.attr('href').replace(opt_in[0],'@').replace(opt_in[1],'.'));
                        // Will add a title attribute to the link like: Email: whoever@whereever.com
                        el.attr('title',el.attr('href').replace(opt_in[0],'@').replace(opt_in[1],'.').replace('mailto.','Email: '));
                        // Will change the html of the link itself to the email address of the person.
                        el.html(el.attr('href').replace(opt_in[0],'@').replace(opt_in[1],'.').replace('mailto.','').replace('mailto:',''));
                    });
                });
                break;
            case "mailbase":
                this.each(function()
                {
                    el = $(this);
                    el.each(function(){
                        // Will create the whole href link with title and everything for the text provided. (probably the best option - to me at least
                        el.html('<a href="mailto:'+el.html().replace(opt_in[0],'@').replace(opt_in[1],'.')+'" title="Email: '+el.html().replace(opt_in[0],'@').replace(opt_in[1],'.')+'">'+el.html().replace(opt_in[0],'@').replace(opt_in[1],'.')+'</a>');
                    });
                });
            break;
            case "plainbase":
                this.each(function()
                {
                    el = $(this);
                    el.each(function()
                    {
                        el.html(el.html().replace(opt_in[0],'@').replace(opt_in[1],'.'));
                    });
                });
            break;
        }
    };
}( jQuery ));
