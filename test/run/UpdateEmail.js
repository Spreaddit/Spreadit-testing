import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { goToSettings, MainActivity, login } from './Helper.js';

async function updateEmail(driver, newEmail, password = "12345678") {
    try {

        await driver.pause(3000);

        const el2 = await driver.$("xpath://android.widget.EditText[contains(@hint, 'New email')]");
        await el2.click();
        await el2.clearValue();
        await driver.pause(1000);
        await el2.addValue(newEmail);
        
        const el3 = await driver.$("xpath://android.widget.EditText[contains(@hint, 'Password')]");
        await el3.click();
        await el3.clearValue();
        await driver.pause(1000);
        await el3.addValue(password);
        
        const el4 = await driver.$("accessibility id:Save");
        await el4.click();

    } catch (error) {
        console.error(`Failed to update the email.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    //amira.elgarf02@eng-st.cu.edu.eg abdelrahmanayman3002@gmail.com Farouqdiaaeldin@gmail.com
    const newEmail = "abdelrahmanayman3002@gmail.com";
    try {

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            // "No_Total3397", "asd123ASD"
            await login(driver);
            await driver.pause(3000);
        }

        await goToSettings(driver);

        const e5 = await driver.$("xpath://android.widget.Button[contains(@content-desc, \"Account Settings \")]");
        await e5.click();

        const el1 = await driver.$("//android.widget.Button[contains(@content-desc, 'Update email')]");
        await el1.click();

        await driver.pause(3000);

        await updateEmail(driver, newEmail);

        await driver.pause(3000);

        await driver.pressKeyCode(4);

        const e1 = await driver.$("xpath://android.widget.Button[contains(@content-desc, \"Account Settings \")]");
        await e1.click();

        const txt = await driver.$("//android.widget.Button[contains(@content-desc, '" + newEmail + "')]");

        if (await txt.isExisting())
        {
            console.log(`Successfully updated the email.`);
        }
        else
        {
            console.log("Failed to update the email.");
        }

        const emailBtn = await driver.$("//android.widget.Button[contains(@content-desc, 'Update email')]");
        await emailBtn.click();

        // Update with invalid email
        await driver.pause(3000);

        await updateEmail(driver, "invalid3mail.com");

        let chk = await driver.$("xpath://android.view.View[contains(@content-desc, \"Enter a valid email\")]").isExisting();

        if (chk)
            {
            console.log("Passed: Update with invalid email.");
        }
        else 
        {
            console.log("Failed: Update with invalid email.");
        }

        // Update with invalid password
        await driver.pause(3000);

        await updateEmail(driver, newEmail, "invalid");

        chk = await driver.$("xpath://android.view.View[contains(@content-desc, \"Enter a valid password\")]").isExisting();

        if (chk) 
            {
            console.log("Passed: Update with invalid password.");
        }
        else 
        {
            console.log("Failed: Update with invalid password.");
        }

        /*
        MAYBE TODO:
        - Update with the same email (failed) - Not supposed to be allowed
        - Update with invalid email (passed)
        - Update with invalid password (passed)
        - Update with empty email (same as invalid email)
        - Update with empty password (same as invalid password)
        - Update with other user's email (failed) - Not supposed to be allowed
        */

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
