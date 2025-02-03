import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { MarketTableV2RowTemplate } from "../../market-table-v2-row/storybook/market-table-v2-row.templates";
export const AppleGroupTemplate = ({ 
// demo
actions, control, images, 
// props
collapsed, collapsible, indent, reorderable, }) => html `
  <market-table-v2-group
    ?collapsed=${collapsed}
    ?collapsible=${collapsible}
    indent=${ifDefined(indent)}
    reorderable=${ifDefined(reorderable)}
  >
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Apple,30,12/7/1803,8:09 AM,$3.10',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
    slot: 'parent',
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Fuji,10,7/21/1870,4:52 PM,$3.24',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Gala,15,3/25/1907,1:21 AM,$2.98',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'McIntosh,5,11/29/1860,10:19 PM,$3.12',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
  </market-table-v2-group>
`;
export const OrangeGroupTemplate = ({ 
// demo
actions, control, images, 
// props
collapsed, collapsible, indent, reorderable, }) => html `
  <market-table-v2-group
    ?collapsed=${collapsed}
    ?collapsible=${collapsible}
    indent=${ifDefined(indent)}
    reorderable=${ifDefined(reorderable)}
  >
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Orange,42,3/4/2084,2:00 PM,$7.34',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
    slot: 'parent',
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Clementine,19,12/9/1934,11:23 PM,$5.12',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Mandarin,3,2/20/1953,4:36 AM,$6.78',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Tangerine,20,5/2/1856,11:02 PM,$4.56',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
  </market-table-v2-group>
`;
export const OnionGroupTemplate = ({ 
// demo
actions, control, images, 
// props
collapsed, collapsible, indent, reorderable, }) => html `
  <market-table-v2-group
    ?collapsed=${collapsed}
    ?collapsible=${collapsible}
    indent=${ifDefined(indent)}
    reorderable=${ifDefined(reorderable)}
  >
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Onion,101,10/21/2050,3:00 PM,$1.23',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
    slot: 'parent',
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Red,1,5/23/1939,12:00 PM,$2.34',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'White,10,8/12/1945,1:00 PM,$3.45',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Yellow,90,2/20/1953,4:36 AM,$4.56',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
  </market-table-v2-group>
`;
export const FruitGroupTemplate = ({ 
// demo
actions, control, images, 
// props
collapsed, collapsible, indent, reorderable, }) => html `
  <market-table-v2-group
    ?collapsed=${collapsed}
    ?collapsible=${collapsible}
    indent=${ifDefined(indent)}
    reorderable=${ifDefined(reorderable)}
  >
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Fruit,177,3/4/2084,1:21 AM,$5.67',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
    slot: 'parent',
})}
    ${AppleGroupTemplate({
    actions,
    collapsed,
    control,
    images,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Banana,80,9/19/1944,3:45 PM,$2.34',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${OrangeGroupTemplate({
    actions,
    collapsed,
    control,
    images,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Peach,23,5/2/1856,11:02 PM,$4.56',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Pear,2,2/20/1953,4:36 AM,$6.78',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
  </market-table-v2-group>
`;
export const VegetableGroupTemplate = ({ 
// demo
actions, control, images, 
// props
collapsed, collapsible, indent, reorderable, }) => html `
  <market-table-v2-group
    ?collapsed=${collapsed}
    ?collapsible=${collapsible}
    indent=${ifDefined(indent)}
    reorderable=${ifDefined(reorderable)}
  >
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Vegetables,160,3/4/2084,1:21 AM,$4.56',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
    slot: 'parent',
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Broccoli,12,12/7/1803,8:09 AM,$2.10',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Carrot,32,7/21/1870,4:52 PM,$1.24',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Cauliflower,8,3/25/1907,1:21 AM,$2.98',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
    ${OnionGroupTemplate({
    actions,
    collapsed,
    control,
    images,
})}
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Potato,7,11/29/1860,10:19 PM,$3.12',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
})}
  </market-table-v2-group>
`;
export const MiscGroupTemplate = ({ 
// demo
actions, control, images, 
// props
collapsed, collapsible, indent, reorderable, }) => html `
  <market-table-v2-group
    ?collapsed=${collapsed}
    ?collapsible=${collapsible}
    indent=${ifDefined(indent)}
    reorderable=${ifDefined(reorderable)}
  >
    ${MarketTableV2RowTemplate({
    actions,
    content: 'Misc.,101,10/21/2050,3:00 PM,$1.23',
    control,
    leadingAccessory: images ? 'image' : undefined,
    nowrap: true,
    slot: 'parent',
})}
  </market-table-v2-group>
`;
//# sourceMappingURL=market-table-v2-group.templates.js.map
