import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { getToMyProfile, MainActivity, login } from './Helper.js';

async function editPost(driver, text)
{
    const postOptions = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.Button[2]");
    await postOptions.click();

    await driver.pause(3000);

    const editBtn = await driver.$("accessibility id:Edit post");
    await editBtn.click();

    const descriptionField = await driver.$("class name:android.widget.EditText");
    await descriptionField.click();
    await driver.pause(1000);
    
    await descriptionField.clearValue();
    await driver.pause(1000);
    await descriptionField.addValue(text);
    
    const saveBtn = await driver.$("accessibility id:Save");
    await saveBtn.click();
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        await MainActivity(driver);

        await driver.pause(3000);

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            // "testing5781111", "pass@2024"
            await login(driver);
            await driver.pause(3000);
        }
        
        console.log("Editing a post...");

        await getToMyProfile(driver);

        await driver.pause(9000);

        await editPost(driver, "This is an edited post");

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
