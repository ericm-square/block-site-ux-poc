import { newE2EPage } from "@stencil/core/testing";
describe('market-filter', () => {
    let page;
    let element;
    let popoverEl;
    let valueDidChangeEventSpy;
    it('renders', async () => {
        page = await newE2EPage();
        await page.setContent('<market-filter></market-filter>');
        element = await page.find('market-filter');
        expect(element).toHaveAttribute('hydrated');
        expect(element).not.toHaveAttribute('disabled');
    });
    it('disables filter button', async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-filter disabled>
        <label slot="label">Color</label>
      </market-filter>
    `);
        element = await page.find('market-filter');
        const popoverEl = await element.find('pierce/market-popover');
        expect(element).toHaveAttribute('disabled');
        await element.click();
        expect(await popoverEl.isVisible()).toBe(false);
    });
    describe('label and feedback', () => {
        it('displays the label and display value', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <span slot="display-value">Tangerine</span>
          <market-list slot="list" value="living-coral">
            <market-row value="living-coral">
              <label slot="label">Living coral</label>
            </market-row>
          </market-list>
        </market-filter>
      `);
            element = await page.find('market-filter');
            const labelEl = await element.find('pierce/label');
            const displayValueEl = await element.find('pierce/[slot="display-value"]');
            expect(await labelEl.isVisible()).toBe(true);
            expect(labelEl.innerText).toStrictEqual('Color');
            expect(await displayValueEl.isVisible()).toBe(true);
            expect(displayValueEl.innerText).toStrictEqual('Tangerine');
        });
        it('displays the market-list’s value as feedback', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <market-list slot="list" value="living-coral">
            <market-row>
              <label slot="label">None</label>
            </market-row>
            <market-row value="classic-blue">
              <label slot="label">Classic blue</label>
            </market-row>
            <market-row value="living-coral">
              <label slot="label">Living coral</label>
            </market-row>
          </market-list>
        </market-filter>
      `);
            element = await page.find('market-filter');
            const feedbackEl = await element.find('pierce/[slot="feedback"]');
            expect(await feedbackEl.isVisible()).toBe(true);
            expect(feedbackEl.innerText).toStrictEqual('Living coral');
        });
        it('displays the market-date-picker’s value as feedback', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="date">
          <label slot="label">Date</label>
          <market-date-picker
            displayed-date="1/1/2023"
            selected-start-date="1/16/2023"
            selected-end-date="1/29/2023"
            selection-type="range"
          ></market-date-picker>
        </market-filter>
      `);
            element = await page.find('market-filter');
            const feedbackEl = await element.find('pierce/[slot="feedback"]');
            expect(await feedbackEl.isVisible()).toBe(true);
            expect(feedbackEl.innerText).toStrictEqual('1/16–1/29/23');
        });
        it('displays the count when multiple values are selected', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <market-list multiselect slot="list" value="living-coral,classic-blue">
            <market-row>
              <label slot="label">None</label>
            </market-row>
            <market-row value="classic-blue">
              <label slot="label">Classic blue</label>
            </market-row>
            <market-row value="living-coral">
              <label slot="label">Living coral</label>
            </market-row>
            <market-row value="ultra-violet">
              <label slot="label">Ultra violet</label>
            </market-row>
          </market-list>
        </market-filter>
      `);
            element = await page.find('market-filter');
            const feedbackEl = await element.find('pierce/[slot="feedback"]');
            expect(feedbackEl.innerText).toStrictEqual('2');
        });
    });
    describe('popover', () => {
        it('displays popover on click, and the list within the popover', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <market-list slot="list">
            <market-row>
              <label slot="label">None</label>
            </market-row>
            <market-row value="classic-blue">
              <label slot="label">Classic blue</label>
            </market-row>
            <market-row value="living-coral">
              <label slot="label">Living coral</label>
            </market-row>
          </market-list>
        </market-filter>
      `);
            element = await page.find('market-filter');
            popoverEl = await element.find('pierce/market-popover');
            const listEl = await element.find('pierce/market-list');
            const rowEls = await listEl.findAll('pierce/market-row');
            await element.click();
            expect(await popoverEl.isVisible()).toBe(true);
            expect(await listEl.isVisible()).toBe(true);
            expect(rowEls[0]).not.toHaveAttribute('value');
            expect((await rowEls[0].find('label')).innerText).toStrictEqual('None');
            expect(rowEls[1]).toEqualAttribute('value', 'classic-blue');
            expect((await rowEls[1].find('label')).innerText).toStrictEqual('Classic blue');
            expect(rowEls[2]).toEqualAttribute('value', 'living-coral');
            expect((await rowEls[2].find('label')).innerText).toStrictEqual('Living coral');
        });
        it('correctly passes aria- attributes required by screen readers', async () => {
            const POPOVER_ID = 'slotted-popover-id';
            const page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <market-list id=${POPOVER_ID}>
            <market-row>
              <label slot="label">None</label>
            </market-row>
            <market-row value="classic-blue">
              <label slot="label">Classic blue</label>
            </market-row>
            <market-row value="living-coral">
              <label slot="label">Living coral</label>
            </market-row>
          </market-list>
        </market-filter>
    `);
            const slottedTrigger = await page.find('pierce/button');
            const slottedPopover = await page.find('pierce/market-popover');
            expect(slottedTrigger).toEqualAttribute('aria-expanded', 'false');
            expect(slottedTrigger).toEqualAttribute('aria-controls', POPOVER_ID);
            expect(slottedPopover).toEqualAttribute('id', POPOVER_ID);
            await slottedTrigger.click();
            expect(slottedTrigger).toEqualAttribute('aria-expanded', 'true');
        });
        it('shows popover when clicked, then collapses when clicked again', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <market-list slot="list">
            <market-row value="classic-blue">
              <label slot="label">Classic blue</label>
            </market-row>
          </market-list>
        </market-filter>
      `);
            element = await page.find('market-filter');
            popoverEl = await element.find('pierce/market-popover');
            await element.click();
            expect(await popoverEl.isVisible()).toBe(true);
            expect(element.getAttribute('expanded')).toBe('');
            await element.click();
            expect(await popoverEl.isVisible()).toBe(false);
            expect(element.getAttribute('expanded')).toBeNull();
        });
        it('shows popover when expanded prop is provided, then collapses when removed', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <market-list slot="list">
            <market-row value="classic-blue">
              <label slot="label">Classic blue</label>
            </market-row>
          </market-list>
        </market-filter>
      `);
            element = await page.find('market-filter');
            popoverEl = await element.find('pierce/market-popover');
            expect(await popoverEl.isVisible()).toBe(false);
            element.setAttribute('expanded', '');
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(true);
            element.removeAttribute('expanded');
            await page.waitForChanges();
            expect(await popoverEl.isVisible()).toBe(false);
        });
        it('keeps popover shown while selecting on a multiselect market-list', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="color">
          <label slot="label">Color</label>
          <market-list slot="list" multiselect>
            <market-row>
              <label slot="label">None</label>
            </market-row>
            <market-row value="classic-blue">
              <label slot="label">Classic blue</label>
            </market-row>
            <market-row value="living-coral">
              <label slot="label">Living coral</label>
            </market-row>
          </market-list>
        </market-filter>
      `);
            element = await page.find('market-filter');
            popoverEl = await element.find('pierce/market-popover');
            const listEl = await element.find('pierce/market-list');
            const rowEls = await listEl.findAll('pierce/market-row');
            await element.click();
            expect(await popoverEl.isVisible()).toStrictEqual(true);
            await rowEls[0].click();
            await rowEls[1].click();
            await rowEls[2].click();
            expect(await popoverEl.isVisible()).toStrictEqual(true);
        });
        it('keeps popover shown while selecting dates on a market-date-picker', async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-filter name="date">
          <label slot="label">Date</label>
          <market-date-picker
            display-menu
            selection-type="range"
          ></market-date-picker>
        </market-filter>
      `);
            element = await page.find('market-filter');
            popoverEl = await element.find('pierce/market-popover');
            const dayEls = await element.findAll('pierce/market-date-picker-date');
            await element.click();
            expect(await popoverEl.isVisible()).toStrictEqual(true);
            await dayEls[0].click();
            await dayEls[1].click();
            await dayEls[2].click();
            expect(await popoverEl.isVisible()).toStrictEqual(true);
        });
    });
    describe('selection', () => {
        describe('list', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-filter name="color">
            <label slot="label">Color</label>
            <market-list slot="list">
              <market-row>
                <label slot="label">None</label>
              </market-row>
              <market-row value="classic-blue">
                <label slot="label">Classic blue</label>
              </market-row>
              <market-row value="living-coral">
                <label slot="label">Living coral</label>
              </market-row>
            </market-list>
          </market-filter>
        `);
                element = await page.find('market-filter');
            });
            it('selects an item, then displays the selected item’s label', async () => {
                const livingCoralRowEl = await element.find('pierce/market-row[value="living-coral"]');
                const popoverEl = await element.find('pierce/market-popover');
                await element.click();
                await livingCoralRowEl.click();
                expect(await popoverEl.isVisible()).toBe(false);
                const feedbackEl = await element.find('pierce/[slot="feedback"]');
                expect(feedbackEl.innerText).toStrictEqual('Living coral');
            });
            it('selects multiple items, then displays the selected item’s label', async () => {
                const listEl = await element.find('pierce/market-list');
                listEl.setAttribute('multiselect', '');
                await page.waitForChanges();
                const popover = await element.find('pierce/market-popover');
                const classicBlue = await element.find('pierce/market-row[value="classic-blue"]');
                const livingCoralRowEl = await element.find('pierce/market-row[value="living-coral"]');
                await element.click();
                await classicBlue.click();
                const feedbackEl = await element.find('pierce/[slot="feedback"]');
                expect(feedbackEl.innerText).toStrictEqual('Classic blue');
                expect(await popover.isVisible()).toBe(true);
                await livingCoralRowEl.click();
                expect(feedbackEl.innerText).toStrictEqual('2');
                await livingCoralRowEl.click();
                expect(feedbackEl.innerText).toStrictEqual('Classic blue');
            });
            it('clears the selected item by selecting a row without a value', async () => {
                const noneRowEl = await element.find('pierce/market-row:not([value])');
                const feedbackEl = await element.find('pierce/[slot="feedback"]');
                await element.click();
                await noneRowEl.click();
                expect(feedbackEl).toBeNull();
            });
        });
    });
    describe('events', () => {
        describe('expanded', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-filter name="color">
            <label slot="label">Color</label>
            <market-list slot="list">
              <market-row value="classic-blue">
                <label slot="label">Classic blue</label>
              </market-row>
            </market-list>
          </market-filter>
        `);
                element = await page.find('market-filter');
            });
            it('emits open and close events', async () => {
                const openEventSpy = await element.spyOnEvent('marketFilterOpened');
                const closeEventSpy = await element.spyOnEvent('marketFilterClosed');
                await element.click();
                expect(openEventSpy).toHaveReceivedEventTimes(1);
                await element.click();
                expect(closeEventSpy).toHaveReceivedEventTimes(1);
                await element.click();
                expect(openEventSpy).toHaveReceivedEventTimes(2);
                await element.click();
                expect(closeEventSpy).toHaveReceivedEventTimes(2);
            });
            it('emits expanded change events', async () => {
                const expandedChangeEventSpy = await element.spyOnEvent('marketFilterExpandedChanged');
                await element.click();
                expect(expandedChangeEventSpy).toHaveReceivedEventTimes(1);
                expect(expandedChangeEventSpy).toHaveReceivedEventDetail(true);
                await element.click();
                expect(expandedChangeEventSpy).toHaveReceivedEventTimes(2);
                expect(expandedChangeEventSpy).toHaveReceivedEventDetail(false);
                await element.click();
                expect(expandedChangeEventSpy).toHaveReceivedEventTimes(3);
                expect(expandedChangeEventSpy).toHaveReceivedEventDetail(true);
                await element.click();
                expect(expandedChangeEventSpy).toHaveReceivedEventTimes(4);
                expect(expandedChangeEventSpy).toHaveReceivedEventDetail(false);
            });
        });
        describe('list', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-filter name="color">
            <label slot="label">Color</label>
            <market-list slot="list">
              <market-row>
                <label slot="label">None</label>
              </market-row>
              <market-row value="classic-blue">
                <label slot="label">Classic blue</label>
              </market-row>
              <market-row value="living-coral">
                <label slot="label">Living coral</label>
              </market-row>
            </market-list>
          </market-filter>
        `);
                element = await page.find('market-filter');
            });
            it('emits change event', async () => {
                const noneRowEl = await element.find('pierce/market-row:not([value])');
                const classicBlueRowEl = await element.find('pierce/market-row[value="classic-blue"]');
                const livingCoralRowEl = await element.find('pierce/market-row[value="living-coral"]');
                valueDidChangeEventSpy = await element.spyOnEvent('marketFilterValueDidChange');
                await element.click();
                await classicBlueRowEl.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: null,
                    value: 'classic-blue',
                });
                await element.click();
                await livingCoralRowEl.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: 'classic-blue',
                    value: 'living-coral',
                });
                await element.click();
                await noneRowEl.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: 'living-coral',
                    value: null,
                });
            });
            it('emits change event with multiselect', async () => {
                const listEl = await element.find('pierce/market-list');
                listEl.setAttribute('multiselect', '');
                await page.waitForChanges();
                const classicBlueRowEl = await element.find('pierce/market-row[value="classic-blue"]');
                const livingCoralRowEl = await element.find('pierce/market-row[value="living-coral"]');
                valueDidChangeEventSpy = await element.spyOnEvent('marketFilterValueDidChange');
                await element.click();
                await classicBlueRowEl.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: null,
                    value: 'classic-blue',
                });
                await livingCoralRowEl.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: 'classic-blue',
                    value: ['classic-blue', 'living-coral'],
                });
                await livingCoralRowEl.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: ['classic-blue', 'living-coral'],
                    value: 'classic-blue',
                });
                await classicBlueRowEl.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: 'classic-blue',
                    value: null,
                });
            });
        });
        describe('date', () => {
            it('emits change event when custom dates are selected', async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-filter name="date">
            <label slot="label">Date</label>
            <market-date-picker
              display-menu
              displayed-date="1/1/2023"
              selected-start-date="1/16/2023"
              selected-end-date="1/29/2023"
              selection-type="range"
            ></market-date-picker>
          </market-filter>
        `);
                element = await page.find('market-filter');
                valueDidChangeEventSpy = await element.spyOnEvent('marketFilterValueDidChange');
                const day1El = await element.find('pierce/market-date-picker-date[day="1"]');
                const day30El = await element.find('pierce/market-date-picker-date[day="30"]');
                await element.click();
                await day1El.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'date',
                    prevValue: {
                        startDate: '1/16/2023',
                        endDate: '1/29/2023',
                    },
                    value: {
                        startDate: new Date('1/1/2023').toISOString(),
                        endDate: null,
                    },
                });
                await day30El.click();
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'date',
                    prevValue: {
                        startDate: new Date('1/1/2023').toISOString(),
                        endDate: null,
                    },
                    value: {
                        startDate: new Date('1/1/2023').toISOString(),
                        endDate: new Date('1/30/2023').toISOString(),
                    },
                });
            });
            it('emits change event when preset dates are selected', async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-filter name="date">
            <label slot="label">Date</label>
            <market-date-picker
              display-menu
              selection-type="range"
            ></market-date-picker>
          </market-filter>
        `);
                element = await page.find('market-filter');
                valueDidChangeEventSpy = await element.spyOnEvent('marketFilterValueDidChange');
                const thisMonthEl = await element.find('pierce/market-row[value="this-month"]');
                const thisYearEl = await element.find('pierce/market-row[value="this-year"]');
                await element.click();
                await thisMonthEl.click();
                const currentDate = new Date();
                const firstDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const lastDayOfTheMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'date',
                    prevValue: {},
                    value: {
                        startDate: firstDayOfTheMonth.toISOString(),
                        endDate: lastDayOfTheMonth.toISOString(),
                    },
                });
                await thisYearEl.click();
                const firstDayOfTheYear = new Date(currentDate.getFullYear(), 0, 1);
                const lastDayOfTheYear = new Date(currentDate.getFullYear(), 12, 0);
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'date',
                    prevValue: {
                        startDate: firstDayOfTheMonth.toISOString(),
                        endDate: lastDayOfTheMonth.toISOString(),
                    },
                    value: {
                        startDate: firstDayOfTheYear.toISOString(),
                        endDate: lastDayOfTheYear.toISOString(),
                    },
                });
            });
        });
    });
    describe('methods', () => {
        describe('__setAndEmitListValue', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-filter name="color">
            <label slot="label">Color</label>
            <market-list>
              <market-row>
                <label slot="label">None</label>
              </market-row>
              <market-row value="classic-blue">
                <label slot="label">Classic blue</label>
              </market-row>
              <market-row value="living-coral">
                <label slot="label">Living coral</label>
              </market-row>
            </market-list>
          </market-filter>
        `);
                element = await page.find('market-filter');
                valueDidChangeEventSpy = await element.spyOnEvent('marketFilterValueDidChange');
                await page.waitForChanges();
                await page.$eval('market-filter', (el) => {
                    el.__setAndEmitListValue('classic-blue');
                });
                await page.waitForChanges();
            });
            it('emitted the change event', () => {
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'color',
                    prevValue: null,
                    value: 'classic-blue',
                });
            });
            it('set the feedback value', async () => {
                const feedbackEl = await element.find('pierce/[slot="feedback"]');
                expect(feedbackEl.innerText).toStrictEqual('Classic blue');
            });
            it('set the list value', async () => {
                const listEl = await element.find('pierce/market-list');
                expect(listEl.getAttribute('value')).toStrictEqual('classic-blue');
            });
        });
        describe('__setAndEmitDatePickerValue', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-filter name="date">
            <label slot="label">Date</label>
            <market-date-picker
              displayed-date="1/1/2023"
              selected-start-date="1/16/2023"
              selected-end-date="1/29/2023"
              selection-type="range"
            ></market-date-picker>
          </market-filter>
        `);
                element = await page.find('market-filter');
                valueDidChangeEventSpy = await element.spyOnEvent('marketFilterValueDidChange');
                await page.waitForChanges();
                await page.$eval('market-filter', (el) => {
                    el.__setAndEmitDatePickerValue({
                        startDate: '1/1/2023',
                        endDate: '1/30/2023',
                    });
                });
                await page.waitForChanges();
            });
            it('emitted the change event', () => {
                expect(valueDidChangeEventSpy).toHaveReceivedEventDetail({
                    name: 'date',
                    prevValue: {
                        startDate: '1/16/2023',
                        endDate: '1/29/2023',
                    },
                    value: {
                        startDate: '1/1/2023',
                        endDate: '1/30/2023',
                    },
                });
            });
            it('set the feedback value', async () => {
                const feedbackEl = await element.find('pierce/[slot="feedback"]');
                expect(feedbackEl.innerText).toStrictEqual('1/1–1/30/23');
            });
            it('set the date-picker value', async () => {
                const datePickerEl = await element.find('pierce/market-date-picker');
                expect(datePickerEl).toEqualAttribute('selected-start-date', '1/1/2023');
                expect(datePickerEl).toEqualAttribute('selected-end-date', '1/30/2023');
            });
        });
    });
});
//# sourceMappingURL=market-filter.e2e.js.map
