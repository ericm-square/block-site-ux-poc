import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const DatePickerMenuTemplate = ({ timeframe, rowYesterday, rowToday, rowLastWeek, rowThisWeek, rowLastMonth, rowThisMonth, rowLastYear, rowThisYear, rowCustom, }) => html `
  <market-date-picker-menu timeframe=${ifDefined(timeframe)}>
    ${rowYesterday ? html `<span slot="yesterday"> ${rowYesterday}</span>` : ''}
    ${rowToday ? html `<span slot="today"> ${rowToday}</span>` : ''}
    ${rowLastWeek ? html `<span slot="last-week"> ${rowLastWeek}</span>` : ''}
    ${rowThisWeek ? html `<span slot="this-week"> ${rowThisWeek}</span>` : ''}
    ${rowLastMonth ? html `<span slot="last-month"> ${rowLastMonth}</span>` : ''}
    ${rowThisMonth ? html `<span slot="this-month"> ${rowThisMonth}</span>` : ''}
    ${rowLastYear ? html `<span slot="last-year"> ${rowLastYear}</span>` : ''}
    ${rowThisYear ? html `<span slot="this-year"> ${rowThisYear}</span>` : ''}
    ${rowCustom ? html `<span slot="custom"> ${rowCustom}</span>` : ''}
  </market-date-picker-menu>
`;
//# sourceMappingURL=market-date-picker-menu.templates.js.map
