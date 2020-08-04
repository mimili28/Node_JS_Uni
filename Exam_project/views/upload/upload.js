let fileValid = false;

function handleFileUpload(files){
    const file = files[0];

    const mimeTypeArray = file.type.split("/");

    if(mimeTypeArray[0] !== "image"){
        fileValid = false;
        return;
    }

    const filesSize = file.size;

    const twoGBFileLimit = 2147483648;
    if(filesSize > twoGBFileLimit){
        fileValid = false;
        return;
    }

    fileValid = true;
}