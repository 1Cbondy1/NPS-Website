$( document ).ready(function() {

    // determines the initial check-num value (0)
    parksVisited();

    // updates the check-num value anytime the page is clicked
    $( "body" ).click(function() {
        parksVisited();
    });

});

var queryURL = "https://developer.nps.gov/api/v1/parks?limit=50&start=50&q=National%20Park&fields=images&sort=-designation&api_key=yflsYenzvnQI9KvZVIiYrgee1zhKUiglWNoaPfa2"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    var i;
    for (i = 8; i < 38; i++) {
        var parkCardSpan = $("<span class='col-m-4 col-sm'>");
        var parkName = response.data[i].fullName;
        var parkDes = response.data[i].description;
        var parkImg = response.data[i].images[0].url;

        var parkCard = 
        $("<span class='card' data-id='" + i + "' style='width: 18rem;'>" +
            "<div class='form-check'>" +
                "<input class='form-check-input' type='checkbox' value=''" + "id='defaultCheck1' data-id='" + i + "'>" +
                " <label class='form-check-label' for='defaultCheck1'></label>" +
            "</div>" +
            "<img src='" + parkImg + "' class='card-img-top' alt='park-photo'>" +
            "<span class='card-body module'>" +
                "<h5 class='card-title'>" + parkName + "</h5>" +
                "<p class='card-text'>" + parkDes + "</p>" +
            "</span>" +
        "</span>");

        parkCardSpan.append(parkCard);
        $("#park-card").append(parkCardSpan);
    }

    // updates check-num value after ajax request
    parksVisited();

    $(".placeholder").remove();
});

// function that counts checked boxes and displays the value
function parksVisited() {
    var parkNum = document.querySelectorAll('input[type="checkbox"]:checked').length;
    console.log(parkNum);

    $("#check-num").html(parkNum);
}