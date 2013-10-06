var submitName = "",
    submitAddress = "",
    submitLat = "",
    submitLong = "";

$(function() {

    $('#place-search-button').click(function(e) {
        e.preventDefault();
        var name = $('#venue-name').val();
        var zip = $('#zip-code').val();

        var requestData = {name: name, zip: zip};

        $.get('/test-query', requestData, function(data) {
            $('#search-form').hide();
            var list = $('#search-results');
            list.html("");
            for (var i = 0, len = data.objects.length; i < len; i++) {
                var venue = data.objects[i];
                //console.log(venue);
                var venueName = venue.name;
                var address = venue.street_address;
                var link = venue.website_url;
                var lat = venue.lat;
                var longitude = venue.long;
                var html = '<a href="#" class="list-group-item place-result" id="place'+i+'"><h4 class="list-group-item-heading">' + venueName + '</h4><p class="list-group-item-text">' + address + '</p></a><input type="hidden" name="venueName'+i+'" value="'+ venueName + '"><input type="hidden" name="address'+i+'" value="'+ address +'"><input type="hidden" name="lat'+i+'" value="' + lat +'"><input type="hidden" name="longitude'+i+'" value="' + longitude + '">';
                var elem = $(html).appendTo(list);

                $(elem).click(function(e) {
                    e.preventDefault();
                    var id = $(this)[0].id.substring(5);
                    var venueName = $('input[name=venueName' + id + ']').val();
                    console.log(venueName);
                    var address = $('input[name=address' + id + ']').val();
                    console.log(address);
                    var lat = $('input[name=lat' + id + ']').val();
                    var longitude = $('input[name=longitude' + id + ']').val();
                    $('#specify-place').text("You selected: ");
                    $('#search-results').hide();
                    $('#place-search-back').hide();
                    $('#selected-place').text(venueName);
                    $('#selected-place').show();
                    $('#change-place').show();


                    submitName = venueName;
                    submitAddress = address;
                    submitLat = lat;
                    submitLong = longitude;
                });
            }
            $('#place-search-back').show();
            list.show();
        }); 

        $('#selected-place').hide();

        

    });

    $('#place-search-back').click(function(e) {
        e.preventDefault();
        $('#selected-place').hide();
        $('#place-search-back').hide();
        $('#search-results').hide();
        $('#venue-name').val("");
        $('#zip-code').val("");
        $('#search-form').show();
    });

    

    $('#change-place').click(function(e) {
        e.preventDefault();
        $('#search-form').show();

        $('#specify-place').text("Specify a Business: ");

        $('#selected-place').hide();
        $('#change-place').hide();

        $('#venue-name').val("");
        $('#zip').val("");

        submitName = "";
        submitAddress = "";
        submitLat = "";
        submitLong = "";
    });

    
    $('#requestForm').submit(function(e) {
        // gather input fields and submit
        e.preventDefault();

        var itemInput = $('#itemInput').val();
        var detailInput = $('#detailInput').val();
        var priceInput = $('#priceInput').val();

        
        var requestData = {item: itemInput, details: detailInput, price: priceInput, venueName: submitName, venueAddr: submitAddress, venueLat: submitLat, venueLong: submitLong};


        $.post('/requests/new', requestData, function(data){
            var html ='<div class="row"><div class="col-md-12"><div class="panel"><div class="col-md-9"><div class="row"><div class="col-md-12"><h4><b>Not Yet Accepted</b></h4></div></div><div class="row"><div class="col-md-12"><h4>'+data.item+'</h4></div></div><div class="row"><div class="col-md-12">'+data.details+'</div></div><div class="row"><div class="col-md-12">Paying: '+data.price+'</div></div><div class="row"><div class="col-md-12">'+data.address+data.city+data.state+data.zip+'</div></div></div><div class="col-md-3"><div class="row"><div class="col-md-12 text-center"><button type="button" class="btn btn-danger button-center-vertical">Cancel Request</button></div></div></div></div></div></div>';
            $('#submittedRequestsTitleRow').after(html);
        } )
    });

    $('.cancelButton').click(function(e){
        e.preventDefault();

        var id = $(this).id.substring(13);
        var requestID = $("input[name=userRequestID"+id+"]").val();

        $.post('/requests/delete', {id: requestID}, function(data){
            $("#row-"+id).remove();
        })
    });

    $('.venmoPayButton').click(function(e){
        e.preventDefault();

        var id = $(this).id.substring(9);
        var requestID = $("input[name=userRequestID"+id+"]").val();

        $.post('/requests/makePayment', {id: requestID}, function(data){

        })
    });

    $('.itemAcquiredButton').click(function(e){
        e.preventDefault();

        var id = $(this).id.substring(14);
        var requestID = $("input[name=acceptedRequestID"+id+"]").val();

        $.post('/requests/itemAcquired', {id: requestID}, function(data){

        })
    });

    $('.itemDeliveredButton').click(function(e){
        e.preventDefault();

        var id = $(this).id.substring(14);
        var requestID = $("input[name=acceptedRequestID"+id+"]").val();

        $.post('requests/itemDelivered', {id: requestID}, function(data){

        })
    });

});