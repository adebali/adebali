/*
  d3.phylogram.js
  Wrapper around a d3-based phylogram (tree where branch lengths are scaled)
  Also includes a radial dendrogram visualization (branch lengths not scaled)
  along with some helper methods for building angled-branch trees.

  Copyright (c) 2013, Ken-ichi Ueda

  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer. Redistributions in binary
  form must reproduce the above copyright notice, this list of conditions and
  the following disclaimer in the documentation and/or other materials
  provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
  POSSIBILITY OF SUCH DAMAGE.

  DOCUEMENTATION

  d3.phylogram.build(selector, nodes, options)
    Creates a phylogram.
    Arguments:
      selector: selector of an element that will contain the SVG
      nodes: JS object of nodes
    Options:
      width       
        Width of the vis, will attempt to set a default based on the width of
        the container.
      height
        Height of the vis, will attempt to set a default based on the height
        of the container.
      vis
        Pre-constructed d3 vis.
      tree
        Pre-constructed d3 tree layout.
      children
        Function for retrieving an array of children given a node. Default is
        to assume each node has an attribute called "branchset"
      diagonal
        Function that creates the d attribute for an svg:path. Defaults to a
        right-angle diagonal.
      skipTicks
        Skip the tick rule.
      skipBranchLengthScaling
        Make a dendrogram instead of a phylogram.
  
  d3.phylogram.buildRadial(selector, nodes, options)
    Creates a radial dendrogram.
    Options: same as build, but without diagonal, skipTicks, and 
      skipBranchLengthScaling
  
  d3.phylogram.rightAngleDiagonal()
    Similar to d3.diagonal except it create an orthogonal crook instead of a
    smooth Bezier curve.
    
  d3.phylogram.radialRightAngleDiagonal()
    d3.phylogram.rightAngleDiagonal for radial layouts.
*/


  ///alignmentJson = "npc1_GRs_1and3.json";

//d3.json(alignmentJson,function(error, root) { console.log(root); });




var clustal = {
	"A"	:	"blue",
	"I"	:	"blue",
	"L"	:	"blue",
	"M"	:	"blue",
	"F"	:	"blue",
	"W"	:	"blue",
	"V"	:	"blue",
	"R"	:	"red",
	"K"	:	"red",
	"N"	:	"green",
	"C"	:	"pink",
	"Q"	:	"green",
	"E"	:	"magenta",
	"D"	:	"magenta",
	"G"	:	"orange",
	"H"	:	"cyan",
	"Y"	:	"cyan",
	"P"	:	"yellow",
	"S"	:	"green",
	"T"	:	"green",
	"X"	:	"gray",
	"-"	:	"gray"
	}


function separation(a, b) {
  return a.parent == b.parent ? 1 : 1;
}


function aa2properties(aa){
	theDict = {
		'o'   :    [ 'S', 'T' ], //alcohol
		'l'   :    [ 'I', 'L', 'V' ], //aliphatic
		'a'   :    [ 'F', 'H', 'W', 'Y' ], //aromatic
		'p'   :    [ 'C', 'D', 'E', 'H', 'K', 'N', 'Q', 'R', 'S', 'T' ], //polar
		'h'   :    [ 'A', 'C', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'R', 'T', 'V', 'W', 'Y' ], //hydrophobic
		'-'   :    [ 'D', 'E' ], //negative
		'c'   :    [ 'D', 'E', 'H', 'K', 'R' ], //charged
		'+'   :    [ 'H', 'K', 'R' ], //positive
		's'   :    [ 'A', 'C', 'D', 'G', 'N', 'P', 'S', 'T', 'V' ], //small
		'u'   :    [ 'A', 'G', 'S' ], //tiny
		't'   :    [ 'A', 'C', 'D', 'E', 'G', 'H', 'K', 'N', 'Q', 'R', 'S', 'T' ] //turnlike
		}
		
	var resDict = {};
	
	for (var key in theDict){
		resDict[key] = theDict[key].indexOf(aa) > -1 ? 1 :0;
		//console.log(resDict[key]);
		}

	return resDict;
}	

function aaProperties2drawText(propertyDict){
	var text = '';
	var displayColor = "black";
	var nodisplayColor = "rgb(245,245,245)";
	var x = 1;
	var x_diff = 15;
	for (var key in propertyDict){
		var theColor = propertyDict[key] == 1 ? displayColor : nodisplayColor;
		//console.log(theColor);
		text += '<text x='+ x+' y="5" fill="' + theColor + '" style="font-family: Arial" lengthAdjust="spacingAndGlyphs" s=10 text-anchor="left" dominant-baseline="central">'+ key +'</text>';
		//text += '<rect x=' + 1 + ' y='+1+' width='+200+' height="'+5+'" style="fill:'+'red'+';stroke-width:0;stroke:rgb(255,255,255)" />'
		x += x_diff;
		}
	return text;
}







		//while (theNode.children)
				

