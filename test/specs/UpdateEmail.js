import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login } from './LoginWithEmail.js';
import { goToSettings, MainActivity } from './BlockUser.js';

async function updateEmail(driver, newEmail) {
    try {

        const el2 = await driver.$("id:com.reddit.frontpage:id/update_email_new_email");
        await el2.addValue(newEmail);
        // await el2.addValue("body200350@yahoo.com");
        
        const el3 = await driver.$("id:com.reddit.frontpage:id/update_email_password");
        await el3.addValue("asd123ASD");
        
        const el4 = await driver.$("id:com.reddit.frontpage:id/update_email_save");
        await el4.click();

    } catch (error) {
        console.error(`Failed to update the email.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    const newEmail = "abdelrahmanayman3002@gmail.com";
    try {

        await MainActivity(driver);

        await driver.pause(3000);

        let isLogged = 1;
        if (!isLogged) {
            console.log("Logging in first...");
            // "No_Total3397", "asd123ASD"
            await login(2, driver, "No_Total3397", "asd123ASD"); // 2 for loginWithinTheApp
            await driver.pause(3000);
        }

        await goToSettings(driver);

        const e5 = await driver.$("xpath://androidx.recyclerview.widget.RecyclerView[@resource-id=\"com.reddit.frontpage:id/recycler_view\"]/android.view.ViewGroup[1]/android.widget.ImageView[2]");
        await e5.click();

        const el1 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/setting_title\" and @text=\"Update email address\"]");
        await el1.click();

        await driver.pause(3000);

        await updateEmail(driver, newEmail);

        const e1 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/setting_title\" and @text=\"Update email address\"]");
        await e1.click();

        const txt = await driver.$("id:com.reddit.frontpage:id/update_email_email").getText();

        if (txt == newEmail + " (unverified)")
        {
            console.log(`Successfully updated the email.`);
        }
        else
        {
            console.log("Failed to update.");
        }


    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
