var bounds = [[0, 0], [1024, 1024]];

const map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 4,
    center: [550, 475],
    zoom: 0,
    attributionControl: false,
    maxBounds: bounds
});

L.control.attribution({ prefix: false }).addTo(map).addAttribution(
    '<a href="https://discord.gg/f6Jx8Y8Fu7" target="_blank">Discord</a> | ' +
    '<a href="https://github.com/ryanlua/maple-county-map" target="_blank">GitHub</a> | ' +
    'Images from <a href="https://maplecounty.fandom.com/" target="_blank">Maple County Wiki</a> available under <a href="https://www.fandom.com/licensing" target="_blank">CC-BY-SA</a>'
);

const mapWidth = bounds[1][1] - bounds[0][1];
const mapHeight = bounds[1][0] - bounds[0][0];
const mapTileSize = L.point(mapWidth / 6, mapHeight / 6);

const defaultLayer = L.tileLayer('images/maps/default/{z}/{x}/{y}.png', {
    bounds,
    tileSize: mapTileSize,
    minNativeZoom: 0,
    maxNativeZoom: 0
}).addTo(map);

const satelliteLayer = L.tileLayer('images/maps/satellite/{z}/{x}/{y}.png', {
    bounds,
    tileSize: mapTileSize,
    minNativeZoom: 0,
    maxNativeZoom: 0
});

// Change background color for postal layer to match the map
map.on('baselayerchange', function (event) {
    const mapContainer = map.getContainer();
    const color = event.layer === satelliteLayer
        ? '#3177a0'
        : '#91daee';
    mapContainer.style.backgroundColor = color;
});

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
            icon: new MarkerIcon({ iconUrl: 'images/markers/gas-station-marker.png' }),
            title: 'Gas Station'
        });
    },
    onEachFeature
}).addTo(map);

const gunStoresLayer = L.geoJSON(gunStores, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/gun-store-marker.png' }),
            title: 'Gun Store'
        });
    },
    onEachFeature
}).addTo(map);

const jobLayer = L.geoJSON(jobs, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/job-marker.png' }),
            title: 'Job'
        });
    },
    onEachFeature
}).addTo(map);

const hospitalsLayer = L.geoJSON(hospitals, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/hospital-marker.png' }),
            title: 'Hospital'
        });
    },
    onEachFeature
}).addTo(map);

const banksLayer = L.geoJSON(banks, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/bank-marker.png' }),
            title: 'Bank'
        });
    },
    onEachFeature
}).addTo(map);

const mechanicsLayer = L.geoJSON(mechanics, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/mechanics-marker.png' }),
            title: 'Mechanics'
        });
    },
    onEachFeature
}).addTo(map);

const dealershipsLayer = L.geoJSON(dealerships, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/dealership-marker.png' }),
            title: 'Dealership'
        });
    },
    onEachFeature
}).addTo(map);

const housesCluster = L.markerClusterGroup();
const housesLayer = L.geoJSON(houses, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/house-marker.png' }),
            title: 'House'
        });
    },
    onEachFeature
});
housesCluster.addLayer(housesLayer);

const otherLayer = L.geoJSON(other, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new MarkerIcon({ iconUrl: 'images/markers/orange-marker.png' }),
            title: 'Other'
        });
    },
    onEachFeature
}).addTo(map);

const atmLayer = L.geoJSON(atms, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new PointIcon({ iconUrl: 'images/markers/atm-point.png' }),
            title: 'ATM'
        });
    },
    onEachFeature
});

const vanLayer = L.geoJSON(vans, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new PointIcon({ iconUrl: 'images/markers/van-point.png' }),
            title: 'Van Man'
        });
    },
    onEachFeature
});

const tunnelsLayer = L.geoJSON(tunnels, {
    pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, {
            icon: new PointIcon({ iconUrl: 'images/markers/tunnel-point.png' }),
            title: 'Tunnel'
        });
    },
    onEachFeature
});

const baseLayers = {
    "Default": defaultLayer,
    "Satellite": satelliteLayer
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

const layers = L.control.layers(baseLayers, overlays);
map.addControl(layers);
map.addControl(new L.Control.Permalink({ layers: layers }));

// Only include layers that are added to the map by default
const searchLayers = L.featureGroup(
    Object.values(overlays).filter(layer => map.hasLayer(layer))
);

const searchControl = new L.Control.Search({
    layer: searchLayers,
    propertyName: 'name',
    initial: false,
    marker: false,
    moveToLocation(latlng) {
        map.setView(latlng, 3);
    }
});
searchControl.on('search:locationfound', function (e) {
    if (!map.hasLayer(e.layer)) {
        e.layer.addTo(map);
    }

    if (e.layer.getPopup && e.layer.getPopup()) {
        e.layer.openPopup();
    } else if (e.layer.getTooltip && e.layer.getTooltip()) {
        e.layer.openTooltip();
    }
});
map.addControl(searchControl);

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
