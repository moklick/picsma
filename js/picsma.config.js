"use strict";
if (typeof picsma == undefined)
    window.picsma = {};

window.picsma = {
    filters: [
        {
            name: 'Black and White',
            variations: [
                {   name: 'Simple Grayscale',
                    func: function () {
                        picsma.filter.grayscale();
                    }
                },
                {
                    name: 'Error Diffusion',
                    func: function () {
                        picsma.filter.errorDiffusion();
                    }
                },
                {
                    name: 'Median',
                    func: function () {
                        picsma.filter.median(1);
                    }
                },
                {
                    name: 'Raster',
                    func: function () {
                        picsma.filter.raster(10);

                    }
                },
                {
                    name: 'tilt shift',
                    func: function () {
                        picsma.filter.tiltShift(.5,5);

                    }
                },
                {
                    name: "neuer Filter",
                    func: function(){
                        picsma.filter.raster(15);
                        picsma.filter.median(5);

                    }


                }


            ]
        },
        {}
    ],


    config: {
        maxW: 800,
        maxH: 600


    }
}