function comparator(a, b) {
  if (a.order || b.order){
          return d3.ascending(a.order, b.order);}
  else{
          return d3.ascending(a.name, b.name);}
}


if (!d3) { throw "d3 wasn't included!"};
(function() {
  d3.phylogram = {}
  d3.phylogram.rightAngleDiagonal = function() {
    var projection = function(d) { return [d.y, d.x]; }
    
    var path = function(pathData) {
      return "M" + pathData[0] + ' ' + pathData[1] + " " + pathData[2];
    }
    
    function diagonal(diagonalPath, i) {
      var source = diagonalPath.source,
          target = diagonalPath.target,
          midpointX = (source.x + target.x) / 2,
          midpointY = (source.y + target.y) / 2,
          pathData = [source, {x: target.x, y: source.y}, target];
      pathData = pathData.map(projection);
      return path(pathData)
    }
    
    diagonal.projection = function(x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };
    
    diagonal.path = function(x) {
      if (!arguments.length) return path;
      path = x;
      return diagonal;
    };
    
    return diagonal;
  }
  
  d3.phylogram.radialRightAngleDiagonal = function() {
    return d3.phylogram.rightAngleDiagonal()
      .path(function(pathData) {
        var src = pathData[0],
            mid = pathData[1],
            dst = pathData[2],
            radius = Math.sqrt(src[0]*src[0] + src[1]*src[1]),
            srcAngle = d3.phylogram.coordinateToAngle(src, radius),
            midAngle = d3.phylogram.coordinateToAngle(mid, radius),
            clockwise = Math.abs(midAngle - srcAngle) > Math.PI ? midAngle <= srcAngle : midAngle > srcAngle,
            rotation = 0,
            largeArc = 0,
            sweep = clockwise ? 0 : 1;
        return 'M' + src + ' ' +
          "A" + [radius,radius] + ' ' + rotation + ' ' + largeArc+','+sweep + ' ' + mid +
          'L' + dst;
      })
      .projection(function(d) {
        var r = d.y, a = (d.x - 90) / 180 * Math.PI;
        return [r * Math.cos(a), r * Math.sin(a)];
      })
  }
  
  // Convert XY and radius to angle of a circle centered at 0,0
  d3.phylogram.coordinateToAngle = function(coord, radius) {
    var wholeAngle = 2 * Math.PI,
        quarterAngle = wholeAngle / 4
    
    var coordQuad = coord[0] >= 0 ? (coord[1] >= 0 ? 1 : 2) : (coord[1] >= 0 ? 4 : 3),
        coordBaseAngle = Math.abs(Math.asin(coord[1] / radius))
    
    // Since this is just based on the angle of the right triangle formed
    // by the coordinate and the origin, each quad will have different 
    // offsets
    switch (coordQuad) {
      case 1:
        coordAngle = quarterAngle - coordBaseAngle
        break
      case 2:
        coordAngle = quarterAngle + coordBaseAngle
        break
      case 3:
        coordAngle = 2*quarterAngle + quarterAngle - coordBaseAngle
        break
      case 4:
        coordAngle = 3*quarterAngle + coordBaseAngle
    }
    return coordAngle
  }
  
  d3.phylogram.styleTreeNodes = function(vis) {
    vis.selectAll('g.leaf.node')
      .append("svg:circle")
        .attr("r", 4.5)
        .attr('stroke',  'yellowGreen')
        .attr('fill', 'greenYellow')
        .attr('stroke-width', '2px');
    
    vis.selectAll('g.root.node')
      .append('svg:circle')
        .attr("r", 4.5)
        .attr('fill', 'steelblue')
        .attr('stroke', '#369')
        .attr('stroke-width', '2px');
  }
  
  function scaleBranchLengths(nodes, w) {
    // Visit all nodes and adjust y pos width distance metric
    var visitPreOrder = function(root, callback) {
      callback(root)
      if (root.children) {
        for (var i = root.children.length - 1; i >= 0; i--){
          visitPreOrder(root.children[i], callback)
        };
      }
    }
    visitPreOrder(nodes[0], function(node) {
      node.rootDist = (node.parent ? node.parent.rootDist : 0) + (node.length || 0)
    })
    var rootDists = nodes.map(function(n) { return n.rootDist; });
    var yscale = d3.scale.linear()
      .domain([0, d3.max(rootDists)])
      .range([0, w]);
    visitPreOrder(nodes[0], function(node) {
      node.y = yscale(node.rootDist)
    })
    return yscale
  }
 

function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		function(m,key,value) {
		vars[key] = value;
		});
		return vars;
		}






