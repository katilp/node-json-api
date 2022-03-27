var fs=require('fs');
var data=fs.readFileSync('cms_release_info.json');
var years=JSON.parse(data);
var data2=fs.readFileSync('run_ranges.json');
var run_eras=JSON.parse(data2);
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
		message: "Add a path, available paths: /years and /runeras (or: /years/<YYYY>  /years/<YYYY>/<key>  /runeras/<RunYYYYN>  /runeras/<RunYYYYN>/<key>)"
	}
    response.send(reply);
}


app.get('/years/:year?/:mykey?',searchYear);
function searchYear(request,response)
{
	var year=request.params.year;
	var key=request.params.mykey;
	var reply;

	if(years[year])
	{
		if (key)
		{
			reply=String(years[year][key]);
		}
		else
		{
			reply=years[year];
		}	
	}
	else
	{
		reply=years;
	}
    console.log(reply);
	response.send(reply);
}

app.get('/runeras/:era?/:mykey?',searchEra);
function searchEra(request,response)
{
	var era=request.params.era;
	var key=request.params.mykey;
	var reply;
	
	if (era)
	{
		const this_era = run_eras.filter(an_era => an_era.run_era == era);
		reply=this_era[0];
		if (key)
		{
			reply=String(this_era[0][key]);
		}
	}
	else
	{
		reply=run_eras;
	}

    console.log(reply);
	response.send(reply);
}

