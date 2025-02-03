import { html } from "lit";
import { ProgressTrackerTemplate } from "./market-progress-tracker.templates";
export default {
    title: 'Components/Progress Tracker (BETA)/API',
    tags: ['autodocs', '!dev'],
    component: 'market-progress-tracker',
    argTypes: {
        content: {
            control: { type: 'text' },
            description: 'Text that goes into each step’s default slot',
            name: 'Text content',
            table: { category: 'Demo' },
        },
        numOfSteps: {
            control: { type: 'number' },
            description: 'Number of steps displayed on the demo canvas',
            name: 'Number of steps',
            table: { category: 'Demo' },
        },
        subtext: {
            control: { type: 'text' },
            description: 'Text that goes into each step’s `subtext` slot',
            name: 'Subtext',
            table: { category: 'Demo' },
        },
    },
    args: {
        numOfSteps: 3,
    },
};
export const API = {
    render: (args) => ProgressTrackerTemplate(args),
};
export const VerticalOneStep = Object.assign(Object.assign({}, API), { args: Object.assign(Object.assign({}, API.args), { content: html `<p>Text content</p>`, numOfSteps: 1, subtext: 'Subtext' }) });
export const VerticalOneStepCurrentStepIndex0 = Object.assign(Object.assign({}, VerticalOneStep), { args: Object.assign(Object.assign({}, VerticalOneStep.args), { currentStepIndex: 0 }) });
export const VerticalOneStepCurrentStepIndex1 = Object.assign(Object.assign({}, VerticalOneStep), { args: Object.assign(Object.assign({}, VerticalOneStep.args), { currentStepIndex: 1 }) });
export const VerticalThreeSteps = Object.assign(Object.assign({}, API), { args: {
        content: html `<p>Text content</p>`,
        numOfSteps: 3,
        subtext: 'Subtext',
    } });
export const VerticalThreeStepsCurrentStepIndex0 = Object.assign(Object.assign({}, VerticalThreeSteps), { args: Object.assign(Object.assign({}, VerticalThreeSteps.args), { currentStepIndex: 0 }) });
export const VerticalThreeStepsCurrentStepIndex1 = Object.assign(Object.assign({}, VerticalThreeSteps), { args: Object.assign(Object.assign({}, VerticalThreeSteps.args), { currentStepIndex: 1 }) });
export const VerticalThreeStepsCurrentStepIndex2 = Object.assign(Object.assign({}, VerticalThreeSteps), { args: Object.assign(Object.assign({}, VerticalThreeSteps.args), { currentStepIndex: 2 }) });
export const VerticalThreeStepsCurrentStepIndex3 = Object.assign(Object.assign({}, VerticalThreeSteps), { args: Object.assign(Object.assign({}, VerticalThreeSteps.args), { currentStepIndex: 3 }) });
export const VerticalThreeStepsConnectorless = Object.assign(Object.assign({}, VerticalThreeSteps), { args: Object.assign(Object.assign({}, VerticalThreeSteps.args), { connectorless: true }) });
export const VerticalThreeStepsConnectorlessCurrentStepIndex0 = Object.assign(Object.assign({}, VerticalThreeStepsConnectorless), { args: Object.assign(Object.assign({}, VerticalThreeStepsConnectorless.args), { currentStepIndex: 0 }) });
export const VerticalThreeStepsConnectorlessCurrentStepIndex1 = Object.assign(Object.assign({}, VerticalThreeStepsConnectorless), { args: Object.assign(Object.assign({}, VerticalThreeStepsConnectorless.args), { currentStepIndex: 1 }) });
export const VerticalThreeStepsConnectorlessCurrentStepIndex2 = Object.assign(Object.assign({}, VerticalThreeStepsConnectorless), { args: Object.assign(Object.assign({}, VerticalThreeStepsConnectorless.args), { currentStepIndex: 2 }) });
export const VerticalThreeStepsConnectorlessCurrentStepIndex3 = Object.assign(Object.assign({}, VerticalThreeStepsConnectorless), { args: Object.assign(Object.assign({}, VerticalThreeStepsConnectorless.args), { currentStepIndex: 3 }) });
export const VerticalThreeStepsReversed = Object.assign(Object.assign({}, VerticalThreeSteps), { args: Object.assign(Object.assign({}, VerticalThreeSteps.args), { reversed: true }) });
export const VerticalThreeStepsReversedCurrentStepIndex0 = Object.assign(Object.assign({}, VerticalThreeStepsReversed), { args: Object.assign(Object.assign({}, VerticalThreeStepsReversed.args), { currentStepIndex: 0 }) });
export const VerticalThreeStepsReversedCurrentStepIndex1 = Object.assign(Object.assign({}, VerticalThreeStepsReversed), { args: Object.assign(Object.assign({}, VerticalThreeStepsReversed.args), { currentStepIndex: 1 }) });
export const VerticalThreeStepsReversedCurrentStepIndex2 = Object.assign(Object.assign({}, VerticalThreeStepsReversed), { args: Object.assign(Object.assign({}, VerticalThreeStepsReversed.args), { currentStepIndex: 2 }) });
export const VerticalThreeStepsReversedCurrentStepIndex3 = Object.assign(Object.assign({}, VerticalThreeStepsReversed), { args: Object.assign(Object.assign({}, VerticalThreeStepsReversed.args), { currentStepIndex: 3 }) });
export const Horizontal = Object.assign(Object.assign({}, API), { args: {
        orientation: 'horizontal',
    } });
