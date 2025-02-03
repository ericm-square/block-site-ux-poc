import { newSpecPage } from "@stencil/core/testing";
import { MarketButton } from "../market-button";
import MutationObserver from "mutation-observer";
// Fix for ReferenceError: MutationObserver is not defined
global.MutationObserver = MutationObserver;
describe('market-button', () => {
    let page;
    describe('defaults', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: '<market-button>Button</market-button>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button class="market-button" rank="secondary" size="medium" type="button" variant="regular">
          <mock:shadow-root>
            <button class="inner-tag" type="button">
              <slot name="icon"></slot>
              <slot></slot>
            </button>
          </mock:shadow-root>
          Button
        </market-button>
      `);
        });
    });
    describe('with icon', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: `<market-button><market-accessory slot="icon"></market-accessory> Button</market-button>`,
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button class="market-button" rank="secondary" size="medium" type="button" variant="regular">
          <mock:shadow-root>
            <button class="inner-tag" type="button">
              <slot name="icon"></slot>
              <slot></slot>
            </button>
          </mock:shadow-root>
          <market-accessory slot="icon"></market-accessory>
          Button
        </market-button>
      `);
        });
    });
    describe('icon only', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: `<market-button><market-accessory slot="icon"></market-accessory></market-button>`,
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button icon-only class="market-button" rank="secondary" size="medium" type="button" variant="regular">
          <mock:shadow-root>
            <button class="inner-tag" type="button">
              <slot name="icon"></slot>
              <slot></slot>
            </button>
          </mock:shadow-root>
          <market-accessory slot="icon"></market-accessory>
        </market-button>
      `);
        });
    });
    describe('disabled', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: '<market-button disabled>Button</market-button>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button class="market-button" disabled rank="secondary" size="medium" type="button" variant="regular">
          <mock:shadow-root>
            <button class="inner-tag" disabled tabindex="-1" type="button">
              <slot name="icon"></slot>
              <slot></slot>
            </button>
          </mock:shadow-root>
          Button
        </market-button>
      `);
        });
    });
    describe('loading', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: '<market-button is-loading>Button</market-button>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button is-loading class="market-button" rank="secondary" size="medium" type="button" variant="regular">
          <mock:shadow-root>
            <button class="inner-tag" type="button">
              <slot name="icon"></slot>
              <slot></slot>
            </button>
            <market-activity-indicator size="small"></market-activity-indicator>
          </mock:shadow-root>
          Button
        </market-button>
      `);
        });
    });
    describe('caret up', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: '<market-button caret="up">Button</market-button>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button caret="up" class="market-button" rank="secondary" size="medium" type="button" variant="regular">
          <mock:shadow-root>
            <button class="inner-tag" type="button">
              <slot name="icon"></slot>
              <slot></slot>
              <market-icon name="collapse"></market-icon>
            </button>
          </mock:shadow-root>
          Button
        </market-button>
      `);
        });
    });
    describe('caret down', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: '<market-button caret="down">Button</market-button>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button caret="down" class="market-button" rank="secondary" size="medium" type="button" variant="regular">
          <mock:shadow-root>
            <button class="inner-tag" type="button">
              <slot name="icon"></slot>
              <slot></slot>
              <market-icon name="expand"></market-icon>
            </button>
          </mock:shadow-root>
          Button
        </market-button>
      `);
        });
    });
    describe('link', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: '<market-button href="http://squareup.com" target="_blank" rel="external">Button</market-button>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button class="market-button" href="http://squareup.com" rank="secondary" rel="external" size="medium" target="_blank" type="button" variant="regular">
          <mock:shadow-root>
            <a class="inner-tag" href="http://squareup.com" rel="external" target="_blank">
              <slot name="icon"></slot>
              <slot></slot>
            </a>
          </mock:shadow-root>
          Button
        </market-button>
      `);
        });
    });
    describe('various attrs', () => {
        beforeEach(async () => {
            page = await newSpecPage({
                components: [MarketButton],
                html: '<market-button rank="primary" type="submit" variant="destructive" size="small">Button</market-button>',
            });
        });
        it('renders correctly', () => {
            expect(page.root).toEqualHtml(`
        <market-button class="market-button" rank="primary" size="small" type="submit" variant="destructive">
          <mock:shadow-root>
            <button class="inner-tag" type="submit">
              <slot name="icon"></slot>
              <slot></slot>
            </button>
          </mock:shadow-root>
          Button
        </market-button>
      `);
        });
    });
});
//# sourceMappingURL=market-button.spec.js.map
