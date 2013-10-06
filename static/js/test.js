$('#search-form').submit(function(e) {
	e.preventDefault();
	var name = $('#venue-name').val();
	var zip = $('#zip-code').val();

	var requestData = {name: name, zip: zip};

	$.get('/test-query', requestData, function(data) {
		var list = $('#search-results');
		list.html();
		for (var i = 0, len = data.objects.length; i < len; i++) {
			var venue = data.objects[i];
			console.log(venue);
			var venueName = venue.name;
			var address = venue.street_address;
			var link = venue.website_url;
			var html = '<a href="' + link + '" class="list-group-item"><h4 class="list-group-item-heading">' + venueName + '</h4><p class="list-group-item-text">' + address + '</p></a>';
			list.append(html);
		}
	});	
});