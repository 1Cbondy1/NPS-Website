$( document ).ready(function() {

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })

    // determines the initial check-num value (0)
    parksVisited();

    // updates the check-num value anytime the page is clicked
    $( "body" ).click(function() {
        parksVisited();
    });

});

var queryURL = "https://developer.nps.gov/api/v1/parks?limit=50&start=50&q=National%20Park&fields=images,entranceFees&sort=-designation&api_key=yflsYenzvnQI9KvZVIiYrgee1zhKUiglWNoaPfa2"

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
        var parkState = response.data[i].states;

        // var parkCost;

        // if (response.data[i].entranceFees == null || response.data[i].entranceFees == undefined || response.data[i].entranceFees == "undefined") {
        //     parkCost = "No cost information exists.";
        //     return;
        // } else if (response.data[i].entranceFees[1].cost == null || response.data[i].entranceFees == undefined || response.data[i].entranceFees == "undefined") {
        //     parkCost = "No cost information exists.";
        //     return;
        // } else {
        //     parkCost = response.data[i].entranceFees[1].cost;
        // }

        var parkCard = 
        $("<span class='card' data-id='" + i + "' style='width: 18rem;'>" +

            // Card checkbox
            "<div class='form-check'>" +
                "<input class='form-check-input' type='checkbox' value=''" + "id='defaultCheck1' data-id='" + i + "'>" +
                " <label class='form-check-label' for='defaultCheck1'></label>" +
            "</div>" +

            // Card image and body
            "<img src='" + parkImg + "' class='card-img-top' alt='park-photo'>" +
            "<span id='card-position' class='card-body module'>" +
                "<h5 class='card-title'>" + parkName + "</h5>" +
                "<p class='card-text'>" + parkDes + "</p>" +

                // Text fade
                "<span id='white-fade'></span>'" +
            "</span>" +

            // Button trigger modal
            "<button type='button' class='btn btn-success' data-toggle='modal' data-target='#exampleModal-" + i + "'>See more...</button>" +
        "</span>");

        var modalDiv =
        $("<div class='modal fade' id='exampleModal-" + i + "' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>" +
            "<div class='modal-dialog' role='document'>" +
                "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                        "<h5 class='modal-title' id='exampleModalLabel'>" + parkName + "</h5>" +
                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                        "<span aria-hidden='true'>&times;</span>" +
                        "</button>" +
                    "</div>" +
                    "<div class='modal-body card-text' id='modal-des'>Description: " + parkDes + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'>State: " + parkState + "</div>" +
                    "<div class='modal-footer'>" +
                        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>");

        parkCardSpan.append(parkCard);
        $("#park-card").append(parkCardSpan);
        $("#modal-div").append(modalDiv);
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
