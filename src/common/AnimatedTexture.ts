/// <reference path="../../types/three.d.ts"/>
namespace Cube {
    export class AnimatedTexture {

        private texture: THREE.Texture;

        private totalHoriz: number;
        private totalVert: number;
        private total: number;
        private duration: number;

        private currentTime: number = 0;
        private currentFrame: number = 0;

        constructor(texture: THREE.Texture, totalHoriz: number, totalVert: number, total: number, duration: number) {
            this.texture = texture;
            this.totalHoriz = totalHoriz;
            this.totalVert = totalVert;
            this.total = total;
            this.duration = duration;

            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;

            texture.repeat.set( 1 / this.totalHoriz, 1 / this.totalVert );
        }

        public update = (msec: number) => {
            this.currentTime += msec;
            while (this.currentTime > this.duration) {
                this.currentTime -= this.duration;
                this.currentFrame++;
                this.currentFrame = (this.currentFrame === this.total) ? 0 : this.currentFrame;
                const currentColumn = this.currentFrame % this.totalHoriz;
                this.texture.offset.x = currentColumn / this.totalHoriz;
                const currentRow = Math.floor( this.currentFrame / this.totalHoriz );
                this.texture.offset.y = currentRow / this.totalVert;
            }
        }
    }
}
