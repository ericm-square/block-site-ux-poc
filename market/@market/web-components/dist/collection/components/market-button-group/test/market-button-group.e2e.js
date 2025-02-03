import { newE2EPage } from "@stencil/core/testing";
describe('market-button-group', () => {
    it('renders with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-button-group></market-button-group>');
        const element = await page.find('market-button-group');
        expect(element).not.toBeNull();
        expect(element).toHaveAttribute('hydrated');
        expect(element).toEqualAttribute('alignment', 'right');
        const dropdownMenuEl = await element.find('pierce/market-button-dropdown-menu');
        expect(dropdownMenuEl).toBeNull();
    });
    it('renders with buttons', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-button-group>
        <market-button rank="primary">Button 1</market-button>
        <market-button>Button 2</market-button>
      </market-button-group>
    `);
        const element = await page.find('market-button-group');
        const buttons = await element.findAll('market-button');
        expect(await buttons[0].isVisible()).toBe(true);
        expect(await buttons[1].isVisible()).toBe(true);
        // no overflow
        const dropdownMenuEl = await element.find('pierce/market-button-dropdown-menu');
        expect(dropdownMenuEl).toBeNull();
    });
    describe('overflow', () => {
        let page;
        let element;
        let buttons;
        let dropdownMenuEl;
        let dropdownMenuButtonEl;
        let popoverEl;
        const openDropdown = async () => {
            popoverEl = await dropdownMenuEl.find('pierce/market-popover');
            expect(await popoverEl.isVisible()).toBe(false);
            await dropdownMenuButtonEl.click();
            expect(await popoverEl.isVisible()).toBe(true);
        };
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-button-group>
          <market-button rank="primary">Button 1</market-button>
          <market-button>Button 2</market-button>
          <market-button>Button 3</market-button>
          <market-button>Button 4</market-button>
        </market-button-group>
      `);
            await page.waitForChanges();
            element = await page.find('market-button-group');
            buttons = await element.findAll('market-button');
            dropdownMenuEl = await element.find('pierce/market-button-dropdown');
            dropdownMenuButtonEl = await dropdownMenuEl.find('pierce/market-button');
        });
        it('does not show more than 2 buttons', async () => {
            // first two buttons visible
            expect(await buttons[0].isVisible()).toBe(true);
            expect(await buttons[1].isVisible()).toBe(true);
            // overflow button is visible
            expect(await dropdownMenuButtonEl.isVisible()).toBe(true);
            // last two buttons hidden in dropdown
            expect(await buttons[2].isVisible()).toBe(false);
            expect(await buttons[3].isVisible()).toBe(false);
        });
        it('moves the overflowed buttons to the dropdown', async () => {
            await openDropdown();
            expect(await buttons[0].isVisible()).toBe(true);
            expect(await buttons[1].isVisible()).toBe(true);
            expect(await buttons[2].isVisible()).toBe(true);
            expect(await buttons[3].isVisible()).toBe(true);
        });
        it("moves buttons that don't fit into the dropdown", async () => {
            expect(await buttons[0].isVisible()).toBe(true);
            expect(await buttons[1].isVisible()).toBe(true);
            expect(await buttons[2].isVisible()).toBe(false);
            expect(await buttons[3].isVisible()).toBe(false);
            // 200 is kind of a magic number here, but was measured in storybook
            page.setViewport({ width: 200, height: 800 });
            await page.waitForChanges();
            expect(await buttons[0].isVisible()).toBe(true);
            expect(await buttons[1].isVisible()).toBe(false);
            expect(await buttons[2].isVisible()).toBe(false);
            expect(await buttons[3].isVisible()).toBe(false);
            await openDropdown();
            expect(await buttons[0].isVisible()).toBe(true);
            expect(await buttons[1].isVisible()).toBe(true);
            expect(await buttons[2].isVisible()).toBe(true);
            expect(await buttons[3].isVisible()).toBe(true);
        });
        it('preserves events attached to the button', async () => {
            // attach a mock event to the 2nd <market-button>
            const mockCallBack = jest.fn();
            await page.exposeFunction('callback', mockCallBack);
            await page.$$eval('market-button', (buttons) => {
                buttons[1].addEventListener('click', window.callback); // eslint-disable-line @typescript-eslint/no-explicit-any
            });
            await page.waitForChanges();
            // click 2nd button
            expect(await buttons[1].isVisible()).toBe(true);
            await buttons[1].click();
            expect(mockCallBack.mock.calls.length).toEqual(1);
            // 200 is kind of a magic number here, but was measured in storybook
            page.setViewport({ width: 200, height: 800 });
            await page.waitForChanges();
            // click 2nd button (now in overflow menu)
            expect(await buttons[1].isVisible()).toBe(false);
            await openDropdown();
            expect(await buttons[1].isVisible()).toBe(true);
            await buttons[1].click();
            expect(mockCallBack.mock.calls.length).toEqual(2);
        });
    });
});
//# sourceMappingURL=market-button-group.e2e.js.map
