import { E2EPage } from '@stencil/core/testing';
import { TMarketDragCoords } from '../gesture/types';
export declare const drag: (page: E2EPage, from: TMarketDragCoords, to: TMarketDragCoords) => Promise<void>;
