import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { getToMyProfile, MainActivity, login } from './Helper.js';

async function deletePost(driver)
{
    const postOptions = await driver.$("xpath://android.view.View/android.view.View[contains(@content-desc, 'amiraelgarf')]/following-sibling::*[1]/following-sibling::*[1]");
    await postOptions.click();

    await driver.pause(3000);

    const dltBtn = await driver.$("accessibility id:Delete post");
    await dltBtn.click();
    
    const cnfrmBtn = await driver.$("accessibility id:Delete");
    await cnfrmBtn.click();
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            // "testing5781111", "pass@2024"
            await login(driver);
            await driver.pause(3000);
        }
        
        console.log("Deleting a post...");

        await getToMyProfile(driver);

        await driver.pause(8000);

        await deletePost(driver);

        await driver.pause(3000);

        let chk = await driver.$("xpath://android.view.View[contains(@content-desc, \"deleted\")]").isExisting();

        if (chk) {
            console.log("Post deleted successfully");
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
