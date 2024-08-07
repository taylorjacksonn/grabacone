// THIS FILE IS JUST A COPY OF THE CODE THAT EXISTS IN MY AWS LAMBDA FUNCTION
// SORTS BASED ON TYPE OF FLAVOR+ POPULATES THE FLAVORS PAGE UPON USER INTERACTION WITH ICE CREAM FLAVOR NAMES AND
// THEIR CORRESPONDING IMAGES. 
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"; // ES Modules import


function getNameAndImagePairs(paths) {
     let name = '';
     let imgPath = '';
     let nameAndImagePairs = [];
     for (let i = 0; i < paths.length; i++) {
         let lastSlash = paths[i].lastIndexOf('/');
         let lastDot = paths[i].lastIndexOf('.');
         let name = paths[i].substring(lastSlash + 1, lastDot);
         nameAndImagePairs.push({name: name, path: paths[i]});
     }
     return nameAndImagePairs;
 }
 

// event: what lambda passes to me every time there's a request
export const handler = async(event) => {
    //queryStringParameters
    // final response sent to site
    var flavors = ''; 
    // request parameters
    let params;
  
    // initialize client s3 (connect to s3)
    const client = new S3Client();
    var bucketParams = {
        Bucket : 'gac-flavors',
    };
    
    // request
    params = event.queryStringParameters;

    // make command object - premade listobj object that lists all objects in s3- 
    // give param to filter for specific bucket (bucketParams)
    const command = new ListObjectsV2Command(bucketParams);
    // wait for response from bucket retrieving flavors obj
    flavors = await client.send(command);
    flavors = flavors.Contents;
    
    // filter out non-images and store all jpgs into images array
    let images = flavors.filter(content => content.Key.endsWith('.jpg'));
    // need images to be ONLY keys and not rest of obj
    images = images.map(content => content.Key);
    
    
    let finalPairs = [];
    
    //  ALL FLAVORS
    // if all flavors button selected return all flavor images
    if (params && Object.hasOwn(params, 'type') && params.type == 'all') {
        flavors = images;
        finalPairs = getNameAndImagePairs(flavors);
    }
    
    // STANDARD FLAVORS
    else if (params && Object.hasOwn(params, 'type') && params.type == 'standard') {
        // bucketParams['Prefix'] = 'standard-flavors';
        let standardFlavorImages = [];
        // filter and store images with 'standard-flavors' in the Key
            standardFlavorImages = images.filter(content =>
            content.includes('/standard-flavors/'));
            flavors = standardFlavorImages;
            finalPairs = getNameAndImagePairs(flavors);
    }
    // SEASONAL FLAVORS
    else if (params && Object.hasOwn(params, 'type') && params.type == 'seasonal') {
        let seasonalFlavorImages = [];
        // filter and store images w/ /seasonal-flavors/ 
            seasonalFlavorImages = images.filter(content => 
            content.includes('/seasonal-flavors/'));
            flavors = seasonalFlavorImages;
            finalPairs = getNameAndImagePairs(flavors);
        
    }
    // VEGAN FLAVORS 
    else if (params && Object.hasOwn(params, 'type') && params.type == 'vegan') {
        let veganFlavorImages = [];
            veganFlavorImages = images.filter(content =>
            content.includes('/vegan-flavors/'));
            flavors = veganFlavorImages;
            finalPairs = getNameAndImagePairs(flavors);
    } 
 
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(finalPairs),
    };
    return response;
};

