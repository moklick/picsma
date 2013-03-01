$(document).ready(function() {
    initSliders();
	handleSettingsButton();
	handleCategorieButtons();
	resetSlider();
});

var handleSettingsButton = function(){
	//toggle settings -contrast, saturation, exposure
	$("#slider-container").hide();
	$("#slider-container").draggable();
	
	$("#settings-button").click(function(){
		console.log($(this));
		$("#slider-container").fadeIn("600");
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$("#slider-container").fadeOut("600");
			
		}else{
			$(this).addClass('active');resetSlider
		}
	});
};

var initSliders = function(){
		//set initial values and handle onslide event
		$("#slider-container > div").each(function(){
			var id = $(this).attr("id");
			var val = 0;
			var min = 0;
			var max = 0
			var divisor = 1;
			var step_width = 1;
			
			//initial values for contrast, brightness and exposure
			switch (id){
				case "contrast":min = 100; max = 1000; val = 100; divisor = 100; step_width = 5; break;
				case "brightness": min = -128; max = 128; val = 0;break;
				case "saturation": min = 0; max = 100; val = 0; divisor = 10; break;
				default: val = 50;break;
			}

			$("#" + id).slider({
				range: "min",
				value: val,
				min: min,
				max: max,
				step : step_width,
				slide: function( event, ui ) {
					var contrast = $('#contrast').slider("value")/100;
					var brightness = $('#brightness').slider("value");
					var saturation = $('#saturation').slider("value");
					//updateImage(contrast, brightness);
			}});	
		});
};

var handleCategorieButtons = function(){
		$("#filter-categories div").click(function() {
			currentCategory = $(this).attr("id");		
			$('.filter-button').click(function(){
				$('.filter-button').removeClass('active');
				$(this).addClass('active');
		});	
			});


};

var resetSlider = function(){	
	$('#contrast').slider( "option", "value", 1 );
	$('#brightness').slider( "option", "value", 0);
	$('#saturation').slider( "option", "value", 0);	
};

function updateImage(contrast, brightness) {
	
	//ctx.drawImage(image, 0, 0);
	imgd = originalImageData;

	//imgd = ctx.getImageData(0,0,image.width, image.height);

	pix = imgd.data

	for(var i = 0, n = pix.length; i < n; i += 4) {
		//read pixel values
		var r = pix[i];
		var g = pix[i + 1];
		var b = pix[i + 2];
		var alpha = pix[i + 3];
		
		var lum = 0.299 * r + 0.587 * g + 0.114 * b;
		var cb = -0.168736 * r - 0.331264 * g + 0.5 * b;
		var cr = 0.5 * r - 0.418688 * g - 0.081312 * b;
		
		lum = contrast*(lum - 127.5) + 127.5 + brightness;
		
		r = (lum + 1.402 * cr);
		g = (lum - 0.3441 *cb - 0.7141* cr);
		b = (lum + 1.772 * cb);
		
		pix[i] = r;
		pix[i + 1] = g;
		pix[i + 2] = b;
		pix[i + 3] = alpha;
	}
	
	ctx.putImageData(imgd, 0, 0);
}