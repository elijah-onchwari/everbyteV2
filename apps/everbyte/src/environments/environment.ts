// NOTE: Auto-generated file
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses 'environment.ts', but if you do
// 'ng build --env=prod' then 'environment.prod.ts' will be used instead.
// The list of which env maps to which file can be found in '.angular-cli.json'.
declare const window:any;

// import { Environment } from './model';



	let APP_URL = 'http://localhost:3000';
	let CLIENT_URL = 'http://localhost:4200';

	try {
		if (window._env && window._env.api) {
			APP_URL = window._env.api;
		}
	
		if (window._env && window._env.api) {
			CLIENT_URL = window.location.origin;
		}
	} catch(e) {}

	export const environment: Environment = 
	{
		production:  false,

		API_BASE_URL: APP_URL,
		CLIENT_BASE_URL: CLIENT_URL,


		GOOGLE_AUTH_LINK: API_BASE_URL + '/api/auth/google',
		FACEBOOK_AUTH_LINK: API_BASE_URL + '/api/auth/facebook',
		LINKEDIN_AUTH_LINK: API_BASE_URL + '/api/auth/linkedin',
		GITHUB_AUTH_LINK: API_BASE_URL + '/api/auth/github',
		TWITTER_AUTH_LINK: API_BASE_URL + '/api/auth/twitter',
		MICROSOFT_AUTH_LINK: API_BASE_URL + '/api/auth/microsoft',
	

		IS_DEMO: false,
	};	
	

	// For easier debugging in development mode, you can import the following file
	// to ignore zone related error stack frames such as 'zone.run', 'zoneDelegate.invokeTask'.
	import 'zone.js';  // Included with Angular CLI.

	