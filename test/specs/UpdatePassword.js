import { remote } from 'webdriverio';
import { wdOpts } from '../run/config.js';
import { login } from '../run/LoginWithEmail.js';
import { goToSettings, MainActivity } from '../run/BlockUser.js';

async function updatePassword(driver, newPassword) {
    try {

        const crntPwdInput = await driver.$("id:com.reddit.frontpage:id/reset_password_current");
        await crntPwdInput.addValue("qwer1234QWER");
        
        const newPwdInput = await driver.$("id:com.reddit.frontpage:id/reset_password_new");
        await newPwdInput.addValue(newPassword); // "No_Total3397", "asd123ASD"
        
        const cnewPwdInput = await driver.$("id:com.reddit.frontpage:id/reset_password_confirm");
        await cnewPwdInput.addValue(newPassword);
        
        const resetPwdBtn = await driver.$("id:com.reddit.frontpage:id/reset_password_save");
        await resetPwdBtn.click();

    } catch (error) {
        console.error(`Failed to update the password.`);
        console.error(error);
    }
}

describe("Password Test", async () => {

    it("Update a user password", async () => {
        const driver = await remote(wdOpts);
        const newPassword = "pass@2024";
        try {

            await MainActivity(driver);

            await driver.pause(3000);

            let isLogged = 1;
            if (!isLogged) {
                console.log("Logging in first...");
                // "testing5781111", "pass@2024"
                await login(2, driver, "testing5781111", "pass@2024"); // 2 for loginWithinTheApp
                await driver.pause(3000);
            }

            await goToSettings(driver);

            const e5 = await driver.$("xpath://androidx.recyclerview.widget.RecyclerView[@resource-id=\"com.reddit.frontpage:id/recycler_view\"]/android.view.ViewGroup[1]/android.widget.ImageView[2]");
            await e5.click();

            const el1 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/setting_title\" and @text=\"Change password\"]");
            await el1.click();

            await driver.pause(3000);

            await updatePassword(driver, newPassword);

            // console.log(`Password updated successfully.`);

        } finally {
            // await driver.deleteSession();
        }

    });
});