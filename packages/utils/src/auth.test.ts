// third-party libraries
import Cookies from 'js-cookie';
// helpers
// import { token } from '../testHelpers';
import authService from './auth';
import mock = jest.mock;

describe('AuthService object', () => {
	beforeEach(() => {
		jest.mock('js-cookie', () => jest.fn());
	});
	describe('IsAuthenticated function', () => {
		it('should return true if a user token has not expired', () => {
			Cookies.set('jwt-token', 'token');

			expect(authService.isAuthenticated()).toBeTruthy();
		});

		it('should return false when a user token has expired', () => {
			Cookies.remove('jwt-token');

			expect(authService.isAuthenticated()).toBeFalsy();
		});
	});

	describe.skip('LogoutUser function', () => {
		it('should call Cookie.remove to make user token expired', () => {
			// @ts-ignore
			Cookies.remove = jest.fn();
			authService.logoutUser();

			expect(Cookies.remove).toHaveBeenCalledTimes(1);
		});
	});

	describe('RedirectUser function', () => {
		it('should call logoutUser', () => {
			authService.logoutUser = jest.fn();
			authService.redirectUser();

			expect(authService.logoutUser).toHaveBeenCalled();
		});
	});
});
