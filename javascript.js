let videogames = ["nintendo", "n64", "virtual boy", "super nintendo", "game boy", "sega", "sega saturn", "sega genesis", "sega nomad", "sega game gear", "sony", "playstation"]

function renderButtons() {
    $(".buttons-container").empty();

    for (let i = 0; i < videogames.length; i++){
        let button = $("<button>");
        button.addClass("button");
        button.attr("data-name", videogames[i]);
        button.text(videogames[i]);
        $(".buttons-container").append(button);
    }
}

//whenever a gif button is clicked, this function runs, which then calls the getGIFS function
function buildQueryURL(searchTerm) {
    baseURL = "https://api.giphy.com/v1/gifs/search?q=";
    apiKey = "&api_key=0390oddk4iEFytYmuT0Y4rBFADo3F1j0";
    limit = "&limit=10";
    queryURL = baseURL + searchTerm + apiKey + limit
    getGIFS(queryURL);
}

//calls GIFS from the GIPHY API
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

//event delegation to add listener to all buttons (whether or not they are in original array)
$(document.body).on("click", ".button", function() {
    let searchTerm = $(this).data("name")
    console.log("searchTerm: " + searchTerm)
    buildQueryURL(searchTerm);
})

//dynamically adding new buttons as soon as search terms are added to the videogames array
$("#gifs-button").on("click", function () {
    // event.preventDefault(); is unnecessary since I'm not using a form
    userInput = $("#input").val();
    videogames.push(userInput);
    renderButtons();
});

//clears all displayed gifs
$("#delete-gifs").on("click", function () {
    $(".gifs").empty();
})

//initial render of buttons on page load
renderButtons();