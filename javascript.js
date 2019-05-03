let videogames = ["n64", "virtual boy", "super nintendo", "game boy color", "sega genesis", "game gear", "sony ps1", "mario 64", "green hill zone", "crash bandicoot", "spyro the dragon", "banjo kazooie", "pokemon red", "ocarina of time"]

let isRatingDisplayed = true;

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
    restrictions = "&limit=10&rating=pg-13";
    queryURL = baseURL + searchTerm + apiKey + restrictions
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

                //building new imageWrapper (to allow absolute position of rating)
                var imageWrapper = $("<div>")
                imageWrapper.css("position", "relative");
                imageWrapper.css("display", "inline-block");
                $(".gifs").prepend(imageWrapper);

                //building new gif
                var newImage = $("<img>");
                newImage.css("display", "inline-block");
                newImage.attr("class", "gif");
                newImage.attr("data-state", "still");
                newImage.attr("src", data[i].images.fixed_height_small_still.url);
                newImage.attr("data-still", data[i].images.fixed_height_small_still.url);
                newImage.attr("data-animate", data[i].images.fixed_height_small.url);
                imageWrapper.append(newImage)

                //attaching rating to each gif
                var newRating = $("<p>");
                newRating.text(data[i].rating);
                newRating.attr("class", "rating");
                imageWrapper.append(newRating);
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
    buildQueryURL(searchTerm);
})

//dynamically adding new buttons as soon as search terms are added to the videogames array
$("#gifs-button").on("click", function () {
    // event.preventDefault(); is unnecessary since I'm not using a form
    userInput = $("#input").val();
    if (userInput === "") {
        alert("you have to choose a topic!")
    //check for weirdos
    } else if (userInput ==="butt farts") {
        alert("nice try, Mark");
    } else if (userInput ==="poop" || userInput === "fart") {
        alert("why? just, why?")
    //re-render buttons
    } else {
        videogames.push(userInput);
        renderButtons();
    }
});

//clears all displayed gifs
$("#delete-gifs").on("click", function () {
    $(".gifs").empty();
})

//shows or hides rating on gifs
$("#ratings-button").on("click", function () {
    if (isRatingDisplayed) {
        !isRatingDisplayed;
        $(".rating").toggle();
    } else {
        !isRatingDisplayed
        $(".rating").toggle();
    }
    
})

//initial render of buttons on page load
renderButtons();