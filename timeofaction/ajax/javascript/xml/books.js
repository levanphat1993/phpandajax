// holds an instance of XMLHttpRequest
var xmlHttp = createXmlHttpRequestObject();

// creates an XMLHttpRequest instance
function createXmlHttpRequestObject() {
  // will store the reference to the XMLHttRequest object
  var xmlHttp;
  // create the XMLHttpRequest object
  try {
    // assume IE7 or newer or other modern browsers
    xmlHttp = new XMLHttpRequest();
  } catch (e) {}
  // return the created object or display an error message
  if (!xmlHttp) {
    alert("Error creating the XMLHttpRequest object.");
  } else {
    return xmlHttp;
  }
}

// read a file from the server
function process() {
    // only continue if xmlHttp isn't void
    if (xmlHttp) {
        // try to connect to the server
        try {
        // initiate reading a file form the server
        xmlHttp.open("GET", "books.xml", true);
        xmlHttp.onreadystatechange = handleRequestStateChange;
        xmlHttp.send(null);
        } catch (e) {
        alert("Can't connect to server:\n" + e.toString());
        }
    }
}

// function called when the state of the HTTP request changes
function handleRequestStateChange() {
  // when readuState is 4, we can read the server respone
  if (xmlHttp.readyState == 4) {
    try {
      // do something with the response from the server
      handleServerResponse();
    } catch (e) {
      // display error message
      alert("Error reading the response: " + e.toString());
    }
  } else {
    // display status message
    alert("There was a problem retrieving the data:\n" + xmlHttp.statusText);
  }
}

// handles the response received from the server
function handleServerResponse() {
    // read the message from the server
    var xmlResponse = xmlHttp.responseXML;
    // obtain the XML's document element
    xmlRoot = xmlResponse.documentElement;
    // obtain arrays with book titles and ISBNs
    titleArray = xmlRoot.getElementsByTagName("title");
    isbnArray = xmlRoot.getElementsByTagName("isbn");
    // generate HTML output
    var html = "";

    // iterate through the arrays and create an HTML structure
    for (var i = 0; i < titleArray.length; i++) {
        html +=
        titleArray.item(i).firstChild.data +
        ", " +
        isbnArray.item(i).firstChild.data +
        "<br/>";
    }


    // obtain a reference to the <div> element on the page
    myDiv = document.getElementById("myDivElement");
    // display the HTML output
    myDiv.innerHTML = "<p>Server says: </p>" + html;
    }
