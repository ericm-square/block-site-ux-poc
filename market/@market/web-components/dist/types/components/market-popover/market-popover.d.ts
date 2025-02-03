/**
 * @slot - Displays whatever you put between `<market-popover>` and `</market-popover>`
 * (can be string literals, Market component(s), HTML element(s), or any combination)
 *
 * If slot contains `<market-list>` elements, `initInteractiveList()` will set the
 * `interactive` property on each instance of `<market-list>` to `true`.
 */
export declare class Popover {
    el: HTMLMarketPopoverElement;
    initInteractiveList(): void;
    render(): any;
}
