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

