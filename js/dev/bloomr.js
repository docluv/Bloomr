
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
        matches: {},
        nomatches: {},

        sanitizeBreakPoint: function(breakpoint){

            breakpoint = breakpoint.replace("all and ", "");
            
            return breakpoint.replace(/\-|\(|\)|\s|:/gm, "");

        },

        addMQL: function(breakpoint, match, nomatch){
            
            var that = this, callback, key, sbp,
                bp = that.sanitizeBreakPoint(breakpoint);

            if(!that.MQLs[bp]){
                that.MQLs[bp] = {
                    match : {},
                    nomatch : {},
                    mql: undefined
                };
            }

            //being agressive here. Assume they are replacing the previous assignment
            that.MQLs[bp].match[match.name] = match.callback;
            that.MQLs[bp].nomatch[nomatch.name] = nomatch.callback;

            if(!that.MQLs[bp].mql){

                that.MQLs[bp].mql = window.matchMedia(breakpoint);

                that.MQLs[bp].mql.addListener(function(e){

                    sbp = that.sanitizeBreakPoint(e.media);
                
                    if (e.matches) {

                        if (that.MQLs[sbp] &&
                            that.MQLs[sbp].match){
                            
                            for (callback in that.MQLs[sbp].match) {
                                that.MQLs[sbp].match[callback]();
                            }

                        }

                    }else{

                        if (that.MQLs[sbp] &&
                            that.MQLs[sbp].nomatch){
                            
                            for (callback in that.MQLs[sbp].nomatch) {
                                that.MQLs[sbp].nomatch[callback]();
                            }

                        }

                    }

                });
                
            }

        },

        removeMQL: function(breakpoint, match, nomatch){
            
            var that = this,
                bp = that.sanitizeBreakPoint(breakpoint);

            if(!that.MQLs[bp]){
                return;
            }

            //remove callbacks here
            delete that.MQLs[bp].match["match"];
            delete that.MQLs[bp].nomatch["nomatch"];
            delete that.MQLs[bp].mql;
            delete that.MQLs[bp];

        }

    };

    bloomr.fn.init.prototype = bloomr.fn;

    return (window.bloomr = bloomr);


})(window);


