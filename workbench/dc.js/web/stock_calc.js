//# dc.js Getting Started and How-To Guide
'use strict';

/* jshint globalstrict: true */
/* global dc,d3,crossfilter,colorbrewer */

Math.average = function() {
var cnt, tot, i;
cnt = arguments.length;
tot = i = 0;
while (i < cnt) tot+= arguments[i++];
return tot / cnt;
}


// ### Create Chart Objects
// Create chart objects assocated with the container elements identified by the css selector.
// Note: It is often a good idea to have these objects accessible at the global scope so that they can be modified or filtered by other page controls.
var catname = myCatArray;
var pieNumber = catname.length;
var catChart = [];
for (var i=0;i<=pieNumber;i++){
	var text = "#" + catname[i];
	catChart[i] = dc.pieChart(text);
	}

var histoChart = dc.barChart("#histo-chart");
var statChart = dc.barChart("#stat-chart");
var quarterChart = dc.pieChart("#quarter-chart");
var fractionChart = dc.pieChart("#fraction-chart");
var dayOfWeekChart = dc.rowChart("#day-of-week-chart");
var ribosomeBarsChart = dc.rowChart("#ribosome-bars-chart");




/*
d3.csv("humanVSrat_merged.csv", function (csv) {
	alert(csv[0][1]);
	});
*/

function houston(variable){return variable;}




//var moveChart = dc.lineChart("#monthly-move-chart");
//var volumeChart = dc.barChart("#monthly-volume-chart");
//var yearlyBubbleChart = dc.bubbleChart("#yearly-bubble-chart");

// ### Anchor Div for Charts
/*
// A div anchor that can be identified by id
    <div id="your-chart"></div>
// Title or anything you want to add above the chart
    <div id="chart"><span>Days by Gain or Loss</span></div>
// ##### .turnOnControls()
// If a link with css class "reset" is present then the chart
// will automatically turn it on/off based on whether there is filter
// set on this chart (slice selection for pie chart and brush
// selection for bar chart). Enable this with `chart.turnOnControls(true)`
     <div id="chart">
       <a class="reset" href="javascript:myChart.filterAll();dc.redrawAll();" style="display: none;">reset</a>
     </div>
// dc.js will also automatically inject applied current filter value into
// any html element with css class set to "filter"
    <div id="chart">
        <span class="reset" style="display: none;">Current filter: <span class="filter"></span></span>
    </div>
*/

//### Load your data
//Data can be loaded through regular means with your
//favorite javascript library
//
//```javascript
//d3.csv("data.csv", function(data) {...};
//d3.json("data.json", function(data) {...};
//jQuery.getJson("data.json", function(data){...});
//```
//

//var myCSVfileName = "humanVSrat_merged.csv";
var getKeys = function(obj){
   var keys = [];
      for(var key in obj){
            keys.push(key);
	       }
	   return keys;
		  }

//myCSVfileNmae = transduct();

var mycatlist = [];

