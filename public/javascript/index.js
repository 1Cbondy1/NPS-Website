var queryURL = "https://developer.nps.gov/api/v1/parks?limit=50&start=50&q=National%20Park&fields=images&sort=-designation&api_key=yflsYenzvnQI9KvZVIiYrgee1zhKUiglWNoaPfa2"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    var i;
    for (i = 8; i < 35; i++) {
        var parkCardSpan = $("<span class='col-m-4 col-sm'>");
        var parkName = response.data[i].fullName;
        var parkDes = response.data[i].description;
        var parkImg = response.data[i].images[0].url;

        var parkCard = 
        $("<span class='card' style='width: 18rem;'>" +
            "<img src='" + parkImg + "' class='card-img-top' alt='park-photo'>" +
            "<span class='card-body module'>" +
                "<h5 class='card-title'>" + parkName + "</h5>" +
                "<p class='card-text'>" + parkDes + "</p>" +
            "</span>" +
        "</span>");

        parkCardSpan.append(parkCard);
        $("#park-card").append(parkCardSpan);
    }

});