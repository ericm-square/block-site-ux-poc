import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Progress Bar/API',
    component: 'market-activity-indicator-bar',
    tags: ['autodocs', '!dev'],
    args: {
        value: 0.5,
    },
};
export const API = {
    render: ({ value, max }) => html `
    <market-activity-indicator-bar value=${ifDefined(value)} max=${ifDefined(max)}></market-activity-indicator-bar>
  `,
};
export const Value = {
    render: () => html `
    <market-activity-indicator-bar value="0"></market-activity-indicator-bar><br />
    <market-activity-indicator-bar value="0.25"></market-activity-indicator-bar><br />
    <market-activity-indicator-bar value="0.5"></market-activity-indicator-bar><br />
    <market-activity-indicator-bar value="0.75"></market-activity-indicator-bar><br />
    <market-activity-indicator-bar value="1"></market-activity-indicator-bar>
  `,
};
//# sourceMappingURL=market-activity-indicator-bar.stories.js.map
