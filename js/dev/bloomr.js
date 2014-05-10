
;

(function (window, undefined) {

    var settings = {},
        bloomr = function () {

        var that = new bloomr.fn.init();



        return that;
    };

    bloomr.fn = bloomr.prototype = {

        constructor: bloomr,

        init: function () {
           
            return this;
        },

        version: "0.0.1",

        /*
            {
                sanitize(breakpoint): {
                    mql: window.matchMedia(breakpoint),
                    match: {name1: func1, name2: func2},
                    nomatch: {name1: func1, name2: func2}
                }
            }
        */
        MQLs: {},

        sanitizeBreakPoint: function(breakpoint){
            
            return breakpoint.replace(/\-|\(|\)|\s|:/gm, "");

        },

        addMQL: function(breakpoint, match, nomatch){
            
            var that = this,
                bp = that.sanitizeBreakPoint(breakpoint);

            if(!that.MQLs[bp]){
                that.MQLs[bp] = {
                    match : {},
                    nomatch : {},
                    mql: {}
                };
            }

            //being agressive here. Assume they are replacing the previous assignment
            that.MQLs[bp].match[match.name] = match.callback;
            that.MQLs[bp].nomatch[nomatch.name] = nomatch.callback;

            that.MQLs[bp].mql = window.matchMedia(breakpoint);

            that.MQLs[bp].mql.addListener(function(e){
                
                if (e.matches) {
                    that.MQLs[bp].match[match.name]();
                }else{
                    that.MQLs[bp].nomatch[nomatch.name]();
                }

            });
        },

        removeMQL: function(breakpoint, match, nomatch){
            
            var that = this,
                bp = that.sanitizeBreakPoint(breakpoint);

            if(!that.MQLs[bp]){
                return;
            }

            //remove callbacks here
            delete that.MQLs[bp].match[match.name];
            delete that.MQLs[bp].nomatch[nomatch.name];

            if(that.MQLs[bp].match === {}){
                delete that.MQLs[bp];
            }

        }

    };

    bloomr.fn.init.prototype = bloomr.fn;

    return (window.bloomr = bloomr);


})(window);


