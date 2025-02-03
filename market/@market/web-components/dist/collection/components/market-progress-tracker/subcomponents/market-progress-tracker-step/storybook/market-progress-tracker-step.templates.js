import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const ProgressTrackerStepTemplate = ({ active, compact, completed, connector, content, indicator, interactive, label, name, orientation, size, subtext, }) => html `
  <market-progress-tracker-step
    ?active=${active}
    connector=${ifDefined(connector)}
    ?compact=${compact}
    ?completed=${completed}
    indicator=${ifDefined(indicator)}
    ?interactive=${interactive}
    name=${ifDefined(name)}
    orientation=${ifDefined(orientation)}
    size=${ifDefined(size)}
  >
    ${ifDefined(label) && html `<label slot="label">${label}</label>`}
    ${ifDefined(subtext) && html `<span slot="subtext">${subtext}</span>`} ${content}
  </market-progress-tracker-step>
`;
//# sourceMappingURL=market-progress-tracker-step.templates.js.map
