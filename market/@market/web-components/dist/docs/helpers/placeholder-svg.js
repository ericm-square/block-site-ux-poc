import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { v4 as uuid } from "uuid";
export function PlaceholderSvg16(fill) {
    const iconId = uuid();
    return html `<svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill=${ifDefined(fill)}
    aria-labelledby=${iconId}
  >
    <title id=${iconId}>Placeholder svg 16</title>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.16185 5.17151L1.33337 7.99998L4.16185 10.8285L6.99032 7.99998L4.16185 5.17151ZM7.93313 1.40023L5.10466 4.2287L7.93313 7.05718L10.7616 4.2287L7.93313 1.40023ZM5.10466 11.7713L7.93313 8.94279L10.7616 11.7713L7.93313 14.5997L5.10466 11.7713ZM11.7044 5.17151L8.87594 7.99998L11.7044 10.8285L14.5329 7.99998L11.7044 5.17151Z"
    ></path>
  </svg>`;
}
export function PlaceholderSvg24(fill) {
    const iconId = uuid();
    return html `<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill=${ifDefined(fill)}
    aria-labelledby=${iconId}
  >
    <title id=${iconId}>Placeholder svg 24</title>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.24271 7.75729L2 12L6.24271 16.2427L10.4854 12L6.24271 7.75729ZM11.8996 2.10037L7.65692 6.34308L11.8996 10.5858L16.1423 6.34308L11.8996 2.10037ZM7.65692 17.6569L11.8996 13.4142L16.1423 17.6569L11.8996 21.8996L7.65692 17.6569ZM17.5566 7.75729L13.3138 12L17.5566 16.2427L21.7993 12L17.5566 7.75729Z"
    />
  </svg>`;
}
export function PlaceholderSvg40(fill, opacity = 0.1) {
    const iconId = uuid();
    return html `<svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill=${ifDefined(fill)}
    fill-opacity=${ifDefined(opacity)}
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby=${iconId}
  >
    <title id=${iconId}>Placeholder svg 40</title>
    <path
      d="M0 6C0 2.68629 2.68629 0 6 0H34C37.3137 0 40 2.68629 40 6V34C40 37.3137 37.3137 40 34 40H6C2.68629 40 0 37.3137 0 34V6Z"
    />
  </svg>`;
}
//# sourceMappingURL=placeholder-svg.js.map
