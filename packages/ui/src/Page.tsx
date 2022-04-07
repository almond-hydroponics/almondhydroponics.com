import { useState, useEffect, createContext, useMemo, ReactNode } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import AOS from 'aos';
import { PaletteMode } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from '../store/rootReducer';
import { UserContext } from '@almond/context';
import authService from '@almond/utils/src/auth';
import checkUserRole from '@almond/utils/src/checkUserRole';
import SnackBar from './atoms/SnackBar';
import getTheme from '@almond/theme/src/getTheme';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface Props {
	children: ReactNode;
}

export default function Page({ children }: Props): JSX.Element {
	const [mode, setMode] = useState<'light' | 'dark'>('light');
	// const router = useRouter();

	// // Selectors from redux
	// const { snack } = useSelector((globalState: IRootState) => globalState);
	//
	// const { userDetails } = useSelector(
	// 	(globalState: IRootState) => globalState.user
	// );
	// const { user } = useSelector(
	// 	(globalState: IRootState) => globalState.authentication
	// );
	//
	// const {
	// 	_id,
	// 	firstName,
	// 	lastName,
	// 	email,
	// 	photo,
	// 	devices,
	// 	isVerified,
	// 	activeDevice,
	// 	currentRole,
	// } = userDetails._id ? userDetails : user;

	const isAuthenticated = authService.isAuthenticated();
	// const dispatch = useDispatch();

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}

		AOS.init({
			once: true,
			delay: 50,
			duration: 500,
			easing: 'ease-in-out',
		});
	}, []);

	// useEffectAsync(async () => {
	// 	if (isAuthenticated) {
	// 		await dispatch(getUserDetails());
	// 	}
	// }, []);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const theme = useMemo(() => getTheme(mode as PaletteMode), [mode]);

	// const userDetailsOnProvider = {
	// 	_id,
	// 	email,
	// 	photo,
	// 	devices,
	// 	isVerified,
	// 	activeDevice,
	// 	name: `${firstName} ${lastName}`,
	// 	isAdmin: !checkUserRole(currentRole?.title ?? 'User', 'User'),
	// };

	return (
		<StyledEngineProvider injectFirst>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					{/*<UserContext.Provider value={userDetailsOnProvider}>*/}
					<style jsx>{`
						a {
							margin: 0 10px 0 0;
						}
					`}</style>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Paper elevation={0}>{children}</Paper>
					{/*<SnackBar snack={snack} />*/}
					{/*</UserContext.Provider>*/}
				</ThemeProvider>
			</ColorModeContext.Provider>
		</StyledEngineProvider>
	);
}
