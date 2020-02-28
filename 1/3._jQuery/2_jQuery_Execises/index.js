//1 center body
$('body').css("text-align", "center");

//2 new title
$('#title h2').text('New title');

//3 change background
$('.subtitle-box').css('background-color', 'yellow');

//4th
$(".temp").hide();
//$(".temp").css("display","none");

//5th
$("div.reason").css("border", "dashed yellow 4px");

//6 bold text
$("ol li").css("font-weight","bold");

//7 change last li-underlined
$("#first-list li:last-child").css("text-decoration", "underline");

//8 change 2nd li-crossed
$("#first-list li:nth-child(2)").css("text-decoration", "line-through");

//9 italic text
$(".second-list").css("font-style", "italic");

//10 font size
$(".second-list span").css("font-size", "0.5em");

//11 remove element
$(".unused-box label:first-child").remove();

//12 add paragraph
$(".unused-box").append("<p>Second sentence</p>");

//13 add paragraph before 12
$(".unused-box").prepend("<p1>First sentence</p1>");

//14 rename class
$(".unused-box").attr("class", "used-box");

//15 add class
$(document).ready(() => {
    $(".used-box").click(function() {
        $(this).toggleClass("used-boxed-clicked");
    });

    // $(".used-box").click(() => {
    //     $(this).toggleClass("used-boxed-clicked");
    // });
 
    // $(".used-box").on("click", () => {
    //     console.log("clicked");
    // });
});

/*  $(() => {}); 
*/

//16 mouse over
$("#submit-button").mouseenter(() => {
    $(event.currentTarget).text("You're ready to click");
}).mouseout(()=> {
    $(event.currentTarget).text("Click");
});

//17
$("#submit-button").click(() => {
    let count = $("#first-list li").length;
    $("#first-list").append(`<li>Reason ${count + 1}</li>`);
});