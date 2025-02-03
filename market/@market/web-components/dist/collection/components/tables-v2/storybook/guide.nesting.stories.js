import { html } from "lit";
import { AppleGroupTemplate, FruitGroupTemplate, VegetableGroupTemplate, } from "../subcomponents/market-table-v2-group/storybook/market-table-v2-group.templates";
export default {
    title: 'Components/Table/v2/Guide/3. Nesting',
    tags: ['!dev'],
};
export const Groups = {
    render: () => html ` <market-table-v2>${AppleGroupTemplate({})}</market-table-v2> `,
};
export const NestedGroups = {
    render: () => html ` <market-table-v2>${VegetableGroupTemplate({})}</market-table-v2> `,
};
export const CollapsibleGroups = {
    render: () => html `
    <market-table-v2 collapsible>
      ${FruitGroupTemplate({ collapsed: true })} ${VegetableGroupTemplate({ collapsed: true })}
    </market-table-v2>
  `,
};
export const NestedSelection = {
    render: () => html ` <market-table-v2> ${VegetableGroupTemplate({ control: 'checkbox' })} </market-table-v2> `,
};
//# sourceMappingURL=guide.nesting.stories.js.map
