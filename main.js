var data = states;
var vote = votes;

// Width and height
var w = 450;
var h = 300;

// Define map projection
var projection = d3.geoAlbersUsa()
                   .translate([w/2, h/2])
                   .scale([500]);

// Define path generator
var path = d3.geoPath().projection(projection);

// Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            ;

var txt = d3.select("body")
            .append("div")
            .attr("width", w)
            .attr("height", h)
            ;

stateName = txt.append("p");
tVotes = txt.append("p");
cVotes = txt.append("p");

colScaleRep = d3.scaleLinear().domain([-0.35,0.35]).range(["blue","red"]);

// Function to assign colors to states
function assignColor(v){

  if(statePrez[v]){
    //var temp = (votes[v][0]/(votes[v][0]+votes[v][1]))-(votes[v][1]/(votes[v][0]+votes[v][1])); 
    var temp = (votes[v][0]-votes[v][1])/(votes[v][0]+votes[v][1]); 
    return colScaleRep(temp);
  }
  
  return "orange";
} // Ends Function createSvg


function changeText(v){
	stateName.text("State: "+v);
  tVotes.text("Donald Trump Votes  = "+votes[v][0]);
  cVotes.text("Hillary Clinton Votes = "+votes[v][1]);
}

// Bind data and create one path per GeoJSON feature
svg.selectAll("path")
   .data(data)
   .enter()
   .append("path")
   .attr("d", path)
   .on("mouseover", function(v){return changeText(v.properties.name);})
   .on("mouseout", function(v){ stateName.text("");tVotes.text("");cVotes.text("");})
   .style("fill", function(v){ return assignColor(v.properties.name);} )
   .style('stroke', 'white')
   ;

