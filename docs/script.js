var bounds = [[0, 0], [1024, 1024]]; // TODO: Fix with correct bounds

const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 4,
    center: [550, 575],
    zoom: 0,
    attributionControl: false,
    maxBounds: bounds
});

const image = L.imageOverlay('images/map.avif', bounds).addTo(map);

// DEBUG: Add a marker on right-click
map.on("contextmenu", function (event) {
    console.log("user right-clicked on map coordinates: " + event.latlng.toString());
    L.marker(event.latlng).addTo(map);
});

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
        popupContent = feature.properties.name;
        layer.bindPopup(popupContent);
    }
    if (feature.properties && feature.properties.icon) {
        icon = new MarkerIcon({ iconUrl: feature.properties.icon });
        layer.setIcon(icon);
    }
    if (feature.properties && feature.properties.buyable) {
        icon = new MarkerIcon({ iconUrl: 'images/house-marker.png' });
        layer.setIcon(icon);
    }
    if (feature.properties && feature.properties.postalCode) {
        postalCode = feature.properties.postalCode;
        popupContent += ', ' + feature.properties.postalCode;
        layer.bindPopup(popupContent);
        layer.bindTooltip(postalCode);
    }
}

const MarkerIcon = L.Icon.extend({
    options: {
        iconSize: [38, 64],
        iconAnchor: [19, 62],
        popupAnchor: [0, -62]
    }
});

const teamsLayer = L.geoJSON([teams], {
    onEachFeature
}).addTo(map);

const gasStationLayer = L.geoJSON([gasStations], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/gas-station-marker.png' }),
            title: 'Gas Station'
        });
    },
    onEachFeature
}).addTo(map);

const gunStoresLayer = L.geoJSON([gunStores], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/gun-store-marker.png' }),
            title: 'Gun Store'
        });
    },
    onEachFeature
}).addTo(map);

const jobLayer = L.geoJSON([jobs], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/job-marker.png' }),
            title: 'Job'
        });
    },
    onEachFeature
}).addTo(map);

const hospitalsLayer = L.geoJSON([hospitals], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/hospital-marker.png' }),
            title: 'Hospital'
        });
    },
    onEachFeature
}).addTo(map);

const banksLayer = L.geoJSON([banks], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/bank-marker.png' }),
            title: 'Bank'
        });
    },
    onEachFeature
}).addTo(map);

const mechanicsLayer = L.geoJSON([mechanics], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/mechanics-marker.png' }),
            title: 'Mechanics'
        });
    },
    onEachFeature
}).addTo(map);

const dealershipsLayer = L.geoJSON([dealerships], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/dealership-marker.png' }),
            title: 'Dealership'
        });
    },
    onEachFeature
}).addTo(map);

const housesLayer = L.geoJSON([houses], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/empty-marker.png' }),
            title: 'House'
        });
    },
    onEachFeature
});

const otherLayer = L.geoJSON([other], {
    pointToLayer(feature, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/orange-marker.png' }),
            title: 'Other'
        });
    },
    onEachFeature
});

const baseLayers = {};
const overlays = {
    'Teams': teamsLayer,
    'Jobs': jobLayer,
    'Gas Stations': gasStationLayer,
    'Gun Stores': gunStoresLayer,
    'Hospitals': hospitalsLayer,
    'Banks': banksLayer,
    'Dealerships': dealershipsLayer,
    'Mechanics': mechanicsLayer,
    'Houses': housesLayer,
    'Other': otherLayer,
};

L.control.layers(baseLayers, overlays).addTo(map);