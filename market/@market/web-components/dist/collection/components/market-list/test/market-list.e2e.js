/* Write tests for:
- using rows with and without values
- lists with no passed value don't have a value attribute (since we removed the '' default)
*/
import { newE2EPage } from "@stencil/core/testing";
describe('market-list', () => {
    describe('with rows', () => {
        let page;
        let el;
        describe('dynamically updating default template values', () => {
            describe('default configuration', () => {
                beforeEach(async () => {
                    page = await newE2EPage();
                    await page.setContent(`
          <market-list name="my-list">
            <market-row>Apple</market-row>
            <market-row>Orange</market-row>
            <market-row>Pear</market-row>
          </market-list>
        `);
                    el = await page.find('market-list');
                });
                it('should render with expected attributes', async () => {
                    expect(el).not.toBeNull();
                    expect(el).not.toHaveAttribute('multiselect');
                    expect(el).not.toHaveAttribute('has-search');
                    expect(el).toEqualAttribute('value', '');
                    expect(el).toEqualAttribute('name', 'my-list');
                    expect(el).toEqualAttribute('role', 'list');
                    expect(el).toEqualAttribute('aria-labelledby', 'my-list');
                    expect(el).not.toHaveAttribute('aria-multiselect');
                    const rows = await page.findAll('market-row');
                    expect(rows.length).toEqual(3);
                });
                it('should make rows interactive when interactive is set to true', async () => {
                    const rows = await el.findAll('market-row');
                    rows.forEach((row) => {
                        expect(row).toEqualAttribute('role', 'listitem');
                    });
                    el.setAttribute('interactive', true);
                    await page.waitForChanges();
                    rows.forEach((row) => {
                        expect(row).toEqualAttribute('role', 'option');
                    });
                });
            });
            describe('when interactive', () => {
                let page;
                let el;
                let orangeRow;
                let appleRow;
                let pearRow;
                beforeEach(async () => {
                    page = await newE2EPage();
                    await page.setContent(`
            <market-list interactive>
              <market-row value="apple">Apple</market-row>
              <market-row value="orange">Orange</market-row>
              <market-row value="pear">Pear</market-row>
            </market-list>
          `);
                    el = await page.find('market-list');
                    expect(el).toEqualAttribute('role', 'listbox');
                    orangeRow = await el.find('market-row[value="orange"]');
                    appleRow = await el.find('market-row[value="apple"]');
                    pearRow = await el.find('market-row[value="pear"]');
                });
                it('should pass interactive to child rows', async () => {
                    const rows = await el.findAll('market-row');
                    rows.forEach((row) => {
                        expect(row).toEqualAttribute('role', 'option');
                    });
                });
                it('should set the default selection if a value attribute is passed', async () => {
                    const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                    el.setAttribute('value', 'orange');
                    await page.waitForChanges();
                    expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                    expect(orangeRow).toHaveAttribute('selected');
                    expect(appleRow).not.toHaveAttribute('selected');
                    expect(pearRow).not.toHaveAttribute('selected');
                });
                describe('not multiselect', () => {
                    it('should deselect all other items when a new child row is selected', async () => {
                        appleRow.setAttribute('selected', true);
                        await page.waitForChanges();
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(appleRow).toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        await orangeRow.click();
                        expect(orangeRow).toHaveAttribute('selected');
                        expect(appleRow).not.toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                    });
                    it('does not allow items to be deselected', async () => {
                        const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                        await appleRow.click();
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(appleRow).toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        // marketListSelectionsDidChange is emitted once on initial row selection
                        expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('apple');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['apple']);
                        await appleRow.click();
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(appleRow).toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        // re-clicking selected option doesn't trigger marketListSelectionsDidChange
                        expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                    });
                    it('should emit an event when the selection changes', async () => {
                        const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                        await orangeRow.click();
                        expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelection).not.toBeFalsy();
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newDeselection).toBeFalsy();
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('orange');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['orange']);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.prevSelectionValues).toEqual([]);
                    });
                    it('should have an empty value if selected rows have empty values too', async () => {
                        orangeRow.setAttribute('value', '');
                        appleRow.setAttribute('value', '');
                        pearRow.setAttribute('value', '');
                        await page.waitForChanges();
                        const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                        await orangeRow.click();
                        expect(el).toEqualAttribute('value', '');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual([]);
                        await appleRow.click();
                        expect(el).toEqualAttribute('value', '');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual([]);
                        await pearRow.click();
                        expect(el).toEqualAttribute('value', '');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual([]);
                    });
                });
                describe('when multiselect', () => {
                    beforeEach(async () => {
                        page = await newE2EPage();
                        await page.setContent(`
              <market-list interactive multiselect>
                <market-row value="apple">Apple</market-row>
                <market-row value="orange">Orange</market-row>
                <market-row value="pear">Pear</market-row>
              </market-list>
            `);
                        el = await page.find('market-list');
                        appleRow = await el.find('market-row[value="apple"]');
                        orangeRow = await el.find('market-row[value="orange"]');
                        pearRow = await el.find('market-row[value="pear"]');
                    });
                    it('adds to selections when a new child row is selected and removes when deselected', async () => {
                        const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                        await appleRow.click();
                        expect(el).toEqualAttribute('value', 'apple');
                        expect(appleRow).toHaveAttribute('selected');
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('apple');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['apple']);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.prevSelectionValues).toEqual([]);
                        await orangeRow.click();
                        expect(el).toEqualAttribute('value', 'apple,orange');
                        expect(appleRow).toHaveAttribute('selected');
                        expect(orangeRow).toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(2);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('orange');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual([
                            'apple',
                            'orange',
                        ]);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.prevSelectionValues).toEqual(['apple']);
                        await orangeRow.click();
                        expect(el).toEqualAttribute('value', 'apple');
                        expect(appleRow).toHaveAttribute('selected');
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(3);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelection).toBeFalsy();
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newDeselection).not.toBeFalsy();
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newDeselectionValue).toEqual('orange');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['apple']);
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.prevSelectionValues).toEqual(['apple', 'orange']);
                    });
                    // fix for https://github.com/squareup/market/issues/4565
                    it('properly deselects rows when value is set programmatically', async () => {
                        // select a row
                        await appleRow.click();
                        await page.waitForChanges();
                        expect(appleRow).toHaveAttribute('selected');
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        // programmatically change value that deselects the row
                        el.setProperty('value', '');
                        await page.waitForChanges();
                        expect(appleRow).not.toHaveAttribute('selected');
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                        // select a different row
                        await pearRow.click();
                        await page.waitForChanges();
                        expect(appleRow).not.toHaveAttribute('selected');
                        expect(orangeRow).not.toHaveAttribute('selected');
                        expect(pearRow).toHaveAttribute('selected');
                    });
                    it('propagates multiple values', async () => {
                        el.setAttribute('value', 'apple,orange');
                        await page.waitForChanges();
                        expect(el).toEqualAttribute('value', 'apple,orange');
                        expect(appleRow).toHaveAttribute('selected');
                        expect(orangeRow).toHaveAttribute('selected');
                        expect(pearRow).not.toHaveAttribute('selected');
                    });
                    it('should have an empty value if selected rows have empty values too', async () => {
                        orangeRow.setAttribute('value', '');
                        appleRow.setAttribute('value', '');
                        pearRow.setAttribute('value', '');
                        await page.waitForChanges();
                        const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                        await orangeRow.click();
                        expect(el).toEqualAttribute('value', '');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual([]);
                        await appleRow.click();
                        expect(el).toEqualAttribute('value', '');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual([]);
                        await pearRow.click();
                        expect(el).toEqualAttribute('value', '');
                        expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual([]);
                    });
                });
            });
        });
        describe('initial render', () => {
            it('with selection set on row, sets list value to value of selected row', async () => {
                const page = await newE2EPage();
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await page.setContent(`
          <market-list>
            <market-row value="apple">Apple</market-row>
            <market-row value="orange" selected>Orange</market-row>
            <market-row value="pear">Pear</market-row>
          </market-list>
        `);
                const el = await page.find('market-list');
                const orangeRow = await el.find('market-row[value="orange"]');
                const appleRow = await el.find('market-row[value="apple"]');
                const pearRow = await el.find('market-row[value="pear"]');
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeRow).toHaveAttribute('selected');
                expect(appleRow).not.toHaveAttribute('selected');
                expect(pearRow).not.toHaveAttribute('selected');
            });
            // broken
            it.skip('with multiple selection set on rows, sets list value to value of selected rows', async () => {
                const page = await newE2EPage();
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await page.setContent(`
          <market-list>
            <market-row value="apple">Apple</market-row>
            <market-row value="orange" selected>Orange</market-row>
            <market-row value="pear" selected>Pear</market-row>
          </market-list>
        `);
                const el = await page.find('market-list');
                const orangeRow = await el.find('market-row[value="orange"]');
                const appleRow = await el.find('market-row[value="apple"]');
                const pearRow = await el.find('market-row[value="pear"]');
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(appleRow).not.toHaveAttribute('selected');
                expect(orangeRow).toHaveAttribute('selected');
                expect(pearRow).toHaveAttribute('selected');
                expect(el).toEqualAttribute('value', 'apple,pear');
            });
            it('sets interactive on list if interactive rows are slotted', async () => {
                const page = await newE2EPage();
                await page.setContent(`
          <market-list>
            <market-row interactive>Apple</market-row>
            <market-row interactive>Orange</market-row>
            <market-row interactive>Pear</market-row>
          </market-list>
        `);
                const el = await page.find('market-list');
                const rows = await el.findAll('market-row');
                expect(el).toEqualAttribute('role', 'listbox');
                rows.forEach((row) => {
                    expect(row).toEqualAttribute('role', 'option');
                });
            });
            it('sets interactive on rows if list is interactive', async () => {
                const page = await newE2EPage();
                await page.setContent(`
          <market-list interactive>
            <market-row>Apple</market-row>
            <market-row>Orange</market-row>
            <market-row>Pear</market-row>
          </market-list>
        `);
                const el = await page.find('market-list');
                const rows = await el.findAll('market-row');
                expect(el).toEqualAttribute('role', 'listbox');
                rows.forEach((row) => {
                    expect(row).toEqualAttribute('role', 'option');
                });
            });
            it('displays static list and rows if nothing is interactive', async () => {
                const page = await newE2EPage();
                await page.setContent(`
          <market-list>
            <market-row>Apple</market-row>
            <market-row>Orange</market-row>
            <market-row>Pear</market-row>
          </market-list>
        `);
                const el = await page.find('market-list');
                const rows = await el.findAll('market-row');
                expect(el).toEqualAttribute('role', 'list');
                rows.forEach((row) => {
                    expect(row).toEqualAttribute('role', 'listitem');
                });
            });
            it('passes transient down to rows, and does not select on click', async () => {
                const page = await newE2EPage();
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await page.setContent(`
          <market-list interactive transient>
            <market-row value="apple">Apple</market-row>
            <market-row value="orange">Orange</market-row>
            <market-row value="pear">Pear</market-row>
          </market-list>
        `);
                const firstRow = await page.find('market-row');
                expect(await firstRow.getProperty('transient')).toEqual(true);
                await firstRow.click();
                page.waitForChanges();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(firstRow).not.toHaveAttribute('selected');
            });
            it('handles incremental adding of rows correctly', async () => {
                const page = await newE2EPage({ failOnConsoleError: true });
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await page.setContent(`
          <market-list value="strawberry">
          </market-list>

          <div class="first-group">
            <market-row value="apple">Apple</market-row>
            <market-row value="orange">Orange</market-row>
            <market-row value="pear">Pear</market-row>
          </div>

          <div class="second-group">
            <market-row value="strawberry">Strawberry</market-row>
            <market-row value="blueberry">Blueberry</market-row>
          </div>
        `);
                const el = await page.find('market-list');
                expect(el).not.toBeNull();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                const firstGroup = await page.find('.first-group');
                el.innerHTML = firstGroup.innerHTML;
                await page.waitForChanges();
                const orangeRow = await el.find('market-row[value="orange"]');
                const appleRow = await el.find('market-row[value="apple"]');
                const pearRow = await el.find('market-row[value="pear"]');
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeRow).not.toHaveAttribute('selected');
                expect(appleRow).not.toHaveAttribute('selected');
                expect(pearRow).not.toHaveAttribute('selected');
                const secondGroup = await page.find('.second-group');
                el.innerHTML += secondGroup.innerHTML;
                await page.waitForChanges();
                const strawberryRow = await el.find('market-row[value="strawberry"]');
                const blueberryRow = await el.find('market-row[value="blueberry"]');
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeRow).not.toHaveAttribute('selected');
                expect(appleRow).not.toHaveAttribute('selected');
                expect(pearRow).not.toHaveAttribute('selected');
                expect(strawberryRow).toHaveAttribute('selected');
                expect(blueberryRow).not.toHaveAttribute('selected');
            });
        });
    });
    describe('interactive with action cards containing rows', () => {
        let page;
        let el;
        let orangeCard;
        let appleCard;
        let pearCard;
        let orangeRow;
        let appleRow;
        let pearRow;
        describe('dynamically updating default template values', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-list name="my-list">
            <market-action-card value="apple">
              <market-row>Apple</market-row>
            </market-action-card>
            <market-action-card value="orange">
              <market-row>Orange</market-row>
            </market-action-card>
            <market-action-card value="pear">
              <market-row>Pear</market-row>
            </market-action-card>
          </market-list>
        `);
                el = await page.find('market-list');
                orangeCard = await el.find('market-action-card[value="orange"]');
                appleCard = await el.find('market-action-card[value="apple"]');
                pearCard = await el.find('market-action-card[value="pear"]');
                orangeRow = await orangeCard.find('market-row');
                appleRow = await appleCard.find('market-row');
                pearRow = await pearCard.find('market-row');
            });
            it('should render with correct default attributes', () => {
                expect(el).not.toBeNull();
                expect(el).not.toHaveAttribute('multiselect');
                expect(el).toEqualAttribute('value', '');
                expect(el).toEqualAttribute('name', 'my-list');
                expect(el).toEqualAttribute('role', 'listbox');
                expect(el).toEqualAttribute('aria-labelledby', 'my-list');
                expect(el).not.toHaveAttribute('aria-multiselect');
            });
            it('should set the default selection if a value attribute is passed, and clear if blanked out', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                el.setAttribute('value', 'orange');
                await page.waitForChanges();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeCard).toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
                el.setAttribute('value', '');
                await page.waitForChanges();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeCard).not.toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
            });
            it('should deselect all other items when a new child row is selected', async () => {
                appleCard.setAttribute('selected', true);
                await page.waitForChanges();
                expect(orangeCard).not.toHaveAttribute('selected');
                expect(appleCard).toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
                await orangeCard.click();
                expect(orangeCard).toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
            });
            it('does not allow items to be deselected', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await appleCard.click();
                expect(orangeCard).not.toHaveAttribute('selected');
                expect(appleCard).toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
                // marketListSelectionsDidChange is emitted once on initial row selection
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('apple');
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['apple']);
                await appleCard.click();
                expect(orangeCard).not.toHaveAttribute('selected');
                expect(appleCard).toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
                // re-clicking selected option doesn't trigger marketListSelectionsDidChange
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
            });
            it('should emit an event when the selection changes', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await orangeCard.click();
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelection).not.toBeFalsy();
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newDeselection).toBeFalsy();
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('orange');
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['orange']);
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.prevSelectionValues).toEqual([]);
            });
            it('should propagate prop changes to children for transient and multiselect', async () => {
                expect(el).not.toHaveAttribute('transient');
                expect(el).not.toHaveAttribute('multiselect');
                expect(orangeCard).not.toHaveAttribute('transient');
                expect(appleCard).not.toHaveAttribute('transient');
                expect(pearCard).not.toHaveAttribute('transient');
                // Multiselect passes down 'togglable' to associated rows
                expect(await orangeRow.getProperty('togglable')).toEqual(false);
                expect(await appleRow.getProperty('togglable')).toEqual(false);
                expect(await pearRow.getProperty('togglable')).toEqual(false);
                el.setAttribute('multiselect', true);
                el.setAttribute('transient', true);
                await page.waitForChanges();
                expect(el).toHaveAttribute('transient');
                expect(el).toHaveAttribute('multiselect');
                expect(await orangeCard.getProperty('transient')).toEqual(true);
                expect(await appleCard.getProperty('transient')).toEqual(true);
                expect(await pearCard.getProperty('transient')).toEqual(true);
                expect(await orangeRow.getProperty('togglable')).toEqual(true);
                expect(await appleRow.getProperty('togglable')).toEqual(true);
                expect(await pearRow.getProperty('togglable')).toEqual(true);
            });
        });
        describe('initial render', () => {
            it('with selection set on row within card, sets list value to value of selected row', async () => {
                const page = await newE2EPage();
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await page.setContent(`
          <market-list>
            <market-action-card value="apple">
              <market-row>Apple</market-row>
            </market-action-card>
            <market-action-card value="orange" selected>
              <market-row>Orange</market-row>
            </market-action-card>
            <market-action-card value="pear">
              <market-row>Pear</market-row>
            </market-action-card>
          </market-list>
        `);
                const el = await page.find('market-list');
                const orangeCard = await el.find('market-action-card[value="orange"]');
                const appleCard = await el.find('market-action-card[value="apple"]');
                const pearCard = await el.find('market-action-card[value="pear"]');
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeCard).toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
            });
            it('sets interactive on list if action cards containing rows are slotted', async () => {
                const page = await newE2EPage();
                await page.setContent(`
          <market-list>
            <market-action-card value="apple">
              <market-row>Apple</market-row>
            </market-action-card>
            <market-action-card value="orange" selected>
              <market-row>Orange</market-row>
            </market-action-card>
            <market-action-card value="pear">
              <market-row>Pear</market-row>
            </market-action-card>
          </market-list>
        `);
                const el = await page.find('market-list');
                expect(el).toEqualAttribute('role', 'listbox');
            });
            it('passes transient down to cards and rows, and does not select on click', async () => {
                const page = await newE2EPage();
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await page.setContent(`
          <market-list transient>
            <market-action-card value="apple">
              <market-row>Apple</market-row>
            </market-action-card>
            <market-action-card value="orange">
              <market-row>Orange</market-row>
            </market-action-card>
            <market-action-card value="pear">
              <market-row>Pear</market-row>
            </market-action-card>
          </market-list>
        `);
                const firstCard = await page.find('market-action-card');
                const firstRow = await firstCard.find('market-row');
                expect(await firstCard.getProperty('transient')).toEqual(true);
                expect(await firstRow.getProperty('transient')).toEqual(true);
                await firstRow.click();
                page.waitForChanges();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(firstCard).not.toHaveAttribute('selected');
                expect(firstRow).not.toHaveAttribute('selected');
            });
        });
    });
    describe('interactive with action cards that do not contain rows', () => {
        describe('dynamically updating default template values', () => {
            let page;
            let el;
            let orangeCard;
            let appleCard;
            let pearCard;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-list name="my-list" interactive>
            <market-action-card value="apple">Apple</market-action-card>
            <market-action-card value="orange">Orange</market-action-card>
            <market-action-card value="pear">Pear</market-action-card>
          </market-list>
        `);
                el = await page.find('market-list');
                orangeCard = await el.find('market-action-card[value="orange"]');
                appleCard = await el.find('market-action-card[value="apple"]');
                pearCard = await el.find('market-action-card[value="pear"]');
            });
            it('should render with correct default attributes', () => {
                expect(el).not.toBeNull();
                expect(el).not.toHaveAttribute('multiselect');
                expect(el).toEqualAttribute('value', '');
                expect(el).toEqualAttribute('name', 'my-list');
                expect(el).toEqualAttribute('role', 'listbox');
                expect(el).toEqualAttribute('aria-labelledby', 'my-list');
                expect(el).not.toHaveAttribute('aria-multiselect');
            });
            it('should set the default selection if a value attribute is passed', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                el.setAttribute('value', 'orange');
                await page.waitForChanges();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeCard).toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
            });
            it('should deselect all other items when a new child card is selected', async () => {
                appleCard.setAttribute('selected', true);
                await page.waitForChanges();
                expect(orangeCard).not.toHaveAttribute('selected');
                expect(appleCard).toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
                await orangeCard.click();
                expect(orangeCard).toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
            });
            it('does allow items to be deselected', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await appleCard.click();
                expect(orangeCard).not.toHaveAttribute('selected');
                expect(appleCard).toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
                // marketListSelectionsDidChange is emitted once on initial Card selection
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('apple');
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['apple']);
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.prevSelectionValues).toEqual([]);
                await appleCard.click();
                expect(orangeCard).not.toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
                // re-clicking selected option does trigger marketListSelectionsDidChange
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(2);
            });
            it('should emit an event when the selection changes', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await orangeCard.click();
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelection).not.toBeFalsy();
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newDeselection).toBeFalsy();
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.newSelectionValue).toEqual('orange');
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.currentSelectionValues).toEqual(['orange']);
                expect(marketListSelectionsDidChangeSpy.lastEvent.detail.prevSelectionValues).toEqual([]);
            });
        });
        describe('initial render', () => {
            it('with selection set on card, sets list value to value of selected card', async () => {
                const page = await newE2EPage();
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                await page.setContent(`
            <market-list>
              <market-action-card value="apple">Apple</market-action-card>
              <market-action-card value="orange" selected>Orange</market-action-card>
              <market-action-card value="pear">Pear</market-action-card>
            </market-list>
          `);
                const el = await page.find('market-list');
                const orangeCard = await el.find('market-action-card[value="orange"]');
                const appleCard = await el.find('market-action-card[value="apple"]');
                const pearCard = await el.find('market-action-card[value="pear"]');
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(orangeCard).toHaveAttribute('selected');
                expect(appleCard).not.toHaveAttribute('selected');
                expect(pearCard).not.toHaveAttribute('selected');
            });
        });
        it('sets interactive on list if action cards are slotted', async () => {
            const page = await newE2EPage();
            await page.setContent(`
          <market-list>
            <market-action-card>Apple</market-action-card>
            <market-action-card>Orange</market-action-card>
            <market-action-card>Pear</market-action-card>
          </market-list>
        `);
            const el = await page.find('market-list');
            expect(el).toEqualAttribute('role', 'listbox');
        });
        it('passes transient down to cards, and does not select on click', async () => {
            const page = await newE2EPage();
            const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
            await page.setContent(`
          <market-list transient>
            <market-action-card>Apple</market-action-card>
            <market-action-card>Orange</market-action-card>
            <market-action-card>Pear</market-action-card>
          </market-list>
        `);
            const firstCard = await page.find('market-action-card');
            expect(await firstCard.getProperty('transient')).toEqual(true);
            await firstCard.click();
            page.waitForChanges();
            expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
            expect(firstCard).not.toHaveAttribute('selected');
        });
    });
    describe('interactive list accessibility', () => {
        it('sets role on list and rows with different control types', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-list interactive>
          <market-row value="all">
              <label slot="label">Apple</label>
              <market-checkbox slot="control"></market-checkbox>
          </market-row>
          <market-row>Orange</market-row>
          <market-row>Blueberry</market-row>
        </market-list>
      `);
            const el = await page.find('market-list');
            const rows = await page.findAll('market-row');
            expect(el).toEqualAttribute('role', 'list');
            rows.forEach((row) => {
                expect(row).toEqualAttribute('role', 'listitem');
            });
        });
        describe('with rows', () => {
            let page;
            let container;
            let list;
            let rows;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <div class="container">
            <market-list interactive>
              <market-row>Apple</market-row>
              <market-row href="https://www.squareup.com">Orange</market-row>
              <market-row disabled>Mango</market-row>
              <market-row>Pear</market-row>
            </market-list>
            <market-action-card>Focusable element</div>
          </div>
        `);
                container = await page.find('.container');
                list = await page.find('market-list');
                rows = await page.findAll('market-row');
            });
            it('sets roles on list and rows', () => {
                expect(list).toEqualAttribute('role', 'list');
                rows.forEach((row) => {
                    expect(row).toEqualAttribute('role', 'listitem');
                });
            });
            it('tabbing moves focus through rows, then subsequent elements', async () => {
                await container.focus();
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[0]);
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[1]);
                // skips disabled row
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[3]);
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                const focusableElement = await page.find('market-action-card');
                expect(await page.find(':focus')).toEqual(focusableElement);
            });
            it('navigates the rows with up and down arrows', async () => {
                await container.focus();
                // focus on list --> focus moves to first row
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[0]);
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[1]);
                // skips disabled row
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[3]);
                // already at the end of the list, so focus should stay on the last row
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[3]);
                // skips disabled row
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[1]);
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[0]);
                // already at the top of the list, so focus should stay on the first row
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[0]);
            });
            it('allows selecting a specific row with focusRow method', async () => {
                await list.callMethod('focusRowAtIndex', 1);
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(rows[1]);
            });
        });
        describe('with rows using slotted controls', () => {
            let page;
            let controls;
            let container;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <div class="container">
            <market-list interactive>
              <market-row>
                <label slot="label">Apple</label>
                <market-checkbox slot="control"></market-checkbox>
              </market-row>
              <market-row>
                <label slot="label">Orange</label>
                <market-checkbox slot="control"></market-checkbox>
              </market-row>
              <market-row>
                <label slot="label">Pear</label>
                <market-checkbox slot="control"></market-checkbox>
              </market-row>
            </market-list>
          </div>
        `);
                controls = await page.findAll('market-checkbox');
                container = await page.find('.container');
            });
            it('sets roles on list and rows', async () => {
                const list = await page.find('market-list');
                const rows = await page.findAll('market-row');
                expect(list).toEqualAttribute('role', 'listbox');
                rows.forEach((row) => {
                    expect(row).toEqualAttribute('role', 'option');
                });
            });
            it('tabbing moves focus through slotted controls', async () => {
                await container.focus();
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(controls[0]); // focus on 1st row control
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(controls[1]); // focus on 2nd row control
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(controls[2]); // focus on 3rd row control
            });
            it('up and down arrows do nothing if focus is on slotted control', async () => {
                await container.focus();
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(controls[0]); // focus on 1st row control
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(controls[0]);
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(controls[0]);
            });
        });
        describe('with action cards', () => {
            let page;
            let cards;
            let container;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <div class="container">
            <market-list interactive>
              <market-action-card>Apple</market-action-card>
              <market-action-card>Orange</market-action-card>
              <market-action-card disabled>Mango</market-action-card>
              <market-action-card>Pear</market-action-card>
            </market-list>
            <market-row interactive>Focusable element</market-row>
          </div>
        `);
                cards = await page.findAll('market-action-card');
                container = await page.find('.container');
            });
            it('sets roles on list and cards', async () => {
                const list = await page.find('market-list');
                expect(list).toEqualAttribute('role', 'listbox');
                cards.forEach((card) => {
                    expect(card).toEqualAttribute('role', 'option');
                });
            });
            it('tabbing moves focus through cards, then subsequent elements', async () => {
                await container.focus();
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[0]);
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[1]);
                // skips disabled card
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[3]);
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                const focusableElement = await page.find('market-row');
                expect(await page.find(':focus')).toEqual(focusableElement);
            });
            it('navigates the cards with up and down arrows', async () => {
                await container.focus();
                // focus on list --> focus moves to first card
                await page.keyboard.press('Tab');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[0]);
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[1]);
                // skips disabled card
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[3]);
                // already at the end of the list, so focus should stay on the last card
                await page.keyboard.press('ArrowDown');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[3]);
                // skips disabled card
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[1]);
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[0]);
                // already at the top of the list, so focus should stay on the first card
                await page.keyboard.press('ArrowUp');
                await page.waitForChanges();
                expect(await page.find(':focus')).toEqual(cards[0]);
            });
        });
    });
    describe('interactive multiselect lists using a control row', () => {
        describe('using slotted checkboxes', () => {
            let page;
            let el;
            let controlRow;
            let slottedCheckbox;
            let appleRow;
            let orangeRow;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-list interactive multiselect>
            <market-row value="all" slot="control-row">
              <label slot="label">Select all</label>
              <market-checkbox slot="control"></market-checkbox>
            </market-row>
            <market-row value="apple">
              <label slot="label">Apple</label>
              <div slot="subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
              <market-checkbox slot="control"></market-checkbox>
            </market-row>
            <market-row value="orange">
              <label slot="label">Orange</label>
              <div slot="subtext">Nunc viverra libero vitae rutrum scelerisque</div>
              <market-checkbox slot="control"></market-checkbox>
            </market-row>
          </market-list>
        `);
                el = await page.find('market-list');
                controlRow = await el.find('market-row[slot="control-row"]');
                slottedCheckbox = await controlRow.find('market-checkbox[slot="control"]');
                appleRow = await el.find('market-row[value="apple"]');
                orangeRow = await el.find('market-row[value="orange"]');
            });
            it('sets roles on list and rows', async () => {
                const list = await page.find('market-list');
                const rows = await page.findAll('market-row');
                expect(list).toEqualAttribute('role', 'listbox');
                rows.forEach((row) => {
                    expect(row).toEqualAttribute('role', 'option');
                });
            });
            it('displays number of items on the control row', async () => {
                const countEl = await el.find('pierce/.count');
                expect(countEl.textContent).toStrictEqual('2');
            });
            it('displays the number of only selectable items on the control row', async () => {
                orangeRow.setProperty('disabled', true);
                await page.waitForChanges();
                const countEl = await el.find('pierce/.count');
                expect(countEl.textContent).toStrictEqual('1');
            });
            it('hides the count when `hideSelectableCount` is set to true', async () => {
                el.setProperty('hideSelectableCount', true);
                await page.waitForChanges();
                const countEl = await controlRow.find('pierce/.count');
                expect(countEl).toBeNull();
            });
            it('control row checkbox correctly reflects list selection state on load and on row interaction', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                el.setAttribute('value', 'apple,orange'); // setting value attr --> all options selected
                await page.waitForChanges();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(controlRow).toHaveAttribute('selected');
                expect(slottedCheckbox).toHaveAttribute('checked');
                expect(slottedCheckbox).not.toHaveAttribute('indeterminate');
                expect(appleRow).toHaveAttribute('selected');
                expect(orangeRow).toHaveAttribute('selected');
                await appleRow.click(); // deselect "apple" --> some options selected
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(controlRow).toHaveAttribute('selected');
                expect(slottedCheckbox).toHaveAttribute('checked');
                expect(slottedCheckbox).toHaveAttribute('indeterminate');
                expect(appleRow).not.toHaveAttribute('selected');
                expect(orangeRow).toHaveAttribute('selected');
                await orangeRow.click(); // deselect "orange" --> no options selected
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(2);
                expect(controlRow).not.toHaveAttribute('selected');
                expect(slottedCheckbox).not.toHaveAttribute('checked');
                expect(slottedCheckbox).not.toHaveAttribute('indeterminate');
                expect(appleRow).not.toHaveAttribute('selected');
                expect(orangeRow).not.toHaveAttribute('selected');
            });
            describe('using the control row', () => {
                it('when no list items are selected, checkbox should be unchecked and control row should select all items', async () => {
                    expect(el).toEqualAttribute('value', '');
                    expect(controlRow).not.toHaveAttribute('selected');
                    expect(slottedCheckbox).not.toHaveAttribute('checked');
                    expect(slottedCheckbox).not.toHaveAttribute('indeterminate');
                    await controlRow.click();
                    expect(el).toEqualAttribute('value', 'apple,orange');
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedCheckbox).toHaveAttribute('checked');
                    expect(slottedCheckbox).not.toHaveAttribute('indeterminate');
                });
                it('when all list items are selected, checkbox should be checked and control row should deselect all items', async () => {
                    el.setAttribute('value', 'apple,orange');
                    await page.waitForChanges();
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedCheckbox).toHaveAttribute('checked');
                    expect(slottedCheckbox).not.toHaveAttribute('indeterminate');
                    await controlRow.click();
                    expect(el).toEqualAttribute('value', '');
                    expect(controlRow).not.toHaveAttribute('selected');
                    expect(slottedCheckbox).not.toHaveAttribute('checked');
                    expect(slottedCheckbox).not.toHaveAttribute('indeterminate');
                });
                it('when some list items are selected, checkbox should be indeterminate and control row should deselect all items', async () => {
                    el.setAttribute('value', 'apple');
                    await page.waitForChanges();
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedCheckbox).toHaveAttribute('checked');
                    expect(slottedCheckbox).toHaveAttribute('indeterminate');
                    await controlRow.click();
                    expect(el).toEqualAttribute('value', '');
                    expect(controlRow).not.toHaveAttribute('selected');
                    expect(slottedCheckbox).not.toHaveAttribute('checked');
                    expect(slottedCheckbox).not.toHaveAttribute('indeterminate');
                });
                it('only selects non-disabled items when clicked; checkbox should be indeterminate', async () => {
                    orangeRow.setProperty('disabled', true);
                    await page.waitForChanges();
                    await controlRow.click();
                    await page.waitForChanges();
                    expect(el).toEqualAttribute('value', 'apple');
                    expect(appleRow).toHaveAttribute('selected');
                    expect(orangeRow).not.toHaveAttribute('selected');
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedCheckbox).toHaveAttribute('checked');
                    expect(slottedCheckbox).toHaveAttribute('indeterminate');
                });
                it('does not deselect items that are both disabled and selected', async () => {
                    orangeRow.setProperty('disabled', true);
                    el.setAttribute('value', 'apple,orange');
                    await page.waitForChanges();
                    await controlRow.click();
                    await page.waitForChanges();
                    expect(el).toEqualAttribute('value', 'orange');
                    expect(appleRow).not.toHaveAttribute('selected');
                    expect(orangeRow).toHaveAttribute('selected');
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedCheckbox).toHaveAttribute('checked');
                    expect(slottedCheckbox).toHaveAttribute('indeterminate');
                });
            });
            /* skipping these tests until we find a way to test nodes emitted as event details */
            describe.skip('marketListSelectionsDidChange event details', () => {
                // when the event detail includes a market element node, this is what the test expects locally ¯\_(ツ)_/¯
                const returnMockRow = (attrs) => {
                    const mockObj = {};
                    const array = Array.from({ length: attrs }).fill(mockObj);
                    return { 's-p': array };
                };
                it('when selecting and deselecting all using control row', async () => {
                    const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                    await controlRow.click(); // select all
                    await page.waitForChanges();
                    expect(marketListSelectionsDidChangeSpy).toHaveFirstReceivedEventDetail({
                        newSelection: returnMockRow(2),
                        newSelectionValue: controlRow.getAttribute('value'),
                        newDeselection: null,
                        newDeselectionValue: null,
                        currentSelections: [returnMockRow(0), returnMockRow(0)],
                        currentSelectionValues: ['apple', 'orange'],
                        prevSelectionValues: [],
                    });
                    await controlRow.click(); // select none
                    await page.waitForChanges();
                    expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventDetail({
                        newSelection: null,
                        newSelectionValue: null,
                        newDeselection: returnMockRow(1),
                        newDeselectionValue: controlRow.getAttribute('value'),
                        currentSelections: [],
                        currentSelectionValues: [],
                        prevSelectionValues: ['apple', 'orange'],
                    });
                });
                it('when selecting and deselecting option rows', async () => {
                    const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                    await appleRow.click();
                    await page.waitForChanges();
                    expect(marketListSelectionsDidChangeSpy).toHaveFirstReceivedEventDetail({
                        newSelection: returnMockRow(2),
                        newSelectionValue: 'apple',
                        newDeselection: null,
                        newDeselectionValue: null,
                        currentSelections: [returnMockRow(2)],
                        currentSelectionValues: ['apple'],
                        prevSelectionValues: [],
                    });
                    await orangeRow.click();
                    await page.waitForChanges();
                    expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventDetail({
                        newSelection: returnMockRow(2),
                        newSelectionValue: 'orange',
                        newDeselection: null,
                        newDeselectionValue: null,
                        currentSelections: [returnMockRow(1), returnMockRow(2)],
                        currentSelectionValues: ['apple', 'orange'],
                        prevSelectionValues: ['apple'],
                    });
                    await appleRow.click();
                    await page.waitForChanges();
                    expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventDetail({
                        newSelection: null,
                        newSelectionValue: null,
                        newDeselection: returnMockRow(3),
                        newDeselectionValue: 'apple',
                        currentSelections: [returnMockRow(1)],
                        currentSelectionValues: ['orange'],
                        prevSelectionValues: ['apple', 'orange'],
                    });
                });
            });
        });
        describe('using slotted toggles', () => {
            let page;
            let el;
            let controlRow;
            let slottedToggle;
            let appleRow;
            let orangeRow;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
          <market-list interactive multiselect>
            <market-row value="all" slot="control-row">
              <label slot="label">Select all</label>
              <market-toggle slot="control"></market-toggle>
            </market-row>
            <market-row value="apple">
              <label slot="label">Apple</label>
              <div slot="subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
              <market-toggle slot="control"></market-toggle>
            </market-row>
            <market-row value="orange">
              <label slot="label">Orange</label>
              <div slot="subtext">Nunc viverra libero vitae rutrum scelerisque</div>
              <market-toggle slot="control"></market-toggle>
            </market-row>
          </market-list>
        `);
                el = await page.find('market-list');
                controlRow = await el.find('market-row[slot="control-row"]');
                slottedToggle = await controlRow.find('market-toggle[slot="control"]');
                appleRow = await el.find('market-row[value="apple"]');
                orangeRow = await el.find('market-row[value="orange"]');
            });
            it('sets roles on list and rows', async () => {
                const list = await page.find('market-list');
                const rows = await page.findAll('market-row');
                expect(list).toEqualAttribute('role', 'listbox');
                rows.forEach((row) => {
                    expect(row).toEqualAttribute('role', 'option');
                });
            });
            it('displays number of items on the control row', async () => {
                const countEl = await el.find('pierce/.count');
                expect(countEl.textContent).toStrictEqual('2');
            });
            it('displays the number of only selectable items on the control row', async () => {
                orangeRow.setProperty('disabled', true);
                await page.waitForChanges();
                const countEl = await el.find('pierce/.count');
                expect(countEl.textContent).toStrictEqual('1');
            });
            it('hides the count when `hideSelectableCount` is set to true', async () => {
                el.setProperty('hideSelectableCount', true);
                await page.waitForChanges();
                const countEl = await controlRow.find('pierce/.count');
                expect(countEl).toBeNull();
            });
            it('control row toggle correctly reflects list selection state on load and on row interaction', async () => {
                const marketListSelectionsDidChangeSpy = await page.spyOnEvent('marketListSelectionsDidChange');
                el.setAttribute('value', 'apple,orange'); // setting value attr --> all options selected
                await page.waitForChanges();
                expect(marketListSelectionsDidChangeSpy).not.toHaveReceivedEvent();
                expect(controlRow).toHaveAttribute('selected');
                expect(slottedToggle).toHaveAttribute('checked');
                expect(appleRow).toHaveAttribute('selected');
                expect(orangeRow).toHaveAttribute('selected');
                await appleRow.click(); // deselect "apple" --> some options selected
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(1);
                expect(controlRow).not.toHaveAttribute('selected');
                expect(slottedToggle).not.toHaveAttribute('checked');
                expect(appleRow).not.toHaveAttribute('selected');
                expect(orangeRow).toHaveAttribute('selected');
                await orangeRow.click(); // deselect "orange" --> no options selected
                expect(marketListSelectionsDidChangeSpy).toHaveReceivedEventTimes(2);
                expect(controlRow).not.toHaveAttribute('selected');
                expect(slottedToggle).not.toHaveAttribute('checked');
                expect(appleRow).not.toHaveAttribute('selected');
                expect(orangeRow).not.toHaveAttribute('selected');
            });
            describe('using the control row', () => {
                it('when no list items are selected, toggle should be unchecked and control row should select all items', async () => {
                    expect(el).toEqualAttribute('value', '');
                    expect(controlRow).not.toHaveAttribute('selected');
                    expect(slottedToggle).not.toHaveAttribute('checked');
                    await controlRow.click();
                    expect(el).toEqualAttribute('value', 'apple,orange');
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedToggle).toHaveAttribute('checked');
                });
                it('when all list items are selected, toggle should be checked and control row should deselect all items', async () => {
                    el.setAttribute('value', 'apple,orange');
                    await page.waitForChanges();
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedToggle).toHaveAttribute('checked');
                    await controlRow.click();
                    expect(el).toEqualAttribute('value', '');
                    expect(controlRow).not.toHaveAttribute('selected');
                    expect(slottedToggle).not.toHaveAttribute('checked');
                });
                it('when some list items are selected, toggle should be unchecked and control row select all items', async () => {
                    el.setAttribute('value', 'apple');
                    await page.waitForChanges();
                    expect(controlRow).not.toHaveAttribute('selected');
                    expect(slottedToggle).not.toHaveAttribute('checked');
                    await controlRow.click();
                    expect(el).toEqualAttribute('value', 'apple,orange');
                    expect(controlRow).toHaveAttribute('selected');
                    expect(slottedToggle).toHaveAttribute('checked');
                });
                it('only selects non-disabled items when clicked; toggle should not be checked', async () => {
                    orangeRow.setProperty('disabled', true);
                    await page.waitForChanges();
                    await controlRow.click();
                    await page.waitForChanges();
                    expect(el).toEqualAttribute('value', 'apple');
                    expect(appleRow).toHaveAttribute('selected');
                    expect(orangeRow).not.toHaveAttribute('selected');
                    expect(controlRow).not.toHaveAttribute('selected');
                    expect(slottedToggle).not.toHaveAttribute('checked');
                });
            });
        });
    });
});
//# sourceMappingURL=market-list.e2e.js.map
