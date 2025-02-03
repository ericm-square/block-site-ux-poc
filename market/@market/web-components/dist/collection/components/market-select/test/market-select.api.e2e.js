import { newE2EPage } from "@stencil/core/testing";
describe('market-select: API', () => {
    let page;
    let el;
    let popover;
    let popoverSelector;
    let marketSelectOpenedSpy;
    let marketSelectClosedSpy;
    let marketSelectValueDidChangeSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-select name="my-select">
        <label>Label</label>
        <market-list slot="list">
          <market-row value="apple">Apple</market-row>
          <market-row value="banana">Banana</market-row>
          <market-row value="orange">Orange</market-row>
          <market-row value="pear">Pear</market-row>
        </market-list>
      </market-select>
    `);
        el = await page.find('market-select');
        popoverSelector = `#${el.getAttribute('aria-controls')}`;
        marketSelectOpenedSpy = await el.spyOnEvent('marketSelectOpened');
        marketSelectClosedSpy = await el.spyOnEvent('marketSelectClosed');
        marketSelectValueDidChangeSpy = await el.spyOnEvent('marketSelectValueDidChange');
    });
    describe('public methods', () => {
        describe('when openList() is called', () => {
            beforeEach(async () => {
                await el.callMethod('openList');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
            });
            it('sets aria-expanded to true', () => {
                expect(el.getAttribute('aria-expanded')).toBe('true');
            });
            it('does not receive focus', () => {
                expect(el).not.toHaveAttribute('focused');
            });
            it('renders the popover with moved list and rows', async () => {
                expect(popover).not.toBeNull();
                expect(await popover.isVisible()).toBe(true);
                const list = await popover.find('market-list');
                expect(list).not.toBeNull();
                const rows = await list.findAll('market-row');
                expect(rows.length).toEqual(4);
            });
            it('emits the open event', () => {
                expect(marketSelectOpenedSpy).toHaveReceivedEventTimes(1);
            });
        });
        describe('when toggleList() is called', () => {
            beforeEach(async () => {
                await el.callMethod('toggleList');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
            });
            it('sets aria-expanded to true', () => {
                expect(el.getAttribute('aria-expanded')).toBe('true');
            });
            it('does not receive focus', () => {
                expect(el).not.toHaveAttribute('focused');
            });
            it('renders the popover with moved list and rows', async () => {
                expect(popover).not.toBeNull();
                expect(await popover.isVisible()).toBe(true);
                const list = await popover.find('market-list');
                expect(list).not.toBeNull();
                const rows = await list.findAll('market-row');
                expect(rows.length).toEqual(4);
            });
            it('emits the open event', () => {
                expect(marketSelectOpenedSpy).toHaveReceivedEventTimes(1);
            });
        });
        describe('when the select is open', () => {
            beforeEach(async () => {
                await el.callMethod('openList');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
            });
            describe('and closeList() is called', () => {
                beforeEach(async () => {
                    await el.callMethod('closeList');
                    await page.waitForChanges();
                    popover = await page.find(popoverSelector);
                });
                it('sets aria-expanded to false', () => {
                    expect(el.getAttribute('aria-expanded')).toBe('false');
                });
                it('does not receive focus', () => {
                    expect(el).not.toHaveAttribute('focused');
                });
                it('removes the popover from the DOM', () => {
                    expect(popover).toBeNull();
                });
                it('emits the close event', () => {
                    expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
                });
            });
            describe('and toggleList() is called', () => {
                beforeEach(async () => {
                    await el.callMethod('toggleList');
                    await page.waitForChanges();
                    popover = await page.find(popoverSelector);
                });
                it('sets aria-expanded to false', () => {
                    expect(el.getAttribute('aria-expanded')).toBe('false');
                });
                it('does not receive focus', () => {
                    expect(el).not.toHaveAttribute('focused');
                });
                it('removes the popover from the DOM', () => {
                    expect(popover).toBeNull();
                });
                it('emits the close event', () => {
                    expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
                });
            });
        });
    });
    describe('setting the value programmatically', () => {
        describe('with a valid value', () => {
            beforeEach(async () => {
                el.setProperty('value', 'orange');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
            });
            it('updates the value attribute and property', async () => {
                expect(el.getAttribute('value')).toBe('orange');
                expect(await el.getProperty('value')).toEqual('orange');
            });
            it('does not emit a change event (like a native <select>)', () => {
                expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
            });
            it('updates the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).not.toBeNull();
                expect(displayedSelection).toEqualText('Orange');
                expect(displayedSelection.getAttribute('value')).toBe('orange');
            });
            it('does not focus, open, or render the popover', () => {
                expect(el).not.toHaveAttribute('focused');
                expect(el.getAttribute('aria-expanded')).toBe('false');
                expect(popover).toBeNull();
                expect(marketSelectOpenedSpy).not.toHaveReceivedEvent();
            });
        });
        describe('with an empty value', () => {
            beforeEach(async () => {
                el.setProperty('value', '');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
            });
            it('resets the value property and attribute to empty', async () => {
                expect(el.getAttribute('value')).toBe('');
                expect(await el.getProperty('value')).toEqual('');
            });
            it('does not emit a change event (like a native <select>)', () => {
                expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
            });
            it('does not display a selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).toBeNull();
            });
            it('does not focus, open, or render the popover', () => {
                expect(el).not.toHaveAttribute('focused');
                expect(el.getAttribute('aria-expanded')).toBe('false');
                expect(popover).toBeNull();
                expect(marketSelectOpenedSpy).not.toHaveReceivedEvent();
            });
        });
        describe('with an invalid value', () => {
            beforeEach(async () => {
                el.setProperty('value', 'broccoli');
                await page.waitForChanges();
                popover = await page.find(popoverSelector);
            });
            it('resets the value property and attribute to empty', async () => {
                expect(el.getAttribute('value')).toBe('');
                expect(await el.getProperty('value')).toEqual('');
            });
            it('does not emit a change event (like a native <select>)', () => {
                expect(marketSelectValueDidChangeSpy).not.toHaveReceivedEvent();
            });
            it('does not display a selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).toBeNull();
            });
            it('does not focus, open, or render the popover', () => {
                expect(el).not.toHaveAttribute('focused');
                expect(el.getAttribute('aria-expanded')).toBe('false');
                expect(popover).toBeNull();
                expect(marketSelectOpenedSpy).not.toHaveReceivedEvent();
            });
        });
    });
});
//# sourceMappingURL=market-select.api.e2e.js.map
