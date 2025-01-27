var bounds = [[0, 0], [1024, 1024]]; // TODO: Fix with correct bounds

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 4,
    attributionControl: false,
    maxBounds: bounds
});

const image = L.imageOverlay('map.png', bounds).addTo(map);

map.setView([550, 575], 0);

// DEBUG: Add a marker on right-click
map.on("contextmenu", function (event) {
    console.log("user right-clicked on map coordinates: " + event.latlng.toString());
    L.marker(event.latlng).addTo(map);
});

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        popupContent = feature.properties.popupContent;
        layer.bindPopup(popupContent);
    }

    if (feature.properties && feature.properties.title) {
        title = feature.properties.title;
        layer.bindTooltip(title);
    }
}

const gasStationLayer = L.geoJSON([gasStations], {
    onEachFeature: onEachFeature
}).addTo(map);