export const HorizontalCurrentStepIndex0 = Object.assign(Object.assign({}, Horizontal), { args: Object.assign(Object.assign({}, Horizontal.args), { currentStepIndex: 0 }) });
export const HorizontalCurrentStepIndex1 = Object.assign(Object.assign({}, Horizontal), { args: Object.assign(Object.assign({}, Horizontal.args), { currentStepIndex: 1 }) });
export const HorizontalCurrentStepIndex2 = Object.assign(Object.assign({}, Horizontal), { args: Object.assign(Object.assign({}, Horizontal.args), { currentStepIndex: 2 }) });
export const HorizontalCurrentStepIndex3 = Object.assign(Object.assign({}, Horizontal), { args: Object.assign(Object.assign({}, Horizontal.args), { currentStepIndex: 3 }) });
export const HorizontalCompact = Object.assign(Object.assign({}, Horizontal), { args: Object.assign(Object.assign({}, Horizontal.args), { compact: true }) });
export const HorizontalCompactCurrentStepIndex0 = Object.assign(Object.assign({}, HorizontalCompact), { args: Object.assign(Object.assign({}, HorizontalCompact.args), { currentStepIndex: 0 }) });
export const HorizontalCompactCurrentStepIndex1 = Object.assign(Object.assign({}, HorizontalCompact), { args: Object.assign(Object.assign({}, HorizontalCompact.args), { currentStepIndex: 1 }) });
export const HorizontalCompactCurrentStepIndex2 = Object.assign(Object.assign({}, HorizontalCompact), { args: Object.assign(Object.assign({}, HorizontalCompact.args), { currentStepIndex: 2 }) });
export const HorizontalCompactCurrentStepIndex3 = Object.assign(Object.assign({}, HorizontalCompact), { args: Object.assign(Object.assign({}, HorizontalCompact.args), { currentStepIndex: 3 }) });
export const HorizontalConnectorless = Object.assign(Object.assign({}, Horizontal), { args: Object.assign(Object.assign({}, Horizontal.args), { connectorless: true }) });
export const HorizontalConnectorlessCurrentStepIndex0 = Object.assign(Object.assign({}, HorizontalConnectorless), { args: Object.assign(Object.assign({}, HorizontalConnectorless.args), { currentStepIndex: 0 }) });
export const HorizontalConnectorlessCurrentStepIndex1 = Object.assign(Object.assign({}, HorizontalConnectorless), { args: Object.assign(Object.assign({}, HorizontalConnectorless.args), { currentStepIndex: 1 }) });
export const HorizontalConnectorlessCurrentStepIndex2 = Object.assign(Object.assign({}, HorizontalConnectorless), { args: Object.assign(Object.assign({}, HorizontalConnectorless.args), { currentStepIndex: 2 }) });
export const HorizontalConnectorlessCurrentStepIndex3 = Object.assign(Object.assign({}, HorizontalConnectorless), { args: Object.assign(Object.assign({}, HorizontalConnectorless.args), { currentStepIndex: 3 }) });
export const HorizontalCompactConnectorless = Object.assign(Object.assign({}, HorizontalCompact), { args: Object.assign(Object.assign({}, HorizontalCompact.args), { connectorless: true }) });
export const HorizontalCompactConnectorlessCurrentStepIndex0 = Object.assign(Object.assign({}, HorizontalCompactConnectorless), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorless.args), { currentStepIndex: 0 }) });
export const HorizontalCompactConnectorlessCurrentStepIndex1 = Object.assign(Object.assign({}, HorizontalCompactConnectorless), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorless.args), { currentStepIndex: 1 }) });
export const HorizontalCompactConnectorlessCurrentStepIndex2 = Object.assign(Object.assign({}, HorizontalCompactConnectorless), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorless.args), { currentStepIndex: 2 }) });
export const HorizontalCompactConnectorlessCurrentStepIndex3 = Object.assign(Object.assign({}, HorizontalCompactConnectorless), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorless.args), { currentStepIndex: 3 }) });
export const HorizontalInteractive = Object.assign(Object.assign({}, Horizontal), { args: Object.assign(Object.assign({}, Horizontal.args), { interactive: true }) });
export const HorizontalInteractiveCurrentStepIndex0 = Object.assign(Object.assign({}, HorizontalInteractive), { args: Object.assign(Object.assign({}, HorizontalInteractive.args), { currentStepIndex: 0 }) });
export const HorizontalInteractiveCurrentStepIndex1 = Object.assign(Object.assign({}, HorizontalInteractive), { args: Object.assign(Object.assign({}, HorizontalInteractive.args), { currentStepIndex: 1 }) });
export const HorizontalInteractiveCurrentStepIndex2 = Object.assign(Object.assign({}, HorizontalInteractive), { args: Object.assign(Object.assign({}, HorizontalInteractive.args), { currentStepIndex: 2 }) });
export const HorizontalInteractiveCurrentStepIndex3 = Object.assign(Object.assign({}, HorizontalInteractive), { args: Object.assign(Object.assign({}, HorizontalInteractive.args), { currentStepIndex: 3 }) });
export const HorizontalConnectorlessInteractive = Object.assign(Object.assign({}, HorizontalConnectorless), { args: Object.assign(Object.assign({}, HorizontalConnectorless.args), { interactive: true }) });
export const HorizontalConnectorlessInteractiveCurrentStepIndex0 = Object.assign(Object.assign({}, HorizontalConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalConnectorlessInteractive.args), { currentStepIndex: 0 }) });
export const HorizontalConnectorlessInteractiveCurrentStepIndex1 = Object.assign(Object.assign({}, HorizontalConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalConnectorlessInteractive.args), { currentStepIndex: 1 }) });
export const HorizontalConnectorlessInteractiveCurrentStepIndex2 = Object.assign(Object.assign({}, HorizontalConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalConnectorlessInteractive.args), { currentStepIndex: 2 }) });
export const HorizontalConnectorlessInteractiveCurrentStepIndex3 = Object.assign(Object.assign({}, HorizontalConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalConnectorlessInteractive.args), { currentStepIndex: 3 }) });
export const HorizontalCompactInteractive = Object.assign(Object.assign({}, HorizontalCompact), { args: Object.assign(Object.assign({}, HorizontalCompact.args), { interactive: true }) });
export const HorizontalCompactInteractiveCurrentStepIndex0 = Object.assign(Object.assign({}, HorizontalCompactInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactInteractive.args), { currentStepIndex: 0 }) });
export const HorizontalCompactInteractiveCurrentStepIndex1 = Object.assign(Object.assign({}, HorizontalCompactInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactInteractive.args), { currentStepIndex: 1 }) });
export const HorizontalCompactInteractiveCurrentStepIndex2 = Object.assign(Object.assign({}, HorizontalCompactInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactInteractive.args), { currentStepIndex: 2 }) });
export const HorizontalCompactInteractiveCurrentStepIndex3 = Object.assign(Object.assign({}, HorizontalCompactInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactInteractive.args), { currentStepIndex: 3 }) });
export const HorizontalCompactConnectorlessInteractive = Object.assign(Object.assign({}, HorizontalCompactConnectorless), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorless.args), { interactive: true }) });
export const HorizontalCompactConnectorlessInteractiveCurrentStepIndex0 = Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive.args), { currentStepIndex: 0 }) });
export const HorizontalCompactConnectorlessInteractiveCurrentStepIndex1 = Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive.args), { currentStepIndex: 1 }) });
export const HorizontalCompactConnectorlessInteractiveCurrentStepIndex2 = Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive.args), { currentStepIndex: 2 }) });
export const HorizontalCompactConnectorlessInteractiveCurrentStepIndex3 = Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive), { args: Object.assign(Object.assign({}, HorizontalCompactConnectorlessInteractive.args), { currentStepIndex: 3 }) });
export const GuideCheckIndicator = {
    render: () => html `
    <market-progress-tracker current-step-index="1" indicator="check">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideCustomIcons = {
    render: () => html `
    <market-progress-tracker current-step-index="1">
      <market-progress-tracker-step>
        <label slot="label">Order submitted</label>
        <span slot="subtext">Received on April 20, 2023</span>
        <market-accessory slot="icon">
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http:www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 3C0 1.34315 1.34315 0 3 0H15C16.6569 0 18 1.34315 18 3V15C18 16.6569 16.6569 18 15 18H3C1.34315 18 0 16.6569 0 15V3ZM3 2C2.44772 2 2 2.44772 2 3V4H16V3C16 2.44772 15.5523 2 15 2H3ZM16 6H2V15C2 15.5523 2.44772 16 3 16H15C15.5523 16 16 15.5523 16 15V6Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5821 9.41023L9.28523 13.7071C8.89471 14.0976 8.26154 14.0976 7.87102 13.7071L5.29289 11.129L6.70711 9.71477L8.57812 11.5858L12.1679 7.99602L13.5821 9.41023Z"
            />
          </svg>
        </market-accessory>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Shipping in progress</label>
        <span slot="subtext">Tracking ID: DZ12369420NTS</span>
        <market-accessory slot="icon">
          <svg width="18" height="22" viewBox="0 0 18 22" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 0.881836L18 5.38184V16.6179L9 21.1179L0 16.6179V5.38184L9 0.881836ZM2 7.6179V15.3818L8 18.3818V10.6179L2 7.6179ZM10 10.6179V18.3818L16 15.3818V7.6179L10 10.6179ZM14.7639 5.99987L9 8.88184L7.23607 7.99987L13 5.1179L14.7639 5.99987ZM10.7639 3.99987L9 3.1179L3.23607 5.99987L5 6.88184L10.7639 3.99987Z"
            />
          </svg>
        </market-accessory>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Delivered</label>
        <span slot="subtext">To: 123 Sesame Street</span>
        <market-accessory slot="icon">
          <svg width="16" height="19" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 0.589844L0 8.58984V15.9998C0 17.6498 1.35 18.9998 3 18.9998H13C14.65 18.9998 16 17.6498 16 15.9998V8.58984L8 0.589844ZM9 16.9998H7V12.9998H9V16.9998ZM14 15.9998C14 16.5498 13.55 16.9998 13 16.9998H11V10.9998H5V16.9998H3C2.45 16.9998 2 16.5498 2 15.9998V9.40984L8 3.40984L14 9.40984V15.9998Z"
            />
          </svg>
        </market-accessory>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideSize = {
    render: () => html `
    <market-progress-tracker current-step-index="1" size="large">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
        <span slot="subtext">First step</span>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
        <span slot="subtext">Second step</span>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
        <span slot="subtext">Last step</span>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideConnectorless = {
    render: () => html `
    <market-progress-tracker connectorless current-step-index="1">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideReversed = {
    render: () => html `
    <market-progress-tracker current-step-index="1" reversed>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideHorizontal = {
    render: () => html `
    <market-progress-tracker current-step-index="2" orientation="horizontal">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 4</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 5</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideHorizontalInteractive = {
    render: () => html `
    <market-progress-tracker current-step-index="2" interactive orientation="horizontal">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 4</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 5</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideControlled = {
    render: () => html `
    <market-progress-tracker interactive orientation="horizontal">
      <market-progress-tracker-step completed>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step completed>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step active>
        <label slot="label">Step 4</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 5</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideHorizontalCompact = {
    render: () => html `
    <market-progress-tracker compact current-step-index="2" orientation="horizontal">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 4</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 5</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
    <market-progress-tracker compact current-step-index="2" interactive orientation="horizontal">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 4</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 5</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideHorizontalConnectorless = {
    render: () => html `
    <market-progress-tracker compact current-step-index="2" orientation="horizontal">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 4</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 5</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
    <market-progress-tracker compact current-step-index="2" interactive orientation="horizontal">
      <market-progress-tracker-step>
        <label slot="label">Step 1</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 2</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 3</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 4</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Step 5</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
  `,
};
export const GuideStyled = {
    render: () => html `
    <market-progress-tracker class="market-progress-tracker-styled-example" current-step-index="1" indicator="check">
      <market-progress-tracker-step>
        <label slot="label">Requested</label>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Loading</label>
        <market-inline-status variant="critical">Ruh-roh, something went wrong.</market-inline-status>
        <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12ZM5 12C5 15.86 8.14 19 12 19C15.86 19 19 15.86 19 12C19 8.14 15.86 5 12 5C8.14 5 5 8.14 5 12ZM12 10.59L14.29 8.29004L15.71 9.71004L13.41 12L15.71 14.29L14.29 15.71L12 13.42L9.71004 15.71L8.29004 14.29L10.59 12L8.29004 9.71004L9.71004 8.29004L12 10.59Z"
          />
        </svg>
      </market-progress-tracker-step>
      <market-progress-tracker-step>
        <label slot="label">Done</label>
      </market-progress-tracker-step>
    </market-progress-tracker>
    <style>
      .market-progress-tracker-styled-example {
        /* completed step’s icon: success fill color */
        .market-progress-tracker-step[completed]::part(icon) {
          fill: var(--core-success-fill-color);
        }

        /* completed step’s connector: success fill color */
        .market-progress-tracker-step[completed]::after {
          background-color: var(--core-success-fill-color);
        }

        /* failed step’s icon: critical fill color */
        .market-progress-tracker-step:nth-of-type(2)::part(icon) {
          fill: var(--core-critical-fill-color);
        }

        /* incomplete step’s connector: dashed */
        .market-progress-tracker-step:not([completed])::after {
          width: 0;
          border: 1px dashed var(--core-fill-20-color);
          background: none;
        }

        /* incomplete step: 50% opacity */
        .market-progress-tracker-step:not([completed]):not([active])::part(content) {
          opacity: 50%;
        }

        /* wider padding between steps */
        .market-progress-tracker-step:not(:last-of-type)::part(content) {
          padding-bottom: 24px;
        }
      }
    </style>
  `,
};
//# sourceMappingURL=market-progress-tracker.stories.js.map
