import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login, pressSideMenu } from './Helper.js';

// Does not work
async function createCommunity(driver, options) {
    try {

        const createBtn = await driver.$("accessibility id:Create a community");
        await createBtn.click();

        const name = await driver.$("class name:android.widget.EditText");
        await name.click();
        await name.clearValue();
        await driver.pause(2000);
        await name.addValue(options.name);

        const typeBtn = await driver.$("//android.view.View[@content-desc='Community type']/following-sibling::*[1]");
        await typeBtn.click();

        await driver.pause(3000);
        
        const type = await driver.$("//android.view.View[contains(@content-desc, '"+ options.type + "')]");
        await type.click();
        
        if (options.nsfw) {
            const adults = await driver.$("//android.widget.Switch[contains(@content-desc, '18+')]");
            await adults.click();
        }
        
        const create = await driver.$("accessibility id:Create community");
        await create.click();

    } catch (error) {
        console.error(`Failed to create.`);
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

        await pressSideMenu(driver);

        await driver.pause(3000);

        const el1 = await driver.$("xpath://android.view.View[@content-desc='Create a community']");
        await el1.click();
        
        await driver.pause(3000);

        let options = {
            name: "TestCommunity2",
            type: "Private", // Public, Private, Restricted
            nsfw: true
        }

        await createCommunity(driver, options);

        await driver.pause(1000);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
