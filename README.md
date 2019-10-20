# Programmer CV

## Что это?

> В рамках сайта-портфолио мной было принято решение скреативить и написать аналог [этого](https://cubev3.com) сайта. Более подробно о поставленной задаче написано [тут](https://pikabu.ru/story/portfolio_na_github_pages_v_2k19_6999852)

Для создания куба я применил [THREE.js](https://threejs.org/). Благодаря слою абстракции этот инструмент активно применяет возможности WebGL, что снижает нагрузку на процессор и обеспечивает плавную анимацию, исполняемую на почти всегда простаивающем видеоускорителе. Так же, для обеспечения максимального покрытия браузеров, у него есть [полифилы](https://github.com/mrdoob/three.js/tree/master/examples/js/renderers) для рендеринга.

```
const request = (url, timeout) => new Promise((resolve) => {
    fetch(url).then(() => setTimeout(() => resolve(), timeout));
});
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const action = (was) => {
    const arr = ["10138.txt","10719.txt","1099.txt","10995.txt",...];
	  asyncForEach(arr, async (a, index) => {
        if (was === true && index > 10) {
            if (index === 11) {
                await request("done.txt", 0);
            } else {
                return;
            }
        } else if (was !== true && index === (arr.length - 1)) {
            action(true)
        } else {
            const timeout = Math.ceil(Math.random() * 500);
            const prefix = index > 10 ? (Math.round(Math.random() * 3) === 1 ? "1" : "") : "";
            await request(prefix+a, timeout);
        }
    });
}
action();
```

Для создания сурса я написал простенький скрипт, последовательно отправляющий запросы на сервер с разным интервалом. Запросы подавались к веб серверу [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-3.0), логгирование которого в консоль достаточно фотогенично. 

![Вырезка](./media/cutted.gif)

Далее, используя этот [скрипт](./util/build_texture.py) opencv-python я сделал анимированный спрайт для каждой грани куба. После дело было за малым: немного математики уровня ПТУ.

##  Результат работы

![Куб](./media/cube.gif)

В результате работы получась некая *"кубическая консоль"*, которая меняет свой наклон исходя из положения мыши на странице. Посмотреть с браузера можно по [ссылке](https://tripolskypetr.github.io/).