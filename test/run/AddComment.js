import { wdOpts } from './config.js';
import { remote } from 'webdriverio';
import { login } from './Helper.js';

async function addComment(driver, type = 'text', txt = 'text comment', link = 'https://www.google.com', reply = false) {

    if (reply) {
        const el3 = await driver.$("xpath://android.widget.Button[@content-desc='Reply'][1]");
        el3.click();
        await driver.pause(2000);
    }

    if (type == 'text') {
        const el1 = await driver.$("class name:android.widget.EditText");
        await el1.click();
        await driver.pause(2000);
        await el1.addValue("text comment");

        const el2 = await driver.$("accessibility id:Post");
        await driver.pause(2000);
        await el2.click();
    }

    if (type == 'link') {
        const el6 = await driver.$("xpath://android.widget.EditText/android.widget.Button[1]");
        await el6.click();

        await driver.pause(2000);

        const el7 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.widget.EditText[1]");
        await el7.click();
        await driver.pause(2000);
        await el7.addValue(txt);
        
        const el8 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.widget.EditText[2]");
        await el8.click();
        await driver.pause(2000);
        await el8.addValue(link);

        const el9 = await driver.$("accessibility id:Add link");
        await el9.click();
        
        await driver.pause(2000);

        const el10 = await driver.$("accessibility id:Post");
        await el10.click();
    }

    if (type == 'image') {
        const el11 = await driver.$("xpath://android.widget.EditText/android.widget.Button[2]");
        await el11.click();
        
        await driver.pause(2000);

        const el12 = await driver.$("id:com.google.android.providers.media.module:id/icon_thumbnail");
        await el12.click();
        
        const el13 = await driver.$("class name:android.widget.EditText");
        await driver.pause(2000);
        await el13.click();
        await el13.addValue("img comment");

        const el14 = await driver.$("accessibility id:Post");
        await el14.click();
        await el14.click();
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let isLogged = 0;
        if (await !isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }

        await driver.pause(5000);

        const postcard = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]");
        await postcard.click();

        await driver.pause(15000);

        console.log("Adding a text comment...");
        await addComment(driver, 'text', 'text only comment');

        await driver.pause(7000);
        
        console.log("Adding a en empty link...");
        // Failed: Empty link
        await addComment(driver, 'link', '', '');
        
        await driver.pause(7000);
        
        console.log("Adding a link...");
        // Failed: link
        await addComment(driver, 'link');

        await driver.pause(7000);
        
        console.log("Adding an image...");
        // Failed: image
        await addComment(driver, 'image');

        await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)');

    } finally {
        await driver.pause(3000);
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);