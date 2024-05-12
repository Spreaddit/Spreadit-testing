import { remote } from 'webdriverio';
import { wdOpts } from './config.js';

async function forgotPassword(driver, email) {

    const forgotPwdBtn = await driver.$("//android.widget.Button[@content-desc='Forgot Password?']");
    await forgotPwdBtn.click();

    await driver.pause(2000);

    const emailInput = await driver.$("//android.widget.EditText");
    await emailInput.click();
    await driver.pause(2000);
    await emailInput.addValue(email);

    const resetBtn = await driver.$("//android.widget.Button[@content-desc='Reset Password']");
    await resetBtn.click();

}
async function runTest() {
    const driver = await remote(wdOpts);
    try {

        const el1 = await driver.$("xpath://android.widget.Button[contains(@accessibility-id, *)][2]");
        await el1.click();

        await driver.pause(3000);

        await forgotPassword(driver, "amiraelgarf");

        await driver.pause(2500);

        const txt = await driver.$("xpath://android.view.View[contains(@content-desc, \"sent\")]");

        if (await txt.isExisting())
        {
            console.log(`Password email sent successfully.`);
        }
        else
        {
            console.log(`Failed: to send reset password email.`);
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
