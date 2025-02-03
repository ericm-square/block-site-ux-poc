import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Inline Status/API',
    component: 'market-inline-status',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo controls
        text: { table: { category: 'Demo' }, control: { type: 'text' } },
    },
    args: {
        text: 'Lorem ipsum dolor sit amet.',
        variant: 'info',
    },
};
export const API = {
    render: ({ variant, text }) => html `
    <market-inline-status variant=${ifDefined(variant)}> ${ifDefined(text)} </market-inline-status>
  `,
};
export const Variants = {
    render: ({ text }) => html `
    <market-inline-status variant="critical">${ifDefined(text)}</market-inline-status>
    <market-inline-status variant="info">${ifDefined(text)}</market-inline-status>
    <market-inline-status variant="success">${ifDefined(text)}</market-inline-status>
    <market-inline-status variant="warning">${ifDefined(text)}</market-inline-status>
  `,
};
export const LongText = {
    render: ({ variant }) => html `
    <market-inline-status variant=${ifDefined(variant)}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a euismod metus. Fusce cursus justo sit amet
      nisl cursus ullamcorper. Vestibulum vel imperdiet velit, ut dapibus libero.
    </market-inline-status>
  `,
};
export const CustomIcon = {
    render: ({ variant, text }) => html `
    <market-inline-status variant=${ifDefined(variant)}>
      <market-icon slot="icon" name="lightning-bolt"></market-icon>
      ${ifDefined(text)}
    </market-inline-status>
  `,
};
//# sourceMappingURL=market-inline-status.stories.js.map
