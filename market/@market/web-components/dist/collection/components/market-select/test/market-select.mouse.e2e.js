import { newE2EPage } from "@stencil/core/testing";
describe('market-select: mouse interactivity', () => {
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
      <div class="some-other-element">
        matt wright rulz
      </div>
      <market-select name="my-select">
        <label>Label</label>
        <market-list slot="list" name="my-list">
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
    describe('when the trigger is clicked', () => {
        beforeEach(async () => {
            await el.click();
            popover = await page.find(popoverSelector);
        });
        it('receives focus', () => {
            expect(el).toHaveAttribute('focused');
        });
        it('sets aria-expanded to true', () => {
            expect(el.getAttribute('aria-expanded')).toBe('true');
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
        describe('when the trigger is clicked again', () => {
            beforeEach(async () => {
                await el.click();
                popover = await page.find(popoverSelector);
            });
            it('receives focus', () => {
                expect(el).toHaveAttribute('focused');
            });
            it('sets aria-expanded to false', () => {
                expect(el.getAttribute('aria-expanded')).toBe('false');
            });
            it('removes the popover', () => {
                expect(popover).toBeNull();
            });
            it('emits the close event', () => {
                expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
            });
        });
        describe('when clicking outside the element', () => {
            beforeEach(async () => {
                const otherElement = await page.find('.some-other-element');
                await otherElement.click();
                popover = await page.find(popoverSelector);
            });
            it('removes focus', () => {
                expect(el).not.toHaveAttribute('focused');
            });
            it('sets aria-expanded to false', () => {
                expect(el.getAttribute('aria-expanded')).toBe('false');
            });
            it('removes the popover', () => {
                expect(popover).toBeNull();
            });
            it('emits the close event', () => {
                expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
            });
        });
        describe('when an option is clicked', () => {
            let orangeRow;
            beforeEach(async () => {
                orangeRow = await popover.find('market-row[value="orange"]');
                await orangeRow.click();
            });
            it('updates the value property & attribute', async () => {
                expect(el.getAttribute('value')).toEqual('orange');
                expect(await el.getProperty('value')).toEqual('orange');
            });
            it('emits the change event', () => {
                expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('orange');
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeTruthy();
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeFalsy();
                expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(1);
            });
            it('updates the displayed selection', async () => {
                const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                expect(displayedSelection).not.toBeNull();
                expect(displayedSelection).toEqualText('Orange');
                expect(displayedSelection.getAttribute('value')).toEqual('orange');
            });
            it('receives focus', () => {
                expect(el).toHaveAttribute('focused');
            });
            it('sets aria-expanded to false', () => {
                expect(el.getAttribute('aria-expanded')).toBe('false');
            });
            it('removes the popover', async () => {
                popover = await page.find(popoverSelector);
                expect(popover).toBeNull();
            });
            it('emits the close event', () => {
                expect(marketSelectClosedSpy).toHaveReceivedEventTimes(1);
            });
            describe('when the same option is clicked again', () => {
                beforeEach(async () => {
                    await el.click();
                    orangeRow = await popover.find('market-row[value="orange"]');
                    await orangeRow.click();
                });
                it('retains the same value', async () => {
                    expect(el.getAttribute('value')).toBe('orange');
                    expect(await el.getProperty('value')).toEqual('orange');
                });
                it('does not emit an additional change event', () => {
                    // first event was fired, but not a second event!
                    expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(1);
                });
                it('maintains the displayed selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).not.toBeNull();
                    expect(displayedSelection).toEqualText('Orange');
                    expect(displayedSelection.getAttribute('value')).toEqual('orange');
                });
                it('receives focus', () => {
                    expect(el).toHaveAttribute('focused');
                });
                it('sets aria-expanded to false', () => {
                    expect(el.getAttribute('aria-expanded')).toBe('false');
                });
                it('removes the popover', async () => {
                    popover = await page.find(popoverSelector);
                    expect(popover).toBeNull();
                });
                it('emits an additional close event', () => {
                    // first event was already fired, this is the second event!
                    expect(marketSelectClosedSpy).toHaveReceivedEventTimes(2);
                });
            });
            describe('when a different option is clicked', () => {
                beforeEach(async () => {
                    await el.click();
                    const appleRow = await popover.find('market-row[value="apple"]');
                    await appleRow.click();
                });
                it('updates the value property & attribute', async () => {
                    expect(el.getAttribute('value')).toBe('apple');
                    expect(await el.getProperty('value')).toEqual('apple');
                });
                it('emits an additional change event', () => {
                    // first event was already fired, this is the second event!
                    expect(marketSelectValueDidChangeSpy).toHaveReceivedEventTimes(2);
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.value).toEqual('apple');
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.newSelectedOption).toBeTruthy();
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.newDeselectedOption).toBeFalsy();
                    expect(marketSelectValueDidChangeSpy.lastEvent.detail.currentSelectedOptions.length).toEqual(1);
                });
                it('updates the displayed selection', async () => {
                    const displayedSelection = await el.find('market-row[slot="displayed-selection"]');
                    expect(displayedSelection).not.toBeNull();
                    expect(displayedSelection).toEqualText('Apple');
                    expect(displayedSelection.getAttribute('value')).toEqual('apple');
                });
                it('receives focus', () => {
                    expect(el).toHaveAttribute('focused');
                });
                it('sets aria-expanded to false', () => {
                    expect(el.getAttribute('aria-expanded')).toBe('false');
                });
                it('removes the popover', async () => {
                    popover = await page.find(popoverSelector);
                    expect(popover).toBeNull();
                });
                it('emits an additional close event', () => {
                    // first event was already fired, this is the second event!
                    expect(marketSelectClosedSpy).toHaveReceivedEventTimes(2);
                });
            });
        });
    });
    describe('when disabled and clicked', () => {
        beforeEach(async () => {
            el.setProperty('disabled', true);
            await page.waitForChanges();
            await el.click();
            popover = await page.find(popoverSelector);
        });
        it('does not focus, open, or render the popover', () => {
            expect(el).not.toHaveAttribute('focused');
            expect(el.getAttribute('aria-expanded')).toBe('false');
            expect(popover).toBeNull();
            expect(marketSelectOpenedSpy).not.toHaveReceivedEvent();
        });
    });
    describe('when a tooltip trailing accessory is clicked', () => {
        let tooltip;
        beforeEach(async () => {
            const tooltipHTML = `
        <market-tooltip slot="trailing-accessory" interaction="click">
          <span slot="content">Lorem ipsum</span>
        </market-tooltip>
      `;
            el.innerHTML = `${el.innerHTML}${tooltipHTML}`;
            await page.waitForChanges();
            tooltip = await page.find('market-tooltip');
            await tooltip.click();
            await page.waitForChanges();
            popover = await page.find(popoverSelector);
        });
        it('opens the tooltip', async () => {
            const tooltipPopover = await tooltip.find('pierce/market-dropdown [slot="popover"]');
            expect(await tooltipPopover.isVisible()).toBe(true);
        });
        it('does not open the select', () => {
            expect(el.getAttribute('aria-expanded')).toBe('false');
            expect(popover).toBeNull();
            expect(marketSelectOpenedSpy).not.toHaveReceivedEvent();
        });
    });
});
//# sourceMappingURL=market-select.mouse.e2e.js.map
