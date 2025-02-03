import { newE2EPage } from "@stencil/core/testing";
describe('market-progress-tracker-step: indicator icon', () => {
    let page;
    let el;
    let defaultIconEl;
    let slottedIconEl;
    beforeEach(async () => {
        page = await newE2EPage();
    });
    async function setContent(html) {
        await page.setContent(html);
        await page.waitForChanges();
        el = await page.find('market-progress-tracker-step');
        defaultIconEl = await el.find('pierce/.default-icon');
        slottedIconEl = await el.find('market-accessory[slot="icon"]');
    }
    describe('default icons', () => {
        afterEach(async () => {
            expect(defaultIconEl).not.toBeNull();
            expect(await defaultIconEl.isVisible()).toStrictEqual(true);
        });
        describe('indicator="circle"', () => {
            describe('orientation="vertical"', () => {
                it('inactive-circle-icon by default', async () => {
                    await setContent(`
            <market-progress-tracker-step></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('inactive-circle-icon');
                });
                it('active-circle-icon when active', async () => {
                    await setContent(`
            <market-progress-tracker-step active></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('active-circle-icon');
                });
                it('inactive-circle-icon when completed', async () => {
                    await setContent(`
            <market-progress-tracker-step completed></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('inactive-circle-icon');
                });
            });
            describe('orientation="horizontal"', () => {
                it('small-inactive-circle-icon by default', async () => {
                    await setContent(`
            <market-progress-tracker-step orientation="horizontal"></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('small-inactive-circle-icon');
                });
                it('small-active-circle-icon when active', async () => {
                    await setContent(`
            <market-progress-tracker-step orientation="horizontal" active></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('small-active-circle-icon');
                });
                it('small-inactive-circle-icon when completed', async () => {
                    await setContent(`
            <market-progress-tracker-step orientation="horizontal" completed></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('small-inactive-circle-icon');
                });
            });
        });
        describe('indicator="check"', () => {
            describe('orientation="vertical"', () => {
                it('unchecked-icon by default', async () => {
                    await setContent(`
            <market-progress-tracker-step indicator="check"></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('unchecked-icon');
                });
                it('unchecked-icon when active', async () => {
                    await setContent(`
            <market-progress-tracker-step indicator="check" active></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('unchecked-icon');
                });
                it('checked-icon when completed', async () => {
                    await setContent(`
            <market-progress-tracker-step indicator="check" completed></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('checked-icon');
                });
            });
            describe('orientation="horizontal"', () => {
                it('small-unchecked-icon by default', async () => {
                    await setContent(`
            <market-progress-tracker-step indicator="check" orientation="horizontal"></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('small-unchecked-icon');
                });
                it('small-unchecked-icon when active', async () => {
                    await setContent(`
            <market-progress-tracker-step indicator="check" orientation="horizontal" active></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('small-unchecked-icon');
                });
                it('small-checked-icon when completed', async () => {
                    await setContent(`
            <market-progress-tracker-step indicator="check" orientation="horizontal" completed></market-progress-tracker-step>
          `);
                    expect(defaultIconEl).toHaveClass('small-checked-icon');
                });
            });
        });
    });
    describe('slotted custom icon', () => {
        afterEach(async () => {
            expect(defaultIconEl).toBeNull();
            expect(slottedIconEl).not.toBeNull();
            expect(await slottedIconEl.isVisible()).toStrictEqual(true);
        });
        it('renders the slotted icon', async () => {
            await setContent(`
        <market-progress-tracker-step>
          <market-accessory slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </market-accessory>
        </market-progress-tracker-step>
      `);
        });
        it('ignores the indicator prop', async () => {
            await setContent(`
        <market-progress-tracker-step indicator="check">
          <market-accessory slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </market-accessory>
        </market-progress-tracker-step>
      `);
        });
        it('renders regardless of orientation', async () => {
            await setContent(`
        <market-progress-tracker-step orientation="horizontal">
          <market-accessory slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </market-accessory>
        </market-progress-tracker-step>
      `);
        });
        it('renders regardless if active', async () => {
            await setContent(`
        <market-progress-tracker-step active>
          <market-accessory slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </market-accessory>
        </market-progress-tracker-step>
      `);
        });
        it('renders regardless if completed', async () => {
            await setContent(`
        <market-progress-tracker-step completed>
          <market-accessory slot="icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </market-accessory>
        </market-progress-tracker-step>
      `);
        });
    });
});
//# sourceMappingURL=market-progress-tracker-step.icon.e2e.js.map
