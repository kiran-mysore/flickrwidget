(function () { 
   // Insert the css to head tag
   loadCSS('./style.css');

   function loadCSS(url) {
   let head = document.getElementsByTagName('head')[0],
   link = document.createElement('link');
   link.type = 'text/css';
   link.rel = 'stylesheet';
   link.href = url;
   head.appendChild(link);
   return link;
    }  

    
   
   // Get the Search attribute from data-topic 

        let rootDiv = document.getElementById("container"); 
        let searchAttribute = rootDiv.dataset.topic; 
        
       
  // get the data from the flicker URL
let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_ke
y=b36822a18ddea0e3bd497a333e3b696d&tags=${searchAttribute}&format=json&nojsonca
llback=1`;    

function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function getJson(response) {  
  return response.json()
}

    function getUrlArray(jsonData) {
    
            // Build the URLarray
           return jsonData.photos.photo.map(photo => {
                let farmId = photo.farm;
                let serverId = photo.server;
                let id = photo.id;
                let secret = photo.secret;
    
                return (`https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`)
            });
           
        }    

function createImages(urlArray) {
     
        document.body.onload = addElement(urlArray)
}

function addElement(urlArray) { 
      let containerDiv = document.getElementById("container"); 
    /*  let innerDiv = document.createElement("div");
      containerDiv.appendChild(innerDiv)*/
      document.body.appendChild(containerDiv); 

    
      let imageAttribute = rootDiv.dataset.nbrImages; 
     
    

//I feel this could have be done in a much better way    
      if (imageAttribute) {
         for (var i = 0; i < parseInt(imageAttribute); i++) {
           let anchorTag = document.createElement("a")
           let imageElement = document.createElement("img");
            anchorTag.appendChild(imageElement).setAttribute("src", urlArray[i]);
             containerDiv.appendChild(anchorTag).setAttribute("href",urlArray[i]);
          }
      } else if(imageAttribute===""){
        for (let i = 0, len = urlArray.length; i < len; i++) {
                  let anchorTag = document.createElement("a")
           let imageElement = document.createElement("img");
        anchorTag.appendChild(imageElement).setAttribute("src", urlArray[i]);
        containerDiv.appendChild(anchorTag).setAttribute("href",urlArray[i]);
      }

  }
}    

fetch(url, { mode: 'cors' })
        .then(status)
        .then(getJson)
        .then(getUrlArray)
        .then(createImages)
    .catch(function (error) {  
             console.log('Request failed', error);  
        });
})();
