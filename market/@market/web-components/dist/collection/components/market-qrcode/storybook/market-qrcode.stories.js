import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/QR Code/API',
    component: 'market-qrcode',
    tags: ['autodocs', '!dev'],
    args: {
        content: 'https://squareup.com',
    },
};
export const API = {
    render: ({ content, border, monochrome, size }) => html `<market-qrcode
      content=${ifDefined(content)}
      size=${ifDefined(size)}
      ?border=${border}
      ?monochrome=${monochrome}
    ></market-qrcode>`,
};
//# sourceMappingURL=market-qrcode.stories.js.map
