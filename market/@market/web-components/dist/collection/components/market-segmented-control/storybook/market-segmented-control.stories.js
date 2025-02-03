import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default {
    title: 'Components/Segmented Control/API',
    component: 'market-segmented-control',
    tags: ['autodocs', '!dev'],
    argTypes: {
        // set markup controls
        disabledSegmentIndices: {
            control: { type: 'text' },
            description: 'Comma-separated indices of disabled segments, e.g. `"3,6,9"`',
            name: 'Disabled segments indices',
            table: { category: 'Demo' },
        },
        segmentCount: {
            control: { type: 'number' },
            description: 'Number of segments',
            name: 'Number of segments',
            table: { category: 'Demo' },
        },
    },
    args: {
        segmentCount: 3,
    },
};
export const API = {
    render: ({ segmentCount, disabled, disabledSegmentIndices, value }) => html `
    <market-segmented-control value=${ifDefined(value)} ?disabled=${disabled}>
      ${Array.from({ length: segmentCount }).map((_, i) => {
        const disabled = disabledSegmentIndices === null || disabledSegmentIndices === void 0 ? void 0 : disabledSegmentIndices.split(',').includes(`${i}`);
        return html `<market-segment value="segment-${i + 1}" ?disabled=${disabled}>Segment ${i + 1}</market-button>`;
    })}
    </market-segmented-control>
  `,
};
export const InitialValue = Object.assign(Object.assign({}, API), { args: { value: 'segment-3' } });
export const DisabledSegments = Object.assign(Object.assign({}, API), { args: { disabledSegmentIndices: '1,3', segmentCount: 5 } });
//# sourceMappingURL=market-segmented-control.stories.js.map
