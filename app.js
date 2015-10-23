(function() {
  var service = new google.maps.places.PlacesService($('#showData')[0]);
  var sanFrancisco = {lat: 37.7855279, lng: -122.3964711};

  $('button').on('click', function(event) {
    var query = $('#searchTerm').val();
    $('tr').remove();
    if (query == '') {
      return;
    }
    //do the initial search for the places
    service.textSearch({
      query: query,
      location: sanFrancisco,
      radius: 3000
    }, textSearchCallback);

    function textSearchCallback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //add the table headers here instead of in the HTML because otherwise the columns would shift slightly
        var headers =
          '<tr>' +
          '<th>Name</th>' +
          '<th>Rating</th>' +
          '<th>Address</th>' +
          '<th>Phone Number</th>' +
          '<th>Website</th>' +
          '</tr>';
        $('.display').append(headers);
        for (var i = 0; i < results.length; i++) {
          var currentPlace;
          var placeId = results[i].place_id;
          //then get the specific place's details
          service.getDetails({
            placeId: placeId
          }, getDetailsCallback);
        }
      }
    }

    function getDetailsCallback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(place);
        if (place.website == undefined) {
          var website = '';
        } else {
          var website = '<a href="' + place.website + '">' + place.website + '</a>'
        }
        currentPlace =
          '<tr>' +
            '<td>' + (place.name || '') + '</td>' +
            '<td>' + (place.rating || '') + '</td>' +
            '<td>' + (place.formatted_address || '') + '</td>' +
            '<td>' + (place.formatted_phone_number || '') + '</td>' +
            '<td>' + website + '</td>' +
          '</tr>';
        $('.display').append(currentPlace);
        $('#searchTerm').val('');
      }
    }


  });
})();