d3.csv(myCSVfileName, function (data) {
    /* since its a csv file we need to format the data a bit */
    var numberFormat = d3.format(".2f");
    
	var totalpident = 0;
//Initialize of Data Formats
    data.forEach(function (d) {
	d.pident = +d.pident;
	totalpident += d.pident;
	d.count = 1;
	for(var i=0;i<=pieNumber;i++){
		d[catname[i]] = +d[catname[i]];
		}
		
    });
//	document.write(totalpident);
    //### Create Crossfilter Dimensions and Groups
    //See the [crossfilter API](https://github.com/square/crossfilter/wiki/API-Reference) for reference.
    var ndx = crossfilter(data);

    var all = ndx.groupAll();

    var dimensions = [];
    var thegroups = [];

    for(var i=0;i<=pieNumber;i++){
	dimensions[i] = ndx.dimension(function (d) { 
	return d[catname[i]] == 1 ? "Yes":"No";
	    });
	thegroups[i] = dimensions[i].group();
	}
    
/*
    var category1Var = ndx.dimension(function (d) {
        return d.category1 == 1 ? "Yes":"No";
    });
    var category1Group = category1Var.group();

    var category2Var = ndx.dimension(function (d) {
        return d[category2] == 1 ? "Yes":"No";
    });
    var category2Group = category2Var.group();
    
    var category3Var = ndx.dimension(function (d) {
        return d[category3] == 1 ? "Yes":"No";
    });
    var category3Group = category3Var.group();
    
    var category4Var = ndx.dimension(function (d) {
        return d[category4] == 1 ? "Yes":"No";
    });
    var category4Group = category4Var.group();
    
    var category5Var = ndx.dimension(function (d) {
        return d[category5] == 1 ? "Yes":"No";
    });
    var category5Group = category5Var.group();
    
    var category6Var = ndx.dimension(function (d) {
        return d[category6] == 1 ? "Yes":"No";
    });
    var category6Group = category6Var.group();
    
    var category7Var = ndx.dimension(function (d) {
        return d.category7 == 1 ? "Yes":"No";
    });
    var category7Group = category7Var.group();

    var category8Var = ndx.dimension(function (d) {
        return d.category8 == 1 ? "Yes":"No";
    });
    var category8Group = category8Var.group();

    var category9Var = ndx.dimension(function (d) {
        return d.category9 == 1 ? "Yes":"No";
    });
    var category9Group = category9Var.group();

    var category10Var = ndx.dimension(function (d) {
        return d.category10 == 1 ? "Yes":"No";
    });
    var category10Group = category10Var.group();

    var category11Var = ndx.dimension(function (d) {
        return d.category11 == 1 ? "Yes":"No";
    });
    var category11Group = category11Var.group();

    var category12Var = ndx.dimension(function (d) {
        return d.category12 == 1 ? "Yes":"No";
    });
    var category12Group = category12Var.group();








*/









    var anyVarOri = "morpho";
    var anyVar = ndx.dimension(function (d) {
        return d[anyVarOri] == 1 ? "Yes":"No";
    });

    var anyGroup = anyVar.group();

    // create categorical dimension
    var gainOrLoss = ndx.dimension(function (d) {
        return d.chemo == 1 ? "Yes":"No";
    });
    
    var signal = ndx.dimension(function (d) {
    	return d.signal == 1 ? "Yes":"No";
    });

    // produce counts records in the dimension
    var gainOrLossGroup = gainOrLoss.group();

    var signalGroup = signal.group();

    var ribosome = ndx.dimension(function (d) {
    	return d.ribosom == 1 ? "Yes":"No";
    });
    var ribosomeGroup = ribosome.group();

    var riboCount = ndx.dimension(function (d) {
        var coun = 0;
	if (d.chemo == 1){
	     var coun = coun + 1
	     }
	return coun;
    });

    var riboCountGroup = riboCount.group();

    var enzyme = ndx.dimension(function (d) {
    	return d.enzyme == 1 ? "Yes":"No";
    });
    var enzymeGroup = enzyme.group();

    var enzymeCount = ndx.dimension(function (d) {
        var coun = 0;
	if (d.enzyme == 1){
	     var coun = coun + 1
	     }
	return coun;
    });

    var enzymeCountGroup = riboCount.group();
   
   var GPCR = ndx.dimension(function (d) {
    	return d.GPCR == 1 ? "Yes":"No";
    });
    var GPCRGroup = GPCR.group();

    var GPCRCount = ndx.dimension(function (d) {
        var coun = 0;
	if (d.GPCR == 1){
	     var coun = coun + 1
	     }
	return coun;
    });

    var GPCRCountGroup = GPCRCount.group();
    
    
    var morpho = ndx.dimension(function (d) {
    	return d.morpho == 1 ? "Yes":"No";
    });
    var morphoGroup = morpho.group();

    var morphoCount = ndx.dimension(function (d) {
        var coun = 0;
	if (d.morpho == 1){
	     var coun = coun + 1
	     }
	return coun;
    });

    var morphoCountGroup = morphoCount.group();

// determine a histogram of percent changes

    var myhistogram = ndx.dimension(function(d) {
         return Math.round(d.pident);
    });
    var myhistogramGroup = myhistogram.group();

    var mean = ndx.dimension(function(d) {
    	var themean = Math.average(d.pident);
	return themean;
    });
    var meanGroup = mean.group();

    // summerize volume by quarter
    var fraction = ndx.dimension(function(d){
    return d.count;
    });
    var fractionGroup = fraction.group().reduceSum(function(d) { return d.count;});


    var quarter = ndx.dimension(function (d) {
        var month = d.pident;
        if (month <= 25)
            return "Q1";
        else if (month > 25 && month <= 50)
            return "Q2";
        else if (month > 50 && month <= 75)
            return "Q3";
        else
            return "Q4";
    });
    var quarterGroup = quarter.group().reduceSum(function (d) {
        return d.pident;
    });

    var pieWidth = 145
    var pieHeight = 120
    var pieRadius = 50
/*
    // counts per weekday
    var dayOfWeek = ndx.dimension(function (d) {
        var day = d.chemo;
        var name=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        return day+"."+name[day];
     });
    var dayOfWeekGroup = dayOfWeek.group();
*/
    //### Define Chart Attributes
    //Define chart attributes using fluent methods. See the [dc API Reference](https://github.com/dc-js/dc.js/blob/master/web/docs/api-1.7.0.md) for more information
    //
    //
 
    //#### Bubble Chart
    //Create a bubble chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with such chart will only trigger redraw
    //on other charts within the same chart group.
    /* dc.bubbleChart("#yearly-bubble-chart", "chartGroup") */
 /*
    yearlyBubbleChart 
        .width(990) // (optional) define chart width, :default = 200
        .height(250)  // (optional) define chart height, :default = 200
        .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(yearlyDimension)
        //Bubble chart expect the groups are reduced to multiple values which would then be used
        //to generate x, y, and radius for each key (bubble) in the group
        .group(yearlyPerformanceGroup)
        .colors(colorbrewer.RdYlGn[9]) // (optional) define color function or array for bubbles
        .colorDomain([-500, 500]) //(optional) define color domain to match your data domain if you want to bind data or color
        //##### Accessors
        //Accessor functions are applied to each value returned by the grouping
        //
        //* `.colorAccessor` The returned value will be mapped to an internal scale to determine a fill color
        //* `.keyAccessor` Identifies the `X` value that will be applied against the `.x()` to identify pixel location
        //* `.valueAccessor` Identifies the `Y` value that will be applied agains the `.y()` to identify pixel location
        //* `.radiusValueAccessor` Identifies the value that will be applied agains the `.r()` determine radius size, by default this maps linearly to [0,100]
        .colorAccessor(function (d) {
            return d.value.absGain;
        })
        .keyAccessor(function (p) {
            return p.value.absGain;
        })
        .valueAccessor(function (p) {
            return p.value.percentageGain;
        })
        .radiusValueAccessor(function (p) {
            return p.value.fluctuationPercentage;
        })
        .maxBubbleRelativeSize(0.3)
        .x(d3.scale.linear().domain([-2500, 2500]))
        .y(d3.scale.linear().domain([-100, 100]))
        .r(d3.scale.linear().domain([0, 4000]))
        //##### Elastic Scaling
        //`.elasticX` and `.elasticX` determine whether the chart should rescale each axis to fit data.
        //The `.yAxisPadding` and `.xAxisPadding` add padding to data above and below their max values in the same unit domains as the Accessors.
        .elasticY(true)
        .elasticX(true)
        .yAxisPadding(100)
        .xAxisPadding(500)
        .renderHorizontalGridLines(true) // (optional) render horizontal grid lines, :default=false
        .renderVerticalGridLines(true) // (optional) render vertical grid lines, :default=false
        .xAxisLabel('Index Gain') // (optional) render an axis label below the x axis
        .yAxisLabel('Index Gain %') // (optional) render a vertical axis lable left of the y axis
        //#### Labels and  Titles
        //Labels are displaed on the chart for each bubble. Titles displayed on mouseover.
        .renderLabel(true) // (optional) whether chart should render labels, :default = true
        .label(function (p) {
            return p.key;
        })
        .renderTitle(true) // (optional) whether chart should render titles, :default = false
        .title(function (p) {
            return [p.key,
                   "Index Gain: " + numberFormat(p.value.absGain),
                   "Index Gain in Percentage: " + numberFormat(p.value.percentageGain) + "%",
                   "Fluctuation / Index Ratio: " + numberFormat(p.value.fluctuationPercentage) + "%"]
                   .join("\n");
        })
        //#### Customize Axis
        //Set a custom tick format. Note `.yAxis()` returns an axis object, so any additional method chaining applies to the axis, not the chart.
        .yAxis().tickFormat(function (v) {
            return v + "%";
        }); */
          	
    // #### Pie/Donut Chart
    // Create a pie chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.

    for(var i=0;i<=pieNumber;i++){

    var temp = catChart[i];
    catChart[i]
         .width(pieWidth)
         .height(pieHeight)
         .radius(pieRadius)
	 .dimension(dimensions[i])
         .group(thegroups[i])
	 .label(function (d) {
	      if (temp.hasFilter() && !temp.hasFilter(d.key))
	         return d.key + "(0%)";
	      return d.key + "(" + Math.floor(d.value / all.value() * 100) + "%)";
	  });
     }

    fractionChart
         .width(240)
         .height(120)
	 .radius(60)
	 .dimension(fraction)
	 .group(fractionGroup)
	/*
    
    
     // (optional) whether chart should render labels, :default = true
        .renderLabel(true)
        // (optional) if inner radius is used then a donut chart will be generated instead of pie chart
        .innerRadius(40)
        // (optional) define chart transition duration, :default = 350
        .transitionDuration(500)
        // (optional) define color array for slices
        .colors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        // (optional) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-1750, 1644])
        // (optional) define color value accessor
        .colorAccessor(function(d, i){return d.value;})
        */

    quarterChart.width(pieWidth)
//	.colors(['#3182bd', '#6baed6', '#9ecae1', "red"])
	.height(pieHeight)
        .radius(pieRadius)
        .innerRadius(20)
        .dimension(quarter)
        .group(quarterGroup);

    //#### Row Chart
    dayOfWeekChart.width(240)
        .height(120)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(signalGroup)
        .dimension(signal)
        // assign colors to each value in the x scale domain
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        .label(function (d) {
            return d.key.split(".")[1];
        })
        // title sets the row text
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .xAxis().ticks(4);

    ribosomeBarsChart.width(120)
        .height(100)
        .margins({top: 20, left: 10, right: 10, bottom: 20})
        .group(riboCountGroup)
        .dimension(riboCount)
        // assign colors to each value in the x scale domain
        .ordinalColors(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#dadaeb'])
        .label(function (d) {
	    if (d.key==1){return "Yes";}
	    else{return "No";}
        })
        // title sets the row text
        .title(function (d) {
            return d.value;
        })
        .elasticX(true)
        .xAxis().ticks(2);
    //#### Bar Chart
    // Create a bar chart and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    /* dc.barChart("#volume-month-chart") */
    histoChart.width(800)
        .height(280)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(myhistogram)
        .group(myhistogramGroup)
        .colors("grey")
	.elasticY(true)
	.yAxisLabel('Pair Counts')
	.xAxisLabel('Identity')
        // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
        .centerBar(true)
        // (optional) set gap between bars manually in px, :default=2
        .gap(1)
        // (optional) set filter brush rounding
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scale.linear().domain([0, 101]))
        .renderHorizontalGridLines(true)
        // customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = "";
            s += numberFormat(filter[0]) + "% -> " + numberFormat(filter[1]) + "%";
            return s;
        })
	.filterPrinter(function (filters) {
            var filter = filters[0], s = "";
            s += numberFormat(filter[0]) + "% -------> " + numberFormat(filter[1]) + "%";
            return s;
        });
    statChart.width(200)
	.height(300)
	.dimension(mean)
	.group(meanGroup)
	.x(d3.scale.linear().domain([0, 101]))
	.filterPrinter(function (filters) {
	    var filter = filters[0], s="";
	    s+= filter[0] + "ppppp----->" + filter[1];
	    return s;
	});

    /*histogramChart.width(420)
        .height(180)
        .margins({top: 10, right: 50, bottom: 30, left: 40})
        .dimension(myhistogram)
        .group(myhistogramGroup)
        .elasticY(true)
        // (optional) whether bar should be center to its x value. Not needed for ordinal chart, :default=false
        .centerBar(true)
        // (optional) set gap between bars manually in px, :default=2
        .gap(1)
        // (optional) set filter brush rounding
        .round(dc.round.floor)
        .alwaysUseRounding(true)
        .x(d3.scale.linear().domain([-25, 25]))
        .renderHorizontalGridLines(true)
        // customize the filter displayed in the control span
        .filterPrinter(function (filters) {
            var filter = filters[0], s = "";
            s += numberFormat(filter[0]) + "% -> " + numberFormat(filter[1]) + "%";
            return s;
        });*/
    // Customize axis
    histoChart.xAxis().tickFormat(
        function (v) { return v + "%"; });
    histoChart.yAxis().ticks(5);
    
    dc.dataCount(".dc-data-count")
        .dimension(ndx)
        .group(all);
