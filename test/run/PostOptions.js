import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login } from './Helper.js';

async function updvote(driver)
{
    const upvoteBtn = await driver.$("//android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[1]");
    await upvoteBtn.click();
}

async function downvote(driver)
{
    const downvoteBtn = await driver.$("//android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[2]");
    await downvoteBtn.click();
}

async function share(driver)
{
    const shareBtn = await driver.$("//android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[4]");
    await shareBtn.click();
}

async function join(driver)
{
    const joinBtn = await driver.$("(//android.widget.Button[@content-desc='Join'])[1]");
    await joinBtn.click();
}

async function unjoin(driver)
{
    const unjoinBtn = await driver.$("(//android.widget.Button[@content-desc='Joined'])[1]");
    await unjoinBtn.click();

    await driver.pause(3000);

    const confirmBtn = await driver.$("accessibility id:Leave");
    await confirmBtn.click();
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
        
        console.log("Upvoting a post...");

        await driver.pause(3000);

        await updvote(driver);
        
        await driver.pause(3000);

        console.log("Downvoting a post...");

        await downvote(driver);
        
        await driver.pause(3000);

        console.log("Sharing a post...");

        await share(driver);

        await driver.pressKeyCode(4);

        await driver.pause(3000);

        console.log("Joining a group...");

        await join(driver);

        await driver.pause(3000);

        console.log("Unjoining a group...");

        await unjoin(driver);

        await driver.pause(3000);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
