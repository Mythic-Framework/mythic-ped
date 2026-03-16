import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import {
	ThemeProvider,
	createTheme,
	StyledEngineProvider,
} from '@mui/material';

import App from 'containers/App';
import WindowListener from 'containers/WindowListener';
import configureStore from './configureStore';
import KeyListener from './containers/KeyListener';

const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
	const muiTheme = createTheme({
		typography: {
			fontFamily: ["'Rajdhani', 'Oswald', sans-serif"],
		},
		palette: {
			primary: {
				main: '#208692',
				light: '#4db8c4',
				dark: '#0e5a62',
				contrastText: '#ffffff',
			},
			secondary: {
				main: '#121025',
				light: '#1c1a30',
				dark: '#0a0914',
				contrastText: '#ffffff',
			},
			error: {
				main: '#6e1616',
				light: '#a13434',
				dark: '#430b0b',
			},
			success: {
				main: '#52984a',
				light: '#60eb50',
				dark: '#244a20',
			},
			warning: {
				main: '#f09348',
				light: '#f2b583',
				dark: '#b05d1a',
			},
			info: {
				main: '#247ba5',
				light: '#247ba5',
				dark: '#175878',
			},
			text: {
				main: '#ffffff',
				alt: '#cecece',
				info: '#919191',
				light: '#ffffff',
				dark: '#000000',
			},
			rarities: {
				rare1: '#ffffff',
				rare2: '#52984a',
				rare3: '#247ba5',
				rare4: '#8e3bb8',
				rare5: '#f2d411',
			},
			border: {
				main: 'rgba(32,134,146,0.08)',
				light: '#ffffff',
				dark: '#0a0914',
				input: 'rgba(32,134,146,0.3)',
				divider: 'rgba(32,134,146,0.15)',
			},
			mode: 'dark',
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					'.fade-enter': { opacity: 0 },
					'.fade-exit': { opacity: 1 },
					'.fade-enter-active': { opacity: 1 },
					'.fade-exit-active': { opacity: 0 },
					'.fade-enter-active, .fade-exit-active': {
						transition: 'opacity 500ms',
					},
					'*': {
						'&::-webkit-scrollbar': { width: 4 },
						'&::-webkit-scrollbar-track': { background: 'transparent' },
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'rgba(32,134,146,0.35)',
							borderRadius: 2,
							transition: 'background-color 150ms ease-in-out',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							backgroundColor: 'rgba(32,134,146,0.6)',
						},
					},
				},
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 14,
						fontWeight: 600,
						letterSpacing: '0.05em',
						backgroundColor: 'rgba(18,16,37,0.97)',
						border: '1px solid rgba(32,134,146,0.3)',
						boxShadow: '0 0 20px rgba(0,0,0,0.7), 0 0 10px rgba(32,134,146,0.15)',
					},
				},
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						background: 'rgba(18,16,37,0.97)',
						backgroundImage: 'none',
						border: '1px solid rgba(32,134,146,0.2)',
						boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
					},
				},
			},
			MuiMenuItem: {
				styleOverrides: {
					root: {
						fontFamily: "'Rajdhani', sans-serif",
						fontSize: 14,
						color: 'rgba(255,255,255,0.8)',
						'&:hover': { background: 'rgba(32,134,146,0.1)' },
						'&.Mui-selected': {
							background: 'rgba(32,134,146,0.2)',
							color: '#208692',
							'&:hover': { background: 'rgba(32,134,146,0.25)' },
						},
					},
				},
			},
		},
	});

	ReactDOM.render(
		<Provider store={store}>
			<KeyListener>
				<WindowListener>
					<StyledEngineProvider injectFirst>
						<ThemeProvider theme={muiTheme}>
							<CssBaseline />
							<App />
						</ThemeProvider>
					</StyledEngineProvider>
				</WindowListener>
			</KeyListener>
		</Provider>,
		MOUNT_NODE,
	);
};

if (module.hot) {
	module.hot.accept(['containers/App'], () => {
		ReactDOM.unmountComponentAtNode(MOUNT_NODE);
		render();
	});
}

render();
