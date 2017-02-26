var renderer1;
var scene1;
var camera1;

var renderer2;
var scene2;
var camera2;


init();
animate();


function init() {

    // 01 - Minimal Scene

    scene1 = new THREE.Scene();

    renderer1 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer1.setClearColor(0x858585, 1.0);
    renderer1.setSize(document.getElementById("01-minimal").offsetWidth, document.getElementById("01-minimal").offsetHeight);
    renderer1.shadowMap.enabled = true;

    camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera1.position.x = 15;
    camera1.position.y = 16;
    camera1.position.z = 13;
    camera1.lookAt(scene1.position);

    document.getElementById("01-minimal").appendChild(renderer1.domElement);


    // 02 - Add Meshes

    scene2 = new THREE.Scene();

    renderer2 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer2.setClearColor(0x858585, 1.0);
    renderer2.setSize(document.getElementById("02-mesh").offsetWidth, document.getElementById("02-mesh").offsetHeight);
    renderer2.shadowMap.enabled = true;
    renderer2.shadowMap.type = THREE.PCFSoftShadowMap; //Questo è per migliorare la shadow

    camera2 = new THREE.PerspectiveCamera(45, document.getElementById("02-mesh").offsetWidth / document.getElementById("02-mesh").offsetHeight, 0.1, 1000);
    camera2.position.x = 15;
    camera2.position.y = 16;
    camera2.position.z = 13;
    camera2.lookAt(scene2.position);

    // Aggiungo il cubo
    var cubeGeometry = new THREE.CubeGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: "red"});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    scene2.add(cube);

    // Aggiungo il piano
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -2;
    scene2.add(plane);


    // Aggiungo la luce altrimenti non si vede una mazza
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(10, 20, 20);
    spotLight.castShadow = true;
    //spotLight.shadowDarkness = 0.5; //deprecated
    spotLight.shadow.mapSize.width = 1024; // default is 512
    spotLight.shadow.mapSize.height = 1024; // default is 512
    scene2.add(spotLight);

    document.getElementById("02-mesh").appendChild(renderer2.domElement);


    // 03 - Enhance

    scene3 = new THREE.Scene();

    renderer3 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer3.setClearColor(0x858585, 1.0);
    renderer3.setSize(document.getElementById("03-enhance").offsetWidth, document.getElementById("03-enhance").offsetHeight);
    renderer3.shadowMap.enabled = true;
    renderer3.shadowMap.type = THREE.PCFSoftShadowMap; //Questo è per migliorare la shadow

    camera3 = new THREE.PerspectiveCamera(45, document.getElementById("03-enhance").offsetWidth / document.getElementById("03-enhance").offsetHeight, 0.1, 1000);
    camera3.position.x = 15;
    camera3.position.y = 16;
    camera3.position.z = 13;
    camera3.lookAt(scene2.position);

    // Aggiungo il cubo
    var cubeMaterial3 = new THREE.MeshLambertMaterial({color: "red"});
    var cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial3);
    cube3.name = "cube";
    cube3.material.transparent = true;
    cube3.castShadow = true;
    scene3.add(cube3);

    console.log(cube3);

    // Aggiungo il piano
    var plane3 = new THREE.Mesh(planeGeometry, planeMaterial);
    plane3.receiveShadow = true;
    plane3.rotation.x = -0.5 * Math.PI;
    plane3.position.y = -2;
    scene3.add(plane3);


    // Aggiungo la luce
    var spotLight3 = new THREE.SpotLight(0xffffff);
    spotLight3.position.set(10, 20, 20);
    spotLight3.castShadow = true;
    //spotLight.shadowDarkness = 0.5; //deprecated
    spotLight3.shadow.mapSize.width = 1024; // default is 512
    spotLight3.shadow.mapSize.height = 1024; // default is 512
    scene3.add(spotLight3);

    // Dat  gui controls
    control = new function () {
        this.rotationSpeed = 0.005;
        this.opacity = 0.6;
        this.color = cubeMaterial.color.getHex();
    };
    addControlGui(control);


    function addControlGui(controlObject) {
        var gui = new dat.GUI({autoPlace: false}); // Per posizionare
        gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
        gui.add(controlObject, 'opacity', 0.1, 1);
        gui.addColor(controlObject, 'color');
        var customContainer = document.getElementById('my-gui-container3'); // Per posizionare
        customContainer.appendChild(gui.domElement); // Per posizionare

    }

    // Fine dat gui controls

    // Inizio Stats
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.getElementById('my-stats-container3').appendChild(stats.domElement);
    }

    addStatsObject();
    // Fine Stats


    document.getElementById("03-enhance").appendChild(renderer3.domElement);


    // 04 - Orbit Controls

    scene4 = new THREE.Scene();

    renderer4 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer4.setClearColor(0x858585, 1.0);
    renderer4.setSize(document.getElementById("04-orbit").offsetWidth, document.getElementById("04-orbit").offsetHeight);
    renderer4.shadowMap.enabled = true;
    renderer4.shadowMap.type = THREE.PCFSoftShadowMap; //Questo è per migliorare la shadow

    camera4 = new THREE.PerspectiveCamera(45, document.getElementById("04-orbit").offsetWidth / document.getElementById("04-orbit").offsetHeight, 0.1, 1000);
    camera4.position.x = 15;
    camera4.position.y = 16;
    camera4.position.z = 13;
    camera4.lookAt(scene4.position);

    cameraControl4 = new THREE.OrbitControls(camera4, document.getElementById("04-orbit"));

    // Aggiungo il cubo
    var cubeMaterial4 = new THREE.MeshLambertMaterial({color: "red"});
    var cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial4);
    cube4.castShadow = true;
    scene4.add(cube4);


    // Aggiungo la luce
    var spotLight4 = new THREE.SpotLight(0xffffff);
    spotLight4.position.set(10, 20, 20);
    spotLight4.castShadow = true;
    //spotLight.shadowDarkness = 0.5; //deprecated
    spotLight4.shadow.mapSize.width = 1024; // default is 512
    spotLight4.shadow.mapSize.height = 1024; // default is 512
    scene4.add(spotLight4);

    document.getElementById("04-orbit").appendChild(renderer4.domElement);


    // 05 - DOM Events

    scene5 = new THREE.Scene();

    renderer5 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer5.setClearColor(0x858585, 1.0);
    renderer5.setSize(document.getElementById("05-domevent").offsetWidth, document.getElementById("05-domevent").offsetHeight);
    renderer5.shadowMap.enabled = true;
    renderer5.shadowMap.type = THREE.PCFSoftShadowMap; //Questo è per migliorare la shadow

    camera5 = new THREE.PerspectiveCamera(45, document.getElementById("05-domevent").offsetWidth / document.getElementById("05-domevent").offsetHeight, 0.1, 1000);
    camera5.position.x = 15;
    camera5.position.y = 16;
    camera5.position.z = 13;
    camera5.lookAt(scene4.position);

    cameraControl5 = new THREE.OrbitControls(camera5, document.getElementById("05-domevent"));

    // Aggiungo il cubo
    var cubeMaterial5 = new THREE.MeshLambertMaterial({color: "red"});
    var cube5 = new THREE.Mesh(cubeGeometry, cubeMaterial5);
    cube5.position.z = 4;
    cube5.castShadow = true;
    scene5.add(cube5);

    // Aggiungo il cubo
    var cubeMaterial5b = new THREE.MeshLambertMaterial({color: "blue"});
    var cube5b = new THREE.Mesh(cubeGeometry, cubeMaterial5b);
    cube5b.position.z = -4;
    cube5.castShadow = true;
    scene5.add(cube5b);


    // Aggiungo la luce
    var spotLight5 = new THREE.SpotLight(0xffffff);
    spotLight5.position.set(10, 20, 20);
    spotLight5.castShadow = true;
    //spotLight.shadowDarkness = 0.5; //deprecated
    spotLight5.shadow.mapSize.width = 1024; // default is 512
    spotLight5.shadow.mapSize.height = 1024; // default is 512
    scene5.add(spotLight5);

    document.getElementById("05-domevent").appendChild(renderer5.domElement);

    // Dom Events
    var domEvents = new THREEx.DomEvents(camera5, renderer5.domElement);
    domEvents.addEventListener(cube5, 'click', function (event) {
        console.log('you clicked on the red mesh')
        animate(event)
    }, false);

    domEvents.addEventListener(cube5b, 'click', function (event) {
        console.log('you clicked on the blue mesh');
        animate(event)
    }, false);

    function animate(event) {
        TweenMax.to(event.target.position, 0.1, {
            y: "-1", ease: Linear.easeNone, onComplete: function () {
                TweenMax.to(event.target.position, 0.1, {y: "0", ease: Linear.easeNone});
            }
        });
    }

    // Linkify
    var url = 'http://jeromeetienne.github.io/threex/'
    var linkify = THREEx.Linkify(domEvents, cube5, url, true);


    // 06 - Materials

    scene6 = new THREE.Scene();

    renderer6 = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer6.setClearColor(0x858585, 1.0);
    renderer6.setSize(document.getElementById("06-material").offsetWidth, document.getElementById("06-material").offsetHeight);
    renderer6.shadowMap.enabled = true;
    renderer6.shadowMap.type = THREE.PCFSoftShadowMap; //Questo è per migliorare la shadow

    camera6 = new THREE.PerspectiveCamera(45, document.getElementById("06-material").offsetWidth / document.getElementById("06-material").offsetHeight, 0.1, 1000);
    camera6.position.x = 15;
    camera6.position.y = 16;
    camera6.position.z = 13;
    camera6.lookAt(scene6.position);

    cameraControl6 = new THREE.OrbitControls(camera6, document.getElementById("06-material"));

    // Aggiungo la luce
    var spotLight6 = new THREE.SpotLight(0xffffff);
    spotLight6.position.set(10, 20, 20);
    spotLight6.castShadow = true;
    spotLight6.shadow.mapSize.width = 1024; // default is 512
    spotLight6.shadow.mapSize.height = 1024; // default is 512
    scene6.add(spotLight6);

    // Aggiungo il cubo
    var cube6 = new THREE.Mesh(cubeGeometry,  createComplexMaterial() );
    cube6.castShadow = true;
    scene6.add(cube6);

    // Creo il materiale complesso
    function createComplexMaterial() {

        var earthTexture = THREE.ImageUtils.loadTexture("src/img/texture.jpg");
        var cubeMaterial6 = new THREE.MeshPhongMaterial();
        cubeMaterial6.map = earthTexture;

        var normalMap = THREE.ImageUtils.loadTexture("src/img/normal-map.jpg");
        cubeMaterial6.normalMap = normalMap;
        cubeMaterial6.normalScale = new THREE.Vector2(2, 2);

        return cubeMaterial6;
    }







    document.getElementById("06-material").appendChild(renderer6.domElement);

}

function animate() {
    requestAnimationFrame(animate);

    // render using requestAnimationFrame
    renderer1.render(scene1, camera1);
    renderer2.render(scene2, camera2);

    // Scene 3 con dat.gui
    scene3.getObjectByName('cube').material.opacity = control.opacity;
    scene3.getObjectByName('cube').material.color = new THREE.Color(control.color);
    var rotSpeed = control.rotationSpeed;
    camera3.position.x = camera3.position.x * Math.cos(rotSpeed) + camera3.position.z * Math.sin(rotSpeed);
    camera3.position.z = camera3.position.z * Math.cos(rotSpeed) - camera3.position.x * Math.sin(rotSpeed);
    camera3.lookAt(scene3.position);

    // Stats
    stats.update();

    renderer3.render(scene3, camera3);


    // Orbit Controls
    renderer4.render(scene4, camera4);
    cameraControl4.update();

    // DOM Events
    renderer5.render(scene5, camera5);
    cameraControl5.update();

    // Material
    renderer6.render(scene6, camera6);
    cameraControl6.update();

}



