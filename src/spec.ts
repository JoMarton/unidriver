import { waitFor } from './utils';
import {assert} from 'chai';

describe('utils', () => {

	describe('waitFor', () => {

		const createLongFn = (ms: number) => {
			const now = Date.now();
			return async () => {
				return (Date.now() - now) > ms;
			};
		};

		it('works', async () => {
			await waitFor(createLongFn(100));
		});

		it('has configurable timeout', async () => {
			try {
				await waitFor(createLongFn(100), 50);
				assert.equal('should not', 'get here');
			} catch (e) {
				// this is good
			}
		});
	});

});
