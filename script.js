// keep track of flavor types that have been loaded
var flavors_loaded = [];

// array of flavor types to be preloaded
var flavorList = ['all', 'standard', 'seasonal', 'vegan'];

// function to asynchronously load images for each flavor type
async function loadImages() {
    for (let i = 0; i < flavorList.length; i++) {
        // fetch image data for current flavor type
        const response = await fetch("https://ic9cdieffe.execute-api.us-west-2.amazonaws.com/test1/flavors?type=" + flavorList[i]);
        const imagePairs = await response.json();
        populateImages(imagePairs, flavorList[i]);
    }
}
    // images: list of objects with props, { name: flavor name, path: path to jpeg image }
    // Populates imgs for specific flavor type
    function populateImages(images, flavorType) {
        // check if imgs for this flavortype have already been loaded
        if (flavors_loaded.includes(flavorType)){
            return; // avoid reloading already clicked flavors
        } 
        if (images) {
            // get container where imgs will be displayed
            let imagesContainer = document.getElementById(`${flavorType}-images-container`);

            // loop through retrieved imgs and create html elements for them
            for (let i = 0; i < images.length; i++) {
                    let name = document.createElement('a');
                    name.className = 'flavor-caption';
                    name.innerHTML += images[i].name;

                    // construct img path
                    let path = 'https://gac-flavors.s3.amazonaws.com/' + images[i].path;
                    // create img element 
                    let pic = document.createElement('img');
                    pic.src = path;
                    pic.className = "flavor-image";

                    // create wrapper div to contain the image and corresponding name
                    let wrapper = document.createElement('div');
                    wrapper.className = 'flavor-wrapper';
                    wrapper.appendChild(pic);
                    wrapper.appendChild(name);

                    // append wrapper to images container
                    imagesContainer.appendChild(wrapper);
            }
            // mark the current flavor type as loaded to prevent reloading 
            flavors_loaded.push(flavorType);
        }
    }


