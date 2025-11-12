/* eslint-disable no-undef */
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

// eslint-disable-next-line no-unused-vars
const defaultLayer = L.imageOverlay('images/map.avif', bounds).addTo(map);

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

const teamsLayer = L.geoJSON(teams, {
    onEachFeature
}).addTo(map);

const gasStationLayer = L.geoJSON(gasStations, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/gas-station-marker.png' }),
            title: 'Gas Station'
        });
    },
    onEachFeature
}).addTo(map);

const gunStoresLayer = L.geoJSON(gunStores, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/gun-store-marker.png' }),
            title: 'Gun Store'
        });
    },
    onEachFeature
}).addTo(map);

const jobLayer = L.geoJSON(jobs, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/job-marker.png' }),
            title: 'Job'
        });
    },
    onEachFeature
}).addTo(map);

const hospitalsLayer = L.geoJSON(hospitals, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/hospital-marker.png' }),
            title: 'Hospital'
        });
    },
    onEachFeature
}).addTo(map);

const banksLayer = L.geoJSON(banks, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/bank-marker.png' }),
            title: 'Bank'
        });
    },
    onEachFeature
}).addTo(map);

const mechanicsLayer = L.geoJSON(mechanics, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/mechanics-marker.png' }),
            title: 'Mechanics'
        });
    },
    onEachFeature
}).addTo(map);

const dealershipsLayer = L.geoJSON(dealerships, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/dealership-marker.png' }),
            title: 'Dealership'
        });
    },
    onEachFeature
}).addTo(map);

const housesLayer = L.geoJSON(houses, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/empty-marker.png' }),
            title: 'House'
        });
    },
    onEachFeature
});

const otherLayer = L.geoJSON(other, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/orange-marker.png' }),
            title: 'Other'
        });
    },
    onEachFeature
}).addTo(map);

const baseLayers = {
    // "Default": defaultLayer
};

const overlays = {
    "Teams": teamsLayer,
    "Jobs": jobLayer,
    "Gas Stations": gasStationLayer,
    "Gun Stores": gunStoresLayer,
    "Hospitals": hospitalsLayer,
    "Banks": banksLayer,
    "Dealerships": dealershipsLayer,
    "Mechanics": mechanicsLayer,
    "Houses": housesLayer,
    "Other": otherLayer
};

L.control.layers(baseLayers, overlays).addTo(map);

// Leaflet Draw
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
    position: 'bottomleft',
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker: true,
        circlemarker: true
    }
});
map.addControl(drawControl);

// Handle draw events
map.on(L.Draw.Event.CREATED, function (event) {
    const layer = event.layer;
    drawnItems.addLayer(layer);
    console.log('Shape created:', layer.toGeoJSON());
});

map.on(L.Draw.Event.EDITED, function (event) {
    const layers = event.layers;
    layers.eachLayer(function (layer) {
        console.log('Shape edited:', layer.toGeoJSON());
    });
});

map.on(L.Draw.Event.DELETED, function (event) {
    const layers = event.layers;
    layers.eachLayer(function (layer) {
        console.log('Shape deleted:', layer.toGeoJSON());
    });
});
