/**
 * 补齐时间
 * @param time
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
 */
export function padStart(time: number) {
    if (time < 10) {
        return `0${time}`;
    } else {
        return time + "";
    }
}

export function scrollTo(element: HTMLElement, to: number, duration: number) {
    if (duration <= 0) {
        element.scrollTop = to;
        return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    requestAnimationFrame(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    });
}
