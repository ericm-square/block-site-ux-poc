import { MarketCodeDisplayTemplate } from "./market-code-display.templates";
export default {
    title: 'Components/Code Display/API',
    component: 'market-code-display',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        button: {
            control: { type: 'boolean' },
            description: 'Slot a button into the action slot',
            name: 'Button',
            table: { category: 'Demo' },
        },
        code: {
            control: { type: 'text' },
            description: 'The slotted code to be displayed',
            name: 'Code',
            table: { category: 'Demo' },
        },
        copyText: {
            control: { type: 'text' },
            description: 'Slot text for the copy button',
            name: 'Copy text',
            table: { category: 'Demo' },
        },
        link: {
            control: { type: 'boolean' },
            description: 'Slot a link into the action slot',
            name: 'Link',
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        button: false,
        code: '1234',
        copyText: '',
        link: false,
    },
};
export const API = {
    render: (args) => MarketCodeDisplayTemplate(args),
};
export const Length6 = Object.assign(Object.assign({}, API), { args: { code: 'N3V3RG' } });
export const Length12 = Object.assign(Object.assign({}, API), { args: { code: '0NNAG1V3Y0UU' } });
export const Length16 = Object.assign(Object.assign({}, API), { args: { code: 'PN3V3RG0NNAL3TY0' } });
export const TranslatedCopy = Object.assign(Object.assign({}, API), { args: { code: 'UD0W', copyText: 'Copiar' } });
export const Button = Object.assign(Object.assign({}, API), { args: { code: 'NN3V', button: true } });
export const Link = Object.assign(Object.assign({}, API), { args: { code: '3RG0NNARUNAR0UND', link: true } });
//# sourceMappingURL=market-code-display.stories.js.map
