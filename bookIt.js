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

  // function openListItem(id,url) {
  //   return "<li id="+id+">" + url;
  // }

  // function closeListItem(id,url) {
  //   return "</li>";
  // }

  // function openList(id,url) {
  //   return "<ul id="+id+">";
  // }

  // function closeList() {
  //   return "</ul>";
  // }

  // function ListItems(bookmarkItem, level, parent) {
  //   // openList(bookmarkItem.id)
  //   let li = document.createElement('li').setAttribute('id',bookmarkItem.id);
  //   if (bookmarkItem.url) {
  //     openListItem(bookmarkItem.id, bookmarkItem.url);
  //   } else {
  //     makeList(makeIndent(indent) + "Folder");
  //     level++;
  //   }
  //   if (bookmarkItem.children) {
  //     for (child of bookmarkItem.children) {
  //       logItems(child, indent, bookmarkItem);
  //     }
  //   }

  function buildList(data, isSub){
    var html = (isSub)?'<div>':''; // Wrap with div if true
    html += '<ul>';
    for(item in data){
      html += '<li>';
        if(typeof(data[item].children) === 'object'){ // An array will return 'object'
          if(isSub){
            html += '<a href="' + data[item].url + '">' + data[item].name + '</a>';
          } else {
                html += data[item].id; // Submenu found, but top level list item.
              }
            html += buildList(data[item].children, true); // Submenu found. Calling recursively same method (and wrapping it in a div)
          } else {
            html += data[item].id // No submenu
          }
          html += '</li>';
        }
        html += '</ul>';
        html += (isSub)?'</div>':'';
        return html;
      }

      //   closeList();
      //   level--;
      // }

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