import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login, MainActivity } from './Helper.js';

async function openMessage(driver, options) {
    try {

        const inbox = await driver.$("xpath://android.view.View[contains(@content-desc, 'Inbox')]");
        await driver.pause(1000);
        await inbox.click();
        
        const msgs = await driver.$("accessibility id:Messages");
        await msgs.click();

        await driver.pause(5000);

        const messageBox = await driver.$("xpath://android.view.View[contains(@content-desc, '" + options.username + "')][1]");
        await driver.pause(1000);
        await messageBox.click();
        
        const replyBtn = await driver.$("accessibility id:Reply To Message");
        await replyBtn.click();
        
        const txt = await driver.$("class name:android.widget.EditText");
        await txt.click();
        await driver.pause(1000);
        await txt.addValue(options.msg);
        
        await driver.pause(1000);
        
        const sendBtn = await driver.$("accessibility id:SEND");
        await sendBtn.click();


    } catch (error) {
        console.error(`Failed to post.`);
        console.error(error);
    }
}

async function sendMessage(driver, options) {
    try {

        const inbox = await driver.$("xpath://android.view.View[contains(@content-desc, 'Inbox')]");
        await inbox.click();

        await driver.pause(1000);

        const menu = await driver.$("xpath://android.view.View/android.view.View[contains(@content-desc, 'Inbox')]/following-sibling::*[1]");
        await menu.click();

        await driver.pause(1000);

        const newMsgBtn = await driver.$("accessibility id:New Message");
        await newMsgBtn.click();

        await driver.pause(1000);

        const username = await driver.$("//android.widget.Button[@content-desc='SEND']/following-sibling::*[1]");
        await username.click();
        await driver.pause(1000);
        await username.clearValue();
        await username.addValue(options.username);

        await driver.pause(1000);

        const subject = await driver.$("//android.widget.Button[@content-desc='SEND']/following-sibling::*[1]/following-sibling::*[1]/following-sibling::*[1]");
        await subject.click();
        await driver.pause(1000);
        await subject.addValue(options.subject);

        await driver.pause(1000);

        await driver.pressKeyCode(4);
        
        await driver.pause(1000);

        const messageBox = await driver.$("xpath://android.widget.Button[@content-desc='SEND']/following-sibling::*[1]/following-sibling::*[1]/following-sibling::*[1]/following-sibling::*[1]");
        await messageBox.click();
        await driver.pause(1000);
        await messageBox.addValue(options.msg);
        
        await driver.pause(1000);
        
        const sendBtn = await driver.$("accessibility id:SEND");
        await sendBtn.click();


    } catch (error) {
        console.error(`Failed to post.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let isLogged = 1;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }

        console.log("Sending a message...");

        // let options = {
        //     username: "abdullah12",
        //     subject: "My terrible subject",
        //     msg: "Hello, this is a test message."
        // };

        // await sendMessage(driver, options);

        console.log("Replying to a message...");

        let options = {
            username: "abdullah12",
            msg: "Hello, this is a test reply."
        };

        await openMessage(driver, options);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
