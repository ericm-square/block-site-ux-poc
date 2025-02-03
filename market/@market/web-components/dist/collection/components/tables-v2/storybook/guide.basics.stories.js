import { html } from "lit";
import { MarketTableV2CellTemplate } from "../subcomponents/market-table-v2-cell/storybook/market-table-v2-cell.templates";
import { MarketTableV2RowTemplate } from "../subcomponents/market-table-v2-row/storybook/market-table-v2-row.templates";
export default {
    title: 'Components/Table/v2/Guide/1. Basics',
    tags: ['!dev'],
};
export const Introduction = {
    render: () => html `
    <market-table-v2>
      ${Array.from({ length: 3 }, () => MarketTableV2RowTemplate({
        content: ['This', 'is', 'a', 'table', 'row'].join(','),
    }))}
    </market-table-v2>
  `,
};
export const AutoLayout = {
    render: () => html `
    <market-table-v2>
      ${Array.from({ length: 3 }, () => MarketTableV2RowTemplate({
        content: ['1', '1 2 3 4 5', '1 2 3 4 5 6 7 8 9 0', '1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0'].join(','),
    }))}
    </market-table-v2>
  `,
};
export const FixedLayout = {
    render: () => html `
    <market-table-v2 id="fixed-layout-example" layout="fixed">
      ${Array.from({ length: 3 }, () => MarketTableV2RowTemplate({
        content: ['1', '1 2 3 4', '1 2 3 4 5 6 7 8', '1 2 3 4 5 6 7 8'].join(','),
    }))}
    </market-table-v2>
    <style>
      #fixed-layout-example {
        width: 100%;
      }
      #fixed-layout-example market-table-v2-cell:nth-of-type(1) {
        width: 50%;
      }
      #fixed-layout-example market-table-v2-cell:nth-of-type(2) {
        width: 25%;
      }
      #fixed-layout-example market-table-v2-cell:nth-of-type(3) {
        width: 12.5%;
      }
      #fixed-layout-example market-table-v2-cell:nth-of-type(4) {
        width: 12.5%;
      }
    </style>
  `,
};
const pirateRowContent = [
    'Buccaneer Gold Road Privateer maroon cog dead men tell no tales Barbary Coast swing the lead clap of thunder schooner.',
    'Arr Admiral of the Black quarter Jack Ketch hempen halter American Main pillage hands belaying pin Gold Road.',
    'Grapple lookout swab landlubber or just lubber scourge of the seven seas walk the plank barque to go on account Buccaneer booty.',
].join(',');
export const Wrapping = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        content: pirateRowContent,
    })}
    </market-table-v2>
  `,
};
export const NoWrap = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        nowrap: true,
        content: pirateRowContent,
    })}
    </market-table-v2>
  `,
};
export const TruncateFixed = {
    render: () => html `
    <market-table-v2 layout="fixed">
      ${MarketTableV2RowTemplate({
        nowrap: true,
        content: pirateRowContent,
    })}
    </market-table-v2>
  `,
};
export const TruncateAuto = {
    render: () => html `
    <market-table-v2 id="truncate-auto-layout-example">
      ${MarketTableV2RowTemplate({
        nowrap: true,
        content: pirateRowContent,
    })}
    </market-table-v2>
    <style>
      #truncate-auto-layout-example market-table-v2-cell {
        max-width: 300px;
      }
    </style>
  `,
};
export const AlignHorizontal = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        content: ['These', 'cells', 'are', 'aligned', 'left'].join(','),
        align: 'left',
    })}
      ${MarketTableV2RowTemplate({
        content: ['These', 'cells', 'are', 'aligned', 'center'].join(','),
        align: 'center',
    })}
      ${MarketTableV2RowTemplate({
        content: ['These', 'cells', 'are', 'aligned', 'right'].join(','),
        align: 'right',
    })}
    </market-table-v2>
  `,
};
export const AlignVertical = {
    render: () => html `
    <market-table-v2 layout="fixed" id="vertical-alignment-example">
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({
        content: 'Buccaneer Gold Road Privateer maroon cog dead men tell no tales Barbary Coast swing the lead clap of thunder schooner.',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Top aligned',
        valign: 'top',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Middle aligned',
        valign: 'middle',
    })}
        ${MarketTableV2CellTemplate({
        content: 'Bottom aligned',
        valign: 'bottom',
    })}
      </market-table-v2-row>
    </market-table-v2>
    <style>
      #vertical-alignment-example market-table-v2-cell {
        width: 25%;
      }
    </style>
  `,
};
export const HeaderFooter = {
    render: () => html `
    <market-table-v2>
      ${MarketTableV2RowTemplate({
        content: ['This', 'is', 'a', 'header', 'row'].join(','),
        header: true,
    })}
      ${Array.from({ length: 3 }, () => MarketTableV2RowTemplate({
        content: ['This', 'is', 'a', 'table', 'row'].join(','),
    }))}
      ${MarketTableV2RowTemplate({
        content: ['This', 'is', 'a', 'footer', 'row'].join(','),
        footer: true,
    })}
    </market-table-v2>
  `,
};
export const Accessibility = {
    render: () => html `
    <market-table-v2>
      <market-table-v2-row header>
        ${MarketTableV2CellTemplate({ role: 'columnheader', content: '#' })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        content: 'Cardinal',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        content: 'Ordinal',
    })}
        ${MarketTableV2CellTemplate({
        role: 'columnheader',
        content: 'Latinate',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({ role: 'rowheader', content: '1' })}
        ${MarketTableV2CellTemplate({
        content: 'One',
    })}
        ${MarketTableV2CellTemplate({ content: 'First' })}
        ${MarketTableV2CellTemplate({
        content: 'Primary',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({ role: 'rowheader', content: '2' })}
        ${MarketTableV2CellTemplate({
        content: 'Two',
    })}
        ${MarketTableV2CellTemplate({ content: 'Second' })}
        ${MarketTableV2CellTemplate({
        content: 'Secondary',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({ role: 'rowheader', content: '3' })}
        ${MarketTableV2CellTemplate({
        content: 'Three',
    })}
        ${MarketTableV2CellTemplate({ content: 'Third' })}
        ${MarketTableV2CellTemplate({
        content: 'Tertiary',
    })}
      </market-table-v2-row>
      <market-table-v2-row>
        ${MarketTableV2CellTemplate({ role: 'rowheader', content: '4' })}
        ${MarketTableV2CellTemplate({
        content: 'Four',
    })}
        ${MarketTableV2CellTemplate({ content: 'Fourth' })}
        ${MarketTableV2CellTemplate({
        content: 'Quaternary',
    })}
      </market-table-v2-row>
    </market-table-v2>
  `,
};
//# sourceMappingURL=guide.basics.stories.js.map
