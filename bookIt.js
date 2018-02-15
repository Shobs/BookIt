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

  function makeIndent(indentLength) {
    return ".".repeat(indentLength);
  }

  function logItems(bookmarkItem, indent) {
    if (bookmarkItem.url) {
      console.log(makeIndent(indent) + bookmarkItem.url);
    } else {
      console.log(makeIndent(indent) + "Folder");
      indent++;
    }
    if (bookmarkItem.children) {
      for (child of bookmarkItem.children) {
        logItems(child, indent);
      }
    }
    indent--;
  }

  function logTree(bookmarkItems) {
    logItems(bookmarkItems[0], 0);
  }

  function onRejected(error) {
    console.log(`An error: ${error}`);
  }

  var gettingTree = browser.bookmarks.getTree();
  gettingTree.then(logTree, onRejected);

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