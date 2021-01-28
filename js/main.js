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
        maxBounds: [[80, -200], [-80, 200]],
    });
    L.control.scale().addTo(map);
    L.easyBar(buttons).addTo(map);

    //add OSM base tilelayer
    var tile_layer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        { "attribution": 'Tiles &copy; Esri | Data &copy; eBird Basic Dataset. Cornell Lab of Ornithology'}
    ).addTo(map);

    // Create Tools
    timeControl();
    createDataControl()

    // Setup starting map
    heatmap = heat_map;
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
        loopButton: false,
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
        timeSteps: 1,
        playerOptions: {
            loop: true
        }
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

            //create dropdown for bird data
            $(container).append(
                '<select class="custom-select" id="birdSelector"> \
                    <option value="default">-- Select a bird --</option> \
                    <optgroup label="Raptors"> \
                        <option value="amekes">American Kestrel</option> \
                        <option value="baleag">Bald Eagle</option> \
                        <option value="coohaw">Coopers Hawk</option> \
                        <option value="goleag">Golden Eagle</option> \
                        <option value="merlin">Merlin</option> \
                        <option value="norgos">Northern Goshawk</option> \
                        <option value="nswowl">Northern Saw-whet Owl</option> \
                        <option value="osprey">Osprey</option> \
                        <option value="perfal">Peregrine Falcon</option> \
                        <option value="rethaw">Red-tailed Hawk</option> \
                    </optgroup> \
                    <optgroup label="Shorebirds"> \
                        <option value="lobcur">Long-billed Curlew</option> \
                        <option value="pipplo">Piping Plover</option> \
                        <option value="redkno">Red Knot</option> \
                        <option value="rudtur">Ruddy Turnstone</option> \
                        <option value="sander">Sanderling</option> \
                        <option value="shbdow">Short-billed Dowitcher</option> \
                    </optgroup> \
                    <optgroup label="Terns"> \
                        <option value="comter">Common Tern</option> \
                        <option value="leater">Least Tern</option> \
                        <option value="royter">Royal Tern</option> \
                        <option value="santer">Sandwich Tern</option> \
                    </optgroup> \
                    <optgroup label="Cormorants"> \
                        <option value="doccor">Double-crested Cormorant</option> \
                    </optgroup> \
                    <optgroup label="Wading Birds and Gruiformes"> \
                        <option value="grbher">Great Blue Heron</option> \
                        <option value="sancra">Sandhill Crane</option> \
                    </optgroup> \
                    <optgroup label="Waterfowl"> \
                        <option value="truswa">Trumpeter Swan</option> \
                        <option value="cangoo">Canada Goose</option> \
                        <option value="blksco">Black Scoter</option> \
                        <option value="harduc">Harlequin Duck</option> \
                        <option value="mallar">Mallard</option> \
                        <option value="sursco">Surf Scoter</option> \
                        <option value="whwsco">White-winged Scoter</option> \
                    </optgroup> \
                    <optgroup label="Doves"> \
                        <option value="moudov">Mourning Dove</option> \
                    </optgroup> \
                    <optgroup label="Woodpeckers"> \
                        <option value="rensap">Red-naped Sapsucker</option> \
                    </optgroup> \
                    <optgroup label="Swifts and Swallows"> \
                        <option value="chiswi">Chimney Swift</option> \
                        <option value="barswa">Barn Swallow</option> \
                        <option value="nrwswa">Northern Rough-winged Swallow</option> \
                        <option value="purmar">Purple Martin</option> \
                        <option value="treswa">Tree Swallow</option> \
                    </optgroup> \
                    <optgroup label="Hummingbirds"> \
                        <option value="rthhum">Ruby-throated Hummingbird</option> \
                    </optgroup> \
                    <optgroup label="Flycatchers"> \
                        <option value="acafly">Acadian Flycatcher</option> \
                        <option value="easkin">Eastern Kingbird</option> \
                        <option value="easpho">Eastern Phoebe</option> \
                        <option value="eawpew">Eastern Wood-Pewee</option> \
                        <option value="leafly">Least Flycatcher</option> \
                        <option value="wilfly">Willow Flycatcher</option> \
                    </optgroup> \
                    <optgroup label="Vireos"> \
                        <option value="reevir">Red-eyed Vireo</option> \
                        <option value="warvir">Warbling Vireo</option> \
                    </optgroup> \
                    <optgroup label="Mockingbirds and Thrashers"> \
                        <option value="brnthr">Brown Thrasher</option> \
                        <option value="grycat">Gray Catbird</option> \
                    </optgroup> \
                    <optgroup label="Wrens"> \
                        <option value="houwre">House Wren</option> \
                    </optgroup> \
                    <optgroup label="Kinglets and Gnatcatchers"> \
                        <option value="buggna">Blue-gray Gnatcatcher</option> \
                        <option value="ruckin">Ruby-crowned Kinglet</option> \
                    </optgroup> \
                    <optgroup label="Waxwings"> \
                        <option value="cedwax">Cedar Waxwing</option> \
                    </optgroup> \
                    <optgroup label="Thrushes"> \
                        <option value="amerob">American Robin</option> \
                        <option value="swathr">Swainsons Thrush</option> \
                        <option value="veery">Veery</option> \
                        <option value="woothr">Wood Thrush</option> \
                    </optgroup> \
                    <optgroup label="Sparrows"> \
                        <option value="amtspa">American Tree Sparrow</option> \
                        <option value="daejun">Dark-eyed Junco</option> \
                        <option value="eastow">Eastern Towhee</option> \
                        <option value="fiespa">Field Sparrow</option> \
                        <option value="gnttow">Green-tailed Towhee</option> \
                        <option value="linspa">Lincoln Sparrow</option> \
                        <option value="sstspa">Saltmarsh Sparrow</option> \
                        <option value="sonspa">Song Sparrow</option> \
                        <option value="swaspa">Swamp Sparrow</option> \
                        <option value="whcspa">White-crowned Sparrow</option> \
                        <option value="whtspa">White-throated Sparrow</option> \
                    </optgroup> \
                    <optgroup label="Icterids"> \
                        <option value="balori">Baltimore Oriole</option> \
                        <option value="boboli">Bobolink</option> \
                        <option value="easmea">Eastern Meadowlark</option> \
                        <option value="orcori">Orchard Oriole</option> \
                        <option value="rewbla">Red-winged Blackbird</option> \
                    </optgroup> \
                    <optgroup label="Cardinals and allies"> \
                        <option value="bkhgro">Black-headed Grosbeak</option> \
                        <option value="indbun">Indigo Bunting</option> \
                        <option value="norcar">Northern Cardinal</option> \
                        <option value="robgro">Rose-breasted Grosbeak</option> \
                        <option value="scatan">Scarlet Tanager</option> \
                    </optgroup> \
                    <optgroup label="Warblers"> \
                        <option value="amered">American Redstart</option> \
                        <option value="btbwar">Black-throated Blue Warbler</option> \
                        <option value="canwar">Canada Warbler</option> \
                        <option value="chswar">Chestnut-sided Warbler</option> \
                        <option value="comyel">Common Yellowthroat</option> \
                        <option value="magwar">Magnolia Warbler</option> \
                        <option value="naswar">Nashville Warbler</option> \
                        <option value="orcwar">Orange-crowned Warbler</option> \
                        <option value="palwar">Palm Warbler</option> \
                        <option value="tenwar">Tennessee Warbler</option> \
                        <option value="yelwar">Yellow Warbler</option> \
                    </optgroup> \
                    <optgroup label="Finches"> \
                        <option value="amegfi">American Goldfinch</option> \
                        <option value="houfin">House Finch</option> \
                    </optgroup> \
                </select>');

            L.DomEvent.disableClickPropagation(container);

            return container;
        }
    });
    map.addControl(new DataControl());

    //Click listener for drop down selections
    $("#birdSelector").change(function(){
        var bird = $(this.value).selector;
        
        $("#loadingScreen").css("display", "block");
        $("#spinner").css("display", "block");       

        map.removeLayer(heatmap);

        setTimeout(function() { // allow spinner to load before work starts
            if (bird == 'default'){
                heatmap = heat_map;
            } else {
                $("head").append('<script type="text/javascript" src=js/data/' + bird + '.js></script>');
                heatmap = eval(bird.toUpperCase() + "_heat_map");
            }
            heatmap.addTo(map);

            $("#spinner").css("display", "none");
            $("#loadingScreen").css("display", "none");
        },0);
    });
}

// Open popup wanring to view on desktop if user opens in mobile
$(window).on("resize load", function () {
    if ($( window ).width() <= 500) {
        $('#mobile-screen').modal('show');
    } else if ($( window ).width() > 500){
        $('#mobile-screen').modal('hide');
    }
});
$(document).ready(createMap);