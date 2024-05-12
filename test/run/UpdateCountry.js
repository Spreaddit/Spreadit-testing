import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { goToSettings, login } from './Helper.js';

async function updateCountry(driver, country = "Germany") {
    try {

        const connect = await driver.$("xpath://android.widget.Button[contains(@content-desc,'Location')]");
        await connect.click();

        await driver.pause(3000);

        const countryBtn = await driver.$("accessibility id:" + country);
        await countryBtn.click();

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

        let country = "Egypt";

        await updateCountry(driver, country);

        await driver.pause(1000);

        let chk = await driver.$("xpath://android.widget.Button[contains(@content-desc, '" + country + "')]").isExisting();

        if (chk) {
            console.log("Country updated successfully");
        }
        else    
        {
            console.log(`Failed to update country.`);
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
