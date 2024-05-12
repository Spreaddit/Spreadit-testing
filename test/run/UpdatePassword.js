import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { goToSettings, MainActivity, login } from './Helper.js';

async function updatePassword(driver, crntPassword, newPassword) {
    try {

        const crntPwdInput = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]");
        await crntPwdInput.click();
        await crntPwdInput.addValue(crntPassword);
        
        const newPwdInput = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]");
        await newPwdInput.click();
        await newPwdInput.addValue(newPassword);

        const cnfrmPwdInput = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[3]");
        await cnfrmPwdInput.click();
        await cnfrmPwdInput.addValue(newPassword);
        
        const resetPwdBtn = await driver.$("accessibility id:Save");
        await resetPwdBtn.click();

    } catch (error) {
        console.error(`Failed to update the password.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    const crntPassword = "12345678";
    const newPassword = "87654321";
    try {

        // await MainActivity(driver);

        // await driver.pause(3000);

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }
        
        await driver.pause(3000);

        await goToSettings(driver);

        const e1 = await driver.$("xpath://android.widget.Button[contains(@content-desc, \"Account Settings \")]");
        await e1.click();

        const e5 = await driver.$("xpath://android.widget.Button[contains(@content-desc, 'Change password')]");
        await e5.click();

        await driver.pause(3000);

        await updatePassword(driver, crntPassword, newPassword);

        const txt = await driver.$("xpath://android.view.View[contains(@content-desc, \"password updated\")]");

        if (await txt.isExisting())
        {
            console.log(`Password updated successfully.`);
        }
        else
        {
            console.log(`Failed: to update password.`);
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
