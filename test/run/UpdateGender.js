import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { goToSettings, login } from './Helper.js';

async function updateGender(driver, gender = "Male") {
    try {

        const connect = await driver.$("xpath://android.widget.Button[contains(@content-desc,'Gender')]");
        await connect.click();

        await driver.pause(3000);

        const genderBtn = await driver.$("accessibility id:" + gender);
        await genderBtn.click();

        await driver.pause(1000);

        const doneBtn = await driver.$("accessibility id:Done");
        await doneBtn.click();


    } catch (error) {
        console.error(`Failed to update.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        await driver.pause(3000);

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }

        await goToSettings(driver);

        const el1 = await driver.$("xpath://android.widget.Button[contains(@content-desc, \"Account Settings \")]");
        await el1.click();
        
        await driver.pause(3000);

        await updateGender(driver);

        await driver.pause(1000);

        let chk = await driver.$("xpath://android.view.View[contains(@content-desc, \"Saved\")]").isExisting();

        if (chk) {
            console.log("Gender saved successfully");
        }
        else    
        {
            console.log(`Failed to update gender.`);
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
