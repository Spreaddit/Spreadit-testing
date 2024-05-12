import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { goToSettings, login } from './Helper.js';

// Does not work
async function connectGmail(driver) {
    try {

        const connect = await driver.$("accessibility id:Connect");
        await connect.click();

        await driver.pause(3000);

        const email = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.google.android.gms:id/account_name\" and @text=\"abdelrahmanayman3002@gmail.com\"]");
        await email.click();


    } catch (error) {
        console.error(`Failed to toggle.`);
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

        await connectGmail(driver);

        console.log(`Failed to connect.`);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
