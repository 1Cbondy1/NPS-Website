$( document ).ready(function() {

    // hide 'About' information initially
    $("#info-hidden").hide();

    // onclick toggles the 'About' information's visibility
    $( "#about-link" ).click(function() {
        $("#info-hidden").slideToggle();
    });

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    });

    // determines the initial check-num value (0)
    parksVisited();

    // updates the check-num value anytime the page is clicked
    $( "body" ).click(function() {
        parksVisited();
    });

    // onclick function that updates the database's 'checked' values for the checkboxes
    $(document).on('click', "input.form-check-input", function() {   
        
        var parkChecked;
        var id = this.id;

        if ($(this).is( ":checked" )) {
            parkChecked = { id: id, checked: 1 };
        } else { 
            parkChecked = { id: id, checked: 0 };
        }
    
        $.ajax("/checked/" + id, {
            type: "PUT",
            data: parkChecked
            }).then(
                function() {
                console.log("Updated id: " + id);
            }
        );
    });

    // click function that removes all cards with unchecked boxes
    $( "#filter" ).click(function() {

        // find unchecked boxes and save as array
        var unchecked = document.querySelectorAll('input[type="checkbox"]:not(:checked)');

        // grab the id's of all unchecked boxes and remove cards with matching id's
        for (var k = 0; k < unchecked.length; k++) {
            var uncheckedId = unchecked[k].id;
            var uncheckedCol = document.querySelectorAll('.myCol[ data-id="' + uncheckedId + '"]');
            $(uncheckedCol).removeClass('show-card');
            $(uncheckedCol).addClass('hide-card');
        }
    });

    // click function that restores all cards
    $( "#reset" ).click(function() {
        var hidden = document.querySelectorAll('.hide-card');

        // grab the data-id's of all hidden cards and un-hides them
        for (var l = 0; l < hidden.length; l++) {
            var hiddenCol = document.querySelectorAll('.myCol[ data-id="' + hidden[l].dataset.id + '"]');
            $(hiddenCol).removeClass('hide-card');
            $(hiddenCol).addClass('show-card');
        }
    });
});

var queryURL = "https://developer.nps.gov/api/v1/parks?limit=50&start=50&q=National%20Park&fields=images,entranceFees,contacts,addresses&sort=-designation&api_key=yflsYenzvnQI9KvZVIiYrgee1zhKUiglWNoaPfa2"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    for (var i = 8; i < 29; i++) {

        var isChecked = "";

        $.ajax({
            url: "/select",
            method: "GET",
            success: function (data) {
                tmp = data;
            }
        }).then(function(data) {
            console.log(data);
        });

        var parkCardSpan = $("<span class='myCol show-card' data-id='" + i + "'>");
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
                "<input class='form-check-input' type='checkbox' value=''" + "id='" + i + "' data-id='" + i + "' " + isChecked + ">" +
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
                    "<div class='modal-body card-text' id='modal-des'><br><strong>Description:</strong><br>" + parkDes + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'><strong>Entrance Fee:</strong><br>" + parkCost + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'><strong>Park Office Address:</strong><br>" + parkStreet + "<br>" + parkCity + ", " + parkState + " " + parkZip + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'><strong>Phone Number:</strong><br>" + parkPhone + "</div>" +
                    "<div class='modal-body card-text' id='modal-des'><strong>Email Address:</strong><br>" + parkEmail + "</div>" +
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
    console.log("Number of parks checked: " + parkNum);

    $("#check-num").html(parkNum);

}