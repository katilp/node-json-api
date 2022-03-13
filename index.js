var fs=require('fs');
var data=fs.readFileSync('cms_release_info.json');
var years=JSON.parse(data);
const express = require("express");
const url = require('url');
var favicon = require('serve-favicon');
var path = require('path');


const app = express();

const cors=require('cors');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App started on PORT ${PORT}`);
  });


app.use(express.static('public'));
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))



app.get('/',welcome);
function welcome(request,response)
{
	console.log(request.get('Host'));
	console.log(request.query)
	var reply={
		status: "Add a path, available paths: /years"
	}
    response.send(reply);
}

app.get('/years',allYears);
function allYears(request,response)
{
	if (Object.keys(request.query).length === 0)
	{
		response.send(years);
	}
	else
	{
		console.log(request.query)
		const queryKeys = Object.keys(request.query)
		const queryValues = Object.values(request.query)

		// This is really shaky, works only if one query. Only good for an exercise.
		if (queryKeys[0] === 'y')
		{
			response.send(years[queryValues[0]]);
		}
		else
		{
			response.send(years);
		}
	}
}

app.get('/years/:year/',searchYear);
function searchYear(request,response)
{
	var year=request.params.year;
	console.log(year);
	if(years[year])
	{
		var reply=years[year];
		
	}
	else
	{
		var reply={
			status:"Not Found"
		}
	}
    console.log(reply);
	response.send(reply);
}

app.get('/years/:year/:mykey',searchValue);
function searchValue(request,response)
{
	var year=request.params.year;
	var key=request.params.mykey;
	console.log(year);
	console.log(key);
	if(years[year])
	{
		var reply=years[year][key]; 	
	}
	else
	{
		var reply={
			status:"Not Found"
		}
	}
    console.log(reply);
	if (typeof reply === "number"){
		reply = reply + ""; 
		}
 	response.send(reply);
}

