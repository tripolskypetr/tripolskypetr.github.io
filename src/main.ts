namespace Cube {
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
    export const main = async () => {
        const loader = document.querySelector(".loader:nth-child(1)") as HTMLElement;
        const contacts = document.querySelector(".contacts:nth-child(1)") as HTMLElement;
        const {first, second, third} = createPercentManager(loader);
        buildCube(
            await load("./assets/img/first.png", (v) => first(v)),
            await load("./assets/img/second.png", (v) => second(v)),
            await load("./assets/img/third.png", (v) => third(v)),
        );
        loader.classList.add("fadeOut");
        contacts.classList.add("fadeIn");
    };
}
