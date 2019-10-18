namespace Cube {
    export const load = (url: string, percentChanged: (v: number) => void): Promise<Blob> => {
        return new Promise((resolve) => {
            const request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";
            request.onprogress = (e) => percentChanged(Math.ceil((e.loaded / e.total) * 100));
            request.onload = function(e) {
                resolve(new Blob([this.response]));
            };
            request.send();
        });
    };
}
