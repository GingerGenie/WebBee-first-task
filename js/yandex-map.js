async function initMap() {
    await ymaps3.ready;
    const {YMap, YMapDefaultSchemeLayer, YMapControls, YMapControlButton} = ymaps3;

    const map = new YMap(document.getElementById('yandexmap'),{
        location: {
            center: [37.623082, 55.75254],
            zoom: 11
        },
        mode: 'vector'
    });

    const controls = new YMapControls({position: 'top left', orientation: 'vertical'});
    const lightTheme = new YMapDefaultSchemeLayer();
    const darkTheme = new YMapDefaultSchemeLayer({
        customization: [
            {
                "tags": {
                    "any": [
                    "road"
                    ]
                },
                "elements": "geometry",
                "stylers": [
                    {
                    "color": "#4E4E4E"
                    }
                ]
            },
            {
                "tags": {
                  "any": [
                    "water"
                  ]
                },
                "elements": "geometry",
                "stylers": [
                  {
                    "color": "#F1F1F1",
                    "opacity": 0.4
                  }
                ]
            },
            {
                "tags": {
                  "any": [
                    "landscape",
                    "admin",
                    "land",
                    "transit"
                  ]
                },
                "elements": "geometry",
                "stylers": [
                  {
                    "color": "#212121"
                  }
                ]
            },
            {
                "tags": {
                  "any": [
                    "building"
                  ]
                },
                "elements": "geometry",
                "stylers": [
                  {
                    "color": "#757474"
                  }
                ]
            }
        ]
    })

    const light = new YMapControlButton({
        text: 'Light Theme',
        onClick: () => {
            map.removeChild(darkTheme);
            map.addChild(lightTheme);
        }
    })
    const dark = new YMapControlButton({
        text: 'Dark Theme',
        onClick: () => {
            map.removeChild(lightTheme);
            map.addChild(darkTheme);
        }
    });

    const moscow = new YMapControlButton({
        text: 'Москва',
        onClick: () => {
            map.setLocation({
              center: [37.588144, 55.733842],
              zoom: 5
            });
          }
    })

    controls.addChild(dark);
    controls.addChild(light);
    controls.addChild(moscow);

    map.addChild(controls);
    map.addChild(lightTheme);
}

export {initMap}

// 37.588144, 55.733842 - Moscow location