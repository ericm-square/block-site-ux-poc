import { h, Host } from "@stencil/core";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot - Displays whatever you put between `<market-popover>` and `</market-popover>`
 * (can be string literals, Market component(s), HTML element(s), or any combination)
 *
 * If slot contains `<market-list>` elements, `initInteractiveList()` will set the
 * `interactive` property on each instance of `<market-list>` to `true`.
 */
export class Popover {
    /* Don't want to force consumers to have to remember to put 'interactive' attribute
      on a <market-list> slotted into this options list, so just set the property on the child
      element here because lists should always be interactive when inside this component */
    initInteractiveList() {
        /* We could just do el.querySelectorAll('market-list') here, but to handle elements that may be multi-slotted
        such as when using this popover inside of a select/filterable element and forwarding the slotted contents into
        the popover, we need to use this assignedElements() method */
        const slot = this.el.querySelector('slot');
        let lists;
        if (slot) {
            lists = slot.assignedElements().filter((el) => el.localName === getNamespacedTagFor('market-list'));
        }
        else {
            /* .querySelectorAll() returns a NodeList and not an array so we need to convert it
             in order to use .map() below */
            lists = [].slice.call(this.el.querySelectorAll(getNamespacedTagFor('market-list')));
        }
        if (lists) {
            lists.forEach((list) => {
                list.interactive = true;
            });
        }
    }
    render() {
        this.initInteractiveList();
        return (h(Host, { key: '8eabe587b426e91c81a0739af9800955a5c31640', class: "market-popover" }, h("slot", { key: 'a7f140e994d37aac481bbde312d2cd2604ab3e12' })));
    }
    static get is() { return "market-popover"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-popover.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-popover.css"]
        };
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=market-popover.js.map
