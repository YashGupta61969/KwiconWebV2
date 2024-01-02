import { Flip, ToastContainer } from 'react-toastify';

export function Toaster(): JSX.Element {
	return (
		<ToastContainer
			position="bottom-center"
			autoClose={250}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover={false}
			theme="dark"
			transition={Flip}
		/>
	);
}

export default Toaster;
