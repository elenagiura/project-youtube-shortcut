var key = "AIzaSyBfMzahwcdSsYmRI2n3h2H1IxeYV1-9QlE";

var unorderedList = document.querySelector('main section ul');
var search = document.querySelector("header input");
var searchButton = document.querySelector("header button");
var iframe = document.querySelector("main iframe");
var iframeSection = document.querySelector("main>section>div.clearfix");
var videoInfo = document.getElementById("video-info");

getData("&q=javascript-programing");

document.documentElement.addEventListener("keypress", function(e) {
	if(e.key==="Enter") {
		iframeSection.classList.remove("visible");
		iframe.removeAttribute("src");
		getData("&q="+search.value);
	}
})

searchButton.addEventListener("click", function(){
	iframeSection.classList.remove("visible");
	iframe.removeAttribute("src");
	getData("&q="+search.value);
});

function getData(term) {
	unorderedList.innerHTML = "";

	var url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=rating&type=video&key="+key+term;

	var req = new XMLHttpRequest();
	req.open ("GET", url);
	req.onload = function(){
		videoList(JSON.parse(req.responseText).items);
		console.log(JSON.parse(req.responseText).items);
	}
	req.send();
}

function videoList(data){
	for(var i=0; i<data.length; i++) {
		createLi(data[i]);
	}
}

function createLi (video) {
	if (video.hasOwnProperty("snippet")) {
		var listItem = document.createElement("li");
		var link = document.createElement("a");

		link.classList.add("clearfix");
		var text = document.createElement("div");

		var image = document.createElement("img");
		image.setAttribute("src",video.snippet.thumbnails.medium.url);
		link.prepend(image);

		var title = document.createElement("h2");
		textCreation(text, title, video.snippet.title);

		var description = document.createElement("p");
		textCreation(text, description, video.snippet.description);

		link.appendChild(text);
		listItem.appendChild(link);
		unorderedList.appendChild(listItem);

		link.addEventListener("click", function(e){
			link.setAttribute("href","#video");
			openingVideo(video);
		});

		link.addEventListener("mouseover", function(){
			listItem.classList.add("context-show");
		});

		link.addEventListener("mouseout", function(){
			listItem.classList.remove("context-show");
		})
	} 
}

function textCreation (text, element, source) {
	element.textContent = source;
	text.appendChild(element);
}

function openingVideo(video) {
	iframe.setAttribute("src","https://www.youtube.com/embed/"+video.id.videoId);
	getData("&type=video&relatedToVideoId="+video.id.videoId);
	
	iframeSection.classList.add("visible");
	videoInfo.innerHTML="";

	var title = document.createElement("h1");
	var description = document.createElement("p");

	textCreation(videoInfo, title, video.snippet.title);
	textCreation(videoInfo, description, video.snippet.description);
}