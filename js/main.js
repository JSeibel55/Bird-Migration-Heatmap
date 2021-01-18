//declare map var in global scope
var map;
var times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var heatmap;

var buttons = [
    L.easyButton('<img src="img/noun_Home_731233_blk.svg">', function(){
        map.setView([32.748357, -88.723449], 4);
    },'zoom to original extent',{ position: 'topleft' }),
];

//Function to instantiate the Leaflet map
function createMap(){
    //create the map
    var myBounds = new L.LatLngBounds(new L.LatLng(60, 0), new L.LatLng(30, 0));
    map = L.map("map", {
        center: [32.748357, -88.723449],
        crs: L.CRS.EPSG3857,
        zoom: 4,
        maxZoom: 6,
        minZoom: 3,
        zoomControl: true,
        preferCanvas: false,
    });
    L.control.scale().addTo(map);
    L.easyBar(buttons).addTo(map);

    //add OSM base tilelayer
    var tile_layer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        { "attribution": 'Tiles &copy; Esri &mdash; Esri'}
    ).addTo(map);

    // Create Tools
    timeControl();
    createDataControl()

    // Setup starting map
    heatmap = COMLOO_heat_map;
    heatmap.addTo(map);
};

// Time control
function timeControl(){
    map.timeDimension = L.timeDimension(
        { times: times, currentTime: new Date(1) }
    );

    var heat_map_Control = new L.Control.TimeDimensionCustom(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], {
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
        playReverseButton: false,
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
                    <optgroup label="Loons and Grebes"> \
                        <option value="comloo">Common Loon</option> \
                        <option value="pibgre">Pied-billed Grebe</option> \
                    </optgroup> \
                    <optgroup label="Waterfowl"> \
                        <option value="cangoo">Canada Goose</option> \
                        <option value="amewig">American Wigeon</option> \
                        <option value="buwtea">Blue-winged Teal</option> \
                        <option value="buffle">Bufflehead</option> \
                        <option value="norpin">Northern Pintail</option> \
                        <option value="norsho">Northern Shoveler</option> \
                    </optgroup> \
                    <optgroup label="Cormorants"> \
                        <option value="doccor">Double-crested Cormorant</option> \
                    </optgroup> \
                    <optgroup label="Wading Birds and Gruiformes"> \
                        <option value="grbher">Great Blue Heron</option> \
                        <option value="greegr">Great Egret</option> \
                        <option value="sancra">Sandhill Crane</option> \
                    </optgroup> \
                    <optgroup label="Raptors"> \
                        <option value="baleag">Bald Eagle</option> \
                        <option value="brwhaw">Broad-winged Hawk</option> \
                        <option value="norhar">Northern Harrier</option> \
                        <option value="osprey">Osprey</option> \
                        <option value="turvul">Turkey Vulture</option> \
                    </optgroup> \
                    <optgroup label="Shorebirds"> \
                        <option value="killde">Killdeer</option> \
                        <option value="pipplo">Piping Plover</option> \
                        <option value="amewoo">American Woodcock</option> \
                    </optgroup> \
                    <optgroup label="Terns"> \
                        <option value="blkter">Black Terns</option> \
                        <option value="comter">Common Tern</option> \
                    </optgroup> \
                    <optgroup label="Swifts and Swallows"> \
                        <option value="chiswi">Chimney Swift</option> \
                    </optgroup> \
                    <optgroup label="Hummingbirds"> \
                        <option value="rthhum">Ruby-throated Hummingbird</option> \
                    </optgroup> \
                    <optgroup label="Kingfishers"> \
                        <option value="belkin">Belted Kingfisher</option> \
                    </optgroup> \
                    <optgroup label="Flycatchers"> \
                        <option value="acafly">Acadian Flycatcher</option> \
                    </optgroup> \
                    <optgroup label="Thrushes"> \
                    </optgroup> \
                    <optgroup label="Sparrows"> \
                    </optgroup> \
                    <optgroup label="Icterids"> \
                        <option value="balori">Baltimore Oriole</option> \
                    </optgroup> \
                    <optgroup label="Warblers"> \
                        <option value="btbwar">Black-throated Blue Warbler</option> \
                        <option value="magwar">Magnolia Warbler</option> \
                        <option value="yelwar">Yellow Warbler</option> \
                    </optgroup> \
                    <optgroup label="Finches"> \
                    </optgroup> \
                </select>');

            L.DomEvent.disableClickPropagation(container);

            return container;
        }
    });
    map.addControl(new DataControl());

         //Click listener for buttons
         $("#birdSelector").change(function(){
            map.removeLayer(heatmap);
            
            $("head").append('<script type="text/javascript" src=js/' + $(this.value).selector + '.js></script>');
            heatmap = window[($(this.value).selector).toUpperCase() + "_heat_map"];
            // heatmap = eval(($(this.value).selector).toUpperCase() + "_heat_map");
    
            //Change the selected data
            // if ($(this.value).selector == 'acafly'){
            //     heatmap = ACAFLY_heat_map; // Acadian Flycatcher
            // } else if ($(this.value).selector == 'pipplo'){
            //     heatmap = PIPPLO_heat_map; // Baltimore Oriole
            // }

            //Update data shown
            heatmap.addTo(map);
        });
}



$(document).ready(createMap);
$(".leaflet-time-control" ).click(function() {
    alert();
    $( ".timecontrol-loop" ).trigger( "click" );
});