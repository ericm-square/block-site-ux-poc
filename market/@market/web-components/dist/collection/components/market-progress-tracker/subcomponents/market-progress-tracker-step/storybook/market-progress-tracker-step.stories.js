import { html } from "lit";
import { ProgressTrackerStepTemplate, } from "./market-progress-tracker-step.templates";
export default {
    title: 'Components/Progress Tracker (BETA)/Progress Tracker Step/API',
    tags: ['autodocs', '!dev'],
    component: 'market-progress-tracker-step',
    argTypes: {
        content: {
            control: { type: 'text' },
            description: 'Text provided on the default slot',
            name: 'Text content',
            table: { category: 'Demo' },
        },
        label: {
            control: { type: 'text' },
            description: 'Text provided on the `label` slot',
            name: 'Label',
            table: { category: 'Demo' },
        },
        subtext: {
            control: { type: 'text' },
            description: 'Text provided on the `subtext` slot',
            name: 'Subtext',
            table: { category: 'Demo' },
        },
    },
    args: {
        label: 'Label',
    },
};
const CUSTOM_ICON_HTML = html `<market-accessory slot="icon">
  <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.24271 8.25729L2 12.5L6.24271 16.7427L10.4854 12.5L6.24271 8.25729ZM11.8996 2.60037L7.65692 6.84308L11.8996 11.0858L16.1423 6.84308L11.8996 2.60037ZM7.65692 18.1569L11.8996 13.9142L16.1423 18.1569L11.8996 22.3996L7.65692 18.1569ZM17.5566 8.25729L13.3138 12.5L17.5566 16.7427L21.7993 12.5L17.5566 8.25729Z"
    />
  </svg>
</market-accessory>`;
export const API = {
    render: (args) => ProgressTrackerStepTemplate(args),
};
export const VerticalSmall = Object.assign(Object.assign({}, API), { args: {
        size: 'small',
    } });
export const VerticalMedium = Object.assign({}, API);
export const VerticalLarge = Object.assign(Object.assign({}, API), { args: {
        size: 'large',
    } });
