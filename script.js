var bounds = [[0, 0], [1024, 1024]]; // TODO: Fix with correct bounds

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 4,
    attributionControl: false,
    maxBounds: bounds
});

const image = L.imageOverlay('map.png', bounds).addTo(map);

var marker = L.marker([285, 665]).addTo(map);

map.setView([550, 575], 0);

map.on("contextmenu", function (event) {
    console.log("user right-clicked on map coordinates: " + event.latlng.toString());
    L.marker(event.latlng).addTo(map);
});