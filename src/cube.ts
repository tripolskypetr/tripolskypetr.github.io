/// <reference path="./common/AnimatedTexture.ts"/>
namespace Cube {
    const SCREEN_WIDTH: number = window.innerWidth;
    const SCREEN_HEIGHT: number = window.innerHeight;
    const ASPECT_RATIO: number = SCREEN_WIDTH / SCREEN_HEIGHT;
    const BORDER_SIZE: number = 140;
    class Cube {

        private firstTexture: THREE.Texture;
        private secondTexture: THREE.Texture;
        private thirdTexture: THREE.Texture;

        private firstAnimator: AnimatedTexture;
        private secondAnimator: AnimatedTexture;
        private thirdAnimator: AnimatedTexture;

        private camera: THREE.Camera;
        private scene: THREE.Scene;

        private group: THREE.Group;
        private firstFace: THREE.Mesh;
        private secondFace: THREE.Mesh;
        private thirdFace: THREE.Mesh;

        private renderer: THREE.WebGLRenderer;
        private focus: FocusWatcher;
        private clock: THREE.Clock;

        constructor(first: string, second: string, third: string) {

            this.clock = new THREE.Clock();

            this.camera = new THREE.PerspectiveCamera(80, ASPECT_RATIO, 0.5, 5000);
            this.camera.position.set(250, 250, 250);
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(255, 255, 255);
            this.scene.fog = new THREE.Fog( 0x000000, 250, 1400 );

            this.group = new THREE.Group();

            this.firstTexture = new THREE.TextureLoader().load(first);
            this.secondTexture = new THREE.TextureLoader().load(second);
            this.thirdTexture = new THREE.TextureLoader().load(third);

            this.firstTexture.minFilter = THREE.LinearFilter;
            this.secondTexture.minFilter = THREE.LinearFilter;
            this.thirdTexture.minFilter = THREE.LinearFilter;

            this.firstAnimator = new AnimatedTexture(this.firstTexture, 122, 1, 122, 250);
            this.secondAnimator = new AnimatedTexture(this.secondTexture, 122, 1, 122, 250);
            this.thirdAnimator = new AnimatedTexture(this.thirdTexture, 122, 1, 122, 250);

            this.firstFace = new THREE.Mesh(
                new THREE.PlaneGeometry(BORDER_SIZE, BORDER_SIZE, 1, 1),
                new THREE.MeshBasicMaterial( {color: 0xffffff, map: this.firstTexture}),
            );
            this.firstFace.rotation.set(- Math.PI / 2, 0, 0);
            this.firstFace.position.set(0, BORDER_SIZE / 2, 0);
            this.group.add(this.firstFace);

            this.secondFace = new THREE.Mesh(
                new THREE.PlaneGeometry(BORDER_SIZE, BORDER_SIZE, 1, 1),
                new THREE.MeshBasicMaterial( {color: 0xffffff, map: this.secondTexture}),
            );
            this.secondFace.rotation.set(0, Math.PI / 2,  - Math.PI / 2);
            this.secondFace.position.set(BORDER_SIZE / 2, 0, Math.sin(BORDER_SIZE / 2));
            this.group.add(this.secondFace);

            this.thirdFace = new THREE.Mesh(
                new THREE.PlaneGeometry(BORDER_SIZE, BORDER_SIZE, 1, 1),
                new THREE.MeshBasicMaterial( {color: 0xffffff, map: this.thirdTexture}),
            );
            this.thirdFace.position.set(0, 0, BORDER_SIZE / 2);
            this.group.add(this.thirdFace);

            this.scene.add(this.group);

            this.renderer = new THREE.WebGLRenderer({antialias: true});
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.querySelector("body").appendChild(this.renderer.domElement);

            window.addEventListener("resize", this.resize, false );
            this.focus = new FocusWatcher();
            this.animate();
        }

        private resize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        private animate = () => {
            const delta = this.clock.getDelta();

            this.firstAnimator.update(delta * 1000);
            this.secondAnimator.update(delta * 1000);
            this.thirdAnimator.update(delta * 1000);

            const {x, y} = this.focus.getPos();
            let dx = null;
            let dy = null;
            let dz = null;
            let ds = null;

            if (x > 0) {
                dx = (x) => x * -Math.tan(45);
                dz = (x) => 0;
            } else {
                dx = (x) => 0;
                dz = (x) => x * Math.atan(45);
            }

            if (y > 0) {
                dy = (y) => y * Math.atan(y);
            } else {
                dy = (y) => y * -Math.atan(y);
            }

            ds = (x, y) => {
                /* debug: console.log({x,y})*/
                return Math.abs(Math.min(x, y));
            };

            this.camera.position.set(250 + dx(x) + ds(x, y), 250 + dy(y), 250 + dz(x) + ds(x, y));

            this.camera.lookAt(new THREE.Vector3(0, 0, 0));
            this.renderer.render(this.scene, this.camera);

            requestAnimationFrame(this.animate);
        }
    }
    export const buildCube = (first: Blob, second: Blob, third: Blob) => {
        return new Cube(
            URL.createObjectURL(first),
            URL.createObjectURL(second),
            URL.createObjectURL(third),
        );
    };
}
