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
	var reply={
		message: "Add a path, available paths: /years (or /years/<YYYY> or /years/<YYYY>/<key>)"
	}
    response.send(reply);
}


app.get('/years/:year?/:mykey?',searchYear);
function searchYear(request,response)
{
	var year=request.params.year;
	var key=request.params.mykey;

	if(years[year])
	{
		if (key)
		{
			var reply=years[year][key];
		}
		else
		{
			var reply=years[year];
		}	
	}
	else
	{
		var reply=years;
	}
    console.log(reply);
	response.send(reply);
}



