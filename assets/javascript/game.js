//when document ready
$(document).ready(function() {

//declare variable
var animals=["Michael Jordan", "Cat", "Mouse", "Bird", "Tiger", "Fish", "Pig", "Horse", "Butterfly"];

//hide divImage
$("#divImage").hide();

//add the button
renderButtons();

//function to add the buttons
function renderButtons() {
    $("#buttonList").empty();
    for (var i = 0; i < animals.length; i++) {
    	var charButton = $("<button>").html(animals[i]);
    	charButton.attr("name",animals[i]);
    	charButton.addClass("btn btn-info animalButton");
    	$("#buttonList").append(charButton);
    };
}

//show the pictures when the button clicked
$(document).on("click", ".animalButton", function() {
	$("#divImage").show();
	$("#imageList").empty();
	var animal =($(this).attr("name"));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=15";
	// alert(animal);
    $.ajax({
        url: queryURL,
        method: 'GET'
        }).done(function(response) {
			var results = response.data;
            console.log(response);
       		for (var i = 0; i < results.length; i++) {
       		var imageDiv = $("<span class='picture' id='" + results[i].id + "'>");
    		var animalRating = $("<p>").text("Image Rating : "+results[i].rating);
    		var animalImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("value","1");
            animalImage.attr("moving", results[i].images.fixed_height.url);
            animalImage.attr("stop", results[i].images.fixed_height_still.url);
            animalImage.addClass("go");
            imageDiv.append(animalRating).append(animalImage);
            $("#imageList").append(imageDiv);
		}
        $(".go").click(function() {
            var value = ($(this).attr("value")); 
            var m= ($(this).attr("moving"));
            var s= ($(this).attr("stop"));
            if (value == "1") {
                $(this).attr("src", m);
                $(this).attr("value", "2");
            } else {
                $(this).attr("src", s);
                $(this).attr("value", "1");
            }      
        });
	});
});

//create button with the search text when search button clicked
$("#searchButton").on("click", function(event) {   
    event.preventDefault();
    name = $("#search").val().trim();
    animals.push(name);
    renderButtons();
});

});