$.get("videos?page=1", (response) => {
    console.log(response.response);
    response.response.map((video) =>{
        $("#video-gallery")
        .append(`<a href="/player/${video.fileName}">${video.title}</a>`)
        
    });
});

// $('<a>',{
//     text: 'Watch the video',
//     title: 'Blah',
//     href: '/player/3ad1ed96-63d9-414e-8f34-27cdece63962.mp4',
//     click: function(){ BlahFunc( options.rowId );return false;}
// }).appendTo('body');

//for the client to request from a server
