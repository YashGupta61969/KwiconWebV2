import * as React from 'react';
import { Loaders } from '@kwicon/kwicon-ui';

export interface WithSuspenseProps {
	fallback?: React.ReactNode;
}

/**
 * @description This is a HOC that wraps a component with React.Suspense and a fallback component to be displayed while the component is loading. The fallback component can be passed as a prop to the HOC or as a second argument to the HOC. If both are passed, the prop will take precedence.
 *
 *
 *@usage
 ```tsx
 const MyComponentWithSuspense = withSuspense(MyComponent);
 <MyComponentWithSuspense /> // Renders MyComponent wrapped with Suspense and default fallback
 <MyComponentWithSuspense fallback={<MyCustomFallback />} /> // Renders MyComponent wrapped with Suspense and custom fallback
 ```
 */
export function withSuspense<P extends object>(
	Component: React.ComponentType<P>,
	fallback: React.ReactNode = <Loaders.Page />,
): React.FC<P & WithSuspenseProps> {
	const WrappedComponent: React.FC<P & WithSuspenseProps> = props => {
		//* Extracting the fallback prop from the props object and use the fallback argument as the default value
		const { fallback: propFallback, ...restProps } = props;
		const suspenseFallback = propFallback || fallback;

		// ---
		return (
			<React.Suspense fallback={suspenseFallback}>
				<Component {...(restProps as P)} />
			</React.Suspense>
		);
	};

	//* Setting up the display name of the wrapped component to be withSuspense(ComponentName)
	WrappedComponent.displayName = `withSuspense(${
		Component.displayName || Component.name
	})`;
	return WrappedComponent;
}

export default withSuspense;
