import { E2EElement } from '@stencil/core/testing';
export declare function expectValueToBe(el: E2EElement, value: string): Promise<void>;
export declare function expectInputsToBe(el: E2EElement, value: string): Promise<void>;
export declare function expectInputHasFocus(el: E2EElement, index: number): Promise<void>;
