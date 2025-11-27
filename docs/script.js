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

L.control.attribution({ prefix: false }).addTo(map).addAttribution(
    '<a href="https://github.com/RyanLua/Maple-County-Map" target="_blank">GitHub</a> | ' +
    'Images from <a href="https://maplecounty.fandom.com/" target="_blank">Maple County Wiki</a> available under <a href="https://www.fandom.com/licensing" target="_blank">CC-BY-SA</a>'
);

// eslint-disable-next-line no-unused-vars
const defaultLayer = L.imageOverlay('images/map.avif', bounds).addTo(map);

function onEachFeature(feature, layer) {
    if (!feature.properties) {
        return;
    }

    if (feature.properties.icon) {
        const icon = new MarkerIcon({ iconUrl: feature.properties.icon });
        layer.setIcon(icon);
    }

    if (feature.properties.name) {
        let popupContent = feature.properties.name;
        if (feature.properties.postalCode) {
            popupContent += ', ' + feature.properties.postalCode;
        }
        layer.bindPopup(popupContent);
    }

    if (layer.options.title) {
        layer.bindTooltip(layer.options.title);
    }
}

const MarkerIcon = L.Icon.extend({
    options: {
        iconSize: [38, 64],
        iconAnchor: [19, 62],
        popupAnchor: [0, -62]
    }
});

const PointIcon = L.Icon.extend({
    options: {
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        tooltipAnchor: [16, 0]
    }
});

const teamsLayer = L.geoJSON(teams, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            title: 'Team'
        });
    },
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

const housesCluster = L.markerClusterGroup();
const housesLayer = L.geoJSON(houses, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/house-marker.png' }),
            title: 'House'
        });
    },
    onEachFeature
});
housesCluster.addLayer(housesLayer);

const otherLayer = L.geoJSON(other, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/orange-marker.png' }),
            title: 'Other'
        });
    },
    onEachFeature
}).addTo(map);

const atmLayer = L.geoJSON(atms, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new PointIcon({ iconUrl: 'images/atm-dot.png' }),
            title: 'ATM'
        });
    },
    onEachFeature
});

const vanLayer = L.geoJSON(vans, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new PointIcon({ iconUrl: 'images/van-dot.png' }),
            title: 'Van Man'
        });
    },
    onEachFeature
});

const tunnelsLayer = L.geoJSON(tunnels, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new PointIcon({ iconUrl: 'images/tunnel-dot.png' }),
            title: 'Tunnel'
        });
    },
    onEachFeature
});

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
    "ATMs": atmLayer,
    "Van Man": vanLayer,
    "Tunnels": tunnelsLayer,
    "Houses": housesCluster,
    "Other": otherLayer
};

const layerControl = L.control.layers(baseLayers, overlays).addTo(map);

map.addControl(new L.Control.Permalink({
    layers: layerControl
}));

// // Leaflet Draw
// const drawnItems = new L.FeatureGroup();
// map.addLayer(drawnItems);

// const drawControl = new L.Control.Draw({
//     position: 'bottomleft',
//     edit: {
//         featureGroup: drawnItems
//     },
//     draw: {
//         polygon: true,
//         polyline: true,
//         rectangle: true,
//         circle: true,
//         marker: true,
//         circlemarker: true
//     }
// });
// map.addControl(drawControl);

// // Handle draw events
// map.on(L.Draw.Event.CREATED, function (event) {
//     const layer = event.layer;
//     drawnItems.addLayer(layer);
//     console.log('Shape created:', layer.toGeoJSON());
// });

// map.on(L.Draw.Event.EDITED, function (event) {
//     const layers = event.layers;
//     layers.eachLayer(function (layer) {
//         console.log('Shape edited:', layer.toGeoJSON());
//     });
// });

// map.on(L.Draw.Event.DELETED, function (event) {
//     const layers = event.layers;
//     layers.eachLayer(function (layer) {
//         console.log('Shape deleted:', layer.toGeoJSON());
//     });
// });
