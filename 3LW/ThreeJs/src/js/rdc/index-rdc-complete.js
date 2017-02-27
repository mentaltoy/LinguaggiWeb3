start3Dexp();


// Switch between 3D and text for scrolling
function switchScroll(event){
    var theDropDown = document.querySelector(".article-rdc");
    theDropDown.classList.toggle("on-top");
}


/* THREE jS */

function start3Dexp(){




    //$('.home-container').toggleClass('visible');

    if (!Detector.webgl) Detector.addGetWebGLMessage();

    var stats;
    var scene;
    var pointLight;
    var camera;
    var control;
    var renderer;
    var model;
    var animations;
    var kfAnimations = [];
    var kfAnimationsLength = 0;
    var loader = new THREE.ColladaLoader();
    var lastTimestamp = 0;
    var progress = 0;
    var currentTime = 0;
    var initialized = false;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var requestId;

    var position;

    var modelPath = 'src/js/rdc/cubo-anim.dae';



    function init() {



        var container = document.createElement('div');
        document.getElementById('home-intro').appendChild(container);
        container.id = 'wheel';


        // Scene

        scene = new THREE.Scene();


        // KeyFrame Animations

        for (var i = 0; i < kfAnimationsLength; ++i) {

            var animation = animations[i];

            var kfAnimation = new THREE.KeyFrameAnimation(animation);
            kfAnimation.timeScale = 1;
            kfAnimations.push(kfAnimation);

        }




        // Add the COLLADA

        scene.add(model);

        console.log(scene)
        // Lights
        //var light = new THREE.AmbientLight( 0xffffff ); // soft white light
        //scene.add( light );


        // Piano
        //var pianoGeometria = new THREE.PlaneGeometry(2000, 2000, 2000);
        //var pianoMateriale = new THREE.MeshLambertMaterial({
        //    color: 0xdddddd
        //
        //});
        //
        //
        //
        //var piano = new THREE.Mesh(pianoGeometria, pianoMateriale);
        //piano.receiveShadow = true; //Shadow, both casted and received, have to be enabled
        //piano.rotation.x = -0.5 * Math.PI; //90 degrees in radians
        //piano.position.set(0, -2, 0);
        //
        //
        //scene.add(piano);



        //camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
        //camera.castShadow = true;
        //
        //controlliCamera = new THREE.OrbitControls(camera); // Attiva il controllo "orbit" sulla camera
        ////camera.position.x = 35;
        ////camera.position.y = 36;
        //camera.position.z = 100; // Lascia solo questo per il tilt
        //camera.lookAt(scene.position);




        // Renderer

        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, logarithmicDepthBuffer: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor( 0xebebeb, 1);

        renderer.shadowMap.enabled = true;

        //renderer.sortObjects = false;
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Stats

        //stats = new Stats();
        //stats.domElement.style.position = 'absolute';
        //stats.domElement.style.top = '0px';
        //
        //container.appendChild(stats.domElement);

        window.addEventListener('resize', onWindowResize, false);



    }

    function onWindowResize() {


        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }


    function start() {



        for (var i = 0; i < kfAnimationsLength; ++i) {

            var animation = kfAnimations[i];

            for (var h = 0, hl = animation.hierarchy.length; h < hl; h++) {

                var keys = animation.data.hierarchy[h].keys;
                var sids = animation.data.hierarchy[h].sids;
                var obj = animation.hierarchy[h];


                // Interessante - Dati animazione
                //console.log(animation.data);

                if (keys.length && sids) {

                    for (var s = 0; s < sids.length; s++) {

                        var sid = sids[s];
                        var next = animation.getNextKeyWith(sid, h, 0);
                        //var prev = animation.getPrevKeyWith(sid, h, 0);

                        if (next) next.apply(sid);
                        //if (prev) prev.apply(sid);

                    }

                    obj.matrixAutoUpdate = false;
                    animation.data.hierarchy[h].node.updateMatrix();
                    obj.matrixWorldNeedsUpdate = true;

                }

            }

            animation.loop = false;
            animation.play();

        }






    }

    function update(e) {

        var VIDEO_INIT = 0,
            VIDEO_END = 6,
            auxTime;

        auxTime = currentTime + e;


        /// Inizio Camera SCROLL
            if (auxTime <= VIDEO_END & auxTime >= VIDEO_INIT) {


                currentTime = auxTime;

                var cooD = e;

                model.traverse(function (child) {

                    //console.log(child)

                    if (child instanceof THREE.PerspectiveCamera) {

                        camera = child;
                        camera.setLens (50, 35 );
                        //camera.near = 0;
        //                camera.fov = 30;
        //                camera.castShadow = true;
                        var vector = new THREE.Vector3();
                        vector.setFromMatrixPosition(model.matrixWorld);


                        var object = model.getObjectByName('Camera.Target.1');

                        camera.lookAt( vector );
                    }


                });


                position =  parseInt(currentTime*10, 10);




                camera.aspect = window.innerWidth / window.innerHeight;

                camera.near = 10;
                camera.updateProjectionMatrix();



                for (var i = 0; i < kfAnimationsLength; ++i) {

                    kfAnimations[i].update(cooD);


                }
            }

        /// Fine Camera SCROLL



        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();


        renderer.render(scene, camera);

        startAnimation()

    }



    function loop() {
        requestId = window.requestAnimationFrame(tempReq);
    }

    function startAnimation() {
        if (!requestId && !initialized) {
            initialized = true;
            loop();
        }
    }

    function stopAnimation() {

        if (requestId) {
            // console.log('STOP loop')
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        }
    }

    var tempReq = function () {
        update(0);
        loop();
    };



    function isMobile(){

        var isMob = false; //initiate as false
        // device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMob = true;

        return isMob;

    }

    function updateOverlay(e){


        // Funzione da collegare all'animazione
        //console.log('c:'+ e);


    }



    function getParam(progress) {


        var isMob = isMobile();
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';
        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;
        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        if (!isMob){

            //Ambiente desktop
            if (isFirefox) {
                return progress.toFixed(2) * -0.1;
            }


            //default tutti quelli che rimangono
            return progress.toFixed(2) * -0.01;


        }else {

            // detect iPhone
            if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                return progress.toFixed(2) * -0.005;

            }

            //default tutti quelli che rimangono
            return progress.toFixed(2) * -0.01;

        }

    }

    var Animation = {

        init: function () {

            this.loadModel();

        },

        bindEventListeners: function () {

            $('#home-intro-scroll-sensor').momentus({
                //u: 10,
                //mass: 1000,
                //wheelRatio: -1000,
                //mouseRatio: 6,
                onChange: function (coords) {




                    stopAnimation();

                    //console.log('scroll ' + Math.random())

                    var progress = (coords.y - lastTimestamp);
                    //console.log(coords.y)
                    //console.log('progress '+ progress);
                    //console.log('lastTimestamp '+ lastTimestamp);








                    //console.log(progress.toFixed(2));
                    //Invert scroll direction

                    var param = getParam(progress);

                    //update(progress.toFixed(2) * -0.01);
                    update(param);
                    updateOverlay(position);

                    lastTimestamp = coords.y;

                }
            });



        },

        loadModel: function () {

            var self = this;


            loader.load(modelPath, function (collada) {



                model = collada.scene;
                animations = collada.animations;
                kfAnimationsLength = animations.length;

                model.scale.x = model.scale.y = model.scale.z = 0.1; // 1/8 scale, modeled in cm

                // Aggiungo Manualmente il canale alpha alle texture

                var manager = new THREE.LoadingManager();



                manager.onLoad = function () {
                    console.log("Completed! Insert switch animation from preload to 3d");

                };


                var loader = new THREE.ImageLoader(manager);

                //console.log(model);

                var children = collada.scene.children || [];

                processArray(children);

                //doubleSided(children)



                function doubleSided(array){


                    var forbiddenNames = ['Light'];

                    for (var i = 0; i < array.length; i++) {

                        var name = array[i].name;

                        if ($.inArray(name, forbiddenNames) < 0) {

                            var object = model.getObjectByName(name, true);



                            //console.log(object)

                            if ( name.indexOf('gruppo') > -1 ) {

                                processArray(object.children || []);

                            } else {

                                if (name) {

                                    material = object.children[0].material;
                                    material.side = THREE.DoubleSide;
                                }

                            }

                        }


                    }

                }


                function processArray( array ) {

                    // Array di nomi di oggetti a cui NON va applicata una texture alpha
                    var forbiddenNames = ['Light', 'Plane', 'Camera'];

                    var transparent = [];

                    for (var i = 0; i < array.length; i++) {

                        var name = array[i].name;

                        if ($.inArray(name, forbiddenNames) < 0) {

                            var object = model.getObjectByName(name, true);



                            //console.log(object)

                            if ( name.indexOf('gruppo') > -1 ) {

                                processArray(object.children || []);

                            } else {

                                if (name) {

                                    loadAlpha(name, object);
                                }

                            }

                        }

                        if ($.inArray(name, transparent) >= 0) {

                            var object = model.getObjectByName(name, true);

                            // console.log(object);

                            //applyTransparency(name, object);

                        }
                    }

                }

                function loadAlpha(name, object) {

                    //console.log('loadAlpha ' + name)

                    var file = 'src/js/rdc/' + name + '_alpha.jpg',
                        alpha = new THREE.Texture(),
                        material = object.children[0].material;


                    //object.renderOrder = 1
                    material.alphaMap = alpha;
                    material.transparent = true;

                    //material.depthWrite = false;
                    material.side = THREE.DoubleSide;

                    loader.load(file, function (image) {

                        alpha.image = image;
                        alpha.needsUpdate = true;

                    });

                }

                function applyTransparency(name, object) {

                    //console.log('applyTransparency' + name)

                    var material = object.children[0].material;


                    material.opacity= 0.5;


                }

                self.bindEventListeners();

                init();

                start();

                update(lastTimestamp);


            }, function ( request ) {

                var perc = parseInt((request.loaded / request.total * 100));

                $('#percentage').html(perc);


            });

        }

    };

    Animation.init();


    // Tilt Control Start (solo questo blocco di codice)
    var mouseTolerance = 0.2;

    document.onmousemove=function(e){
        var centerX = window.innerWidth * 0.5;
        var centerY = window.innerHeight * 0.5;

        scene.rotation.y = (e.clientX - centerX) / centerX * mouseTolerance;
        scene.rotation.x = (e.clientY - centerY) / centerY * mouseTolerance;

    };
    // Tilt Control End (solo questo blocco di codice)





}


