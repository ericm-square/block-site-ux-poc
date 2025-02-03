import { r as registerInstance, h, H as Host, g as getElement } from './index-e03cb5c3.js';
import { g as getNamespacedTagFor } from './index-2dc281eb.js';

const marketPopoverCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{display:inline-block;overflow-y:auto;min-width:var(--modal-popover-wide-viewport-min-width-size);max-height:var(--modal-popover-wide-viewport-max-height-size);padding:var(--modal-popover-wide-viewport-padding-right-size)\n    var(--modal-popover-wide-viewport-padding-right-size)\n    var(--modal-popover-wide-viewport-padding-right-size)\n    var(--modal-popover-wide-viewport-padding-left-size);border-radius:var(--modal-popover-border-radius);background-color:var(--modal-popover-background-color);box-shadow:var(--elevation-30-shadow)}@media (min-width: 600px){:host{width:auto}}::slotted(.market-list){display:block;width:100%;height:100%;margin-bottom:calc(var(--modal-popover-wide-viewport-padding-bottom-size) - var(--popover-padding, 24px))}::slotted(.market-list:not([has-search])){margin:calc(var(--popover-content-vertical-padding, 8px) - var(--popover-padding, 24px)) 0}";
const MarketPopoverStyle0 = marketPopoverCss;

const Popover = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
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
    get el() { return getElement(this); }
};
Popover.style = MarketPopoverStyle0;

export { Popover as market_popover };

//# sourceMappingURL=market-popover.entry.js.map