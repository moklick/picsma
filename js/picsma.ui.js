$(document).ready(function() {
	PicsmaUI.init();
});

var PicsmaUI = {
    contrastSlider:null,
    brightnessSlider:null,
    saturationSlider:null,
	init: function() {
		this.handleNavigation();
		this.handleSettings();
		this.handleFilterButtons();
		this.handleDownload();
		this.handleUpload();
	},

	handleDownload: function() {
		$('#save-button').click(function(e) {
			e.preventDefault();
			var c = $('#canvas')[0],
				imageData = c.toDataURL("image/png"),
				imageName = "picsma";

			imageData = imageData.substr(imageData.indexOf(',') + 1).toString();

			$('.imgData').val(imageData);
			$('.imgName').val(imageName);
			$('#save').submit();
		})
	},

	handleUpload: function() {
		$('#upload-button').click(function(e) {
			e.stopPropagation();
			e.preventDefault();
			$('#uploader').click();
		});

		$('#uploader').on('change', function() {
			var files = $(this)[0].files;
			uploadFile(files[0]);
			return false;
		});
	},

	handleNavigation: function() {
		$("nav ul span").click(function() {
			// set all buttons to inactive
			$("nav ul span").parents('li').removeClass('active');
			//set current button active
			$(this).parents('li').addClass('active');
			var requestedPage = $(this).attr("id") + ".html";
			$(".text-container").fadeOut("fast", function() {
				$(".text-container").load("static-pages/" + requestedPage, function() {
					$(".text-container").fadeIn();
				});
			});
			if (!$(".info-container").hasClass("active")) {
				$(".info-container").addClass("active");
			}
		});
		$("#content-close").click(function() {
			$(".info-container").removeClass("active");
			$("nav ul span").parents('li').removeClass('active');
		});
	},

	handleFilterButtons: function() {

		//handle category buttons
		$(".filter-button").click(function() {
			$('.filter-button').removeClass('active');
			$(this).addClass('active');
		});
	},

	getSliderValues : function(){

        return [this.contrastSlider.val, this.brightnessSlider.val, this.saturationSlider.val];
	},
    handleSettings: function(){
        this.contrastSlider=new Slider(0,2,.01,1,12,215);
        document.getElementById('contrast').appendChild(this.contrastSlider.canvas);

        this.brightnessSlider=new Slider(-256,256,1,0,12,215);
        document.getElementById('brightness').appendChild(this.brightnessSlider.canvas);

        this.saturationSlider=new Slider(0,2,.01,1,12,215);
        document.getElementById('saturation').appendChild(this.saturationSlider.canvas);
        resetSliders();
        updateInputfields();

        function resetSliders(){




        }

        function updateInputfields(){
            $('#contrast-value').val(PicsmaUI.contrastSlider.val.toFixed(2));
            $('#brightness-value').val(PicsmaUI.brightnessSlider.val.toFixed(2));
            $('#saturation-value').val(PicsmaUI.saturationSlider.val.toFixed(2));
        }

        function showSettings(){
            updateInputfields();
            updateBCS(PicsmaUI.brightnessSlider.val,PicsmaUI.contrastSlider.val,PicsmaUI.saturationSlider.val);
        }

        this.contrastSlider.onChange=function(){
            showSettings();
        }

        this.brightnessSlider.onChange=function(){
            showSettings()
        }

        this.saturationSlider.onChange=function(){
            showSettings()
        }

    }
}

	/* handleSettings: function() {

		var setSliderValues = function(){
			var values = PicsmaUI.getSliderValues();

			$("#contrast-value").val(values[0]);
			$("#brightness-value").val(values[1]);
			$("#saturation-value").val(values[2]);
		};

		var handleSliderMovement = function(evt) {
			if(typeof evt.cancelable != "undefined"){
				var values = PicsmaUI.getSliderValues();

				setSliderValues();
				updateBCS(values[1],values[0],values[2]);
			}
		};

		//toggle settings -contrast, saturation, exposure
		$("#settings-button").click(function() {
			$("#slider-container").fadeIn("600");
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$("#slider-container").fadeOut("600");

			} else {
				$(this).addClass('active');
				PicsmaUI.resetSlider();
			}
		});

		$("#slider-container").hide();
		$("#slider-container").draggable();

		//set initial values and handle onslide event
		$("#slider-container > div").each(function() {
			var id = $(this).attr("id");
			var val = 0;
			var min = 0;
			var max = 0
			var step_width = 1;

			//initial values for contrast, brightness and exposure
			switch (id) {
				case "contrast":
					min = 0;
					max = 2;
					val = 1;
					step_width = 0.02;
					break;
				case "brightness":
					min = -128;
					max = 128;
					val = 0;
					break;
				case "saturation":
					min = 0;
					max = 2;
					val = 1;
					step_width = 0.02; 
					break;
			}

			$(this).slider({
				range: "min",
				value: val,
				min: min,
				max: max,
				step: step_width,
				slide: function(evt, ui) {
					handleSliderMovement(evt);
				},
				change: function(evt, ui) {
					handleSliderMovement(evt);
				}
			});
		});

		//handle close button
		$('#settings-close').click(function(e) {
			$('#settings-button').removeClass('active');
			$("#slider-container").fadeOut("250");
		});

		setSliderValues();
	},

	resetSlider: function() {
		$('#contrast').slider("option", "value", 1);
		$('#brightness').slider("option", "value", 0);
		$('#saturation').slider("option", "value", 1);
	}


}

	function updateImage(contrast, brightness) {

		//ctx.drawImage(image, 0, 0);
		imgd = originalImageData;

		//imgd = ctx.getImageData(0,0,image.width, image.height);

		pix = imgd.data

		for (var i = 0, n = pix.length; i < n; i += 4) {
			//read pixel values
			var r = pix[i];
			var g = pix[i + 1];
			var b = pix[i + 2];
			var alpha = pix[i + 3];

			var lum = 0.299 * r + 0.587 * g + 0.114 * b;
			var cb = -0.168736 * r - 0.331264 * g + 0.5 * b;
			var cr = 0.5 * r - 0.418688 * g - 0.081312 * b;

			lum = contrast * (lum - 127.5) + 127.5 + brightness;

			r = (lum + 1.402 * cr);
			g = (lum - 0.3441 * cb - 0.7141 * cr);
			b = (lum + 1.772 * cb);

			pix[i] = r;
			pix[i + 1] = g;
			pix[i + 2] = b;
			pix[i + 3] = alpha;
		}

		ctx.putImageData(imgd, 0, 0);
	}  */