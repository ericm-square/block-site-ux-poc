import * as focusTrap from 'focus-trap';
export type FocusTrap = focusTrap.FocusTrap;
export type FocusTrapOptions = focusTrap.Options;
export type FocusTrapActivateOptions = focusTrap.ActivateOptions;
export type FocusTrapDeactivateOptions = focusTrap.DeactivateOptions;
export declare const createAndActivateFocusTrap: ({ activateOptions, el, options, }: {
    activateOptions?: FocusTrapActivateOptions;
    el: HTMLElement;
    options?: FocusTrapOptions;
}) => FocusTrap | undefined;
