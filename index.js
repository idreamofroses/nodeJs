var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/getRate', function(request, response) {
  calculateRate(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function calculateRate(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));


	var type = requestUrl.query.type;
	var weight = Number(requestUrl.query.weight);

	computeOperation(response, type, weight);
}

function computeOperation(response, myType, weight) {
	type = myType.toLowerCase();

	var price = "";

	if (type == "letters (stamped)") {
		if(weight <= 1.0) {
            price = "$0.49";
        } else if (weight <= 2.0) {
            price = "$0.70";
        } else if (weight <= 3.0) {
            price = "$0.91";
        } else {
            price = "$1.12";
        }
	} else if (type == "letters (metered)") {
		if(weight <= 1.0) {
            price = "$0.46";
        } else if (weight <= 2.0) {
            price = "$0.67";
        } else if (weight <= 3.0) {
            price = "$0.88";
        } else {
            price = "$1.09";
        }	
	} else if (type == "large envelopes (flats)") {
		if(weight <= 1.0) {
            price = "$0.98";
        } else if (weight <= 2.0) {
            price = "$1.19";
        } else if (weight <= 3.0) {
            price = "$1.40";
        } else if (weight <= 4.0) {
            price = "$1.61";
        } else if (weight <= 5.0) {
            price = "$1.82";
        } else if (weight <= 6.0) {
            price = "$2.03";
        } else if (weight <= 7.0) {
            price = "$2.24";
        } else if (weight <= 8.0) {
            price = "$2.45";
        } else if (weight <= 9.0) {
            price = "$2.66";
        } else if (weight <= 10.0) {
            price = "$2.87";
        } else if (weight <= 11.0) {
            price = "$3.08";
        } else if (weight <= 12.0) {
            price = "$3.29";
        } else if (weight <= 13.0) {
            price = "$3.50";
        }
	} else if (type == "parcels") {
		if(weight <= 4.0) { //all parcels < 4 are the same price
            price = "$2.67";
        } else if (weight <= 5.0) {
            price = "$2.85";
        } else if (weight <= 6.0) {
            price = "$3.03";
        } else if (weight <= 7.0) {
            price = "$3.21";
        } else if (weight <= 8.0) {
            price = "$3.39";
        } else if (weight <= 9.0) {
            price = "$3.57";
        } else if (weight <= 10.0) {
            price = "$3.75";
        } else if (weight <= 11.0) {
            price = "$3.93";
        } else if (weight <= 12.0) {
            price = "$4.11";
        } else if (weight <= 13.0) {
            price = "$4.29";
        }
	} else if (type == "postcard") {
        weight = 0.22; //post cards are a standard weight
        price = "$0.34";
    } else {
		// It would be best here to redirect to an "unknown operation"
		// error page or something similar.
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {type: myType, weight: weight, price: price};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}