/*
    histogramChart.xAxis().tickFormat(
        function (v) { return v + "%"; });
    histogramChart.yAxis().ticks(5); 
 
    //#### Stacked Area Chart
    //Specify an area chart, by using a line chart with `.renderArea(true)`
    moveChart
        .renderArea(true)
        .width(990)
        .height(200)
        .transitionDuration(1000)
        .margins({top: 30, right: 50, bottom: 25, left: 40})
        .dimension(moveMonths)
        .mouseZoomable(true)
        // Specify a range chart to link the brush extent of the range with the zoom focue of the current chart.
        .rangeChart(volumeChart)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        .round(d3.time.month.round)
        .xUnits(d3.time.months)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
        .brushOn(false)
        // Add the base layer of the stack with group. The second parameter specifies a series name for use in the legend
        // The `.valueAccessor` will be used for the base layer
        .group(indexAvgByMonthGroup, "Monthly Index Average")
        .valueAccessor(function (d) {
            return d.value.avg;
        })
        // stack additional layers with `.stack`. The first paramenter is a new group.
        // The second parameter is the series name. The third is a value accessor.
        .stack(monthlyMoveGroup, "Monthly Index Move", function (d) {
            return d.value;
        })
        // title can be called by any stack layer.
        .title(function (d) {
            var value = d.value.avg ? d.value.avg : d.value;
            if (isNaN(value)) value = 0;
            return dateFormat(d.key) + "\n" + numberFormat(value);
        });

    volumeChart.width(990)
        .height(40)
        .margins({top: 0, right: 50, bottom: 20, left: 40})
        .dimension(moveMonths)
        .group(volumeByMonthGroup)
        .centerBar(true)
        .gap(1)
        .x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
        .round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.months);

    /*
    //#### Data Count
    // Create a data count widget and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    <div id="data-count">
        <span class="filter-count"></span> selected out of <span class="total-count"></span> records
    </div>
    
    
    dc.dataCount(".dc-data-count")
        .dimension(ndx)
        .group(all);

    
    //#### Data Table
    // Create a data table widget and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    <!-- anchor div for data table -->
    <div id="data-table">
        <!-- create a custom header -->
        <div class="header">
            <span>Date</span>
            <span>Open</span>
            <span>Close</span>
            <span>Change</span>
            <span>Volume</span>
        </div>
        <!-- data rows will filled in here -->
    </div>
*/  
    dc.dataTable(".dc-data-table")
        .dimension(mean)
        // data table does not use crossfilter group but rather a closure
        // as a grouping function
        .size(2) // (optional) max number of records to be shown, :default = 25
        // dynamic columns creation using an array of closures
        .columns([
            function (d) {
                return d.pident;
            }
        ])
        // (optional) sort using the given field, :default = function(d){return d;}
        // (optional) sort order, :default ascending
        .order(d3.ascending)
        // (optional) custom renderlet to post-process chart using D3
        .renderlet(function (table) {
            table.selectAll(".dc-table-group").classed("info", true);
        });

