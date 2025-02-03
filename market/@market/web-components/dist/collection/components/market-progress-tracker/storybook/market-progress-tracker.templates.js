import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ProgressTrackerStepTemplate } from "../subcomponents/market-progress-tracker-step/storybook/market-progress-tracker-step.templates";
export const ProgressTrackerTemplate = ({ connectorless, content, compact, currentStepIndex, indicator, interactive, numOfSteps, orientation, reversed, size, subtext, }) => html `
  <market-progress-tracker
    ?connectorless=${connectorless}
    ?compact=${compact}
    current-step-index=${ifDefined(currentStepIndex)}
    indicator=${ifDefined(indicator)}
    ?interactive=${interactive}
    orientation=${ifDefined(orientation)}
    ?reversed=${reversed}
    size=${ifDefined(size)}
  >
    ${Array.from({ length: numOfSteps !== null && numOfSteps !== void 0 ? numOfSteps : 0 })
    .fill(undefined)
    .map((_, index) => ProgressTrackerStepTemplate({
    content,
    label: `Step ${reversed ? numOfSteps - index : index + 1}`,
    subtext,
}))}
  </market-progress-tracker>
`;
//# sourceMappingURL=market-progress-tracker.templates.js.map
