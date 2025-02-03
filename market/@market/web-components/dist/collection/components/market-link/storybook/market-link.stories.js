import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Link/API',
    component: 'market-link',
    tags: ['autodocs', '!dev'],
    argTypes: {
        text: {
            control: { type: 'text' },
            description: 'The text that appears in the link',
            name: 'Text',
            table: { category: 'Demo' },
        },
    },
    args: {
        href: 'https://squareup.com',
        text: 'Check out this cool website',
    },
};
export const API = {
    render: ({ 
    // demo
    text, 
    // props
    href, target, rel, destructive, disabled, download, highlight, }) => html `
    <market-link
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      rel=${ifDefined(rel)}
      ?destructive=${destructive}
      ?disabled=${disabled}
      download=${ifDefined(download)}
      highlight=${highlight}
    >
      ${text}
    </market-link>
  `,
};
export const Inherit = {
    render: ({ 
    // demo
    text, 
    // props
    href, target, rel, destructive, disabled, }) => html `
    <p style="font-size: 12px; line-height: 18px">
      Here is an inline
      <market-link
        href=${ifDefined(href)}
        target=${ifDefined(target)}
        rel=${ifDefined(rel)}
        ?destructive=${destructive}
        ?disabled=${disabled}
        highlight="underline"
      >
        ${text}
      </market-link>
      that inherits a paragraph's font-size and line-height.
    </p>
  `,
    args: {
        text: 'link',
    },
};
export const Standalone = {
    render: ({ 
    // demo
    text, 
    // props
    href, target, rel, destructive, disabled, }) => html `
    <market-link
      href=${ifDefined(href)}
      target=${ifDefined(target)}
      rel=${ifDefined(rel)}
      ?destructive=${destructive}
      ?disabled=${disabled}
    >
      ${text}
    </market-link>
  `,
    args: {
        text: 'link',
    },
};
export const Button = Object.assign(Object.assign({}, API), { args: {
        text: 'Link with no href',
        href: undefined,
    } });
//# sourceMappingURL=market-link.stories.js.map
