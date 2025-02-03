import { MarketTileTemplate } from "./market-tile.templates";
export default {
    title: 'Components/Item Tile/API',
    component: 'market-tile',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set demo controls
        backgroundColor: {
            name: 'Background color',
            description: 'The background color of the tile',
            control: { type: 'color' },
            table: { category: 'Demo' },
        },
        backgroundImage: {
            name: 'Background image',
            description: 'Slot an image into the media slot of the tile',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        color: {
            name: 'Color',
            description: 'The text color of the tile',
            control: { type: 'color' },
            table: { category: 'Demo' },
        },
        hint: {
            name: 'Hint',
            description: 'Slotted hint content of the tile',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        indicator: {
            name: 'Indicator',
            description: 'Slotted indicator content of the tile',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        label: {
            name: 'Label',
            description: 'Slotted label content of the tile',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
        leadingAccessory: {
            name: 'Leading accessory',
            description: 'Slotted leading accessory',
            control: { type: 'boolean' },
            table: { category: 'Demo' },
        },
        subtext: {
            name: 'Subtext',
            description: 'Slotted subtext content of the tile',
            control: { type: 'text' },
            table: { category: 'Demo' },
        },
    },
    args: {
        // demo
        backgroundColor: '#990838',
        backgroundImage: false,
        color: 'white',
        hint: 'Pr',
        indicator: 'Sold out',
        label: 'A Very Long Title Line Indeed',
        leadingAccessory: true,
        subtext: "A description that's even longer? How is this possible?",
    },
};
export const API = {
    render: (args) => MarketTileTemplate(args),
};
// Medium examples
export const Sodium = {
    render: (args) => MarketTileTemplate(args),
    args: { label: 'Sodium', hint: 'Na', subtext: '$22.99', indicator: '11' },
};
export const Disabled = Object.assign(Object.assign({}, Sodium), { args: Object.assign(Object.assign({}, Sodium.args), { disabled: true }) });
export const OverflowNoHint = Object.assign(Object.assign({}, Sodium), { args: Object.assign(Object.assign({}, Sodium.args), { label: 'This is a very long title for an item. Why did I name it this?', subtext: 'This is a very long description for an item', hint: undefined }) });
export const OverflowHint = Object.assign(Object.assign({}, OverflowNoHint), { args: Object.assign(Object.assign({}, OverflowNoHint.args), { hint: 'Hi' }) });
export const RemoveButton = Object.assign(Object.assign({}, Sodium), { args: Object.assign(Object.assign({}, Sodium.args), { showActions: true }) });
export const BackgroundImage = Object.assign(Object.assign({}, Sodium), { args: Object.assign(Object.assign({}, Sodium.args), { backgroundImage: true }) });
export const Interactive = Object.assign(Object.assign({}, Sodium), { args: Object.assign(Object.assign({}, Sodium.args), { interactive: true }) });
// Small examples
export const Small = Object.assign(Object.assign({}, Sodium), { args: Object.assign(Object.assign({}, Sodium.args), { size: 'small' }) });
export const SmallDisabled = Object.assign(Object.assign({}, Disabled), { args: Object.assign(Object.assign({}, Disabled.args), { size: 'small' }) });
export const SmallNoAccessory = Object.assign(Object.assign({}, Sodium), { args: Object.assign(Object.assign({}, Sodium.args), { size: 'small', leadingAccessory: false }) });
export const SmallOverflowNoSubtext = Object.assign(Object.assign({}, Small), { args: Object.assign(Object.assign({}, Small.args), { label: 'This is a very long title for an item. Why did I name it this?', subtext: undefined, hint: undefined }) });
export const SmallOverflowSubtext = Object.assign(Object.assign({}, SmallOverflowNoSubtext), { args: Object.assign(Object.assign({}, SmallOverflowNoSubtext.args), { subtext: 'This is a very long description for an item' }) });
export const SmallOverflowSubtextWithRemove = Object.assign(Object.assign({}, SmallOverflowSubtext), { args: Object.assign(Object.assign({}, SmallOverflowSubtext.args), { showActions: true }) });
export const SmallRemoveButton = Object.assign(Object.assign({}, RemoveButton), { args: Object.assign(Object.assign({}, RemoveButton.args), { size: 'small' }) });
export const SmallBackgroundImage = Object.assign(Object.assign({}, BackgroundImage), { args: Object.assign(Object.assign({}, BackgroundImage.args), { size: 'small' }) });
//# sourceMappingURL=market-tile.stories.js.map
