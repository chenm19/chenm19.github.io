// References:
// Interactive Choropleth Map:  https://leafletjs.com/examples/choropleth/

	var map = L.map('map').setView([37.8, -96], 3);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/light-v9'
	}).addTo(map);

    var stateNames = [ "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming" ];

    
    var stateWhereWaldoIsAt= stateNames[Math.floor(Math.random()*stateNames.length)];
    console.log(stateWhereWaldoIsAt); 

var tick;
   function clock() {
     tick = setInterval(clockTime, 1000);
     var seconds = 15;
     function clockTime() {
       document.getElementById("timer").innerHTML = ("TIMER: " + --seconds);
       if (seconds < 1) {
        clearInterval(tick);
        alert("The timer has expired! Click restart to begin a new game!");
         clearInterval(tick);
         
       }
     }
   }

   document.getElementById('restartgame').addEventListener('click', () => {
    window.location.reload(true);
    clearInterval(tick);
  });

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
          clearInterval(tick);

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