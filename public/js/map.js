var geolocateControl = new mapboxgl.GeolocateControl(
    {
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
        fitBoundsOptions: {
            maxZoom: 15
        }
    }
);

var pos = null,
    intervalId = null,
    locationId = null,
    currentCoordinates = {
        x: null,
        y: null
    },
    coords = document.getElementsByClassName("coords")[0]

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhdmktY29kZXZpZ29yIiwiYSI6ImNsZjJ4YTNoZzA1NXUzd29jbzJtcTh4YXcifQ.xXYpQeblTS-YkB0Lcvi1ag';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [57.5865, -20.2367],
    zoom: 9
});

map.addControl(geolocateControl, "bottom-right");

function showPosition(position) {
    //   x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    console.log(position)
    coords.innerHTML = position.coords.latitude + ", " + position.coords.longitude
    currentCoordinates.x = position.coords.latitude;
    currentCoordinates.y = position.coords.longitude;
    trackAPI(position.coords.latitude, position.coords.longitude);
    // intervalId = setInterval(track, 5000);
}

function track() {
    navigator.geolocation.watchPosition((position) => {
        if ((position.coords.latitude == currentCoordinates.x) && (position.coords.longitude == currentCoordinates.y)) {
            //means they are the same.
            console.log("same coords")
        } else {
            coords.innerHTML = position.coords.latitude + ", " + position.coords.longitude
            currentCoordinates.x = position.coords.latitude;
            currentCoordinates.y = position.coords.longitude;
            console.log("new coords")
            trackAPI(position.coords.latitude, position.coords.longitude);
        }
        //- console.log(position.coords.latitude, position.coords.longitude)
    }, (err) => {
        console.error(err);
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
}

map.on('load', () => {
    if (navigator.geolocation) {
        geolocateControl.trigger();
        locationId = navigator.geolocation.watchPosition(showPosition, (error) => {
            console.error(error);
            coords.innerHTML = "null, null. Permission denied for Location Sharing"
        }, {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 4000
        });
    } else {
        coords.innerHTML = "null, null. Geolocation is not supported by this browser."
    }
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [57.4924214, -20.2944802],
                    [57.4924214, -20.2944802],
                    [57.4938355, -20.2984026],
                    [57.4923508, -20.2944118],
                    [57.4938355, -20.2984026],
                    [57.4938355, -20.2984026],
                    [57.4740515, -20.3136781],
                    [57.4880969, -20.3135915]

                ]
            }
        }
    });
    // map.addLayer({
    //     'id': 'route',
    //     'type': 'line',
    //     'source': 'route',
    //     'layout': {
    //         'line-join': 'round',
    //         'line-cap': 'round'
    //     },
    //     'paint': {
    //         'line-color': '#888',
    //         'line-width': 8
    //     }
    // });
});

function trackAPI(x, y) {
    $.ajax({
        url: "http://localhost:3000/new-record",
        data: {
            ip: "",
            userDevice: "640c571979dac6b0a1c3b488",
            busRoute: "64555e2059021f0078a7d9e2",
            x: x.toString(),
            y: y.toString()
        },
        type: "POST",
        beforeSend: function (request) {
            return request.setRequestHeader('X-CSRF-Token', "");
        },
        success: function (data) {
            console.log(data)
        },
        error: function (data) {
            console.log("API error")
            console.log(data)
            console.log("clearing Interval")
            clearInterval(intervalId);
            console.log("Interval cleared")
        }
    });
}