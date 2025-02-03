import { newE2EPage } from "@stencil/core/testing";
import { endOfWeek, startOfWeek, startOfYear, lastDayOfYear } from "date-fns";
describe('market-date-picker', () => {
    let page;
    let el;
    let header;
    it('should render with defaults', async () => {
        page = await newE2EPage();
        await page.setContent('<market-date-picker></market-date-picker>');
        el = await page.find('market-date-picker');
        expect(el).not.toBeNull();
        expect(el).toEqualAttribute('mobile-menu-position', 'top');
        expect(await el.getProperty('timeframe')).toEqual('present');
        expect(await el.getProperty('selectionType')).toEqual('single');
        expect(await el.getProperty('locale')).toEqual('en-US');
        expect(await el.getProperty('selectedStartDate')).toBeUndefined();
        expect(await el.getProperty('selectedEndDate')).toBeUndefined();
        expect(await el.getProperty('displayMenu')).toBeFalsy();
    });
    it('should navigate between months and update header text', async () => {
        page = await newE2EPage();
        await page.setContent('<market-date-picker displayed-date="01/29/1994"></market-date-picker>');
        el = await page.find('market-date-picker');
        header = await el.find('pierce/h2');
        expect(header.innerHTML).toEqual('Jan 1994');
        const navigationArrows = await page.findAll('pierce/market-button');
        // Navigation arrows are locations 0, 2
        const nextArrow = navigationArrows[2];
        await nextArrow.click();
        await nextArrow.click();
        await page.waitForChanges();
        const updatedHeader = await el.find('pierce/h2');
        expect(updatedHeader.innerHTML).toEqual('Mar 1994');
    });
    describe('with locale changes', () => {
        it('should update month and weekday text when locale is changed', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker displayed-date="08/31/2012"></market-date-picker>');
            el = await page.find('market-date-picker');
            header = await el.find('pierce/h2');
            expect(header.innerHTML).toEqual('Aug 2012');
            el.setProperty('locale', 'es');
            await page.waitForChanges();
            const updatedHeader = await el.find('pierce/h2');
            expect(updatedHeader.innerHTML).toEqual('ago 2012');
        });
        it('should set start of week to Monday if set to French locale', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker displayed-date="11/05/2023" locale="fr"></market-date-picker>');
            el = await page.find('market-date-picker');
            const dates = await el.findAll('pierce/market-date-picker-date');
            // The first 9 date objects are weekdays and blank spaces for Nov 2023 in the French locale.
            const firstWeekday = dates[0];
            const firstDate = dates[9];
            expect(firstWeekday.getAttribute('day')).toEqual('lun.');
            expect(firstDate.getAttribute('day')).toEqual('1');
        });
    });
    it('should disable previous or future dates based on timeframe prop', async () => {
        page = await newE2EPage();
        await page.setContent('<market-date-picker displayed-date="08/31/2012" timeframe="future"></market-date-picker>');
        el = await page.find('market-date-picker');
        const dates = await el.findAll('pierce/market-date-picker-date');
        // The first 10 date objects are weekdays and blank spaces for Aug 2012.
        const firstDate = dates[10];
        const secondDate = dates[11];
        expect(firstDate.getAttribute('day')).toEqual('1');
        expect(firstDate).toHaveAttribute('disabled');
        expect(secondDate.getAttribute('day')).toEqual('2');
        expect(secondDate).toHaveAttribute('disabled');
    });
    it('should disable future dates when using past timeframe', async () => {
        // Test for past dates. Have to update in 2052 lols
        page = await newE2EPage();
        await page.setContent('<market-date-picker displayed-date="08/31/2052" timeframe="past"></market-date-picker>');
        el = await page.find('market-date-picker');
        const dates = await el.findAll('pierce/market-date-picker-date');
        // The first 11 date objects are weekdays and blank spaces for Aug 2052.
        const firstDate = dates[11];
        const secondDate = dates[12];
        expect(firstDate.getAttribute('day')).toEqual('1');
        expect(firstDate).toHaveAttribute('disabled');
        expect(secondDate.getAttribute('day')).toEqual('2');
        expect(secondDate).toHaveAttribute('disabled');
    });
    it('should disable weekend dates when using custom function with isDateDisabled', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-date-picker displayed-date="09/01/2013"></market-date-picker>
      <script>
        const datePicker = document.querySelector('market-date-picker');
        datePicker.isDateDisabled = (dateString) => {
          const date = new Date(dateString)
          const utcDay = date.getUTCDay();

          /**
           * Date will be disabled if it is
           * Sunday or Saturday
           */
          return utcDay === 0 || utcDay === 6;
        }
      </script>
    `);
        el = await page.find('market-date-picker');
        const dates = await el.findAll('pierce/market-date-picker-date');
        // The first 7 date objects are weekdays and no blank spaces for Sept 2013.
        const firstDate = dates[7]; // Sunday
        const secondDate = dates[8]; // Monday
        expect(firstDate.getAttribute('day')).toEqual('1');
        expect(firstDate).toHaveAttribute('disabled');
        expect(secondDate.getAttribute('day')).toEqual('2');
        expect(secondDate).not.toHaveAttribute('disabled');
    });
    describe('in single date selection', () => {
        it('should select a date when clicked and update on second click', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker displayed-date="02/22/2022"></market-date-picker>');
            el = await page.find('market-date-picker');
            let dates = await el.findAll('pierce/market-date-picker-date');
            expect(await el.getProperty('selectedStartDate')).toBeUndefined();
            // The first 9 date objects are weekdays and blank spaces for Feb 2022.
            const firstDate = dates[9];
            let secondDate = dates[10];
            expect(firstDate.getAttribute('selected')).toBeNull();
            expect(firstDate.getAttribute('day')).toEqual('1');
            expect(secondDate.getAttribute('selected')).toBeNull();
            expect(secondDate.getAttribute('day')).toEqual('2');
            firstDate.click();
            await page.waitForChanges();
            expect(firstDate).toHaveAttribute('selected');
            expect(await el.getProperty('selectedStartDate')).toContain('2022-02-01');
            expect(secondDate).not.toHaveAttribute('selected');
            secondDate.click();
            await page.waitForChanges();
            dates = await page.findAll('pierce/market-date-picker-date');
            secondDate = dates[10];
            expect(secondDate).toHaveAttribute('selected');
            expect(await el.getProperty('selectedStartDate')).toContain('2022-02-02');
            expect(firstDate).not.toHaveAttribute('selected');
        });
    });
    describe('in range date selection', () => {
        it('should allow selection of a date range when a valid one is selected and emit marketDateRangeChanged event', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker selection-type="range" displayed-date="02/22/2022"></market-date-picker>');
            el = await page.find('market-date-picker');
            const dates = await el.findAll('pierce/market-date-picker-date');
            const dateRangeChanged = await page.spyOnEvent('marketDateRangeChanged');
            expect(await el.getProperty('selectedStartDate')).toBeUndefined();
            expect(await el.getProperty('selectedEndDate')).toBeUndefined();
            // The first 9 date objects are weekdays and blank spaces for Feb 2022.
            const firstDate = dates[9];
            const secondDate = dates[10];
            const fifthDate = dates[13];
            expect(firstDate).not.toHaveAttribute('selected');
            expect(firstDate.getAttribute('selection')).toEqual('none');
            expect(firstDate.getAttribute('day')).toEqual('1');
            expect(fifthDate).not.toHaveAttribute('selected');
            expect(fifthDate.getAttribute('selection')).toEqual('none');
            expect(fifthDate.getAttribute('day')).toEqual('5');
            expect(dateRangeChanged).toHaveReceivedEventTimes(0);
            await firstDate.click();
            await page.waitForChanges();
            expect(dateRangeChanged).toHaveReceivedEventTimes(1);
            await fifthDate.click();
            await page.waitForChanges();
            expect(firstDate).toHaveAttribute('selected');
            expect(firstDate.getAttribute('selection')).toEqual('range-first');
            expect(fifthDate).toHaveAttribute('selected');
            expect(fifthDate.getAttribute('selection')).toEqual('range-last');
            // Dates in the middle of the selected range should also be selected
            expect(secondDate).toHaveAttribute('selected');
            expect(secondDate.getAttribute('selection')).toEqual('range-middle');
            expect(dateRangeChanged).toHaveReceivedEventTimes(2);
        });
        it('should reset date range when a new date is clicked after a valid range is selected', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker selection-type="range" displayed-date="02/22/2022"></market-date-picker>');
            el = await page.find('market-date-picker');
            const dates = await page.findAll('pierce/market-date-picker-date');
            // The first 9 date objects are weekdays and blank spaces for Feb 2022.
            const firstDate = dates[9];
            const secondDate = dates[10];
            const fifthDate = dates[13];
            await secondDate.click();
            await page.waitForChanges();
            await fifthDate.click();
            await page.waitForChanges();
            // After initial range of 2-5 is set, choosing 1 should reset the range
            await firstDate.click();
            await page.waitForChanges();
            expect(await el.getProperty('selectedStartDate')).toContain('2022-02-01');
            expect(await el.getProperty('selectedEndDate')).toBeNull();
            expect(fifthDate).not.toHaveAttribute('selected');
            expect(fifthDate.getAttribute('selection')).toEqual('none');
            expect(secondDate).not.toHaveAttribute('selected');
            expect(secondDate.getAttribute('selection')).toEqual('none');
            expect(firstDate).toHaveAttribute('selected');
            expect(firstDate.getAttribute('selection')).toEqual('range-first');
        });
        it('should not create a date range when an invalid range is selected', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker selection-type="range" displayed-date="02/22/2022"></market-date-picker>');
            el = await page.find('market-date-picker');
            const dates = await page.findAll('pierce/market-date-picker-date');
            // The first 9 date objects are weekdays and blank spaces for Feb 2022.
            const secondDate = dates[10];
            const fifthDate = dates[13];
            await fifthDate.click();
            await page.waitForChanges();
            await secondDate.click();
            await page.waitForChanges();
            expect(await el.getProperty('selectedStartDate')).toContain('2022-02-02');
            expect(await el.getProperty('selectedEndDate')).toBeNull();
            expect(secondDate).toHaveAttribute('selected');
            expect(secondDate.getAttribute('selection')).toEqual('range-first');
            expect(fifthDate).not.toHaveAttribute('selected');
            expect(fifthDate.getAttribute('selection')).toEqual('none');
        });
        it('should allow a date range of 1 day to be selected', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker selection-type="range" displayed-date="02/22/2022"></market-date-picker>');
            el = await page.find('market-date-picker');
            const dates = await page.findAll('pierce/market-date-picker-date');
            // The first 9 date objects are weekdays and blank spaces for Feb 2022.
            const secondDate = dates[10];
            await secondDate.click();
            await page.waitForChanges();
            await secondDate.click();
            await page.waitForChanges();
            expect(await el.getProperty('selectedStartDate')).toContain('2022-02-02');
            expect(await el.getProperty('selectedEndDate')).toContain('2022-02-02');
            expect(secondDate).toHaveAttribute('selected');
            expect(secondDate.getAttribute('selection')).toEqual('range-last');
        });
        describe('with date inputs enabled', () => {
            it('should have invalid attribute with invalid date range', async () => {
                page = await newE2EPage();
                await page.setContent(`<market-date-picker
            selection-type="range"
            displayed-date="02/22/2022"
            selected-start-date="02/15/2022"
            selected-end-date="02/14/2022"
            with-inputs="date-and-time">
          </market-date-picker>`);
                el = await page.find('market-date-picker');
                const inputs = await page.findAll('pierce/market-input-text');
                expect(inputs.length).toBe(4);
                expect(el).toHaveAttribute('invalid');
                for (const input of inputs) {
                    expect(input).toHaveAttribute('invalid');
                }
            });
        });
        it('should be able to set a valid date and time by typing', async () => {
            page = await newE2EPage();
            await page.setContent(`<market-date-picker
            selection-type="single"
            displayed-date="02/22/2022"
            with-inputs="date-and-time">
          </market-date-picker>`);
            el = await page.find('market-date-picker');
            const inputs = await page.findAll('pierce/market-input-text');
            const dateInput = inputs[0];
            const timeInput = inputs[1];
            await dateInput.click();
            expect(dateInput).toEqualAttribute('type', 'date');
            // The input will read this as a valid date, so we have to wait before finishing typing the date.
            await page.keyboard.type('2/20/202');
            await page.waitForChanges();
            await page.keyboard.type('2');
            await timeInput.click();
            expect(timeInput).toEqualAttribute('type', 'time');
            await page.keyboard.type('0230AM');
            await page.waitForChanges();
            // NOTE: this test WILL FAIL locally due to timezones.
            // If this breaks in automated testing, we can remove the time check.
            expect(await el.getProperty('selectedStartDate')).toEqual('2022-02-20T02:30:00.000Z');
        });
        it('should be able to set an invalid date range by typing', async () => {
            page = await newE2EPage();
            await page.setContent(`<market-date-picker
            selection-type="range"
            displayed-date="02/22/2022"
            with-inputs="date">
          </market-date-picker>`);
            el = await page.find('market-date-picker');
            const inputs = await page.findAll('pierce/market-input-text');
            const startDateInput = inputs[0];
            const endDateInput = inputs[1];
            expect(inputs.length).toBe(2);
            expect(el).not.toHaveAttribute('invalid');
            for (const input of inputs) {
                expect(input).not.toHaveAttribute('invalid');
            }
            await startDateInput.click();
            await page.keyboard.type('2/15/2022');
            await endDateInput.click();
            await page.keyboard.type('2/14/2022');
            await page.waitForChanges();
            expect(el).toHaveAttribute('invalid');
            for (const input of inputs) {
                expect(input).toHaveAttribute('invalid');
            }
            expect(await el.getProperty('selectedStartDate')).toContain('2022-02-15');
            expect(await el.getProperty('selectedEndDate')).toContain('2022-02-14');
        });
    });
    describe('with date-picker-menu enabled', () => {
        it('should show the menu', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker display-menu="true"></market-date-picker>');
            // Work around to dive into TWO shadow roots, target a container element!
            el = await page.find('market-date-picker');
            const menuContainer = await el.find('pierce/list-view');
            const menuRows = await menuContainer.findAll('pierce/market-row');
            expect(menuContainer).not.toBeNull();
            expect(menuRows.length).toBe(9);
            expect(menuRows[0].innerText).toEqual('Today');
        });
        it('should show or hide menu items based on timeframe prop', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker timeframe="past" display-menu="true"></market-date-picker>');
            el = await page.find('market-date-picker');
            const menuContainer = await el.find('pierce/list-view');
            const menuRows = await menuContainer.findAll('pierce/market-row');
            expect(menuRows.length).toBe(5);
            expect(menuRows[0].innerText).toEqual('Yesterday');
            expect(menuRows[1].innerText).toEqual('Last week');
            expect(menuRows[2].innerText).toEqual('Last month');
            expect(menuRows[3].innerText).toEqual('Last year');
            expect(menuRows[4].innerText).toEqual('Custom');
        });
        it('should hide menu items based on excludeMenuItems prop', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker exclude-menu-items="last-year,custom" display-menu="true"></market-date-picker>');
            el = await page.find('market-date-picker');
            const menuContainer = await el.find('pierce/list-view');
            const menuRows = await menuContainer.findAll('pierce/market-row');
            expect(menuRows.length).toBe(7);
            expect(menuRows[0].innerText).toEqual('Today');
            expect(menuRows[1].innerText).toEqual('Yesterday');
            expect(menuRows[2].innerText).toEqual('This week');
            expect(menuRows[3].innerText).toEqual('Last week');
            expect(menuRows[4].innerText).toEqual('This month');
            expect(menuRows[5].innerText).toEqual('Last month');
            expect(menuRows[6].innerText).toEqual('This year');
        });
        it('should hide menu items based on timeframe and excludeMenuItems prop', async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker timeframe="past" exclude-menu-items="last-year,custom" display-menu="true"></market-date-picker>');
            el = await page.find('market-date-picker');
            const menuContainer = await el.find('pierce/list-view');
            const menuRows = await menuContainer.findAll('pierce/market-row');
            expect(menuRows.length).toBe(3);
            expect(menuRows[0].innerText).toEqual('Yesterday');
            expect(menuRows[1].innerText).toEqual('Last week');
            expect(menuRows[2].innerText).toEqual('Last month');
        });
        it('should select correct date ranges when menu items are selected and fire associated events', async () => {
            // Note: this test changes value by the day--because it checks for current day values.
            // If any erroring/flaking occurs we can revisit this.
            page = await newE2EPage();
            await page.setContent('<market-date-picker display-menu="true" selection-type="range"></market-date-picker>');
            el = await page.find('market-date-picker');
            const menuContainer = await el.find('pierce/list-view');
            const menuRows = await menuContainer.findAll('pierce/market-row');
            const today = new Date();
            const menuSelected = await page.spyOnEvent('marketMenuSelectionChanged');
            const dateRangeChanged = await page.spyOnEvent('marketDateRangeChanged');
            expect(menuRows[0].innerText).toEqual('Today');
            await menuRows[0].click();
            await page.waitForChanges();
            // Using the current ISO string format causes errors due to it changing by the second.
            // Manipulating the dates to use date strings just compare day values to get this to work.
            let currentSelectedStartDate = new Date(await el.getProperty('selectedStartDate')).toDateString();
            expect(currentSelectedStartDate).toEqual(today.toDateString());
            expect(await el.getProperty('selectedEndDate')).toBeNull();
            expect(menuSelected).toHaveReceivedEventTimes(1);
            expect(dateRangeChanged).toHaveReceivedEventTimes(1);
            expect(menuRows[2].innerText).toEqual('This week');
            await menuRows[2].click();
            await page.waitForChanges();
            let startDate = startOfWeek(today).toDateString();
            let endDate = endOfWeek(today).toDateString();
            currentSelectedStartDate = new Date(await el.getProperty('selectedStartDate')).toDateString();
            let currentSelectedEndDate = new Date(await el.getProperty('selectedEndDate')).toDateString();
            expect(currentSelectedStartDate).toEqual(startDate);
            expect(currentSelectedEndDate).toEqual(endDate);
            expect(menuSelected).toHaveReceivedEventTimes(2);
            expect(dateRangeChanged).toHaveReceivedEventTimes(2);
            expect(menuRows[6].innerText).toEqual('This year');
            await menuRows[6].click();
            await page.waitForChanges();
            startDate = startOfYear(today).toDateString();
            endDate = lastDayOfYear(today).toDateString();
            currentSelectedStartDate = new Date(await el.getProperty('selectedStartDate')).toDateString();
            currentSelectedEndDate = new Date(await el.getProperty('selectedEndDate')).toDateString();
            expect(currentSelectedStartDate).toEqual(startDate);
            expect(currentSelectedEndDate).toEqual(endDate);
            expect(menuSelected).toHaveReceivedEventTimes(3);
            expect(dateRangeChanged).toHaveReceivedEventTimes(3);
        });
        it.skip('should properly set presetMenuOption and selected dates for the preset option', async () => {
            jest.useFakeTimers();
            jest.setSystemTime(new Date('2023-05-15'));
            page = await newE2EPage();
            await page.setContent('<market-date-picker selection-type="range" preset-menu-option="this-month" display-menu="true"></market-date-picker>');
            el = await page.find('market-date-picker');
            const menuContainer = await el.find('pierce/list-view');
            const menuRows = await menuContainer.findAll('pierce/market-row');
            // Check that preset menu option is selected
            expect(menuRows[4].innerText).toEqual('This month');
            expect(await menuRows[4].getProperty('selected')).toEqual(true);
            // Check that correct selected start and end dates are set
            expect(await el.getProperty('selectedStartDate')).toContain('2023-05-01');
            expect(await el.getProperty('selectedEndDate')).toContain('2023-05-31');
            jest.useRealTimers();
        });
    });
    describe('with year view', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker displayed-date="04/15/2024"></market-date-picker>');
            el = await page.find('market-date-picker');
            header = await el.find('pierce/h2');
        });
        it('swaps between month and year view when header is clicked', async () => {
            const dates = await el.findAll('pierce/market-date-picker-date');
            // Weekday headers should only show in default month view
            expect(dates[0].getAttribute('day')).toEqual('Su');
            expect(dates[1].getAttribute('day')).toEqual('Mo');
            await header.click();
            await page.waitForChanges();
            const updatedDates = await el.findAll('pierce/market-date-picker-date');
            // Year and month dates should be only shown in year view
            expect(updatedDates[0].getAttribute('day')).toEqual('2023');
            expect(updatedDates[1].getAttribute('day')).toEqual('2024');
            expect(updatedDates[3].getAttribute('day')).toEqual('Jan');
            expect(updatedDates[4].getAttribute('day')).toEqual('Feb');
        });
        it('increments years shown when chevrons are selected', async () => {
            // Swap to year view
            await header.click();
            await page.waitForChanges();
            const navigationButtons = await el.findAll('pierce/market-button');
            const dates = await el.findAll('pierce/market-date-picker-date');
            expect(dates[0].getAttribute('day')).toEqual('2023');
            expect(dates[1].getAttribute('day')).toEqual('2024');
            expect(dates[2].getAttribute('day')).toEqual('2025');
            // Decrement
            await navigationButtons[1].click();
            await page.waitForChanges();
            expect(dates[0].getAttribute('day')).toEqual('2022');
            expect(dates[1].getAttribute('day')).toEqual('2023');
            expect(dates[2].getAttribute('day')).toEqual('2024');
            // Increment
            await navigationButtons[2].click();
            await navigationButtons[2].click();
            await page.waitForChanges();
            expect(dates[0].getAttribute('day')).toEqual('2024');
            expect(dates[1].getAttribute('day')).toEqual('2025');
            expect(dates[2].getAttribute('day')).toEqual('2026');
        });
        it('allows selection of year to update displayed date and header', async () => {
            // Swap to year view
            await header.click();
            await page.waitForChanges();
            expect(header.innerHTML).toEqual('Apr 2024');
            // Passed in value
            expect(await el.getProperty('displayedDate')).toEqual('04/15/2024');
            const dates = await el.findAll('pierce/market-date-picker-date');
            await dates[0].click();
            await page.waitForChanges();
            expect(header.innerHTML).toEqual('Apr 2023');
            // ISO string value of date, set by component
            expect(await el.getProperty('displayedDate')).toContain('2023-04-01');
        });
        it('allows selection of month to update displayed date and switches back to month view', async () => {
            // Swap to year view
            await header.click();
            await page.waitForChanges();
            expect(header.innerHTML).toEqual('Apr 2024');
            // Passed in value
            expect(await el.getProperty('displayedDate')).toEqual('04/15/2024');
            const dates = await el.findAll('pierce/market-date-picker-date');
            expect(dates[3].getAttribute('day')).toEqual('Jan');
            await dates[3].click();
            await page.waitForChanges();
            expect(header.innerHTML).toEqual('Jan 2024');
            // ISO string value of date, set by component
            expect(await el.getProperty('displayedDate')).toContain('2024-01-01');
            // Swaps back to month view
            const updatedDates = await el.findAll('pierce/market-date-picker-date');
            expect(updatedDates[0].getAttribute('day')).toEqual('Su');
            expect(updatedDates[1].getAttribute('day')).toEqual('Mo');
        });
    });
    describe('with validation', () => {
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-date-picker displayed-date="Invalid Date"></market-date-picker>');
            el = await page.find('market-date-picker');
        });
        it('should set displayed date to current date if invalid date is passed or set', async () => {
            // Note: this test changes value by the day--because it checks for current day values.
            // If any erroring/flaking occurs we can revisit this.
            const today = new Date();
            const displayedDate = new Date(await el.getProperty('displayedDate'));
            expect(displayedDate.toDateString()).toEqual(today.toDateString());
            el.setProperty('displayed-date', 'Invalid Date');
            await page.waitForChanges();
            const updatedDate = new Date(await el.getProperty('displayedDate'));
            expect(updatedDate.toDateString()).toEqual(today.toDateString());
        });
    });
    describe('keyboard navigation when triggered from a market-input-text', () => {
        // TODO: UI-7837 Not able to run this locally to debug why it's failing
        test.skip('I can select a date using the keyboard', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-field>
          <market-dropdown id="market-date-picker-field-example" interaction="persistent" popover-placement="bottom-start">
          <market-input-text slot="trigger" style="width: 300px;">
            <label>Start Date</label>
          </market-input-text>
          <market-popover slot="popover">
            <market-date-picker displayed-date="02/22/2022"></market-date-picker>
          </market-popover>
          </market-dropdown>
        </market-field>`);
            el = await page.find('market-date-picker');
            const triggerInput = await page.find('market-input-text[slot="trigger"]');
            await triggerInput.focus();
            await page.waitForChanges();
            // Hit "Enter" key to open the dropdown
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            const dates = await page.findAll('pierce/market-date-picker-date');
            // Tab 5 times to get to Feb 1st.
            for (let i = 0; i < 5; i++) {
                await page.keyboard.press('Tab');
                await page.waitForChanges();
            }
            // Hit "Enter" key to confirm the date
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            // The first 9 date objects are weekdays and blank spaces for Feb 2022.
            const firstDate = dates[9];
            const secondDate = dates[10];
            expect(firstDate).toHaveAttribute('selected');
            expect(await el.getProperty('selectedStartDate')).toContain('2022-02-01');
            expect(secondDate).not.toHaveAttribute('selected');
        });
    });
});
//# sourceMappingURL=market-date-picker.e2e.js.map
