function requestParser(requestObject, callback){
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
	                                <h4>'+requestObject.item+'</h4>
	                            </div>
	                        </div>
	                        <div class="row">
	                          <div class="col-md-12">'
	                            +requestObject.details+
	                          '</div>
	                        </div>
	                        <div class="row">
	                            <div class="col-md-12">
	                                Paying: '+requestObject.price+
	                            '</div>
	                        </div>
	                        <div class="row">
	                            <div class="col-md-12">'
	                                +requestObject.address+requestObject.city+requestObject.state+requestObject.zip+
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
	        </div>';
	return html;
}