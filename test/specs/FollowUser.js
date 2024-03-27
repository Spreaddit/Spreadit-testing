import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login } from './LoginWithEmail.js';
import { searchForUser, MainActivity } from './BlockUser.js';

async function manageFollowingUser(driver, user) {
    try {

        const el1 = await driver.$("id:com.reddit.frontpage:id/profile_follow");
        
        if (await el1.isExisting())
        {
            let txt = await el1.getText();

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
        else
        {
            console.log("User does not allow follow.\n");
        }

        await driver.pause(2000);

        let txt = await driver.$("id:com.reddit.frontpage:id/profile_follow").getText();

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
    const userToFollow = "testing5781111";
    try {

        await MainActivity(driver);
        
        await driver.pause(3000);

        let isLogged = 1;
        if (!isLogged) {
            console.log("Logging in first...");
            // "No_Total3397", "asd123ASD"
            await login(2, driver, "testing5781111", "pass@2024"); // 2 for loginWithinTheApp
            await driver.pause(3000);
        }

        console.log("Search for the username of the user to follow");
        await searchForUser(driver, userToFollow);

        await driver.pause(3000);

        // Execute scenario 1 (Allowing to follow + unblocking you)
        await manageFollowingUser(driver, userToFollow);
    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
