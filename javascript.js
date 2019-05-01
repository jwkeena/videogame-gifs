function getGIFS (queryURL) {
    $.ajax(
        {url: queryURL,
        method: "GET"})
        .then(function (response) {
            console.log(response.data)
            let data = response.data;
            for (i=0; i < data.length; i++){
                var newImage = $("<img>");
                newImage.css("display", "inline-block");
                newImage.attr("class", "gif");
                newImage.attr("data-state", "still");
                newImage.attr("src", data[i].images.fixed_height_small_still.url);
                newImage.attr("data-still", data[i].images.fixed_height_small_still.url);
                newImage.attr("data-animate", data[i].images.fixed_height_small.url);
                $(".gifs").prepend(newImage)
            }
        }
    )
}

$(document.body).on("click", ".request-gifs", function () {
    baseURL = "http://api.giphy.com/v1/gifs/search?q=";
    buttonValue = $(this).val();
    console.log
    apiKey = "&api_key=0390oddk4iEFytYmuT0Y4rBFADo3F1j0";
    limit = "&limit=10";
    queryURL = baseURL + buttonValue + apiKey + limit
    getGIFS(queryURL);
})

//event delegation to add listener to start or stop gif animation
$(document.body).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#gifs-button").on("click", function () {
    //building queryURL
    baseURL = "http://api.giphy.com/v1/gifs/search?q=";
    userInput = $("#input").val();
    console.log(userInput)
    apiKey = "&api_key=0390oddk4iEFytYmuT0Y4rBFADo3F1j0";
    limit = "&limit=10";
    queryURL = baseURL + userInput + apiKey + limit
    getGIFS(queryURL);
});

$("#delete-gifs").on("click", function () {
    $(".gifs").empty();
})