import { MarketHeaderTemplate } from "./market-header.templates";
export default {
    title: 'Components/Header/API',
    component: 'market-header',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // demo
        actions: {
            name: 'Actions',
            description: 'Slot buttons into the actions slot',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        customNav: {
            name: 'Custom navigation',
            description: 'Slot custom navigation',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        heading: {
            name: 'Heading',
            description: 'Slot a heading element',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        subheading: {
            name: 'Subheading',
            description: 'Slot a subheading element',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        wayfinding: {
            name: 'Wayfinding',
            description: 'Slot a wayfinding element',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        heading: 'Lorem ipsum dolor sit amet',
        subheading: '',
        wayfinding: '',
    },
};
export const API = {
    render: (args) => MarketHeaderTemplate(args),
};
// Expanded
export const Subheading = Object.assign(Object.assign({}, API), { args: {
        subheading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    } });
export const Wayfinding = Object.assign(Object.assign({}, API), { args: {
        wayfinding: 'Step 1 of 2',
    } });
export const Actions = Object.assign(Object.assign({}, API), { args: { actions: true } });
export const Nav = Object.assign(Object.assign({}, API), { args: { showNavigation: true } });
export const CustomNav = Object.assign(Object.assign({}, API), { args: { showNavigation: true, customNav: true } });
export const KitchenSink = Object.assign(Object.assign({}, API), { args: {
        showNavigation: true,
        customNav: true,
        actions: true,
        heading: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet, orci at rhoncus accumsan, tortor leo sodales neque. ',
        wayfinding: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet, orci at rhoncus accumsan, tortor leo sodales neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam imperdiet, orci at rhoncus accumsan, tortor leo sodales neque.',
    } });
// Compact
export const CompactNav = Object.assign(Object.assign({}, Nav), { args: Object.assign(Object.assign({}, Nav.args), { compact: true }) });
export const CompactCustomNav = Object.assign(Object.assign({}, CustomNav), { args: Object.assign(Object.assign({}, CustomNav.args), { compact: true }) });
export const CompactActions = Object.assign(Object.assign({}, Actions), { args: Object.assign(Object.assign({}, Actions.args), { compact: true }) });
export const CompactKitchenSink = Object.assign(Object.assign({}, KitchenSink), { args: Object.assign(Object.assign({}, KitchenSink.args), { compact: true }) });
//# sourceMappingURL=market-header.stories.js.map
