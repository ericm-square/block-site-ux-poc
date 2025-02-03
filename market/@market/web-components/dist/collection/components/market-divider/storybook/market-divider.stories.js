import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Divider/API',
    component: 'market-divider',
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: ({ margin, size }) => html `<market-divider margin=${ifDefined(margin)} size=${ifDefined(size)}></market-divider>`,
};
export const Thin = Object.assign(Object.assign({}, API), { args: {
        size: 'thin',
    } });
//# sourceMappingURL=market-divider.stories.js.map
