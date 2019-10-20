var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path="../../types/three.d.ts"/>
var Cube;
(function (Cube) {
    var AnimatedTexture = /** @class */ (function () {
        function AnimatedTexture(texture, totalHoriz, totalVert, total, duration) {
            var _this = this;
            this.currentTime = 0;
            this.currentFrame = 0;
            this.update = function (msec) {
                _this.currentTime += msec;
                while (_this.currentTime > _this.duration) {
                    _this.currentTime -= _this.duration;
                    _this.currentFrame++;
                    _this.currentFrame = (_this.currentFrame === _this.total) ? 0 : _this.currentFrame;
                    var currentColumn = _this.currentFrame % _this.totalHoriz;
                    _this.texture.offset.x = currentColumn / _this.totalHoriz;
                    var currentRow = Math.floor(_this.currentFrame / _this.totalHoriz);
                    _this.texture.offset.y = currentRow / _this.totalVert;
                }
            };
            this.texture = texture;
            this.totalHoriz = totalHoriz;
            this.totalVert = totalVert;
            this.total = total;
            this.duration = duration;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1 / this.totalHoriz, 1 / this.totalVert);
        }
        return AnimatedTexture;
    }());
    Cube.AnimatedTexture = AnimatedTexture;
})(Cube || (Cube = {}));
/// <reference path="./common/AnimatedTexture.ts"/>
var Cube;
(function (Cube_1) {
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
    var BORDER_SIZE = 140;
    var STEP = 1.5485;
    var Cube = /** @class */ (function () {
        function Cube(first, second, third, config) {
            var _this = this;
            this.resize = function () {
                _this.camera.aspect = window.innerWidth / window.innerHeight;
                _this.camera.updateProjectionMatrix();
                _this.renderer.setSize(window.innerWidth, window.innerHeight);
            };
            this.animate = function () {
                var delta = _this.clock.getDelta();
                _this.firstAnimator.update(delta * 1000);
                _this.secondAnimator.update(delta * 1000);
                _this.thirdAnimator.update(delta * 1000);
                var _a = _this.focus.getPos(), x = _a.x, y = _a.y;
                var dx = null;
                var dy = null;
                var dz = null;
                var ds = null;
                if (x > 0) {
                    dx = function (x) { return x * -STEP; };
                    dz = function (x) { return 0; };
                }
                else {
                    dx = function (x) { return 0; };
                    dz = function (x) { return x * STEP; };
                }
                if (y > 0) {
                    dy = function (y) { return y * Math.atan(y); };
                }
                else {
                    dy = function (y) { return y * -Math.atan(y); };
                }
                ds = function (x, y) { return Math.abs(Math.min(x, y)); };
                _this.camera.position.set(250 + dx(x) + ds(x, y), 250 + dy(y), 250 + dz(x) + ds(x, y));
                _this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                _this.renderer.render(_this.scene, _this.camera);
                requestAnimationFrame(_this.animate);
            };
            this.clock = new THREE.Clock();
            this.camera = new THREE.PerspectiveCamera(80, ASPECT_RATIO, 0.5, 5000);
            this.camera.position.set(250, 250, 250);
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(255, 255, 255);
            this.scene.fog = new THREE.Fog(0x000000, 250, 1400);
            this.group = new THREE.Group();
            this.firstTexture = new THREE.TextureLoader().load(first);
            this.secondTexture = new THREE.TextureLoader().load(second);
            this.thirdTexture = new THREE.TextureLoader().load(third);
            this.firstTexture.minFilter = THREE.LinearFilter;
            this.secondTexture.minFilter = THREE.LinearFilter;
            this.thirdTexture.minFilter = THREE.LinearFilter;
            this.firstAnimator = new Cube_1.AnimatedTexture(this.firstTexture, config.total, 1, config.total, config.delay);
            this.secondAnimator = new Cube_1.AnimatedTexture(this.secondTexture, config.total, 1, config.total, config.delay);
            this.thirdAnimator = new Cube_1.AnimatedTexture(this.thirdTexture, config.total, 1, config.total, config.delay);
            this.firstFace = new THREE.Mesh(new THREE.PlaneGeometry(BORDER_SIZE, BORDER_SIZE, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, map: this.firstTexture }));
            this.firstFace.rotation.set(-Math.PI / 2, 0, 0);
            this.firstFace.position.set(0, BORDER_SIZE / 2, 0);
            this.group.add(this.firstFace);
            this.secondFace = new THREE.Mesh(new THREE.PlaneGeometry(BORDER_SIZE, BORDER_SIZE, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, map: this.secondTexture }));
            this.secondFace.rotation.set(0, Math.PI / 2, -Math.PI / 2);
            this.secondFace.position.set(BORDER_SIZE / 2, 0, Math.sin(BORDER_SIZE / 2));
            this.group.add(this.secondFace);
            this.thirdFace = new THREE.Mesh(new THREE.PlaneGeometry(BORDER_SIZE, BORDER_SIZE, 1, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, map: this.thirdTexture }));
            this.thirdFace.position.set(0, 0, BORDER_SIZE / 2);
            this.group.add(this.thirdFace);
            this.scene.add(this.group);
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.querySelector("body").appendChild(this.renderer.domElement);
            window.addEventListener("resize", this.resize, false);
            this.focus = new Cube_1.FocusWatcher();
            this.animate();
        }
        return Cube;
    }());
    Cube_1.buildCube = function (first, second, third, isMobile) {
        return new Cube(URL.createObjectURL(first), URL.createObjectURL(second), URL.createObjectURL(third), {
            delay: isMobile ? 1000 : 250,
            total: isMobile ? 14 : 122
        });
    };
})(Cube || (Cube = {}));
var Cube;
(function (Cube) {
    var _this = this;
    var DESKTOP_TEXTURE_SIZE = 16384;
    var createPercentManager = function (loader) {
        var firstImage = 0;
        var secondImage = 0;
        var thirdImage = 0;
        var update = function () {
            var percent = Math.ceil((firstImage / 3) + (secondImage / 3) + (thirdImage / 3));
            loader.innerHTML = percent + "%";
        };
        return {
            first: function (v) {
                firstImage = v;
                update();
            }, second: function (v) {
                secondImage = v;
                update();
            }, third: function (v) {
                thirdImage = v;
                update();
            }
        };
    };
    var getBufferSize = function () {
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("experimental-webgl");
        var size = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        return size;
    };
    Cube.main = function () { return __awaiter(_this, void 0, void 0, function () {
        var buffer, isMobile, loader, contacts, _a, first, second, third, firstImg, secondImg, thirdImg, _b, _c, control, p;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    buffer = getBufferSize();
                    isMobile = buffer < DESKTOP_TEXTURE_SIZE;
                    loader = document.querySelector(".loader:nth-child(1)");
                    contacts = document.querySelector(".contacts:nth-child(1)");
                    _a = createPercentManager(loader), first = _a.first, second = _a.second, third = _a.third;
                    firstImg = "./assets/img/" + (isMobile ? "first_mobile.png" : "first.png");
                    secondImg = "./assets/img/" + (isMobile ? "second_mobile.png" : "second.png");
                    thirdImg = "./assets/img/" + (isMobile ? "third_mobile.png" : "third.png");
                    _b = Cube.buildCube;
                    return [4 /*yield*/, Cube.load(firstImg, function (v) { return first(v); })];
                case 1:
                    _c = [_d.sent()];
                    return [4 /*yield*/, Cube.load(secondImg, function (v) { return second(v); })];
                case 2:
                    _c = _c.concat([_d.sent()]);
                    return [4 /*yield*/, Cube.load(thirdImg, function (v) { return third(v); })];
                case 3:
                    _b.apply(void 0, _c.concat([_d.sent(),
                        isMobile]));
                    loader.classList.add("fadeOut");
                    contacts.classList.add("fadeIn");
                    if (isMobile) {
                        control = document.querySelector(".control");
                        p = document.createElement("p");
                        p.innerHTML = "Low graphics card or driver detected<br>";
                        p.innerHTML += "<small>gl.MAX_TEXTURE_SIZE = " + buffer + "</small>";
                        p.style.paddingBottom = "15px";
                        p.style.textAlign = "center";
                        p.style.color = "orange";
                        control.appendChild(p);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
})(Cube || (Cube = {}));
var Cube;
(function (Cube) {
    var VIEWPORT = 100;
    var FocusWatcher = /** @class */ (function () {
        function FocusWatcher() {
            var _this = this;
            this.x = 0;
            this.y = 0;
            this.getPos = function () {
                return {
                    x: _this.x,
                    y: _this.y
                };
            };
            this.updatePos = function (screenX, screenY) {
                var center = {
                    y: Math.ceil(window.innerHeight / 2),
                    x: Math.ceil(window.innerWidth / 2)
                };
                var current = {
                    x: screenX,
                    y: screenY
                };
                var delta = {
                    x: Math.abs(center.x - current.x),
                    y: Math.abs(center.y - current.y)
                };
                _this.x = Math.ceil((current.x > center.x ? 1 : -1) * delta.x);
                _this.y = Math.ceil((current.y > center.y ? 1 : -1) * delta.y);
                _this.fixViewportRange();
            };
            document.addEventListener("touchmove", function (e) {
                var _a = e.touches[0], clientX = _a.clientX, clientY = _a.clientY;
                _this.updatePos(clientX, clientY);
            });
            document.addEventListener("mousemove", function (e) {
                var clientX = e.clientX, clientY = e.clientY;
                _this.updatePos(clientX, clientY);
            });
        }
        FocusWatcher.prototype.fixViewportRange = function () {
            var dx = this.x > 0 ? 1 : -1;
            var dy = this.y > 0 ? 1 : -1;
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            this.x = dx * (this.x > VIEWPORT ? VIEWPORT : this.x);
            this.y = dy * (this.y > VIEWPORT ? VIEWPORT : this.y);
        };
        return FocusWatcher;
    }());
    Cube.FocusWatcher = FocusWatcher;
})(Cube || (Cube = {}));
var Cube;
(function (Cube) {
    Cube.load = function (url, percentChanged) {
        return new Promise(function (resolve) {
            var request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.onprogress = function (e) { return percentChanged(Math.ceil((e.loaded / e.total) * 100)); };
            request.onload = function (e) {
                resolve(new Blob([this.response]));
            };
            request.send();
        });
    };
})(Cube || (Cube = {}));
