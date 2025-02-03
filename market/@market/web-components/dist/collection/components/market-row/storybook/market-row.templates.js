import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SlottedAccessory } from "../../../../docs/helpers/slotted-accessory";
import { SlottedControl } from "../../../../docs/helpers/slotted-control";
export const MarketRowTemplate = ({ 
// demo
label, subtext, sideLabel, sideSubtext, control, leadingAccessory, trailingAccessory, slot, 
// props
controlPosition, destructive, disabled, dragEnabled, dragHandlePosition, href, interactive, selected, size, target, togglable, transient, value, variant, }) => html `
  <market-row
    control-position=${ifDefined(controlPosition)}
    ?destructive=${destructive}
    ?disabled=${disabled}
    ?drag-enabled=${dragEnabled}
    drag-handle-position=${ifDefined(dragHandlePosition)}
    href=${ifDefined(href)}
    ?interactive=${interactive}
    ?selected=${selected}
    size=${ifDefined(size)}
    slot=${ifDefined(slot)}
    target=${ifDefined(target)}
    ?togglable=${togglable}
    ?transient=${transient}
    value=${ifDefined(value)}
    variant=${ifDefined(variant)}
  >
    ${label ? html `<label slot="label">${label}</label>` : null}
    ${subtext ? html `<p slot="subtext">${subtext}</p>` : null}
    ${sideLabel ? html `<label slot="side-label">${sideLabel}</label>` : null}
    ${sideSubtext ? html `<p slot="side-subtext">${sideSubtext}</p>` : null}
    ${control ? SlottedControl({ type: control }) : null}
    ${leadingAccessory
    ? SlottedAccessory({
        placement: 'leading',
        type: leadingAccessory,
    })
    : null}
    ${trailingAccessory
    ? SlottedAccessory({
        placement: 'trailing',
        type: trailingAccessory,
    })
    : null}
  </market-row>
`;
export const MarketRowExamplesTemplate = ({ size, destructive }) => html `
  <market-list>
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Label',
    subtext: 'Subtext',
    sideLabel: 'Side label',
    sideSubtext: 'Side subtext',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Drill variant',
    variant: 'drill',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Buttons',
    leadingAccessory: 'button',
    trailingAccessory: 'button',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Icons',
    leadingAccessory: 'icon',
    trailingAccessory: 'icon',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Images',
    leadingAccessory: 'image',
    trailingAccessory: 'image',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Pills',
    leadingAccessory: 'pill',
    trailingAccessory: 'pill',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Text accessories',
    leadingAccessory: 'text',
    trailingAccessory: 'text',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    label: 'Tooltips',
    leadingAccessory: 'tooltip',
    trailingAccessory: 'tooltip',
})}
  </market-list>
`;
export const MarketRowInteractiveExamplesTemplate = ({ size, destructive }) => html `
  <market-list multiselect>
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Interactive',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Link',
    href: '#',
    target: '_blank',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Checkbox',
    control: 'checkbox',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Radio',
    control: 'radio',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Toggle',
    control: 'toggle',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    disabled: true,
    interactive: true,
    label: 'Disabled checkbox',
    control: 'checkbox',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    disabled: true,
    interactive: true,
    label: 'Disabled radio',
    control: 'radio',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    disabled: true,
    interactive: true,
    label: 'Disabled toggle',
    control: 'toggle',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Leading checkbox',
    control: 'checkbox',
    controlPosition: 'leading',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Leading radio',
    control: 'radio',
    controlPosition: 'leading',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Leading toggle',
    control: 'toggle',
    controlPosition: 'leading',
})}
    ${MarketRowTemplate({
    size,
    destructive,
    interactive: true,
    label: 'Kitchen Sink',
    subtext: 'Subtext',
    sideLabel: 'Side label',
    sideSubtext: 'Side subtext',
    control: 'checkbox',
    leadingAccessory: 'image',
    trailingAccessory: 'icon',
})}
  </market-list>
`;
//# sourceMappingURL=market-row.templates.js.map
