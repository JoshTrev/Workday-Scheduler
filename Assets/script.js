$("#currentDay").text("Today is " + moment().format('MMMM Do') + ", " + moment().format('YYYY') + ".");

for (var i = 0; i < 9; i++) {
    //Creating New Time Block Parts

    var newRow = $("<div class='row'></div>");
    var newHour = $("<div class='col-1 hour'>9 AM</div>");
    var newTextPosition = $("<div class='col-10 present flex-container'><textarea class='insertText'></textarea></div>");
    var newSaveButton = $("<div class='col-1 saveBtn'>Save</div>");

    //Appending Newly Created Time Block Parts

    $(newRow).append(newHour, newTextPosition, newSaveButton);

    $(".container").append(newRow);

    newSaveButton.attr("saveButtonNumber", i);
};

//Printing Hour Number

var hourList = document.querySelectorAll(".hour");

var hourNumber = 9;

for (var i = 0; i < hourList.length; i++){

    if (hourNumber < 13) {
        $(hourList[i]).text(hourNumber + " AM");
    }
    else {
        $(hourList[i]).text((hourNumber - 12) + " PM");
    }

    hourNumber++;
}

//What is the current hour?

var currentHour =  moment().format('H');

var rowList = document.querySelectorAll(".flex-container");

//Change future hours to green

for (var i = 0; i < rowList.length; i++){
    $(rowList[i]).removeClass("past present future");
    $(rowList[i]).addClass("future");
}

// Change hours passed to gray

if (currentHour > 9){

    for (var i = 9; i < currentHour; i++){
        $(rowList[i - 9]).removeClass("past present future");
        $(rowList[i - 9]).addClass("past");
    }
}

//Change current hour to red

if (rowList[currentHour - 9] !== "undefined"){
    $(rowList[currentHour - 9]).removeClass("past present future");
    $(rowList[currentHour - 9]).addClass("present");
}

//Insert locally stored text from local storage

var textBoxList = document.querySelectorAll(".insertText");

for (var i = 0; i < 9; i++){
    if (localStorage.getItem("currentTextBoxContent" + i) == null || localStorage.getItem("currentTextBoxContent" + i) == ""){
        textBoxList[i].textContent = "";
    }
    
    else {
        textBoxList[i].textContent = localStorage.getItem("currentTextBoxContent" + i);
    }
}

//Set up buttons, individual button clicks give the button number. I can use the button number to find the adjacent textbox.

$(".saveBtn").on("click", function(event){
    
    var currentButtonNumberClicked = ($(this).attr("saveButtonNumber"));

    var currentTextBoxContent = $(textBoxList[currentButtonNumberClicked]).val();

    localStorage.setItem("currentTextBoxContent" + currentButtonNumberClicked, currentTextBoxContent);
});