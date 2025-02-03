import { newE2EPage } from "@stencil/core/testing";
describe('market-segmented-control', () => {
    let segmentChangeEventSpy;
    let segmentedControlValueChangeEventSpy;
    it('selects first segment as default', async () => {
        const page = await newE2EPage();
        await page.setContent(`<market-segmented-control>
      <market-segment value="one">One</market-segment>
      <market-segment value=two">Two</market-segment>
      <market-segment value="three">Three</market-segment>
    </market-segmented-control>`);
        const element = await page.find('market-segmented-control');
        expect(element).toHaveAttribute('hydrated');
    });
    it('selects segment specified by defaultSelected', async () => {
        const page = await newE2EPage();
        await page.setContent(`<market-segmented-control value="two">
      <market-segment value="one">One</market-segment>
      <market-segment value="two">Two</market-segment>
      <market-segment value="three">Three</market-segment>
    </market-segmented-control>`);
        const element = await page.find('market-segmented-control');
        expect(element).toHaveAttribute('hydrated');
        const segment2 = await page.find('market-segment[selected]');
        expect(segment2).toEqualAttribute('value', 'two');
        expect(await page.findAll('market-segment[selected]')).toHaveLength(1);
    });
    it('selects segment on click and correct events fire', async () => {
        const page = await newE2EPage();
        await page.setContent(`<market-segmented-control value="two">
      <market-segment value="one">One</market-segment>
      <market-segment value="two">Two</market-segment>
      <market-segment value="three">Three</market-segment>
    </market-segmented-control>`);
        const element = await page.find('market-segmented-control');
        segmentedControlValueChangeEventSpy = await element.spyOnEvent('marketSegmentedSelectionDidChange');
        expect(element).toHaveAttribute('hydrated');
        const segment1 = await page.find('market-segment[selected]');
        expect(segment1).toEqualAttribute('value', 'two');
        expect(await page.findAll('market-segment[selected]')).toHaveLength(1);
        const tab3 = await page.find('market-segment[value="three"]');
        segmentChangeEventSpy = await tab3.spyOnEvent('marketSegmentSelectedChanged');
        await tab3.click();
        const segment3 = await page.find('market-segment[selected]');
        expect(segment3).toEqualAttribute('value', 'three');
        expect(await page.findAll('market-segment[selected]')).toHaveLength(1);
        expect(segmentChangeEventSpy).toHaveReceivedEventTimes(1);
        expect(segmentedControlValueChangeEventSpy).toHaveReceivedEventTimes(1);
    });
    it('cannot select segments when control is disabled', async () => {
        const page = await newE2EPage();
        await page.setContent(`<market-segmented-control disabled value="two">
      <market-segment value="one">One</market-segment>
      <market-segment value="two">Two</market-segment>
      <market-segment  value="three">Three</market-segment>
    </market-segmented-control>`);
        const element = await page.find('market-segmented-control');
        expect(element).toHaveAttribute('hydrated');
        const segment1 = await page.find('market-segment[selected]');
        expect(segment1).toEqualAttribute('value', 'two');
        expect(await page.findAll('market-segment[selected]')).toHaveLength(1);
        const tab3 = await page.find('market-segment[value="three"]');
        await tab3.click();
        const selectedSegment = await page.find('market-segment[selected]');
        expect(selectedSegment).toEqualAttribute('value', 'two');
        expect(await page.findAll('market-segment[selected]')).toHaveLength(1);
    });
});
//# sourceMappingURL=market-segmented-control.e2e.js.map
