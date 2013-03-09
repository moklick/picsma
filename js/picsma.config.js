if (typeof picsma == undefined)
	window.picsma= {};

window.picsma={
	filters:[
	{
		name: 'Black and White',
		variations:[ 
		{   name: 'Simple Grayscale',
		func: function () {
			picsma.filter.grayscale();
		}
	},
	{
		name: 'Black and White Bitmap',
		func: function () {
			picsma.filter.grayscale();
			picsma.filter.errorDiffusion();
		}
	},
	{
		name: 'Pointilist Black and White',
		func: function(){
			picsma.filter.errorDiffusion();
			picsma.filter.grayscale();
			picsma.filter.median(1);
		}
	}]
},
{}
],



config : {
	maxW: 800,
	maxH: 600


}
}