var alignmentFile = "npc1_GRs_1and3.json";
  
  d3.phylogram.build = function(alignmentData,selector, nodes, options) {

vars = getUrlVars();

if (vars['p']){
	var enteredPosition = parseInt(vars['p'])
	var position = enteredPosition;
	console.log('HEEEYYYYY');
}
else{
	position = -1;
	if (vars['f']){
		var enteredFirstSeqPosition = parseInt(vars['f'])
		var firstSeqPosition = enteredFirstSeqPosition;
	//	console.log(firstSeqPosition);
	}
	else{
		position = -1;
	}
}
if (vars['r']){
	var range = vars['r'];
}
else{
	range = 20;
}
console.log(position)

function alignment2firstSeqRef(alignmentData){
	for (var key in alignmentData){
		ob = alignmentData[key];
		if(ob.i==1){
			//console.log(ob['s']);
			var sequence = ob['s'];
		break;
		}
	}
	var mydict = {};
	var firstSeqCount = 0;
	var generalCount = 0;
	for (var j in sequence){
		var aa = sequence[j];
		//console.log(aa);
		if (aa != "-"){
			mydict[firstSeqCount] = generalCount
			firstSeqCount++;
			}
		generalCount++;
		}
	//console.log(mydict);
	return mydict
}


console.log(position);

if(position == -1){
	console.log("no P");
	if ('f' in vars){
	var referenceDict = alignment2firstSeqRef(alignmentData);
	var position = referenceDict[firstSeqPosition];
	console.log(position);
	}

	else{
		alert("No position information given");
		position = 1000;
	}
}
else{
	console.log("INSTEAD");
	console.log(position);
}
//var position = 1500;

function ob2attachLastChild(nodes,text){
	
	nodes.forEach(function(d) { 
		d.order = 100;
		d.name = d.name.trim().replace(/'/g,'').trim();
		//console.log(d.name);
		});

	nodes.forEach(function (d) {
		var theNode = d;
		if(!d.children){
			if (d.name.indexOf("Homo_sapiens") > -1){
				d.order = 0;
				var theParent = d.parent;
				while (theParent.parent){
					//console.log(theParent);
					 theParent.order = 0;
					theParent = theParent.parent;
					}
				}
			}
		});
	return nodes;

	}

    options = options || {}
    var w = options.width || d3.select(selector).style('width') || d3.select(selector).attr('width'),
        h = options.height || d3.select(selector).style('height') || d3.select(selector).attr('height'),
        w = parseInt(w),
        h = parseInt(h);
    var tree = options.tree || d3.layout.cluster()
      .size([h, w])
      //.sort(function(node) { return node.children ? node.children.length : -1; })
      .sort(comparator)
      .separation(separation)
      .children(options.children || function(node) {
        return node.branchset
      });
    var diagonal = options.diagonal || d3.phylogram.rightAngleDiagonal();
    var vis = options.vis || d3.select(selector).append("svg:svg")
        .attr("width", w + 1000)
        .attr("height", h + 30)
      .append("svg:g")
        .attr("transform", "translate(20, 20)");
	//console.log(nodes);
    var nodes = tree(nodes);
    ob2attachLastChild(nodes,'text');
    //console.log(nodes); 
    if (options.skipBranchLengthScaling) {
      var yscale = d3.scale.linear()
        .domain([0, w])
        .range([0, w]);
    } else {
      var yscale = scaleBranchLengths(nodes, w)
    }
    
    if (!options.skipTicks) {
      vis.selectAll('line')
          .data(yscale.ticks(10))
        .enter().append('svg:line')
          .attr('y1', 0)
          .attr('y2', h)
          .attr('x1', yscale)
          .attr('x2', yscale)
          .attr("stroke", "#ddd");

      vis.selectAll("text.rule")
          .data(yscale.ticks(10))
        .enter().append("svg:text")
          .attr("class", "rule")
          .attr("x", yscale)
          .attr("y", 0)
          .attr("dy", -3)
          .attr("text-anchor", "middle")
          .attr('font-size', '8px')
          .attr('fill', '#ccc')
          .text(function(d) { return Math.round(d*100) / 100; });
    }
        
    var link = vis.selectAll("path.link")
        .data(tree.links(nodes))
      .enter().append("svg:path")
        .attr("class", "link")
        .attr("d", diagonal)
        .attr("fill", "none")
        .attr("stroke", "#aaa")
        .attr("stroke-width", "4px");
        
    var node = vis.selectAll("g.node")
        .data(nodes)
      .enter().append("svg:g")
	.attr("id", function(n) {
		return n.children ? "NA" + n.length : n.name;
		})
	.attr("width","100%")
        .attr("class", function(n) {
          if (n.children) {
            if (n.depth == 0) {
              return "root node"
            } else {
              return "inner node"
            }
          } else {
            return "leaf node"
          }
        })
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
	

	var leaf = vis.selectAll("g.leaf")
		.append("text")
		.attr("x",function(d){ 
			
			if (position>=20){
				return (700 - d.y);
				}
			else{
				var diff = 20 - position;
				return (700 - d.y + 9.5*diff)
			}
		})
		.attr("y",6)
		.attr("font-family","Courier New")
		.attr("font-weight","bold")
		//.text("TETETETETETETTEXTTEXT")
		.text(function(d){
			var subsequence = alignmentData[d.name].s.substring(position-range,position+range); 
			//console.log(subsequence); console.log(position);  
			return subsequence;})
		//.text(function(d){return alignmentData[d.name].s.substring(position,position+1);})
		.attr("text-anchor","beg");
	
	var highlight = vis.selectAll("g.leaf")
		.append("rect")
		.attr("x",function(d){return (700 - d.y) + range*9 + 2;})
		.attr("y",-10)
		.attr("width","10")
		.attr("height","20")
		.attr("fill",function(d){var residue = alignmentData[d.name].s.substring(position-1,position); 
			//console.log(residue + '-' + clustal[residue]); 
			return clustal[residue];})
		.attr("opacity",0.3)
	//	.text(function(d){return Array(range).join(' ') + alignmentData[d.name].s.substring(position,position+1) + Array(range).join(" ");})
	//	.attr("text-anchor","beg");

	var tick = vis.append("g")
		.append("rect")
		.attr("x",700)
		.attr("y",-10)
		.attr("width",380)
		.attr("height",2);

 
    d3.phylogram.styleTreeNodes(vis)
    
    if (!options.skipLabels) {
      vis.selectAll('g.inner.node')
        .append("svg:text")
          .attr("dx", -6)
          .attr("dy", -6)
          .attr("text-anchor", 'end')
          .attr('font-size', '8px')
          .attr('fill', '#ccc')
          .text(function(d) { return d.length; });

      vis.selectAll('g.leaf.node').append("svg:text")
        .attr("dx", 8)
        .attr("dy", 3)
        .attr("text-anchor", "start")
        .attr('font-family', 'Helvetica Neue, Helvetica, sans-serif')
        .attr('font-size', '10px')
        .attr('fill', 'black')
        //.text(function(d) { return d.name + ' ('+d.length+')'; });
        .text(function(d) { return d.name; });
    }
    
    return {tree: tree, vis: vis}
}
  
  d3.phylogram.buildRadial = function(alignment,selector, nodes, options) {
    options = options || {}
    var w = options.width || d3.select(selector).style('width') || d3.select(selector).attr('width'),
        r = w / 2,
        labelWidth = options.skipLabels ? 10 : options.labelWidth || 120;
    
    var vis = d3.select(selector).append("svg:svg")
        .attr("width", r * 2)
        .attr("height", r * 2)
      .append("svg:g")
        .attr("transform", "translate(" + r + "," + r + ")");
        
    var tree = d3.layout.tree()
      .size([360, r - labelWidth])
      //.sort(function(node) { return node.children ? node.children.length : -1; })
      .sort(comparator)
      .children(options.children || function(node) {
        return node.branchset
      })
      .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
    
    var phylogram = d3.phylogram.build(alignment,selector, nodes, {
      vis: vis,
      tree: tree,
      skipBranchLengthScaling: true,
      skipTicks: true,
      skipLabels: options.skipLabels,
      diagonal: d3.phylogram.radialRightAngleDiagonal()
    })
    vis.selectAll('g.node')
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    
    if (!options.skipLabels) {
      vis.selectAll('g.leaf.node text')
        .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .attr('font-family', 'Helvetica Neue, Helvetica, sans-serif')
        .attr('font-size', '10px')
        .attr('fill', 'black')
        .text(function(d) { return d.data.name; });

      vis.selectAll('g.inner.node text')
        .attr("dx", function(d) { return d.x < 180 ? -6 : 6; })
        .attr("text-anchor", function(d) { return d.x < 180 ? "end" : "start"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; });
    }
    
    return {tree: tree, vis: vis}
  }

}());
