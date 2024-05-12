import { wdOpts } from './config.js';
import { remote } from 'webdriverio';

async function logout(driver) {
    try {

        // await driver.execute("mobile: clickGesture", {
        //     x: 13, y: 97
        // });

        const el4 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[4]");
        await el4.click();

        const el5 = await driver.$("accessibility id:Log out");
        await el5.click();

        if (await driver.$("xpath://android.widget.Button[@content-desc=\"Continue with email\"]").isExisting())
        {
            console.log("Pass: Logout successful!");
        }    
        else
        {
            console.log("Fail: Logout failed!");
        }
    } catch (e) {
        console.error(e);
    }
    finally {
        await driver.pause(3000);
        // await driver.deleteSession();
    }
}

// logout(await remote(wdOpts));

export { logout };