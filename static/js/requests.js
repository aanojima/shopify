$(function() {
	
	$('#requestForm').submit(function(e) {
		// gather input fields and submit
		e.preventDefault();

		var itemInput = $('#itemInput').val();
		var detailInput = $('#detailInput').val();
		var priceInput = $('#priceInput').val();
		var locationNeeded = $("input[name=store]:checked").val();
		
		var addressInput
		var cityInput
		var stateInput
		var zipInput

		if (locationNeeded == "Yes"){
			addressInput = $('#addressInput').val();
			cityInput = $('#cityInput').val();
			stateInput = $('stateInput').val();
			zipInput = $('zipInput').val();
		} else {
			addressInput = 'No address requested.';
			cityInput = '';
			stateInput = '';
			zipInput = '';
		}
		
		var requestData = {item: itemInput, details: detailInput, price: priceInput, address: addressInput, city: cityInput, state: stateInput, zip: zipInput};

		$.post(/requests/new, requestData, function(data){
			var html = 
			'<div class="row">
            	<div class="col-md-12">
                	<div class="panel">
                    	<div class="col-md-9">
                        	<div class="row">
                            	<div class="col-md-12">
                                	<h4><b>Not Yet Accepted</b></h4>
                            	</div>
                        	</div>
                        	<div class="row">
	                            <div class="col-md-12">
	                                <h4>'+data.item+'</h4>
	                            </div>
	                        </div>
	                        <div class="row">
	                          <div class="col-md-12">'
	                            +data.details+
	                          '</div>
	                        </div>
	                        <div class="row">
	                            <div class="col-md-12">
	                                Paying: '+data.price+
	                            '</div>
	                        </div>
	                        <div class="row">
	                            <div class="col-md-12">'
	                                +data.address+data.city+data.state+data.zip+
	                            '</div>
	                        </div>
	                    </div>
	                    <div class="col-md-3">
	                        <div class="row">
	                            <div class="col-md-12 text-center">
	                                <button type="button" class="btn btn-danger button-center-vertical">Cancel Request</button>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>'
			$('#submittedRequestsTitleRow').after(html);
		} )
	});

});