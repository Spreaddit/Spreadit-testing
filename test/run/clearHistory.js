import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login, pressSideMenu, pressBack } from './Helper.js';

// Option not available in the app
async function clearHistory(driver) {
    try {

        const postOverview = await driver.$("id:com.reddit.frontpage:id/link_title");
        await postOverview.click();

        await driver.pause(1000);

        await pressBack(driver);

        await pressSideMenu(driver);

        const historyBtn = await driver.$('xpath://android.widget.TextView[@text="History"]');
        await historyBtn.click();

        await driver.pause(3000);

        const options = await driver.$("accessibility id:More options");
        await options.click();

        await driver.pause(1000);

        const clrHistoryBtn = await driver.$("xpath://android.widget.TextView[@text=\"Clear history\"]");
        await clrHistoryBtn.click();

    } catch (error) {
        console.error(`Failed to save the post.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            // "No_Total3397", "asd123ASD"
            await login(driver); 
            await driver.pause(3000);
        }

        try {
            console.log("Checking a post added to history...");
            await clearHistory(driver);
        } catch (e) {
            console.log("Failed to clear the history.");
            console.error(e);
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
