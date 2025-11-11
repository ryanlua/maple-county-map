import { Map, CRS, ImageOverlay, Marker, Icon, GeoJSON, Control } from 'leaflet';

const {
    teams,
    gasStations,
    gunStores,
    jobs,
    hospitals,
    banks,
    dealerships,
    mechanics,
    houses,
    other
} = window;

const bounds = [[0, 0], [1024, 1024]]; // TODO: Fix with correct bounds

const map = new Map('map', {
    crs: CRS.Simple,
    minZoom: -1,
    maxZoom: 4,
    center: [550, 575],
    zoom: 0,
    attributionControl: false,
    maxBounds: bounds
});

const defaultIconOptions = {
    iconSize: [38, 64],
    iconAnchor: [19, 62],
    popupAnchor: [0, -62]
};

const createMarkerIcon = (iconUrl) => new Icon({ ...defaultIconOptions, iconUrl });

function onEachFeature(feature = {}, layer) {
    const properties = feature.properties || {};
    const { name, icon: iconUrl, buyable, postalCode } = properties;

    if (iconUrl) {
        layer.setIcon(createMarkerIcon(iconUrl));
    } else if (buyable) {
        layer.setIcon(createMarkerIcon('images/house-marker.png'));
    }

    let popupContent = '';

    if (name) {
        popupContent = name;
    }

    if (postalCode) {
        popupContent = popupContent ? `${popupContent}, ${postalCode}` : postalCode;
        layer.bindTooltip(postalCode);
    }

    if (popupContent) {
        layer.bindPopup(popupContent);
    }
}

const teamsLayer = new GeoJSON([teams], {
    onEachFeature
}).addTo(map);

const gasStationLayer = new GeoJSON([gasStations], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/gas-station-marker.png'),
            title: 'Gas Station'
        });
    },
    onEachFeature
}).addTo(map);

const gunStoresLayer = new GeoJSON([gunStores], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/gun-store-marker.png'),
            title: 'Gun Store'
        });
    },
    onEachFeature
}).addTo(map);

const jobLayer = new GeoJSON([jobs], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/job-marker.png'),
            title: 'Job'
        });
    },
    onEachFeature
}).addTo(map);

const hospitalsLayer = new GeoJSON([hospitals], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/hospital-marker.png'),
            title: 'Hospital'
        });
    },
    onEachFeature
}).addTo(map);

const banksLayer = new GeoJSON([banks], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/bank-marker.png'),
            title: 'Bank'
        });
    },
    onEachFeature
}).addTo(map);

const mechanicsLayer = new GeoJSON([mechanics], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/mechanics-marker.png'),
            title: 'Mechanics'
        });
    },
    onEachFeature
}).addTo(map);

const dealershipsLayer = new GeoJSON([dealerships], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/dealership-marker.png'),
            title: 'Dealership'
        });
    },
    onEachFeature
}).addTo(map);

const housesLayer = new GeoJSON([houses], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/empty-marker.png'),
            title: 'House'
        });
    },
    onEachFeature
});

const otherLayer = new GeoJSON([other], {
    pointToLayer(feature, latlng) {
        return new Marker(latlng, {
            icon: createMarkerIcon('images/orange-marker.png'),
            title: 'Other'
        });
    },
    onEachFeature
});

const defaultLayer = new ImageOverlay('images/map.avif', bounds).addTo(map);

// TODO: Enable default layer and add satellite layer
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

new Control.Layers(baseLayers, overlays).addTo(map);