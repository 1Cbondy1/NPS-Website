$( document ).ready(function() {

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })

    $('.carousel').carousel()

    // determines the initial check-num value (0)
    parksVisited();

    // updates the check-num value anytime the page is clicked
    $( "body" ).click(function() {
        parksVisited();
    });

});

var queryURL = "https://developer.nps.gov/api/v1/parks?limit=50&start=50&q=National%20Park&fields=images,entranceFees,contacts,addresses&sort=-designation&api_key=yflsYenzvnQI9KvZVIiYrgee1zhKUiglWNoaPfa2"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    for (var i = 8; i < 38; i++) {
        var parkCardSpan = $("<span class='col-m-4 col-sm'>");
        var parkFull = response.data[i].fullName;
        var parkDes = response.data[i].description;
        var parkImg = response.data[i].images[0].url;
        var parkState = response.data[i].states;
        var parkCity = response.data[i].addresses[0].city;
        var parkZip = response.data[i].addresses[0].postalCode;
        var parkStreet = response.data[i].addresses[0].line1;

        var parkPhone;
        var parkCost;
        var parkEmail;
        
        // Determine if phone number exists
        if (response.data[i].contacts.phoneNumbers[0].phoneNumber) {
            parkPhone = response.data[i].contacts.phoneNumbers[0].phoneNumber;
        } else {
            parkPhone = "No information available."
        }

        // Determine if entrance fee cost exists
        var costTemp = response.data[i].entranceFees[0].cost;

        if (costTemp) {
            if (costTemp == 0) {
                parkCost = "No entrance fee."
            } else {
                parkCost = "$" + ~~costTemp;
            }
        } else {
            parkCost = "No information available."
        }

        // Determine if email address exists
        if (response.data[i].contacts.emailAddresses[0].emailAddress) {
            parkEmail = response.data[i].contacts.emailAddresses[0].emailAddress;
        } else {
            parkEmail = "No information available."
        }

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
                "<h5 class='card-title'>" + parkFull + "</h5>" +
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
                        "<h5 class='modal-title' id='exampleModalLabel'>" + parkFull + " - " + parkState + "</h5>" +
                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                        "<span aria-hidden='true'>&times;</span>" +
                        "</button>" +
                    "</div>" +

                    "<img src='" + parkImg + "' class='card-img-top modal-img' alt='park-photo'>" +
                    "<div class='modal-body card-text' id='modal-des'>Description:<br>" + parkDes + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'>Entrance Fee:<br>" + parkCost + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'>Park Office Address:<br>" + parkStreet + "<br>" + parkCity + ", " + parkState + " " + parkZip + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'>Phone Number:<br>" + parkPhone + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'>Email Address:<br>" + parkEmail + "</div>" +
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