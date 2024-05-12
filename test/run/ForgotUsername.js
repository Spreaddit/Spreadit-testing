import { remote } from 'webdriverio';
import { wdOpts } from './config.js';

async function forgotUsername(driver, email) {

    const el1 = await driver.$("//android.widget.Button[@content-desc='Forgot Username?']");
    await el1.click();

    await driver.pause(2000);

    const el2 = await driver.$("//android.widget.EditText");
    await el2.click();
    await driver.pause(2000);
    await el2.addValue(email);

    const emailInput = await driver.$("//android.widget.Button[@content-desc='Email me']");
    await emailInput.click();

}

async function runTest() {
    const driver = await remote(wdOpts);
    const email = "abdelrahmanayman3002@gmail.com";
    try {
        
        const el1 = await driver.$("xpath://android.widget.Button[contains(@accessibility-id, *)][2]");
        await el1.click();

        await driver.pause(2000);

        console.log("Sending the username....");
        // Execute scenario 1 (Allowing to follow + unblocking you)
        await forgotUsername(driver, email);

        await driver.pause(2000);

        let chk = await driver.$("xpath://android.view.View[contains(@content-desc, \"was sent\")]").isExisting();

        if (chk) {
            console.log("Email was sent successfully");
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
