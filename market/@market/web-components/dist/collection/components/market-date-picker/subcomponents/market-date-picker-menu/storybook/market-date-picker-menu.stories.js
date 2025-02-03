import { DatePickerMenuTemplate } from "./market-date-picker-menu.templates";
export default {
    title: 'Components/Date Picker/Date Picker Menu/API',
    component: 'market-date-picker-menu',
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: (args) => DatePickerMenuTemplate(args),
};
export const Translated = {
    render: (args) => DatePickerMenuTemplate(args),
    args: {
        rowYesterday: 'Yesterday is translated',
        rowToday: 'Today is translated',
        rowLastWeek: 'Last week is translated',
        rowThisWeek: 'This week is translated',
        rowLastMonth: 'Last month is translated',
        rowThisMonth: 'This month is translated',
        rowLastYear: 'Last year is translated',
        rowThisYear: 'This year is translated',
        rowCustom: 'Custom is translated',
    },
};
//# sourceMappingURL=market-date-picker-menu.stories.js.map
