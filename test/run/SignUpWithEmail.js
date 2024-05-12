import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { MainActivity, login } from './Helper.js';

async function SignUpWithGoogle(driver, username, email = "quarnwebsender@gmail.com") {
    const el1 = await driver.$("accessibility id:Continue with Google");
    await el1.click();
    
    await driver.pause(3000);

    const el2 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.google.android.gms:id/account_name\" and @text=\"" + email + "\"]");
    await el2.click();

    await driver.pause(3000);
    
    const el5 = await driver.$("accessibility id:Continue");
    await el5.click();

}

async function SignUpWithEmail(driver, username, email) {
    const el1 = await driver.$("accessibility id:Continue with email");
    await el1.click();

    const el2 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[1]");
    await el2.click();
    await driver.pause(1000);
    await el2.addValue(email);

    const el4 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[2]");
    await el4.click();
    await driver.pause(1000);
    await el4.addValue("12345678");

    await driver.pause(3000);

    const el5 = await driver.$("accessibility id:Continue");
    await el5.click();

    await driver.pause(3000);

    const el3 = await driver.$("xpath://android.widget.EditText");
    await el3.click();
    await driver.pause(1000);
    await el3.addValue(username);

    await el5.click();

    await driver.pause(3000);

    let created = await driver.$("accessibility id:Verify Your Email").isExisting();
    if (created) {
        console.log('Account created successfully.');
    }
    else {
        console.log('Account creation failed.');
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let username = "testingy1";
        let email = "fakesss@gmail.com";

        await SignUpWithEmail(driver, username, email);

        await driver.pause(3000);

        await MainActivity(driver);

        await driver.pause(3000);

        await login(driver, username, "12345678");

        await driver.pause(5000);

        await MainActivity(driver);

        // Same email and usrename
        await SignUpWithEmail(driver, username, email);

        await driver.pause(3000);

        await MainActivity(driver);

        // Same email different usrename
        await SignUpWithEmail(driver, "username11", email);

    } finally {
        await driver.pause(3000);
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);