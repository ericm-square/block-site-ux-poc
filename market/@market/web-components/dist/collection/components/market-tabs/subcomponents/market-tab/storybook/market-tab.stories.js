import { userEvent, within } from "@storybook/testing-library";
import { TabTemplate } from "./market-tab.templates";
import { waitForMarketHydration } from "../../../../../utils/wait-for-market-hydration";
export default {
    title: 'Components/Tabs/Tab/API',
    tags: ['autodocs', '!dev'],
    component: 'market-tab',
    argTypes: {
        text: { table: { category: 'Demo' } },
    },
    args: {
        text: 'Tab',
    },
};
const hoverPlayFn = async ({ canvasElement }) => {
    await waitForMarketHydration(canvasElement);
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab');
    await userEvent.hover(tab);
};
const activePlayFn = async ({ canvasElement }) => {
    await waitForMarketHydration(canvasElement);
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab');
    await userEvent.click(tab);
};
export const API = {
    render: (args) => TabTemplate(args),
};
export const Hover = Object.assign(Object.assign({}, API), { play: hoverPlayFn });
export const Active = Object.assign(Object.assign({}, API), { play: activePlayFn });
export const Disabled = Object.assign(Object.assign({}, API), { args: {
        disabled: true,
    } });
export const DisabledHover = Object.assign(Object.assign({}, Disabled), { play: hoverPlayFn });
export const DisabledActive = Object.assign(Object.assign({}, Disabled), { play: activePlayFn });
export const Selected = Object.assign(Object.assign({}, API), { args: {
        selected: true,
    } });
export const SelectedHover = Object.assign(Object.assign({}, Selected), { play: hoverPlayFn });
export const SelectedActive = Object.assign(Object.assign({}, Selected), { play: activePlayFn });
export const Small = Object.assign(Object.assign({}, API), { args: {
        size: 'small',
    } });
export const SmallDisabled = Object.assign(Object.assign({}, Small), { args: Object.assign(Object.assign({}, Small.args), Disabled.args) });
export const SmallDisabledHover = Object.assign(Object.assign({}, SmallDisabled), { play: hoverPlayFn });
export const SmallDisabledActive = Object.assign(Object.assign({}, SmallDisabled), { play: activePlayFn });
export const SmallSelected = Object.assign(Object.assign({}, Small), { args: Object.assign(Object.assign({}, Small.args), Selected.args) });
export const SmallSelectedHover = Object.assign(Object.assign({}, SmallSelected), { play: hoverPlayFn });
export const SmallSelectedActive = Object.assign(Object.assign({}, SmallSelected), { play: activePlayFn });
export const Large = Object.assign(Object.assign({}, API), { args: {
        size: 'large',
    } });
export const LargeDisabled = Object.assign(Object.assign({}, Large), { args: Object.assign(Object.assign({}, Large.args), Disabled.args) });
export const LargeDisabledHover = Object.assign(Object.assign({}, LargeDisabled), { play: hoverPlayFn });
export const LargeDisabledActive = Object.assign(Object.assign({}, LargeDisabled), { play: activePlayFn });
export const LargeSelected = Object.assign(Object.assign({}, Large), { args: Object.assign(Object.assign({}, Large.args), Selected.args) });
export const LargeSelectedHover = Object.assign(Object.assign({}, LargeSelected), { play: hoverPlayFn });
export const LargeSelectedActive = Object.assign(Object.assign({}, LargeSelected), { play: activePlayFn });
//# sourceMappingURL=market-tab.stories.js.map
