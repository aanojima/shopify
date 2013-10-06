
var defaultData = {lat: 0, long: 0};

var getFeed = function(data) {
	$.get('/get-feed', data, function(data) {
		for (var i = 0, len = data.objects.length; i < len; i++) {
			var request = data.objects[i];
			var offer = request.offer;
			var item = request.item;
			var details = request.details;
			var id = request.id;
			var loc = request.place.venueName ? request.place.venueName : "Anywhere!"
			var html = '<div class="feed-item"><div class="media"><div class="pull-left" href="#"><span></span></a><div class="pull-right accept-unit"><p class="offer">$'+offer+'</p><button class="btn accept-btn" id="accept'+id+'" href="#">Accept Offer</button></div><div class="media-body feed-item-body"><h4 class="media-heading">'+item+'</h4><span class="where">From: <span class="feed-loc">'+loc+'</span></span><br><br>'+details+'</div></div></div>';
			
			var container = $('#feed-container');
			container.append(html);
		}

		$('.accept-btn').click(function(e) {
			e.preventDefault();
			var id = $(this).id.substring(6);

			$.post('/acceptUser', {id: id}, function(data) {

			});
		})
	});
}

$(function() {
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			var requestData = {lat: position.coords.latitude, long: position.coords.longitude};
			getFeed(requestData);
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	}
	// Browser doesn't support Geolocation
	else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
	function handleNoGeolocation(errorFlag) {
		if (errorFlag == true) {
			alert("Geolocation service failed. Using 0 lattitude and longitude");
			getFeed(defaultData);
		} else {
			alert("Your browser doesn't support geolocation. Using 0 latitude and longitude");
			getFeed(defaultData);
		}
	}


});