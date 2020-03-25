//console.log(window.location.href);
const fullUrl = window.location.href;
const videoId= fullUrl.substring(fullUrl.lastIndexOf("/") + 1);
console.log(videoId);

const player = `<video width="320" height="240" controls>
                     <source src="/${videoId}" type="video/mp4">
                     Your browser does not support the video tag.
                </video>`;

$("#player-wrapper").append(player);