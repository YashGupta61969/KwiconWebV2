import * as React from 'react';

/**
 * @important
 * This function should be used only when you need to import a single component from a module that doesn't have any props.
 *
 * @description
 * Custom lazy import function to import a single component from a module.
 * Got this from https://github.com/facebook/react/issues/14603#issuecomment-726551598
 *
 * @returns {I} The module with the component
 *
 * @example
 * const { MyComponent } = lazyImport(() => import('./my-component'), 'MyComponent');
 *
 */
export function lazyImport<
	T extends React.ComponentType<unknown>,
	// eslint-disable-next-line no-unused-vars
	I extends { [K2 in K]: T },
	K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
	return Object.create({
		[name]: React.lazy(() =>
			factory().then(module => ({ default: module[name] })),
		),
	});
}

export default lazyImport;
