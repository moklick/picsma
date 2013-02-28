$(document).ready(
		function() {
			handleDragDrop();
			handleSliderArea();
			setFilterActive();
			
			$("#canvas").click(function(){
				$("#uploadImg").click();
			});
			
			$("#uploadImg").change(function(){
				$("#uploadBtn").click();
			});
			
			$("#uploadtext").hover(function() {
				$('#textunderline').show();
			}, function() {
				$('#textunderline').hide();
			});

		});
		

var handleDragDrop = function(){
	/*
	 * Drag and Drop Image Upload -> HTML5 notwendig wegen File API und Drag and Drop API!:
	 */


	var dropzone = $("#canvas")[0];
	dropzone.addEventListener('drop', uploadFile, false);
	dropzone.addEventListener('dragover', dragHandler, false);
	dropzone.addEventListener('dragleave', dragHandler, false);
	var reader = new FileReader();
	
	
    function dragHandler(event) {  
        event.stopPropagation();  
        event.preventDefault();  
        if(event.type == "dragover"){
        	$("#canvas").addClass("highlight");
        	$("#canvas").css("opacity", "0.8");
        }
        else {
        	$("#canvas").removeClass("highlight");
        	$("#canvas").css("opacity", "1");
        }
    }  

	function uploadFile(event) {
	    dragHandler(event);
	    var data = event.dataTransfer.files;
	    file = data[0];
	    reader.readAsDataURL(file); 
	}

	reader.onload = function(evt){
		var imgData = evt.target.result;
		$("#imgData").text(imgData);
		$("#dndUpload").submit();
	}
	
	
	
};

var handleSliderArea = function(){
	$("#sliderArea").hide();
	$("#sliderArea").draggable();
	
	$("#settingsBtn").click(function(){
		$("#sliderArea").fadeIn("600");
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$("#sliderArea").fadeOut("600");
			
		}else{
			$(this).addClass('active');
		}
	});
};

		
