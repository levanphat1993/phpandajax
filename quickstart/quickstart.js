// stores the reference to the XMLHttpRequest object
var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject
{
	// stores the reference to the XMLHttpRequest Object
	var xmlHttp;
	
	// if running Internet Explorer 6 or older
	if (window.ActiveXObject) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			xmlHttp = false;
		}
	} // if running Mozilla or other browers
	else {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch (e) {
			xmlHttp = false;
		}
	}
	//  return the created object or display an error message
	if (!xmlHttp) {
		alert("Error creating the XMLHttpRequest object.");
	} else {
		return xmlHttp;
	}
}

function process
{
	// proceed only if the xmlHttp object isn't busy
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0 ) {
		
		// retrieve the name typed by the user on the form 
		name = encodeURIComponent(document.getElementById("myName").value);
		// execute the quickstart.php page from the server
		xmlHttp.open("GET", ""quickstart.php?name=" + name, true);
		// define the method to handle server respones
		xmlHttp.onreadystatechange = handleServerResponse;
		// make the server request
		xmlHttp.send(null);
	} else {
		// if the connection is busy, try agin after one second
		setTime("process()", 1000);
	}
}

function handleServerResponse()
{
	// move forward only if the transaction has completed
	if (xmlHttp.readyState == 4) {
		// status of 200 indicates the transaction completed 
		// successfully
		if (xmlHttp.status == 200) {
			// extract the XML retrieved from the server
			xmlResponse = xmlHttp.responeXML;
			// obtain the document element (the root element) on the XML
			// structure
			xmlDocumentElement = xmlResponse.documentElement;
			// get the text message, which is in the first child of
			// the the document element
			helloMessage = xmlDocumentElement.firstChild.data;
			// display the data received from the server
			document.getElementById("divMessage").innerHTML = '<i>' + helloMessage + '</i>';
			// restart sequence
			setTimeout("process()", 1000);
		} else {
			alert("There was a problem accessing the server: " + xmlHttp.statusText);
		}
	}
}