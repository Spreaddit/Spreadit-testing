import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { MainActivity, login } from './Helper.js';

async function reportPost(driver, reportType = 'Breaks')
{
    const postOptions = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.Button[2]");
    await postOptions.click();

    await driver.pause(3000);

    const reportBtn = await driver.$("accessibility id:Report");
    await reportBtn.click();

    await driver.pause(3000);

    const issue = await driver.$("xpath://android.view.View[contains(@content-desc, '" + reportType + "')]");
    await issue.click();
    
    const nextBtn = await driver.$("accessibility id:Next");
    if (await nextBtn.isExisting())
    {
        await nextBtn.click();
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
        
        console.log("Reporting a post that braeks the community rules...");

        await driver.pause(5000);

        // (Failed) it works without choosing a rule.
        await reportPost(driver);

        await MainActivity(driver);

        await driver.pause(5000);

        console.log("Reporting a post that contains hate speech...");
        await driver.pause(3000);
        
        await reportPost(driver, 'Hate');
        
        await driver.pause(3000);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
