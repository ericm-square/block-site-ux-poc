import { DatePickerTemplate, ButtonDropdownTemplate, FieldDropdownTemplate, TranslatedTemplate, } from "./market-date-picker.templates";
import "./market-date-picker.stories.css";
// Locale examples for stories pulled from:
// https://square.github.io/maker/styleguide/latest/#/Calendar
const localeExamples = [
    'en-US',
    'da',
    'de',
    'es',
    'fr',
    'it',
    'ja',
    'ko',
    'nl',
    'nb',
    'pl',
    'pt',
    'ru',
    'sv',
    'tr',
    'zh-CN',
    'zh-TW',
];
export default {
    title: 'Components/Date Picker/API',
    component: 'market-date-picker',
    tags: ['autodocs', '!dev'],
    argTypes: {
        locale: {
            options: localeExamples,
            control: { type: 'select' },
        },
    },
};
export const API = {
    render: (args) => DatePickerTemplate(args),
    parameters: {
        chromatic: { disableSnapshot: true }, // shows current date
    },
};
export const ButtonDropdown = {
    render: (args) => ButtonDropdownTemplate(args),
};
export const FieldDropdown = {
    render: (args) => FieldDropdownTemplate(args),
};
export const TranslatedMenu = {
    render: () => TranslatedTemplate(),
};
export const DisplayedDate = {
    render: (args) => DatePickerTemplate(args),
    args: Object.assign(Object.assign({}, API.args), { displayedDate: '1970-01-01T00:00' }),
};
export const WithDisplayedDate = {
    render: (args) => DatePickerTemplate(args),
    args: {
        displayedDate: '1970-01-01T00:00',
    },
};
export const ExcludedItems = {
    render: (args) => DatePickerTemplate(args),
    args: {
        displayedDate: '2023-01-01T00:00',
        displayMenu: true,
        excludeMenuItems: 'today,this-year,last-year',
    },
};
export const PresetMenu = {
    render: (args) => DatePickerTemplate(args),
    args: {
        selectionType: 'range',
        presetMenuOption: 'this-month',
        displayMenu: true,
    },
    parameters: {
        chromatic: { disableSnapshot: true }, // shows current date
    },
};
//# sourceMappingURL=market-date-picker.stories.js.map
