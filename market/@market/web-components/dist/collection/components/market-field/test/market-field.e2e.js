import { newE2EPage } from "@stencil/core/testing";
describe('market-field', () => {
    describe('with market-input-text', () => {
        let page;
        it('should render with defaults', async () => {
            page = await newE2EPage();
            await page.setContent(`
      <market-field name="test field">
        <market-input-text></market-input-text>
        <small slot="bottom-accessory">This is supposedly helpful <a href="#">text</a>.</small>
        <small slot="error">You did something wrong, friend.</small>
        <button slot="action">Do the thing.</button>
      </market-field>
      `);
            const field = await page.find('market-field');
            const input = await field.find('pierce/input');
            expect(field).not.toBeNull();
            expect(field).toEqualAttribute('name', 'test field');
            expect(field).not.toHaveAttribute('disabled');
            expect(field).not.toHaveAttribute('focused');
            expect(field).not.toHaveAttribute('invalid');
            expect(field).not.toHaveAttribute('readonly');
            expect(input).not.toBeNull();
            expect(input).toEqualAttribute('name', 'test field');
            expect(input).not.toHaveAttribute('disabled');
            expect(input).not.toHaveAttribute('focused');
            expect(input).not.toHaveAttribute('invalid');
            expect(input).not.toHaveAttribute('readonly');
            const slots = await field.shadowRoot.querySelectorAll('slot');
            // Should only have the input, bottom accessory, and action slots
            expect(slots.length).toEqual(3);
            const [inputSlot, bottomAccessorySlot, actionSlot] = slots;
            expect(inputSlot).not.toHaveAttribute('name');
            expect(inputSlot).toEqualHtml('<slot></slot>');
            expect(bottomAccessorySlot).toEqualAttribute('name', 'bottom-accessory');
            expect(bottomAccessorySlot).toEqualHtml('<slot name="bottom-accessory"></slot>');
            expect(actionSlot).toEqualAttribute('name', 'action');
            expect(actionSlot).toEqualHtml('<slot name="action"></slot>');
        });
        it('should render with default aria-describedby and ids', async () => {
            page = await newE2EPage();
            await page.setContent(`
      <market-field invalid>
        <market-input-text></market-input-text>
        <small slot="bottom-accessory">This is supposedly helpful <a href="#">text</a>.</small>
        <small slot="error">You did something wrong, friend.</small>
        <button slot="action">Do the thing.</button>
      </market-field>
      `);
            const field = await page.find('market-field');
            const input = await field.find('market-input-text');
            const inputDescribedBys = input.getAttribute('aria-describedby').split(' ');
            expect(inputDescribedBys[0]).toMatch(/-error/);
            expect(inputDescribedBys[1]).toMatch(/-bottom-accessory/);
            const errorSlot = await field.querySelector('small[slot="error"]');
            expect(errorSlot.id).toMatch(/-error/);
            expect(errorSlot.id).toEqual(inputDescribedBys[0]);
            const bottomAccessorySlot = await field.querySelector('small[slot="bottom-accessory"]');
            expect(bottomAccessorySlot.id).toMatch(/-bottom-accessory/);
            expect(bottomAccessorySlot.id).toEqual(inputDescribedBys[1]);
        });
        it('should not show an error message when not invalid', async () => {
            page = await newE2EPage();
            await page.setContent(`
      <market-field>
        <market-input-text></market-input-text>
        <small slot="bottom-accessory">This is supposedly helpful <a href="#">text</a>.</small>
        <small slot="error">You did something wrong, friend.</small>
      </market-field>
      `);
            const field = await page.find('market-field');
            const slots = await field.shadowRoot.querySelectorAll('slot');
            // Should only have the input, bottom-accessory, and action slots
            expect(slots.length).toEqual(3);
            expect(slots[0]).not.toHaveAttribute('name');
            expect(slots[1]).toEqualAttribute('name', 'bottom-accessory');
            expect(slots[2]).toEqualAttribute('name', 'action');
        });
        describe('with the invalid property', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
        <market-field invalid>
          <market-input-text></market-input-text>
          <small slot="bottom-accessory">This is supposedly helpful <a href="#">text</a>.</small>
          <small slot="error">You did something wrong, friend.</small>
        </market-field>
        `);
            });
            it('should have invalid attributes on field and input-text when an invalid field is passed in', async () => {
                const field = await page.find('market-field');
                const input = await page.find('market-input-text');
                expect(field).toHaveAttribute('invalid');
                expect(input).toHaveAttribute('invalid');
            });
        });
        describe('with the readonly property', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
        <market-field readonly>
          <market-input-text></market-input-text>
          <small slot="bottom-accessory">This is supposedly helpful <a href="#">text</a>.</small>
          <small slot="error">You did something wrong, friend.</small>
        </market-field>
        `);
            });
            it('should have readonly attributes on field and input when readonly is passed to field', async () => {
                const field = await page.find('market-field');
                const input = await page.find('market-input-text');
                expect(field).toHaveAttribute('readonly');
                expect(input).toHaveAttribute('readonly');
            });
        });
        describe('with the disabled property', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
        <market-field disabled invalid>
          <market-input-text></market-input-text>
          <small slot="bottom-accessory">This is supposedly helpful <a href="#">text</a>.</small>
          <small slot="error">You did something wrong, friend.</small>
        </market-field>
        `);
            });
            it('should have disabled attributes on field and input when an disabled field is passed in', async () => {
                const field = await page.find('market-field');
                const input = await page.find('market-input-text');
                expect(field).toHaveAttribute('disabled');
                expect(input).toHaveAttribute('disabled');
            });
            it('should not show error messages when disabled and invalid', async () => {
                const field = await page.find('market-field');
                const slots = await field.shadowRoot.querySelectorAll('slot');
                // Should only have the input, bottom accessory, action slots
                expect(slots.length).toEqual(3);
                expect(slots[0]).not.toHaveAttribute('name');
                expect(slots[1]).toEqualAttribute('name', 'bottom-accessory');
                expect(slots[2]).toEqualAttribute('name', 'action');
            });
        });
    });
    describe('with market-select', () => {
        let page;
        describe('with the invalid property', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
        <market-field invalid>
          <market-select>
            <label>Label</label>
            <market-list slot="list">
              <market-row value="apple">Apple</market-row>
              <market-row value="orange">Orange</market-row>
              <market-row value="pear">Pear</market-row>
            </market-list>
          </market-select>
        </market-field>
        `);
            });
            it('should have invalid attributes on field and input-text when market-field is invalid', async () => {
                const field = await page.find('market-field');
                const input = await page.find('market-select');
                expect(field).toHaveAttribute('invalid');
                expect(input).toHaveAttribute('invalid');
            });
        });
        describe('with the readonly property', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
        <market-field readonly>
          <market-select>
            <label>Label</label>
            <market-list slot="list">
              <market-row value="apple">Apple</market-row>
              <market-row value="orange">Orange</market-row>
              <market-row value="pear">Pear</market-row>
            </market-list>
          </market-select>
        </market-field>
        `);
            });
            it('should have readonly attributes on field and input when market-field is readonly', async () => {
                const field = await page.find('market-field');
                const input = await page.find('market-select');
                expect(field).toHaveAttribute('readonly');
                expect(input).toHaveAttribute('readonly');
            });
        });
        describe('with the disabled property', () => {
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setContent(`
        <market-field disabled>
          <market-select>
            <label>Label</label>
            <market-list slot="list">
              <market-row value="apple">Apple</market-row>
              <market-row value="orange">Orange</market-row>
              <market-row value="pear">Pear</market-row>
            </market-list>
          </market-select>
        </market-field>
        `);
            });
            it('should have disabled attributes on field and input when market-field is disabled', async () => {
                const field = await page.find('market-field');
                const input = await page.find('market-select');
                expect(field).toHaveAttribute('disabled');
                expect(input).toHaveAttribute('disabled');
            });
        });
    });
});
//# sourceMappingURL=market-field.e2e.js.map
