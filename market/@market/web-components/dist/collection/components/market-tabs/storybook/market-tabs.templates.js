import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { TabListTemplate, } from "../subcomponents/market-tab-list/storybook/market-tab-list.templates";
import { TabPanelTemplate } from "../subcomponents/market-tab-panel/storybook/market-tab-panel.templates";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
export const TabsTemplate = ({ defaultTab, disabledTabIndices, numberOfTabs, selectedTab, size, }) => html `
  <market-tabs default-tab=${ifDefined(defaultTab)} selected-tab=${ifDefined(selectedTab)}>
    ${TabListTemplate({
    disabledTabIndices,
    numberOfTabs,
    size,
})}
    ${Array.from({ length: numberOfTabs })
    .fill(undefined)
    .map((_, index) => TabPanelTemplate({
    ariaLabelledby: `tab-${index + 1}`,
    content: html `
            <p>Panel ${index + 1} content</p>
            <market-button>Button ${index + 1}</market-button>
            <p>End of panel ${index + 1} content</p>
          `,
    id: `panel-${index + 1}`,
}))}
  </market-tabs>
`;
export const ContainerlessTabsTemplate = () => html `
  <nav class="market-tabs-containerless--nav">
    <market-tab-list default-tab="green-tab">
      <market-tab id="red-tab" aria-controls="red-panel">🔴 Red</market-tab>
      <market-tab id="green-tab" aria-controls="green-panel">🟢 Green</market-tab>
      <market-tab id="yellow-tab" aria-controls="yellow-panel">🟡 Yellow</market-tab>
    </market-tab-list>
  </nav>
  <main class="market-tabs-containerless--main">
    <market-tab-panel id="red-panel" aria-labelledby="red-tab" hidden>
      <p>🍎 Apple</p>
      <p>🍒 Cherry</p>
      <p>🍓 Strawberry</p>
    </market-tab-panel>
    <market-tab-panel id="green-panel" aria-labelledby="green-tab">
      <p>🥑 Avocado</p>
      <p>🥝 Kiwi</p>
      <p>🍐 Pear</p>
    </market-tab-panel>
    <market-tab-panel id="yellow-panel" aria-labelledby="yellow-tab" hidden>
      <p>🍌 Banana</p>
      <p>🍋 Lemon</p>
      <p>🍍 Pineapple</p>
    </market-tab-panel>
  </main>
`;
export const ContainerlessTabsDecorator = (story, { canvasElement }) => {
    waitForMarketHydration(canvasElement).then(() => {
        const tabListEl = canvasElement.querySelector('market-tab-list');
        tabListEl === null || tabListEl === void 0 ? void 0 : tabListEl.addEventListener('marketTabSelectedChanged', (event) => {
            const panelEl = canvasElement.querySelector(`#${event.detail.panelId}`);
            panelEl.hidden = !event.detail.value;
        });
    });
    return story();
};
//# sourceMappingURL=market-tabs.templates.js.map
