import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import tokens from "@market/market-theme/js/icons.json";
import "./market-icon.stories.css";
export default {
    title: 'Components/Icon (BETA)/API',
    component: 'market-icon',
    tags: ['autodocs', '!dev'],
    args: {
        fidelity: 24,
        name: 'inform',
    },
};
export const API = {
    render: ({ fidelity, name }) => html `
    <market-icon class="icon-example-large" name="${ifDefined(name)}" fidelity="${ifDefined(fidelity)}"></market-icon>
    <market-button rank="primary"
      ><market-icon slot="icon" fidelity="${ifDefined(fidelity)}" name="${ifDefined(name)}"></market-icon
      >Slotted</market-button
    >
  `,
};
const fidelities = {};
Object.keys(tokens.core.icon).forEach((iconName) => {
    const icon = tokens.core.icon[iconName];
    Object.keys(icon).forEach((fidelityName) => {
        const fidelity = icon[fidelityName];
        if (!fidelities[fidelityName]) {
            fidelities[fidelityName] = {
                size: fidelity.size,
                camelCaseName: fidelityName.replace(':', '-'),
                assets: {},
            };
        }
        const asset = fidelities[fidelityName].assets[fidelity.asset];
        if (!asset) {
            fidelities[fidelityName].assets[fidelity.asset] = {
                name: fidelity.asset,
                width: fidelity.width,
                height: fidelity.height,
                semantics: [iconName],
            };
        }
        else {
            asset.semantics.push(iconName);
        }
    });
});
export const List = {
    tags: ['dev'],
    parameters: {
        layout: 'fullscreen',
    },
    render: () => html `
    <div id="icon-list-wrapper">
      <h1>Icon List</h1>
      ${Object.keys(fidelities)
        .sort()
        .map((fidelity) => html `
            <h3 id="icon-list-fidelity-${fidelities[fidelity].size}">Fidelity ${fidelities[fidelity].size}</h3>
            <market-divider size="thin"></market-divider>
            <market-list class="icon-list" id="icon-list-fidelity-${fidelities[fidelity].camelCaseName}">
              ${Object.keys(fidelities[fidelity].assets).map((assetName) => html `
                  <market-content-card class="icon-card" id="market-icon-${assetName}">
                    <p class="descriptive-name"><small>${assetName}</small></p>
                    <market-icon
                      class="icon"
                      name="${assetName}"
                      style="width: ${fidelities[fidelity].assets[assetName].width}px; height: ${fidelities[fidelity]
        .assets[assetName].height}px;"
                    ></market-icon>
                    <market-list class="semantic-name-list">
                      ${fidelities[fidelity].assets[assetName].semantics.map((semanticName) => html `
                          <market-row>
                            <p class="semantic-name">${semanticName}</p>
                          </market-row>
                        `)}
                    </market-list>
                  </market-content-card>
                `)}
            </market-list>
          `)}
    </div>
  `,
};
//# sourceMappingURL=market-icon.stories.js.map
