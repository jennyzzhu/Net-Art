let popsURL = "https://data.sfgov.org/resource/65ik-7wqd.json";
let longitude;
let latitude;
let newLong;
let newLat;
let lowestlong = 999999999;
let lowestlat = 999999999;
let larlong = -999999999;
let larlat = -999999999;
let title;
let popsSign;
let popsAccess
let sceneNum = 0;
let sel;
let backimg;

function preload() {
    popsData = loadJSON(popsURL);
    title = loadFont("Fonts/SourceSans-Italic.ttf");
    backimg = loadImage('background.png');
}
function setup() {
    createCanvas(600, 600);
    sel = createSelect();
    sel.option("Accessibility");
    sel.option("Signage");
    // sel.position(20, 75);
    sel.style("background-color", "#000000");
    sel.style("color", "#ffffff");
}

function draw() {
    background(43, 51, 64);
    image(backimg, 0, 0, width, height)

    for (let i = 0; i < 78; i++) {
        if (i == 66) {
            break;
        }
        popsSign = popsData[i].signage;
        popsAccess = popsData[i].accessibility;

        longitude = popsData[i].the_geom.coordinates[0];
        latitude = popsData[i].the_geom.coordinates[1];

        //checks for lowest and highest longitude and latitude value
        if (longitude < lowestlong) {
            lowestlong = longitude;
        }
        if (longitude > larlong) {
            larlong = longitude;
        }
        if (latitude < lowestlat) {
            lowestlat = latitude;
        }
        if (latitude > larlat) {
            larlat = latitude;
        }

        //mapping coordinates to the canvas
        newLong = map(longitude, larlong, lowestlong, 550, 100);
        newLat = map(latitude, lowestlat, larlat, 550, 150);

        switch (sceneNum) {
            case 0:
                access();
                textSize(15)
                text('Direct', 45, 117);

                fill(219, 64, 53)
                text('Indirect', 45, 137)
                break;

            case 1:
                signage();
                textSize(15);
                fill(51, 168, 214)
                text('Yes', 45, 117);


                fill(219, 64, 53);
                text('None', 45, 137)
                break;
        }

        switchView();
        interface();
    }

}

//switching between two data visualizations
function switchView() {
    if (sel.value() == "Accessibility") {
        sceneNum = 0;
    }
    if (sel.value() == "Signage") {
        sceneNum = 1;
    }
}

function interface() {
    stroke(255);
    fill(255);
    textSize(27);
    textFont(title);
    text("SF Privately Owned Public Open Space(POPOS)", 20, 55);

    push()
    noStroke()
    fill(51, 168, 214);
    circle(30, 112, 15);
    fill(219, 64, 53);
    circle(30, 132, 15);
    fill(2255);
    circle(30, 152, 15);
    pop()

    push()
    noStroke()
    textSize(15)
    text('No data', 45, 157)
    pop()
}

function access() {
    noStroke();
    if (popsAccess == "Direct" && "Very Direct" && "Diect") {
        fill(51, 168, 214);
        circle(newLong, newLat, 20);
    } else if (popsAccess == null) {
        fill(255);
        circle(newLong, newLat, 20);
    } else if (popsAccess == "13080") {
        fill(255);
        circle(newLong, newLat, 20);
    } else {
        fill(219, 64, 53);
        circle(newLong, newLat, 20);
    }
}

function signage() {
    noStroke();
    if (
        popsSign == "None" &&
        "none" &&
        "None Visible" &&
        'No. Sign in interior atrium only says "roof garden"'
    ) {
        fill(219, 64, 53);
        circle(newLong, newLat, 20);
    } else if (popsSign == null) {
        fill(255);
        circle(newLong, newLat, 20);
    } else {
        fill(51, 168, 214);
        circle(newLong, newLat, 20);
    }
}
