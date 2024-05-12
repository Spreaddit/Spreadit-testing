import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { goToSettings, login } from './Helper.js';

async function toggleNotifications(driver) {
    try {

        const privateMsgsBtn = await driver.$("xpath://android.widget.Button[@content-desc='Private messages']");
        await privateMsgsBtn.click();

        const chatMsgsBtn = await driver.$("xpath://android.widget.Button[@content-desc='Chat messages']");
        await chatMsgsBtn.click();

        const chatRequestsBtn = await driver.$("xpath://android.widget.Button[@content-desc='Chat requests']");
        await chatRequestsBtn.click();
        
        await chatRequestsBtn.click();
        await chatMsgsBtn.click();
        await privateMsgsBtn.click();
        
        const mentionsBtn = await driver.$("xpath://android.widget.Button[@content-desc='Mentions of u/username']");
        await mentionsBtn.click();

        const commentsBtn = await driver.$("xpath://android.widget.Button[@content-desc='Comments on your posts']");   
        await commentsBtn.click();

        const postUpvotesBtn = await driver.$("xpath://android.widget.Button[@content-desc='Upvotes on your posts']");
        await postUpvotesBtn.click();

        const commentUpvotesBtn = await driver.$("xpath://android.widget.Button[@content-desc='Upvotes on your comments']");
        await commentUpvotesBtn.click();

        const repliesBtn = await driver.$("xpath://android.widget.Button[@content-desc='Replies to your comments']");
        await repliesBtn.click();

        const newFollowerBtn = await driver.$("xpath://android.widget.Button[@content-desc='New followers']");
        await newFollowerBtn.click();

        await newFollowerBtn.click();
        await repliesBtn.click();
        await commentUpvotesBtn.click();
        await postUpvotesBtn.click();
        await commentsBtn.click();
        await mentionsBtn.click();

        await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)');

        const cakeDayBtn = await driver.$("xpath://android.widget.Button[@content-desc='Cake day']");
        await cakeDayBtn.click();
        await cakeDayBtn.click();

        const ModBtn = await driver.$("xpath://android.widget.Button[@content-desc='Mod notifications']");
        await ModBtn.click();
        await ModBtn.click();

    } catch (error) {
        console.error(`Failed to toggle.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        await driver.pause(3000);

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            // "testing5781111", "pass@2024"
            await login(driver); // 2 for loginWithinTheApp
            await driver.pause(3000);
        }

        await goToSettings(driver);

        const el1 = await driver.$("xpath://android.widget.Button[contains(@content-desc, \"Account Settings \")]");
        await el1.click();

        const el2 = await driver.$("accessibility id:Manage notifications");
        await el2.click();
        
        await driver.pause(3000);

        await toggleNotifications(driver);

        console.log(`Notifications toggled, however it is still needed to check that you don't get notified.`);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