export const VerticalSmallActive = Object.assign(Object.assign({}, VerticalSmall), { args: Object.assign(Object.assign({}, VerticalSmall.args), { active: true }) });
export const VerticalMediumActive = Object.assign(Object.assign({}, VerticalMedium), { args: Object.assign(Object.assign({}, VerticalMedium.args), { active: true }) });
export const VerticalLargeActive = Object.assign(Object.assign({}, VerticalLarge), { args: Object.assign(Object.assign({}, VerticalLarge.args), { active: true }) });
export const VerticalSmallCompleted = Object.assign(Object.assign({}, VerticalSmall), { args: Object.assign(Object.assign({}, VerticalSmall.args), { completed: true }) });
export const VerticalMediumCompleted = Object.assign(Object.assign({}, VerticalMedium), { args: Object.assign(Object.assign({}, VerticalMedium.args), { completed: true }) });
export const VerticalLargeCompleted = Object.assign(Object.assign({}, VerticalLarge), { args: Object.assign(Object.assign({}, VerticalLarge.args), { completed: true }) });
export const VerticalSmallCheckIndicator = Object.assign(Object.assign({}, VerticalSmall), { args: Object.assign(Object.assign({}, VerticalSmall.args), { indicator: 'check' }) });
export const VerticalMediumCheckIndicator = Object.assign(Object.assign({}, VerticalMedium), { args: Object.assign(Object.assign({}, VerticalMedium.args), { indicator: 'check' }) });
export const VerticalLargeCheckIndicator = Object.assign(Object.assign({}, VerticalLarge), { args: Object.assign(Object.assign({}, VerticalLarge.args), { indicator: 'check' }) });
export const VerticalSmallActiveCheckIndicator = Object.assign(Object.assign({}, VerticalSmallActive), { args: Object.assign(Object.assign({}, VerticalSmallActive.args), { indicator: 'check' }) });
export const VerticalMediumActiveCheckIndicator = Object.assign(Object.assign({}, VerticalMediumActive), { args: Object.assign(Object.assign({}, VerticalMediumActive.args), { indicator: 'check' }) });
export const VerticalLargeActiveCheckIndicator = Object.assign(Object.assign({}, VerticalLargeActive), { args: Object.assign(Object.assign({}, VerticalLargeActive.args), { indicator: 'check' }) });
export const VerticalSmallCompletedCheckIndicator = Object.assign(Object.assign({}, VerticalSmallCompleted), { args: Object.assign(Object.assign({}, VerticalSmallCompleted.args), { indicator: 'check' }) });
export const VerticalMediumCompletedCheckIndicator = Object.assign(Object.assign({}, VerticalMediumCompleted), { args: Object.assign(Object.assign({}, VerticalMediumCompleted.args), { indicator: 'check' }) });
export const VerticalLargeCompletedCheckIndicator = Object.assign(Object.assign({}, VerticalLargeCompleted), { args: Object.assign(Object.assign({}, VerticalLargeCompleted.args), { indicator: 'check' }) });
export const VerticalSmallSlottedIcon = Object.assign(Object.assign({}, VerticalSmall), { args: Object.assign(Object.assign({}, VerticalSmall.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalMediumSlottedIcon = Object.assign(Object.assign({}, VerticalMedium), { args: Object.assign(Object.assign({}, VerticalMedium.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalLargeSlottedIcon = Object.assign(Object.assign({}, VerticalLarge), { args: Object.assign(Object.assign({}, VerticalLarge.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalSmallActiveSlottedIcon = Object.assign(Object.assign({}, VerticalSmallActive), { args: Object.assign(Object.assign({}, VerticalSmallActive.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalMediumActiveSlottedIcon = Object.assign(Object.assign({}, VerticalMediumActive), { args: Object.assign(Object.assign({}, VerticalMediumActive.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalLargeActiveSlottedIcon = Object.assign(Object.assign({}, VerticalLargeActive), { args: Object.assign(Object.assign({}, VerticalLargeActive.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalSmallCompletedSlottedIcon = Object.assign(Object.assign({}, VerticalSmallCompleted), { args: Object.assign(Object.assign({}, VerticalSmallCompleted.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalMediumCompletedSlottedIcon = Object.assign(Object.assign({}, VerticalMediumCompleted), { args: Object.assign(Object.assign({}, VerticalMediumCompleted.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalLargeCompletedSlottedIcon = Object.assign(Object.assign({}, VerticalLargeCompleted), { args: Object.assign(Object.assign({}, VerticalLargeCompleted.args), { content: CUSTOM_ICON_HTML }) });
export const VerticalSmallSubtext = Object.assign(Object.assign({}, VerticalSmall), { args: Object.assign(Object.assign({}, VerticalSmall.args), { subtext: 'Subtext' }) });
export const VerticalMediumSubtext = Object.assign(Object.assign({}, VerticalMedium), { args: Object.assign(Object.assign({}, VerticalMedium.args), { subtext: 'Subtext' }) });
export const VerticalLargeSubtext = Object.assign(Object.assign({}, VerticalLarge), { args: Object.assign(Object.assign({}, VerticalLarge.args), { subtext: 'Subtext' }) });
export const VerticalSmallDefaultSlot = Object.assign(Object.assign({}, VerticalSmall), { args: Object.assign(Object.assign({}, VerticalSmall.args), { content: 'Text' }) });
export const VerticalMediumDefaultSlot = Object.assign(Object.assign({}, VerticalMedium), { args: Object.assign(Object.assign({}, VerticalMedium.args), { content: 'Text' }) });
export const VerticalLargeDefaultSlot = Object.assign(Object.assign({}, VerticalLarge), { args: Object.assign(Object.assign({}, VerticalLarge.args), { content: 'Text' }) });
export const VerticalSmallKitchenSink = Object.assign(Object.assign({}, VerticalSmall), { args: Object.assign(Object.assign({}, VerticalSmall.args), { label: 'Mike Wazowski', subtext: 'Scarer', content: html `
      ${CUSTOM_ICON_HTML}
      <market-inline-status variant="critical">Error: 23-19 🧦</market-inline-status>
      <market-button rank="primary" size="small" variant="destructive">Decontaminate</market-button>
    ` }) });
export const VerticalMediumKitchenSink = Object.assign(Object.assign({}, VerticalMedium), { args: Object.assign(Object.assign({}, VerticalMedium.args), { label: 'Mike Wazowski', subtext: 'Scarer', content: html `
      ${CUSTOM_ICON_HTML}
      <market-inline-status variant="critical">Error: 23-19 🧦</market-inline-status>
      <market-button rank="primary" size="small" variant="destructive">Decontaminate</market-button>
    ` }) });
export const VerticalLargeKitchenSink = Object.assign(Object.assign({}, VerticalLarge), { args: Object.assign(Object.assign({}, VerticalLarge.args), { label: 'Mike Wazowski', subtext: 'Scarer', content: html `
      ${CUSTOM_ICON_HTML}
      <market-inline-status variant="critical">Error: 23-19 🧦</market-inline-status>
      <market-button rank="primary" size="small" variant="destructive">Decontaminate</market-button>
    ` }) });
export const HorizontalSmall = Object.assign(Object.assign({}, API), { args: {
        orientation: 'horizontal',
        size: 'small',
    } });
export const HorizontalMedium = Object.assign(Object.assign({}, API), { args: {
        orientation: 'horizontal',
    } });
export const HorizontalLarge = Object.assign(Object.assign({}, API), { args: {
        orientation: 'horizontal',
        size: 'large',
    } });
export const HorizontalSmallActive = Object.assign(Object.assign({}, HorizontalSmall), { args: Object.assign(Object.assign({}, HorizontalSmall.args), { active: true }) });
export const HorizontalMediumActive = Object.assign(Object.assign({}, HorizontalMedium), { args: Object.assign(Object.assign({}, HorizontalMedium.args), { active: true }) });
export const HorizontalLargeActive = Object.assign(Object.assign({}, HorizontalLarge), { args: Object.assign(Object.assign({}, HorizontalLarge.args), { active: true }) });
export const HorizontalSmallCompleted = Object.assign(Object.assign({}, HorizontalSmall), { args: Object.assign(Object.assign({}, HorizontalSmall.args), { completed: true }) });
export const HorizontalMediumCompleted = Object.assign(Object.assign({}, HorizontalMedium), { args: Object.assign(Object.assign({}, HorizontalMedium.args), { completed: true }) });
export const HorizontalLargeCompleted = Object.assign(Object.assign({}, HorizontalLarge), { args: Object.assign(Object.assign({}, HorizontalLarge.args), { completed: true }) });
export const HorizontalSmallCheckIndicator = Object.assign(Object.assign({}, HorizontalSmall), { args: Object.assign(Object.assign({}, HorizontalSmall.args), { indicator: 'check' }) });
export const HorizontalMediumCheckIndicator = Object.assign(Object.assign({}, HorizontalMedium), { args: Object.assign(Object.assign({}, HorizontalMedium.args), { indicator: 'check' }) });
export const HorizontalLargeCheckIndicator = Object.assign(Object.assign({}, HorizontalLarge), { args: Object.assign(Object.assign({}, HorizontalLarge.args), { indicator: 'check' }) });
export const HorizontalSmallActiveCheckIndicator = Object.assign(Object.assign({}, HorizontalSmallActive), { args: Object.assign(Object.assign({}, HorizontalSmallActive.args), { indicator: 'check' }) });
export const HorizontalMediumActiveCheckIndicator = Object.assign(Object.assign({}, HorizontalMediumActive), { args: Object.assign(Object.assign({}, HorizontalMediumActive.args), { indicator: 'check' }) });
export const HorizontalLargeActiveCheckIndicator = Object.assign(Object.assign({}, HorizontalLargeActive), { args: Object.assign(Object.assign({}, HorizontalLargeActive.args), { indicator: 'check' }) });
export const HorizontalSmallCompletedCheckIndicator = Object.assign(Object.assign({}, HorizontalSmallCompleted), { args: Object.assign(Object.assign({}, HorizontalSmallCompleted.args), { indicator: 'check' }) });
export const HorizontalMediumCompletedCheckIndicator = Object.assign(Object.assign({}, HorizontalMediumCompleted), { args: Object.assign(Object.assign({}, HorizontalMediumCompleted.args), { indicator: 'check' }) });
export const HorizontalLargeCompletedCheckIndicator = Object.assign(Object.assign({}, HorizontalLargeCompleted), { args: Object.assign(Object.assign({}, HorizontalLargeCompleted.args), { indicator: 'check' }) });
export const HorizontalSmallSlottedIcon = Object.assign(Object.assign({}, HorizontalSmall), { args: Object.assign(Object.assign({}, HorizontalSmall.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalMediumSlottedIcon = Object.assign(Object.assign({}, HorizontalMedium), { args: Object.assign(Object.assign({}, HorizontalMedium.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalLargeSlottedIcon = Object.assign(Object.assign({}, HorizontalLarge), { args: Object.assign(Object.assign({}, HorizontalLarge.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalSmallActiveSlottedIcon = Object.assign(Object.assign({}, HorizontalSmallActive), { args: Object.assign(Object.assign({}, HorizontalSmallActive.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalMediumActiveSlottedIcon = Object.assign(Object.assign({}, HorizontalMediumActive), { args: Object.assign(Object.assign({}, HorizontalMediumActive.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalLargeActiveSlottedIcon = Object.assign(Object.assign({}, HorizontalLargeActive), { args: Object.assign(Object.assign({}, HorizontalLargeActive.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalSmallCompletedSlottedIcon = Object.assign(Object.assign({}, HorizontalSmallCompleted), { args: Object.assign(Object.assign({}, HorizontalSmallCompleted.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalMediumCompletedSlottedIcon = Object.assign(Object.assign({}, HorizontalMediumCompleted), { args: Object.assign(Object.assign({}, HorizontalMediumCompleted.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalLargeCompletedSlottedIcon = Object.assign(Object.assign({}, HorizontalLargeCompleted), { args: Object.assign(Object.assign({}, HorizontalLargeCompleted.args), { content: CUSTOM_ICON_HTML }) });
export const HorizontalSmallInteractive = Object.assign(Object.assign({}, HorizontalSmall), { args: Object.assign(Object.assign({}, HorizontalSmall.args), { interactive: true }) });
export const HorizontalMediumInteractive = Object.assign(Object.assign({}, HorizontalMedium), { args: Object.assign(Object.assign({}, HorizontalMedium.args), { interactive: true }) });
export const HorizontalLargeInteractive = Object.assign(Object.assign({}, HorizontalLarge), { args: Object.assign(Object.assign({}, HorizontalLarge.args), { interactive: true }) });
export const HorizontalSmallActiveInteractive = Object.assign(Object.assign({}, HorizontalSmallActive), { args: Object.assign(Object.assign({}, HorizontalSmallActive.args), { interactive: true }) });
export const HorizontalMediumActiveInteractive = Object.assign(Object.assign({}, HorizontalMediumActive), { args: Object.assign(Object.assign({}, HorizontalMediumActive.args), { interactive: true }) });
export const HorizontalLargeActiveInteractive = Object.assign(Object.assign({}, HorizontalLargeActive), { args: Object.assign(Object.assign({}, HorizontalLargeActive.args), { interactive: true }) });
export const HorizontalSmallCompletedInteractive = Object.assign(Object.assign({}, HorizontalSmallCompleted), { args: Object.assign(Object.assign({}, HorizontalSmallCompleted.args), { interactive: true }) });
export const HorizontalMediumCompletedInteractive = Object.assign(Object.assign({}, HorizontalMediumCompleted), { args: Object.assign(Object.assign({}, HorizontalMediumCompleted.args), { interactive: true }) });
export const HorizontalLargeCompletedInteractive = Object.assign(Object.assign({}, HorizontalLargeCompleted), { args: Object.assign(Object.assign({}, HorizontalLargeCompleted.args), { interactive: true }) });
export const HorizontalSmallCompact = Object.assign(Object.assign({}, HorizontalSmall), { args: Object.assign(Object.assign({}, HorizontalSmall.args), { compact: true }) });
export const HorizontalMediumCompact = Object.assign(Object.assign({}, HorizontalMedium), { args: Object.assign(Object.assign({}, HorizontalMedium.args), { compact: true }) });
export const HorizontalLargeCompact = Object.assign(Object.assign({}, HorizontalLarge), { args: Object.assign(Object.assign({}, HorizontalLarge.args), { compact: true }) });
export const HorizontalSmallActiveCompact = Object.assign(Object.assign({}, HorizontalSmallActive), { args: Object.assign(Object.assign({}, HorizontalSmallActive.args), { compact: true }) });
export const HorizontalMediumActiveCompact = Object.assign(Object.assign({}, HorizontalMediumActive), { args: Object.assign(Object.assign({}, HorizontalMediumActive.args), { compact: true }) });
export const HorizontalLargeActiveCompact = Object.assign(Object.assign({}, HorizontalLargeActive), { args: Object.assign(Object.assign({}, HorizontalLargeActive.args), { compact: true }) });
export const HorizontalSmallCompletedCompact = Object.assign(Object.assign({}, HorizontalSmallCompleted), { args: Object.assign(Object.assign({}, HorizontalSmallCompleted.args), { compact: true }) });
export const HorizontalMediumCompletedCompact = Object.assign(Object.assign({}, HorizontalMediumCompleted), { args: Object.assign(Object.assign({}, HorizontalMediumCompleted.args), { compact: true }) });
export const HorizontalLargeCompletedCompact = Object.assign(Object.assign({}, HorizontalLargeCompleted), { args: Object.assign(Object.assign({}, HorizontalLargeCompleted.args), { compact: true }) });
export const HorizontalSmallCompactInteractive = Object.assign(Object.assign({}, HorizontalSmallCompact), { args: Object.assign(Object.assign({}, HorizontalSmallCompact.args), { interactive: true }) });
export const HorizontalMediumCompactInteractive = Object.assign(Object.assign({}, HorizontalMediumCompact), { args: Object.assign(Object.assign({}, HorizontalMediumCompact.args), { interactive: true }) });
export const HorizontalLargeCompactInteractive = Object.assign(Object.assign({}, HorizontalLargeCompact), { args: Object.assign(Object.assign({}, HorizontalLargeCompact.args), { interactive: true }) });
export const HorizontalSmallActiveCompactInteractive = Object.assign(Object.assign({}, HorizontalSmallActiveCompact), { args: Object.assign(Object.assign({}, HorizontalSmallActiveCompact.args), { compact: true }) });
export const HorizontalMediumActiveCompactInteractive = Object.assign(Object.assign({}, HorizontalMediumActiveCompact), { args: Object.assign(Object.assign({}, HorizontalMediumActiveCompact.args), { compact: true }) });
export const HorizontalLargeActiveCompactInteractive = Object.assign(Object.assign({}, HorizontalLargeActiveCompact), { args: Object.assign(Object.assign({}, HorizontalLargeActiveCompact.args), { compact: true }) });
export const HorizontalSmallCompletedCompactInteractive = Object.assign(Object.assign({}, HorizontalSmallCompletedCompact), { args: Object.assign(Object.assign({}, HorizontalSmallCompletedCompact.args), { compact: true }) });
export const HorizontalMediumCompletedCompactInteractive = Object.assign(Object.assign({}, HorizontalMediumCompletedCompact), { args: Object.assign(Object.assign({}, HorizontalMediumCompletedCompact.args), { compact: true }) });
export const HorizontalLargeCompletedCompactInteractive = Object.assign(Object.assign({}, HorizontalLargeCompletedCompact), { args: Object.assign(Object.assign({}, HorizontalLargeCompletedCompact.args), { compact: true }) });
//# sourceMappingURL=market-progress-tracker-step.stories.js.map
