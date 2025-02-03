import { newE2EPage } from "@stencil/core/testing";
describe('market-row', () => {
    it('should render with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-row>Apple</market-row>');
        const el = await page.find('market-row');
        const container = await el.shadowRoot.querySelector('.container');
        expect(el).not.toBeNull();
        expect(el).not.toHaveAttribute('selected');
        expect(el.innerText).toEqual('Apple');
        expect(container.tagName).toEqual('DIV');
    });
    it('can have a value', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-row value="apple">Apple</market-row>');
        const el = await page.find('market-row');
        expect(el).toEqualAttribute('value', 'apple');
    });
    it('should become selected when clicked if interactive', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-row value="apple" interactive>Apple</market-row>');
        const el = await page.find('market-row');
        const marketRowSelectedSpy = await page.spyOnEvent('marketRowSelected');
        const marketRowDeselectedSpy = await page.spyOnEvent('marketRowDeselected');
        expect(el).not.toHaveAttribute('selected');
        await el.click();
        expect(el).toHaveAttribute('selected');
        expect(marketRowSelectedSpy).toHaveReceivedEvent();
        expect(marketRowSelectedSpy.lastEvent.detail.value).toBe('apple');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(marketRowDeselectedSpy).toHaveReceivedEvent();
        expect(marketRowDeselectedSpy.lastEvent.detail.value).toBe('apple');
    });
    it('should *not* become selected when clicked if interactive and transient', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-row value="apple" interactive transient>Apple</market-row>');
        const el = await page.find('market-row');
        const marketRowSelectedSpy = await page.spyOnEvent('marketRowSelected');
        expect(el).not.toHaveAttribute('selected');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(marketRowSelectedSpy).not.toHaveReceivedEvent();
    });
    it('should reflect value if changed after render', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-row value="">Apple</market-row>');
        const el = await page.find('market-row');
        expect(el).toEqualAttribute('value', '');
        el.setProperty('value', 'foo');
        await page.waitForChanges();
        expect(el).toEqualAttribute('value', 'foo');
    });
    it('behaves correctly with a slotted checkbox', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row>
        <label slot="label">Apple</label>
        <market-checkbox slot="control"></market-checkbox>
      </market-row>
    `);
        const el = await page.find('market-row');
        const checkbox = await el.find('market-checkbox');
        expect(el).toHaveAttribute('hydrated');
        expect(el).not.toHaveAttribute('selected');
        await el.hover();
        expect(checkbox).toHaveAttribute('hovered');
        await el.click();
        expect(el).toHaveAttribute('selected');
        expect(checkbox).toHaveAttribute('checked');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
        el.setProperty('disabled', true);
        await page.waitForChanges();
        expect(el).toHaveAttribute('disabled');
        expect(checkbox).toHaveAttribute('disabled');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
    });
    it('behaves correctly with a slotted radio', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row>
        <label slot="label">Apple</label>
        <market-radio slot="control"></market-radio>
      </market-row>
    `);
        const el = await page.find('market-row');
        const radio = await el.find('market-radio');
        expect(el).toHaveAttribute('hydrated');
        expect(el).not.toHaveAttribute('selected');
        await el.hover();
        expect(radio).toHaveAttribute('hovered');
        await el.click();
        expect(el).toHaveAttribute('selected');
        expect(radio).toHaveAttribute('selected');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(radio).not.toHaveAttribute('selected');
        el.setProperty('disabled', true);
        await page.waitForChanges();
        expect(el).toHaveAttribute('disabled');
        expect(radio).toHaveAttribute('disabled');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
    });
    it('behaves correctly in drill mode', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row variant="drill">
        <label slot="label">Apple</label>
      </market-row>
    `);
        await page.waitForChanges();
        const el = await page.find('market-row');
        const controlSlot = await el.find('slot[name=control]');
        const drillCaret = await el.find('pierce/.drill-icon');
        expect(el).toHaveAttribute('hydrated');
        expect(el).toHaveAttribute('interactive'); // drill rows should be interactive
        expect(el).toHaveAttribute('transient'); // drill rows should be transient
        expect(el).not.toHaveAttribute('selected');
        expect(controlSlot).toBeNull();
        expect(drillCaret).not.toBeNull();
        await el.click();
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('selected');
    });
    it('behaves correctly with a slotted toggle', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row>
        <label slot="label">Apple</label>
        <market-toggle slot="control"></market-toggle>
      </market-row>
    `);
        const el = await page.find('market-row');
        const toggle = await el.find('market-toggle');
        expect(el).toHaveAttribute('hydrated');
        expect(el).not.toHaveAttribute('selected');
        await el.hover();
        expect(toggle).toHaveAttribute('hovered');
        await el.click();
        expect(el).toHaveAttribute('selected');
        expect(toggle).toHaveAttribute('checked');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(toggle).not.toHaveAttribute('checked');
        el.setProperty('disabled', true);
        await page.waitForChanges();
        expect(el).toHaveAttribute('disabled');
        expect(toggle).toHaveAttribute('disabled');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(toggle).not.toHaveAttribute('checked');
    });
    it('properly disables and re-enables a slotted control', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row>
        <label slot="label">Apple</label>
        <market-toggle slot="control"></market-toggle>
      </market-row>
    `);
        const el = await page.find('market-row');
        const toggle = await el.find('market-toggle');
        expect(el).not.toHaveAttribute('disabled');
        expect(toggle).not.toHaveAttribute('disabled');
        el.setProperty('disabled', true);
        await page.waitForChanges();
        expect(el).toHaveAttribute('disabled');
        expect(toggle).toHaveAttribute('disabled');
        el.setProperty('disabled', false);
        await page.waitForChanges();
        expect(el).not.toHaveAttribute('disabled');
        expect(toggle).not.toHaveAttribute('disabled');
    });
    it('can be programmatically selected when the row is disabled', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row disabled>
        <label slot="label">Apple</label>
        <market-checkbox slot="control"></market-checkbox>
      </market-row>
    `);
        const el = await page.find('market-row');
        const checkbox = await el.find('market-checkbox');
        expect(checkbox).not.toHaveAttribute('checked');
        el.setProperty('selected', true);
        await page.waitForChanges();
        expect(checkbox).toHaveAttribute('checked');
    });
    it('does not fire a checkbox (slotted control) change event when disabled and clicked', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row disabled>
        <label slot="label">Apple</label>
        <market-checkbox slot="control"></market-checkbox>
      </market-row>
    `);
        const el = await page.find('market-row');
        const checkbox = await el.find('market-checkbox');
        const marketCheckboxSpy = await page.spyOnEvent('marketCheckboxValueChange');
        await el.click();
        await checkbox.click();
        await page.waitForChanges();
        expect(marketCheckboxSpy).not.toHaveReceivedEvent();
    });
    it('behaves correctly with a leading checkbox', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row control-position='leading'>
        <label slot="label">Apple</label>
        <market-checkbox slot="control" />
      </market-row>
    `);
        const el = await page.find('market-row');
        const checkbox = await el.find('market-checkbox');
        expect(el).toHaveAttribute('hydrated');
        expect(el).not.toHaveAttribute('selected');
        await el.hover();
        expect(checkbox).toHaveAttribute('hovered');
        await el.click();
        expect(el).toHaveAttribute('selected');
        expect(checkbox).toHaveAttribute('checked');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
        el.setProperty('disabled', true);
        await page.waitForChanges();
        expect(el).toHaveAttribute('disabled');
        expect(checkbox).toHaveAttribute('disabled');
        await el.click();
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
    });
    it('coerces non-string values to strings', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row>
        <label slot="label">Zero</label>
      </market-row>
    `);
        const el = await page.find('market-row');
        el.setProperty('value', 0);
        await page.waitForChanges();
        expect(await el.getProperty('value')).toEqual('0');
    });
    it('does not intercept keyboard events of descendant elements', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row interactive>
        <input type="text" />
      </market-row>
    `);
        const input = await page.find('input');
        await input.focus();
        await page.keyboard.type('A sentence with spaces.');
        expect(await input.getProperty('value')).toEqual('A sentence with spaces.');
    });
    it('should not select the row when a slotted market-button is clicked', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row>
        <label slot="label">Row</label>
        <market-checkbox slot="control"></market-checkbox>
        <market-button size="small" slot="trailing-accessory">Button</market-button>
      </market-row>
    `);
        const el = await page.find('market-row');
        const checkbox = await el.find('market-checkbox');
        const marketButton = await el.find('market-button');
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
        await marketButton.click();
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
    });
    it('should not select the row when a slotted button is clicked', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-row>
        <label slot="label">Row</label>
        <market-checkbox slot="control"></market-checkbox>
        <button size="small" slot="trailing-accessory">Button</button>
      </market-row>
    `);
        const el = await page.find('market-row');
        const checkbox = await el.find('market-checkbox');
        const button = await el.find('button');
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
        await button.click();
        expect(el).not.toHaveAttribute('selected');
        expect(checkbox).not.toHaveAttribute('checked');
    });
});
//# sourceMappingURL=market-row.e2e.js.map
