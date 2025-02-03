import { newE2EPage } from "@stencil/core/testing";
describe('market-color-swatch-list', () => {
    let page;
    let element;
    let list;
    let swatchListChangeEvent;
    let redSwatch;
    let blueSwatch;
    let greenSwatch;
    let yellowSwatch;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-color-swatch-list value="blue">
        <market-color-swatch value="red"></market-color-swatch>
        <market-color-swatch value="blue"></market-color-swatch>
        <market-color-swatch value="green"></market-color-swatch>
        <market-color-swatch value="yellow"></market-color-swatch>
      </market-color-swatch-list>
    `);
        element = await page.find('market-color-swatch-list');
        list = await element.findAll('market-color-swatch');
        swatchListChangeEvent = await page.spyOnEvent('marketColorSwatchListValueChange');
        redSwatch = await element.find('market-color-swatch[value="red"]');
        blueSwatch = await element.find('market-color-swatch[value="blue"]');
        greenSwatch = await element.find('market-color-swatch[value="green"]');
        yellowSwatch = await element.find('market-color-swatch[value="yellow"]');
    });
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-color-swatch-list></market-color-swatch-list>');
        const element = await page.find('market-color-swatch-list');
        expect(element).toHaveAttribute('hydrated');
        expect(element).toHaveClass('market-color-swatch-list');
    });
    it('renders the slotted swatches and preselects one based on value', () => {
        expect(list).toHaveLength(4);
        expect(redSwatch).not.toHaveAttribute('selected');
        expect(blueSwatch).toHaveAttribute('selected');
        expect(greenSwatch).not.toHaveAttribute('selected');
        expect(yellowSwatch).not.toHaveAttribute('selected');
    });
    it('moves selected swatch when an unselected swatch is clicked and fire event', async () => {
        await redSwatch.click();
        await page.waitForChanges();
        expect(redSwatch).toHaveAttribute('selected');
        expect(blueSwatch).not.toHaveAttribute('selected');
        expect(greenSwatch).not.toHaveAttribute('selected');
        expect(yellowSwatch).not.toHaveAttribute('selected');
        expect(swatchListChangeEvent).toHaveReceivedEventTimes(1);
        expect(swatchListChangeEvent.lastEvent.detail.value).toEqual('red');
        expect(swatchListChangeEvent.lastEvent.detail.prevValue).toEqual('blue');
    });
    it('clears value of list when selected swatch is clicked (deselected)', async () => {
        await blueSwatch.click();
        await page.waitForChanges();
        expect(redSwatch).not.toHaveAttribute('selected');
        expect(blueSwatch).not.toHaveAttribute('selected');
        expect(greenSwatch).not.toHaveAttribute('selected');
        expect(yellowSwatch).not.toHaveAttribute('selected');
        expect(swatchListChangeEvent).toHaveReceivedEventTimes(1);
        expect(swatchListChangeEvent.lastEvent.detail.value).toEqual('');
        expect(swatchListChangeEvent.lastEvent.detail.prevValue).toEqual('blue');
    });
});
//# sourceMappingURL=market-color-swatch-list.e2e.js.map
