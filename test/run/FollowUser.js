import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login, searchForUser, MainActivity } from './Helper.js';

async function manageFollowingUser(driver, user) {
    try {
        const el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Follow')]");
        
        if (await el1.isExisting())
        {
            let txt = await el1.getAttribute("content-desc");

            if (txt == "Follow")
            {
                console.log("Following the user....");
                await el1.click();
            }
            else
            {
                console.log("Unfollowing the user....");
                await el1.click();
            }
        }

        await driver.pause(2000);

        let txt = await driver.$("//android.widget.Button[contains(@content-desc, 'Follow')]").getAttribute("content-desc");

        if (txt == "Following")
        {
            console.log(`Successfully followed user: ${user}`);
        }
        else
        {
            console.log("Failed to follow.");
        }

    } catch (error) {
        console.error(`Failed to follow user: ${user}`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    const userToFollow = "basma12"; // No_Total3397
    try {
        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(6000);
        }

        console.log("Search for the username of the user to follow");
        await searchForUser(driver, userToFollow);

        await driver.pause(5000);

        console.log("Following the user....");
        // Execute scenario 1 (Allowing to follow + unblocking you)
        await manageFollowingUser(driver, userToFollow);
    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
