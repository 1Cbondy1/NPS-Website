var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=&api_key=yflsYenzvnQI9KvZVIiYrgee1zhKUiglWNoaPfa2"

$.ajax({
    url: queryURL,
    method: "GET"
}) .then(function(response) {
    parkImg = response.data[1].images.url;
    
});