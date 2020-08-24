//declare map var in global scope
var map;
var times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var heatmap;

//Function to instantiate the Leaflet map
function createMap(){
    //create the map
    myBounds = new L.LatLngBounds(new L.LatLng(60, 0), new L.LatLng(30, 0));
    map = L.map("map", {
        center: [32.748357, -81.723449],
        crs: L.CRS.EPSG3857,
        zoom: 4,
        zoomControl: true,
        preferCanvas: false,
    });
    L.control.scale().addTo(map);

    //add OSM base tilelayer
    var tile_layer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        { "attribution": 'Tiles &copy; Esri &mdash; Esri'}
    ).addTo(map);

    // Create Tools
    timeControl();
    createDataControl()

    // Setup starting map
    heatmap = ACAFLY_heat_map;
    heatmap.addTo(map);
};

// Time control
function timeControl(){
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
}

function createDataControl(){
    var DataControl = L.Control.extend({
        options: {
            position: 'topright'
        },
        
        onAdd: function () {
            // create the control container div with a particular class name
            var container = L.DomUtil.create('div', 'data-control-container');

            //create radio button for the two data
            $(container).append(
                '<select id="birdSelector"> \
                    <option value="acafly">Acadian Flycatcher</option> \
                    <option value="balori">Baltimore Oriole</option> \
                    <option value="btbwar">Black-throated Blue Warbler</option> \
                    <option value="magwar">Magnolia Warbler</option> \
                    <option value="pipplo">Piping Plover</option> \
                    <option value="sancra">Sandhill Crane</option> \
                    <option value="yelwar">Yellow Warbler</option> \
                </select>');

            L.DomEvent.disableClickPropagation(container);

            return container;
        }
    });
    map.addControl(new DataControl());

         //Click listener for buttons
         $("#birdSelector").change(function(){
             map.removeLayer(heatmap);
    
            //Change the selected data
            if ($(this.value).selector == 'acafly'){
                heatmap = ACAFLY_heat_map; // Acadian Flycatcher
            } else if ($(this.value).selector == 'balori'){
                heatmap = BALORI_heat_map; // Baltimore Oriole
            }else if ($(this.value).selector == 'btbwar'){
                heatmap = BTBWAR_heat_map; // Black-throated Blue Warbler
            } else if ($(this.value).selector == 'magwar'){
                heatmap = MAGWAR_heat_map; // Magnolia Warbler
            }else if ($(this.value).selector == 'pipplo'){
                heatmap = PIPPLO_heat_map; // Piping Plover
            } else if ($(this.value).selector == 'sancra'){
                heatmap = SANCRA_heat_map; // Sandhill Crane
            }else if ($(this.value).selector == 'yelwar'){
                heatmap = YELWAR_heat_map; // Yellow Warbler
            };
    
            //Update data shown
            heatmap.addTo(map);
        });
}



$(document).ready(createMap);