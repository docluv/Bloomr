
;

(function (window, undefined) {

    var settings = {},
        bloomr = function () {

        var that = new bloomr.fn.init(customSettings);



        return that;
    };

    bloomr.fn = bloomr.prototype = {

        constructor: bloomr,

        init: function () {
           
            return this;
        },

        version: "0.0.1"



    };

    bloomr.fn.init.prototype = bloomr.fn;

    return (window.bloomr = bloomr);


})(window);


