import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const DatePickerTemplate = ({ 
// demo
slot, 
// props
displayedDate, displayMenu, excludeMenuItems, invalid, isDateDisabled, locale, mobileMenuPosition, presetMenuOption, selectedEndDate, selectedStartDate, selectionType, timeframe, withInputs, yearViewActive, }) => html `
  <market-date-picker
    slot=${ifDefined(slot)}
    displayed-date=${ifDefined(displayedDate)}
    ?display-menu=${displayMenu}
    exclude-menu-items=${ifDefined(excludeMenuItems)}
    ?invalid=${invalid}
    ?is-date-disabled=${isDateDisabled}
    locale=${ifDefined(locale)}
    mobile-menu-position=${ifDefined(mobileMenuPosition)}
    preset-menu-option=${ifDefined(presetMenuOption)}
    selected-end-date=${ifDefined(selectedEndDate)}
    selected-start-date=${ifDefined(selectedStartDate)}
    selection-type=${ifDefined(selectionType)}
    timeframe=${ifDefined(timeframe)}
    with-inputs=${ifDefined(withInputs)}
    ?year-view-active=${yearViewActive}
  >
  </market-date-picker>
`;
export const ButtonDropdownTemplate = (args) => html `
  <market-button-dropdown interaction="persistent" popover-placement="bottom-start">
    <market-button slot="trigger">
      <span>Choose a date</span>
    </market-button>
    ${DatePickerTemplate(Object.assign(Object.assign({}, args), { slot: 'content' }))}
  </market-button-dropdown>
`;
export const FieldDropdownTemplate = (args) => html `
  <market-field>
    <market-dropdown id="market-date-picker-field-example" interaction="persistent" popover-placement="bottom-start">
      <market-input-text slot="trigger" style="width: 300px;">
        <label>Start Date</label>
      </market-input-text>
      <market-popover slot="popover"> ${DatePickerTemplate(args)} </market-popover>
    </market-dropdown>
  </market-field>
`;
export const TranslatedTemplate = () => html `
  <market-date-picker
    displayed-date="2000-01-01"
    display-menu
    locale="es"
    selected-end-date="2000-01-01"
    selected-start-date="2000-01-02"
    selection-type="range"
    timeframe="present"
    with-inputs="date-and-time"
  >
    <span slot="yesterday">Ayer</span>
    <span slot="today">Hoy</span>
    <span slot="last-week">Semana pasada</span>
    <span slot="this-week">Esta semana</span>
    <span slot="last-month">Mes pasado</span>
    <span slot="this-month">Este mes</span>
    <span slot="last-year">Año anterior</span>
    <span slot="this-year">Esta año</span>
    <span slot="custom">Personalizar</span>
    <span slot="start-date">Fecha de inicio</span>
    <span slot="end-date">Fecha de finalización</span>
    <span slot="start-time">Hora de inicio</span>
    <span slot="end-time">Hora de finalización</span>
    <span slot="range-error">Ingrese un rango de fechas válido</span>
  </market-date-picker>
`;
//# sourceMappingURL=market-date-picker.templates.js.map
