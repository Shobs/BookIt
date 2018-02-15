(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
   if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  // function insertBeast(beastURL) {
  //   removeExistingBeasts();
  //   let beastImage = document.createElement("img");
  //   beastImage.setAttribute("src", beastURL);
  //   beastImage.style.height = "100vh";
  //   beastImage.className = "beastify-image";
  //   document.body.appendChild(beastImage);
  // }

  function buildList(data, isChild){
    var html = (isChild)?'<div>':''; // Wrap with div if true
    html += '<ul>';
    for(item in data){
      html += '<li>';
        if(typeof(data[item].children) === 'object'){ // An array will return 'object'
          if(isChild){
            html += '<a href="' + data[item].url + '">' + data[item].name + '</a>';
          } else {
                html += data[item].id; // Child found, but top level list item.
              }
            html += buildList(data[item].children, true); // Child found. Calling recursively same method (and wrapping it in a div)
          } else {
            html += data[item].id // No Child
          }
          html += '</li>';
        }
        html += '</ul>';
        html += (isChild)?'</div>':'';
        return html;
      }

    function buildTree(bookmarkItems) {
      document.getElementById("container").innerHTML = buildList(bookmarkItems, false);
    }

    function onRejected(error) {
      console.log(`An error: ${error}`);
    }

    var gettingTree = browser.bookmarks.getTree();
    gettingTree.then(buildTree, onRejected);

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  // browser.runtime.onMessage.addListener((message) => {
  //   if (message.command === "beastify") {
  //     insertBeast(message.beastURL);
  //   } else if (message.command === "reset") {
  //     removeExistingBeasts();
  //   }
  // });
  // listBookmarks();

})();