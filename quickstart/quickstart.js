// stores the reference to the XMLHttpRequest object
var xmlHttp = createXmlHttpRequestObject();

function createXmlHttpRequestObject()
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

function process()
{
	// proceed only if the xmlHttp object isn't busy
	if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
		// retrieve the name typed by the user on the form
	
		name = encodeURIComponent(document.getElementById("myName").value);
		// execute the quickstart.php page the server
		xmlHttp.open("GET", "quickstart.php?name=" + name, false); 
		// define the method to handle server responses
		xmlHttp.onreadystatechange = handleServerResponse;

		// make the server request
		xmlHttp.send(null);

		// read the response
		//handleServerResponse();
	} else {
		// if the connection is busy, try again after one second
		setTimeout("process()", 1000);
	}
}

/**
 * callback function executed when a message is received from the server
 */
function handleServerResponse()
{
	// move forward only if the trabsaction has completed
	if (xmlHttp.status == 200) {
		// extract the XML retrieved from the server
		xmlResponse = xmlHttp.responseXML;

		if (xmlResponse) {
			// obtain the document element (the root element) of the the xml stucture
			xmlDocumentElement = xmlResponse.documentElement;
			// get the text message, which is in the first child og the document element
			helloMessage = xmlDocumentElement.firstChild.data;
			// display the data received form the server
			document.getElementById("divMessage").innerHTML = '<i>' + helloMessage + '</i>';
			// restart sequence
			setTimeout("process()", 1000);
		}
		
	} else // a HTTP status different the 200 signals an error 
	{
		alert("There was a problem accessing the server: " + xmlHttp.statusText);
	}
}