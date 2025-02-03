import { newE2EPage } from "@stencil/core/testing";
describe('market-tab', () => {
    let page;
    let el;
    let buttonEl;
    let eventSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-tab id="tab-1" aria-controls="panel-1">
        Tab 1
      </market-tab>
    `);
        el = await page.find('market-tab');
        buttonEl = await el.find('pierce/button');
        eventSpy = await page.spyOnEvent('marketTabSelectedChanged');
    });
    it('renders', () => {
        expect(el).toHaveAttribute('hydrated');
        expect(el).not.toHaveAttribute('disabled');
        expect(el).toHaveClass('market-tab');
        expect(el).toEqualAttribute('size', 'medium');
        expect(el).toEqualAttribute('aria-selected', 'false');
        expect(el).toEqualAttribute('role', 'tab');
        expect(el).toEqualAttribute('tabindex', '0');
        expect(el.textContent.trim()).toStrictEqual('Tab 1');
        expect(buttonEl).not.toHaveAttribute('disabled');
        expect(buttonEl).toEqualAttribute('part', 'button');
        expect(buttonEl).toEqualAttribute('tabindex', '-1');
    });
    it('can be disabled', async () => {
        el.setProperty('disabled', true);
        await page.waitForChanges();
        expect(buttonEl).toHaveAttribute('disabled');
    });
    it('deselects tab when disabled', async () => {
        // setup: make sure it gets selected first
        el.setProperty('selected', true);
        await page.waitForChanges();
        expect(el).toEqualAttribute('aria-selected', 'true');
        el.setProperty('disabled', true);
        await page.waitForChanges();
        expect(buttonEl).toHaveAttribute('disabled');
        expect(el).toEqualAttribute('aria-selected', 'false');
    });
    describe('selection', () => {
        it('click', async () => {
            await el.click();
            await page.waitForChanges();
            expect(el).toEqualAttribute('aria-selected', 'true');
        });
        it('Enter keypress', async () => {
            await el.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(el).toEqualAttribute('aria-selected', 'true');
        });
        it('Space keypress', async () => {
            await el.focus();
            await page.keyboard.press(' ');
            await page.waitForChanges();
            expect(el).toEqualAttribute('aria-selected', 'true');
        });
        it('`select()` call', async () => {
            await el.callMethod('select');
            await page.waitForChanges();
            expect(el).toEqualAttribute('aria-selected', 'true');
        });
    });
    describe('deselection', () => {
        it('`deselect()` call', async () => {
            await el.callMethod('select');
            await page.waitForChanges();
            await el.callMethod('deselect');
            await page.waitForChanges();
            expect(el).toEqualAttribute('aria-selected', 'false');
        });
    });
    describe('marketTabSelectedChanged event', () => {
        it('click', async () => {
            await el.click();
            expect(eventSpy).toHaveReceivedEventTimes(1);
            expect(eventSpy).toHaveReceivedEventDetail({
                panelId: 'panel-1',
                prevValue: false,
                tabId: 'tab-1',
                value: true,
            });
        });
        it('Enter keypress', async () => {
            await el.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();
            expect(eventSpy).toHaveReceivedEventTimes(1);
            expect(eventSpy).toHaveReceivedEventDetail({
                panelId: 'panel-1',
                prevValue: false,
                tabId: 'tab-1',
                value: true,
            });
        });
        it('Space keypress', async () => {
            await el.focus();
            await page.keyboard.press(' ');
            await page.waitForChanges();
            expect(eventSpy).toHaveReceivedEventTimes(1);
            expect(eventSpy).toHaveReceivedEventDetail({
                panelId: 'panel-1',
                prevValue: false,
                tabId: 'tab-1',
                value: true,
            });
        });
        it('`select()` call', async () => {
            await el.callMethod('select');
            expect(eventSpy).toHaveReceivedEventTimes(1);
            expect(eventSpy).toHaveReceivedEventDetail({
                panelId: 'panel-1',
                prevValue: false,
                tabId: 'tab-1',
                value: true,
            });
        });
        it('`deselect()` call', async () => {
            // setup: select first
            await el.click();
            await page.waitForChanges();
            await el.callMethod('deselect');
            await page.waitForChanges();
            expect(eventSpy).toHaveReceivedEventDetail({
                panelId: 'panel-1',
                prevValue: true,
                tabId: 'tab-1',
                value: false,
            });
        });
        describe('does not fire when disabled', () => {
            beforeEach(async () => {
                el.setProperty('disabled', true);
                await page.waitForChanges();
            });
            it('click', async () => {
                eventSpy = await page.spyOnEvent('marketTabSelectedChanged');
                await el.click();
                expect(eventSpy).toHaveReceivedEventTimes(0);
            });
            it('`select()` call', async () => {
                eventSpy = await page.spyOnEvent('marketTabSelectedChanged');
                await el.callMethod('select');
                expect(eventSpy).toHaveReceivedEventTimes(0);
            });
            it('`selected` is set to "true"', async () => {
                eventSpy = await page.spyOnEvent('marketTabSelectedChanged');
                el.setProperty('selected', 'true');
                await page.waitForChanges();
                expect(eventSpy).toHaveReceivedEventTimes(0);
            });
        });
    });
});
//# sourceMappingURL=market-tab.e2e.js.map
