//Menu Stuff
$("#cwtable").click(function(){
	removeActive();
	addClass("cwtable");
	loadPage("cwtable");
});
$("#cwowng").click(function(){
	removeActive();
	addClass("cwowng");
	loadPage("cwowng");
});
$("#cwgain").click(function(){
	removeActive();
	addClass("cwgain");
	loadPage("cwgain");
});
$("#cwunig").click(function(){
	removeActive();
	addClass("cwunig");
	loadPage("cwunig");
});
$("#links").click(function(){
	removeActive();
	addClass("links");
	loadPage("links");
});
$("#contact").click(function(){
	removeActive();
	addClass("contact");
	loadPage("contact");
});

//Load sidebar
$('#sidebar').load('links.html');

//Load image links
$("#tablethumb").click(function(){
	loadPage("cwtable");
});
$("#tagsthumb").click(function(){
	loadPage("cwunig");
});
$("#totalgraphthumb").click(function(){
	loadPage("cwowng");
});
$("#wongraphthumb").click(function(){
	loadPage("cwgain");
});

//Load a links
$("#reflinks").click(function(){
	loadPage("links");
});

//Funcs
function loadPage(itemi) {	
	$('#content').load(itemi+".html");
}
function addClass(itemi) {
	$("#"+itemi+"li").addClass("active");
}
function removeActive() {
	$('#navbar li').each(function(index, element) {
		$(element).removeClass("active");
	});
}

// Global Funcs

function hideloading() {
	$('#loading').hide();
}

