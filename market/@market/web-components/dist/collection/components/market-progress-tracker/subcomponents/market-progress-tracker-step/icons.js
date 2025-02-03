import { h } from "@stencil/core";
const checkedIcon = () => (h("svg", { class: "default-icon checked-icon", width: "18", height: "18", viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M5.88683 7.62327L5.71005 7.4465L5.53327 7.62327L4.12327 9.03327L3.9465 9.21005L4.12327 9.38683L7.12327 12.3868C7.37411 12.6377 7.68955 12.75 8.01005 12.75C8.33627 12.75 8.64735 12.6239 8.89224 12.3913L8.89229 12.3914L8.89683 12.3868L13.8968 7.38683L14.0736 7.21005L13.8968 7.03327L12.4868 5.62327L12.3105 5.44691L12.1337 5.62286L8.00046 9.73691L5.88683 7.62327ZM0.25 9C0.25 4.16807 4.16807 0.25 9 0.25C13.8319 0.25 17.75 4.16807 17.75 9C17.75 13.8319 13.8319 17.75 9 17.75C4.16807 17.75 0.25 13.8319 0.25 9Z" })));
const uncheckedIcon = () => (h("svg", { class: "default-icon unchecked-icon", width: "18", height: "18", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16ZM9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" })));
const smallerCheckedIcon = () => (h("svg", { class: "default-icon small-checked-icon", width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0 8C0 3.58222 3.58222 0 8 0C12.4178 0 16 3.58222 16 8C16 12.4178 12.4178 16 8 16C3.58222 16 0 12.4178 0 8ZM5.0756 6.93338L7.11115 8.96893L10.9423 5.1556L12.1956 6.40893L7.75116 10.8534C7.57338 11.0223 7.35115 11.1112 7.12004 11.1112C6.88893 11.1112 6.66671 11.0312 6.48893 10.8534L3.82227 8.18671L5.0756 6.93338Z" })));
const smallerUncheckedIcon = () => (h("svg", { class: "default-icon small-unchecked-icon", width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8 14.2222C11.4364 14.2222 14.2222 11.4364 14.2222 8C14.2222 4.56356 11.4364 1.77778 8 1.77778C4.56356 1.77778 1.77778 4.56356 1.77778 8C1.77778 11.4364 4.56356 14.2222 8 14.2222ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" })));
const activeCircleIcon = () => (h("svg", { class: "default-icon active-circle-icon", width: "18", height: "18", viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { cx: "9", cy: "9", r: "7", "stroke-width": "4" })));
const inactiveCircleIcon = () => (h("svg", { class: "default-icon inactive-circle-icon", width: "8", height: "8", viewBox: "0 0 8 8", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M0 4a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" })));
const smallerActiveCircleIcon = () => (h("svg", { class: "default-icon small-active-circle-icon", width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { cx: "8", cy: "8", r: "6", "stroke-opacity": "0.9", "stroke-width": "4" })));
const smallerInactiveCircleIcon = () => (h("svg", { class: "default-icon small-inactive-circle-icon", width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { cx: "8", cy: "8", r: "4" })));
export function getIcon({ active, completed, indicator, orientation, }) {
    if (orientation === 'vertical') {
        if (indicator === 'check') {
            if (completed) {
                return checkedIcon();
            }
            else {
                return uncheckedIcon();
            }
        }
        else if (indicator === 'circle') {
            if (active) {
                return activeCircleIcon();
            }
            else {
                return inactiveCircleIcon();
            }
        }
    }
    else if (orientation === 'horizontal') {
        if (indicator === 'check') {
            if (completed) {
                return smallerCheckedIcon();
            }
            else {
                return smallerUncheckedIcon();
            }
        }
        else if (indicator === 'circle') {
            if (active) {
                return smallerActiveCircleIcon();
            }
            else {
                return smallerInactiveCircleIcon();
            }
        }
    }
    return undefined;
}
//# sourceMappingURL=icons.js.map