/*
    //#### Geo Choropleth Chart
    //Create a choropleth chart and use the given css selector as anchor. You can also specify
    //an optional chart group for this chart to be scoped within. When a chart belongs
    //to a specific group then any interaction with such chart will only trigger redraw
    //on other charts within the same chart group.
    dc.geoChoroplethChart("#us-chart")
        .width(990) // (optional) define chart width, :default = 200
        .height(500) // (optional) define chart height, :default = 200
        .transitionDuration(1000) // (optional) define chart transition duration, :default = 1000
        .dimension(states) // set crossfilter dimension, dimension key should match the name retrieved in geo json layer
        .group(stateRaisedSum) // set crossfilter group
        // (optional) define color function or array for bubbles
        .colors(["#ccc", "#E2F2FF","#C4E4FF","#9ED2FF","#81C5FF","#6BBAFF","#51AEFF","#36A2FF","#1E96FF","#0089FF","#0061B5"])
        // (optional) define color domain to match your data domain if you want to bind data or color
        .colorDomain([-5, 200])
        // (optional) define color value accessor
        .colorAccessor(function(d, i){return d.value;})
        // Project the given geojson. You can call this function mutliple times with different geojson feed to generate
        // multiple layers of geo paths.
        //
        // * 1st param - geo json data
        // * 2nd param - name of the layer which will be used to generate css class
        // * 3rd param - (optional) a function used to generate key for geo path, it should match the dimension key
        // in order for the coloring to work properly
        .overlayGeoJson(statesJson.features, "state", function(d) {
            return d.properties.name;
        })
        // (optional) closure to generate title for path, :default = d.key + ": " + d.value
        .title(function(d) {
            return "State: " + d.key + "\nTotal Amount Raised: " + numberFormat(d.value ? d.value : 0) + "M";
        });

        //#### Bubble Overlay Chart
        // Create a overlay bubble chart and use the given css selector as anchor. You can also specify
        // an optional chart group for this chart to be scoped within. When a chart belongs
        // to a specific group then any interaction with such chart will only trigger redraw
        // on other charts within the same chart group.
        dc.bubbleOverlay("#bubble-overlay")
            // bubble overlay chart does not generate it's own svg element but rather resue an existing
            // svg to generate it's overlay layer
            .svg(d3.select("#bubble-overlay svg"))
            .width(990) // (optional) define chart width, :default = 200
            .height(500) // (optional) define chart height, :default = 200
            .transitionDuration(1000) // (optional) define chart transition duration, :default = 1000
            .dimension(states) // set crossfilter dimension, dimension key should match the name retrieved in geo json layer
            .group(stateRaisedSum) // set crossfilter group
            // closure used to retrieve x value from multi-value group
            .keyAccessor(function(p) {return p.value.absGain;})
            // closure used to retrieve y value from multi-value group
            .valueAccessor(function(p) {return p.value.percentageGain;})
            // (optional) define color function or array for bubbles
            .colors(["#ccc", "#E2F2FF","#C4E4FF","#9ED2FF","#81C5FF","#6BBAFF","#51AEFF","#36A2FF","#1E96FF","#0089FF","#0061B5"])
            // (optional) define color domain to match your data domain if you want to bind data or color
            .colorDomain([-5, 200])
            // (optional) define color value accessor
            .colorAccessor(function(d, i){return d.value;})
            // closure used to retrieve radius value from multi-value group
            .radiusValueAccessor(function(p) {return p.value.fluctuationPercentage;})
            // set radius scale
            .r(d3.scale.linear().domain([0, 3]))
            // (optional) whether chart should render labels, :default = true
            .renderLabel(true)
            // (optional) closure to generate label per bubble, :default = group.key
            .label(function(p) {return p.key.getFullYear();})
            // (optional) whether chart should render titles, :default = false
            .renderTitle(true)
            // (optional) closure to generate title per bubble, :default = d.key + ": " + d.value
            .title(function(d) {
                return "Title: " + d.key;
            })
            // add data point to it's layer dimension key that matches point name will be used to
            // generate bubble. multiple data points can be added to bubble overlay to generate
            // multiple bubbles
            .point("California", 100, 120)
            .point("Colorado", 300, 120)
            // (optional) setting debug flag to true will generate a transparent layer on top of
            // bubble overlay which can be used to obtain relative x,y coordinate for specific
            // data point, :default = false
            .debug(true);
    */

    //#### Rendering
    //simply call renderAll() to render all charts on the page
    dc.renderAll();
    /*
    // or you can render charts belong to a specific chart group
    dc.renderAll("group");
    // once rendered you can call redrawAll to update charts incrementally when data
    // change without re-rendering everything
    dc.redrawAll();
    // or you can choose to redraw only those charts associated with a specific chart group
    dc.redrawAll("group");
    */    
});

//#### Version
//Determine the current version of dc with `dc.version`
d3.selectAll("#version").text(dc.version);
