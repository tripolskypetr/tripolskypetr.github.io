namespace Cube {
    const VIEWPORT = 100;
    export class FocusWatcher {
        private x: number = 0;
        private y: number = 0;
        constructor() {
            document.addEventListener("touchmove", (e) => {
                const {clientX, clientY} = e.touches[0];
                this.updatePos(clientX, clientY);
            });
            document.addEventListener("mousemove", (e) => {
                const {clientX, clientY} = e;
                this.updatePos(clientX, clientY);
            });
        }
        public getPos = () => {
            return {
                x: this.x,
                y: this.y,
            };
        }
        private fixViewportRange() {
            const dx = this.x > 0 ? 1 : -1;
            const dy = this.y > 0 ? 1 : -1;
            this.x = Math.abs(this.x);
            this.y = Math.abs(this.y);
            this.x = dx * (this.x > VIEWPORT ? VIEWPORT : this.x);
            this.y = dy * (this.y > VIEWPORT ? VIEWPORT : this.y);
        }
        private updatePos = (screenX: number, screenY: number) => {
            const center = {
                y: Math.ceil(window.innerHeight / 2),
                x: Math.ceil(window.innerWidth / 2),
            };
            const current = {
                x: screenX,
                y: screenY,
            };
            const delta = {
                x: Math.abs(center.x - current.x),
                y: Math.abs(center.y - current.y),
            };
            this.x = Math.ceil((current.x > center.x ? 1 : -1) * delta.x);
            this.y = Math.ceil((current.y > center.y ? 1 : -1) * delta.y);
            this.fixViewportRange();
        }
    }
}
