import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { MainActivity, login, pressOnProfileMenue, searchForUser } from './Helper.js';

// const userProfile = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.Button[2]");
// await userProfile.click();

async function reportProfile(driver, reportType = 'Harassment')
{
    await pressOnProfileMenue(driver);

    await driver.pause(3000);

    const reportBtn = await driver.$("accessibility id:Report a profile");
    await reportBtn.click();

    await driver.pause(3000);

    const issue = await driver.$("xpath://android.widget.RadioButton[@content-desc='Username']");
    await issue.click();
    
    const nextBtn = await driver.$("accessibility id:Next");
    await nextBtn.click();
    await driver.pause(3000);

    const issue2 = await driver.$("xpath://android.view.View[contains(@content-desc, '" + reportType + "')]");
    await issue2.click();
    
    const nextBtn2 = await driver.$("accessibility id:Next");
    if (await nextBtn2.isExisting())
    {
        await nextBtn2.click();
        await driver.pause(3000);
    }
    
    const submitBtn = await driver.$("accessibility id:Submit Report");
    await submitBtn.click();

    await driver.pause(3000);

    const doneBtn = await driver.$("accessibility id:Done");
    await doneBtn.click();
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }
        
        console.log("Reporting a profile that braeks the community rules...");

        await driver.pause(5000);

        await searchForUser(driver, "abdullah12");

        await driver.pause(9000);

        // (Failed) it works without choosing a rule.
        await reportProfile(driver);
        
        await driver.pause(5000);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
