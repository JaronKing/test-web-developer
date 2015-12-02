var comments = [
	{"name":"Vito Corleone","comment":"I\'m gonna make him an offer he can\'t refuse.","timestamp":69379200000},
	{"name":"Terry Benedict","comment":"Congratulations... You\'re a dead man!","timestamp":1007683200000},
	{"name":"Jessica Rabbit","comment":"I\'m not bad. I\'m just drawn that way.","timestamp":583113600000},
	{"name":"Martin Brody","comment":"You\'re gonna need a bigger boat.","timestamp":172281600000},
	{"name":"Jack Dawson","comment":"I\'m the king of the world!","timestamp":882489600000},
	{"name":"The Terminator","comment":"Hasta la vista, baby.","timestamp":678326400000},
	{"name":"The Joker","comment":"Why so serious..?","timestamp":1215993600000}
];

var slides = ["images/slideshow/1.jpg", "images/slideshow/2.jpg", "images/slideshow/3.jpg"];



$(document).ready(function(){
	slideShow(slides);
	//Order data
	comments.sort(compareTime);
	var source1   = $("#comment-template-1").html();
	var template1 = Handlebars.compile(source1);
	var source2   = $("#comment-template-2").html();
	var template2 = Handlebars.compile(source2);
	Handlebars.registerHelper("formatDate", function(date){
		var newDate = new Date(date);
		var dateString = newDate.getDay() + "/" + newDate.getMonth() + "/" + newDate.getFullYear();
		return dateString;
	})
	//Loop and template comments
	for (i = 0; i < comments.length; i++) {
		if (i % 2) {
			var html    = template2(comments[i]);
			$(html).appendTo(".commentsBox");
		} else {
			var html    = template1(comments[i]);
			$(html).appendTo(".commentsBox");
		}
	}
	//Set height of commentsGlow to commentsBox
	var boxHeight = $('.commentsBox').css('height');
	var boxWidth = $('.commentsBox').css('width');
	$('.commentsGlow').css('height', boxHeight);
	$('.commentsGlow').css('width', boxWidth);


});



function compareTime(a,b) {
	if (a.timestamp < b.timestamp)
		return -1;
	if (a.timestamp > b.timestamp)
		return 1;
	return 0;
}

function slideShow(slides) {
	setTimeout(
		function(){
			slides.push(slides.shift());
			$('#slide').fadeOut(600, function(){
				$('#slide').attr('src', slides[0]).fadeIn(600);
			});
			slideShow(slides);
		},6000);
}

function prettyTimeStamp(timestamp) {
	Template.registerHelper("prettifyDate", function(timestamp) {
		return new Date(timestamp).toString('yyyy-MM-dd')
	});
}