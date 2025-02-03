import { html } from "lit";
import { PlaceholderSvg24, PlaceholderSvg40 } from "../helpers/placeholder-svg";
export const SlottedAccessoryTypes = ['none', 'button', 'icon', 'image', 'pill', 'text', 'tooltip'];
export const SlottedAccessory = ({ type, placement }) => {
    switch (type) {
        case 'button':
            return html ` <market-button slot="${placement}-accessory" size="small"> Button </market-button> `;
        case 'icon':
            return html `
        <market-accessory slot="${placement}-accessory" size="icon">
          ${PlaceholderSvg24('var(--core-surface-inverse-color)')}
        </market-accessory>
      `;
        case 'image':
            return html `
        <market-accessory slot="${placement}-accessory" size="image">
          ${PlaceholderSvg40('var(--core-surface-inverse-color)')}
        </market-accessory>
      `;
        case 'pill':
            return html ` <market-pill slot="${placement}-accessory"> Pill </market-pill> `;
        case 'text':
            return html `
        <market-accessory slot="${placement}-accessory">${placement === 'leading' ? '$' : '%'}</market-accessory>
      `;
        case 'tooltip':
            return html `
        <market-tooltip slot="${placement}-accessory">
          <span slot="content">Lorem ipsum dolor sit amet</span>
        </market-tooltip>
      `;
        default:
            return '';
    }
};
//# sourceMappingURL=slotted-accessory.js.map
