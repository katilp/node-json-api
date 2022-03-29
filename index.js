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
		usage: "Add a path, available paths: /years and /runeras",
		years: "use: /years/<YYYY>  to get a specific year or: /years/<YYYY>/<key> for a specific value within a year",
		runeras: "use: /runeras/<RunYYYYN> to get a specific run era or: /runeras/<RunYYYYN>/<key> for a specific value within a run era",
		or: "or use: /runeras/<YYYY> to get run eras of a year or: /runeras/<YYYY>/<key> to get specific values for run eras within a year",
		queries: "for runeras, pass a query with: /runeras?<akey>=<avalue> or after <YYYY> and <key> paths"
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
	var filters=request.query;
	var filtered_eras = run_eras;
	
	for (var reqkey in filters) {
		filtered_eras = filtered_eras.filter(an_era => an_era[reqkey] == filters[reqkey]);
	}

	var reply;
	
	if (era)
	{
		if (era.includes("Run"))
		{
			const this_era = filtered_eras.filter(an_era => an_era.run_era == era);
			reply=this_era[0];
			if (key)
			{
				reply=String(this_era[0][key]);
			}
		}
		else
		{
			console.log("No 'Run' in era, consider it as year");
			var year = era;
			const these_eras = filtered_eras.filter(an_era => an_era.year == year);
			reply=these_eras;
			if (key)
			{
				// note that era.key won't work
				let keyvalues = these_eras.map(era => era[key]);
				reply = keyvalues;
			}
		}
	}
	else
	{
		reply=filtered_eras;
	}

    console.log(reply);
	response.send(reply);
}

