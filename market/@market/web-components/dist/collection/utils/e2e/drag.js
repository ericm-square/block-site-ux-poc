import { CORE_ANIMATION_MOVE_TRANSITION_MODERATE_SPEED_DURATION } from "@market/market-theme/js/cjs/index.js";
export const drag = async (page, from, to) => {
    await page.mouse.move(from.x, from.y);
    await page.waitForChanges();
    await page.mouse.down();
    await page.waitForChanges();
    await page.mouse.move(to.x, to.y);
    await page.waitForChanges();
    await page.mouse.up();
    await page.waitForChanges();
    // wait for CSS transition to complete
    await new Promise((r) => setTimeout(r, CORE_ANIMATION_MOVE_TRANSITION_MODERATE_SPEED_DURATION + 1));
};
//# sourceMappingURL=drag.js.map
