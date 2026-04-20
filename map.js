let map;
let userMarker;

function initMap() {
  const stadium = { lat: 22.5726, lng: 88.3639 }; // Kolkata (change if needed)

  map = new google.maps.Map(document.getElementById("map"), {
    center: stadium,
    zoom: 16
  });

  // User location (simulated)
  userMarker = new google.maps.Marker({
    position: stadium,
    map: map,
    title: "You are here"
  });

  // Exit points
  const exits = [
    { name: "Gate 1", lat: 22.5730, lng: 88.3645 },
    { name: "Gate 2", lat: 22.5720, lng: 88.3625 },
    { name: "Gate 3", lat: 22.5715, lng: 88.3640 }
  ];

  exits.forEach(exit => {
    new google.maps.Marker({
      position: { lat: exit.lat, lng: exit.lng },
      map,
      label: exit.name
    });
  });

  // Fetch crowd data and decide safest exit
  fetch("/crowd")
    .then(res => res.json())
    .then(data => {
      const safestExit = getSafestExit(data);
      drawRoute(stadium, safestExit);
    });
}

// 🔥 Decide safest exit based on crowd
function getSafestExit(data) {
  // pick least crowded zone
  let minZone = Object.entries(data.zones).reduce((a, b) =>
    a[1] < b[1] ? a : b
  );

  // map zones → exits (simple logic)
  const mapping = {
    northStand: { lat: 22.5730, lng: 88.3645 },
    southStand: { lat: 22.5720, lng: 88.3625 },
    eastStand: { lat: 22.5715, lng: 88.3640 },
    westStand: { lat: 22.5728, lng: 88.3618 }
  };

  return mapping[minZone[0]];
}

// 🔥 Draw route
function drawRoute(start, end) {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  directionsRenderer.setMap(map);

  directionsService.route(
    {
      origin: start,
      destination: end,
      travelMode: "WALKING"
    },
    (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      }
    }
  );
}

// Initialize map after load
window.onload = initMap;
