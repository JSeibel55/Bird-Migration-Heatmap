var map = L.map(
    "map",
    {
        center: [32.748357, -81.723449],
        crs: L.CRS.EPSG3857,
        zoom: 4,
        zoomControl: true,
        preferCanvas: false,
    }
);
L.control.scale().addTo(map);

var tile_layer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { "attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false }
).addTo(map);

var times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

map.timeDimension = L.timeDimension(
    { times: times, currentTime: new Date(1) }
);

var heat_map_Control = new L.Control.TimeDimensionCustom(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'], {
    autoPlay: false,
    backwardButton: true,
    displayDate: true,
    forwardButton: true,
    limitMinimumRange: 5,
    limitSliders: true,
    loopButton: true,
    maxSpeed: 10,
    minSpeed: 0.1,
    playButton: true,
    playReverseButton: true,
    position: "bottomleft",
    speedSlider: true,
    speedStep: 0.1,
    styleNS: "leaflet-control-timecontrol",
    timeSlider: true,
    timeSliderDrapUpdate: false,
    timeSteps: 1
}).addTo(map);

// Load Bird Heat Maps
// import { BTBWAR_heat_map } from './btbwar.js'

BTBWAR_heat_map.addTo(map); // Black-throated Blue Warbler
// PIPPLO_heat_map.addTo(map); // Piping Plover

