//UOFR Hack dapiawej Custom H5P iframes resizer update September 11, 2023
//First we need to get iframes from H5P only.
var iframes = document.querySelectorAll('iframe[src*="mod/hvp/embed.php"]');

// Create an array to store the original height of each iframe
var originalHeights = [];

// Loop through each iframe and add the custom class
for (var i = 0; i < iframes.length; i++) {
  var iframe = iframes[i];
  iframe.classList.add('h5p-custom-class');
  //originalHeights.push(iframe.offsetHeight);
}

//var iframes = document.querySelectorAll('iframe');
window.addEventListener('load', function() {
for (var i = 0; i < iframes.length; i++) {
  const iframe = iframes[i];

  //we are going to use Mutation observer since (message API eventlistener) is not reliable to resize the iframe and avoid flikering.
  //which can lead to performance problems and unexpected behavior.
  const newObserver = new MutationObserver(function(mutationsList, observer) {
    for(var mutation of mutationsList) {
      if (mutation.type === 'childList') {
        //User has interacted with iframe content
        console.log('User interacted with iframe content');
        break;
      } else if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        
        resizeIframes();
        console.log('H5P iframe has been resized to the correct value');
        break;
      }
    }
  });

  newObserver.observe(iframe.contentWindow.document, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

}
});

function resizeIframes() {
  // Loop through each iframe with the custom class
  var iframes = document.querySelectorAll('.h5p-custom-class');
  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    //console.log('Iframe ready:', iframe);

   // Hide the completion button since we don't need it and avoid vertical scrollbars
   /*const elements = iframe.contentWindow.document.querySelectorAll('.activity-header');
   for (let j = 0; j < elements.length; j++) {
     
     elements[j].style.height = "0";
     elements[j].style.width = "0";
     elements[j].style.overflow = "hidden";
     elements[j].style.visibility = "hidden";
   }*/
   
    var sectionEmbed = iframe.contentWindow.document.querySelector('.embedded-main');
    var sectionHeight = sectionEmbed.offsetHeight;
    //console.log('Section height:', sectionHeight);
    var newHeightWithExtra = sectionHeight + 30;
    originalHeights[i] = newHeightWithExtra;
    iframe.style.height = newHeightWithExtra + 'px';
    iframe.style.width = '100%';
    console.log('Result - Iframe height + Section height:', newHeightWithExtra);

  }
 
}

window.onload = function() {
  
  resizeIframes();
  console.log('Custom iframe resizing code loaded.');
};


