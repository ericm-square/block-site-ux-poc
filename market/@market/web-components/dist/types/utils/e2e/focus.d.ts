import { E2EPage } from '@stencil/core/testing';
import { SerializedAXNode } from 'puppeteer';
/**
 * Finds currently focused node
 *
 * Source: https://pptr.dev/api/puppeteer.accessibility.snapshot/#example-2
 *
 * @param {E2EPage} page `E2EPage` instance
 * @returns {SerializedAXNode} focused node
 */
export declare function findFocusedNode(page: E2EPage): Promise<SerializedAXNode>;
