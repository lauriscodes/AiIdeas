import { expect, test as base } from "@playwright/test";

const test = base.extend({
	page: async ({ page }, runTestWith) => {
		const originalGoto = page.goto.bind(page);
		page.goto = async (url, options) => {
			const result = await originalGoto(url, options);
			await page.locator('body[data-hydrated="true"]').waitFor();
			return result;
		};
		await runTestWith(page);
	}
});

export { test, expect };
