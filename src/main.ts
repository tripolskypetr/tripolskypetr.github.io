namespace Cube {
    const DESKTOP_TEXTURE_SIZE = 16384;
    const createPercentManager = (loader: Element) => {
        let firstImage: number = 0;
        let secondImage: number = 0;
        let thirdImage: number = 0;
        const update = () => {
            const percent = Math.ceil((firstImage / 3) + (secondImage / 3) + (thirdImage / 3));
            loader.innerHTML = `${percent}%`;
        };
        return {
            first: (v) => {
                firstImage = v;
                update();
            }, second: (v) => {
                secondImage = v;
                update();
            }, third: (v) => {
                thirdImage = v;
                update();
            },
        };
    };
    const getBufferSize = (): number => {
        const canvas = document.createElement("canvas");
        const gl: any = canvas.getContext("experimental-webgl");
        const size = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        return size ;
    };
    export const main = async () => {
        const buffer = getBufferSize();
        const isMobile = buffer < DESKTOP_TEXTURE_SIZE;
        const loader = document.querySelector(".loader:nth-child(1)") as HTMLElement;
        const contacts = document.querySelector(".contacts:nth-child(1)") as HTMLElement;
        const {first, second, third} = createPercentManager(loader);
        const firstImg = `./assets/img/${isMobile ? "first_mobile.png" : "first.png"}`;
        const secondImg = `./assets/img/${isMobile ? "second_mobile.png" : "second.png"}`;
        const thirdImg = `./assets/img/${isMobile ? "third_mobile.png" : "third.png"}`;
        const images = await Promise.all([
            load(firstImg, (v) => first(v)),
            load(secondImg, (v) => second(v)),
            load(thirdImg, (v) => third(v)),
        ]);
        buildCube(
            images[0],
            images[1],
            images[2],
            isMobile,
        );
        loader.classList.add("fadeOut");
        contacts.classList.add("fadeIn");
        if (isMobile) {
            const control = document.querySelector(".control");
            const p = document.createElement("p");
            p.innerHTML = "Low graphics card or driver detected<br>";
            p.innerHTML += `<small>gl.MAX_TEXTURE_SIZE = ${buffer}</small>`;
            p.style.paddingBottom = "15px";
            p.style.textAlign = "center";
            p.style.color = "orange";
            control.appendChild(p);
        }
    };
}
