$(document).ready(function () {
    // declaring an array which stores the topics
    var topics = ['fear', 'anger', 'sadness', 'joy', 'happiness', 'surprise', 'excited', 'trust', 'disgust', 'shame', 'pity', 'envy', 'love', 'hate'];

    // this function clears topic area and creats one button for each topic using a for loop
    function createTopic() {
        $("#topics").empty();
        for (var i = 0; i < topics.length; i++) {
            var emotionbtn = $(`<button class='emotion' value='${topics[i]}'> ${topics[i]}</button>`);
            $("#topics").append(emotionbtn);
        }
    }

    //calling the function to create topic buttons
    createTopic();

    // this function creates new buttons for topics user request and clears the input field for user
    $(document).on("click", "#submit", function () {
        event.preventDefault();
        var newEmotion = $("#neShow").val().trim();
        topics.push(newEmotion);
        createTopic();
        $("#neShow").val(null);
    })

    // click on topic buttons will trigger an API call via this function
    $(document).on("click", ".emotion", function () {
        $("#giphyContainer").empty();
        // creating the url for ajax method
        emotion = $(this).val().trim();
        queryURL = `https://api.giphy.com/v1/gifs/search?q="${emotion}"&api_key=dc6zaTOxFJmzC&limit=10&&rating=pg`
        // calling API using ajax method
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // store the response
            var result = response.data;
            // if there is any result store and display needed data for each result
            console.log(result.length)

            // if(result.length>=1) {
                for (var j = 0; j < result.length; j++) {
                    // dynamicaly creating new element to display result in html
                    var newDiv = $(`<div class='gifImg' id="${j}"></div>`)
                    var giphyRate = $(`<p id="Rate">Rating: ${result[j].rating}</p>`);
                    var staticURL = result[j].images.original_still.url;
                    var dynamicURL = result[j].images.original.url;
                    console.log(giphyRate, staticURL, dynamicURL)
                    var giphyImage = $(`<img class='gifbtn' src='${staticURL}' state='still' staticImg='${staticURL}' dynamicImg='${dynamicURL}'>`);

                    // appending new tags to the html
                    $("#giphyContainer").append(newDiv);
                    $(`#${j}`).append(giphyRate);
                    $(`#${j}`).append(giphyImage);
                }
            // } else {
            //     var noRes = $("<div> No Result fo this emotion has been found</div>")
            //     $$("#giphyContainer").append(noRes);
            // }
        });
    });

    // this function will change the status of giphy when user clicks on it
    $(document).on("click", ".gifbtn", function () {
        var status = $(this).attr("state");
        // if image is still clicking on it will make it dynamic
        if (status === "still") {
            var dynSrc = $(this).attr("dynamicImg");
            $(this).attr("src", dynSrc);
            $(this).attr("state", "dynamic");
        }
        // otherwise click results in making image still
        else {
            var stlSrc = $(this).attr("staticImg");
            $(this).attr("src", stlSrc);
            $(this).attr("state", "still")
        }
    })


});

