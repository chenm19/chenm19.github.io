<html>
<head>
	
	<title>Where's Waldo in the US?</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
  	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" ></script>
  	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>


	<style>
		html, body {
			height: 100%;
			margin: 0;
		}
		#map {
			width: 600px;
			height: 400px;
		}
	</style>

	<style>#map { width: 1200px; height: 800px; }
.info { padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } .info h4 { margin: 0 0 5px; color: #777; }
</style>
</head>
<body>

  <div style="text-align: center">
    <header><b>Where's Waldo?</b></header>
</div>

<div id='map'></div>

<script type="text/javascript" src="us-states.js"></script>

<script type="text/javascript">
    // Stopwatch Code: https://www.ostraining.com/blog/coding/stopwatch/
    // Cloropath Map Code:  ....

	var map = L.map('map').setView([37.8, -96], 4);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/light-v9'
	}).addTo(map);

    var stateNames = [ "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming" ];

    //NOTE FOR HARRISON: Be able to explain random selection code
    var stateWhereWaldoIsAt= stateNames[Math.floor(Math.random()*stateNames.length)];
    console.log(stateWhereWaldoIsAt); 

    // Setting up the game timeout
    var gameTimer;
    timerSetup();

    function timerSetup() {
      gameTimer = setTimeout(gameOver, 2000);
    }

    function gameOver() {
        console.log("Game Over");
		$("#dialog").dialog();
    }

	function startingStyle(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: '#338DFF'
		};
	}

	var geojson;

    // Description: Function to determine if Waldo is in the state
    // Parameter e: Javascript event 
	function ifWaldo(e) {
        // Check the state name
        if( e.target.feature.properties.name ==  stateWhereWaldoIsAt ) {
          // Turn the state to green
          e.target.setStyle({fillColor: "#228B22"});
          clearTimeout(gameTimer);
        } else {
          // Turn the state to red
          e.target.setStyle({fillColor: "#B22222"});
        }
	}


	function onEachFeature(feature, layer) {
		layer.on({
			click: ifWaldo 
		});
	}

	geojson = L.geoJson(statesData, {
		style: startingStyle,
		onEachFeature: onEachFeature
	}).addTo(map);

</script>
</body>
</html>