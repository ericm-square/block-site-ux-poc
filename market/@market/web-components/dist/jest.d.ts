export {};

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAriaChecked(value: string): CustomMatcherResult;
      toHaveReflectedBooleanProperty(prop: string): CustomMatcherResult;
      toBeMarketControl(): CustomMatcherResult;
      toBeSelectedMarketControl(): CustomMatcherResult;
      toBeIndeterminateMarketControl(): CustomMatcherResult;
    }
  }
}
