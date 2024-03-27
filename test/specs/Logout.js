// import { wdOpts } from './config.js';
// import { remote } from 'webdriverio';

async function logout(driver) {
    try {

        // accessibility id:Logged in avatar
        const el6 = await driver.$("id:com.reddit.frontpage:id/nav_icon_clickable_area");
        await el6.click();

        await driver.pause(1500);

        await driver.execute("mobile: clickGesture", {
            x: 13, y: 97
        });

        const el7 = await driver.$('id:com.reddit.frontpage:id/nav_user_name');

        if (await el7.isExisting()) {
            await el7.click();
            console.log("Logging out...");

            await driver.pause(500);

            const el8 = await driver.$("id:com.reddit.frontpage:id/account_remove");
            await el8.click();

            await driver.pause(3000);

            const el9 = await driver.$("id:com.reddit.frontpage:id/confirm_remove_account_logout");
            await el9.click();

            console.log('Logged Out.');
        }
        else {
            console.log("Faild to logout.\n");
        }

    } catch (e) {
        console.error(e);
    }
    finally {
        await driver.pause(3000);
        // await driver.deleteSession();
    }
}

// logout();

export { logout };

// runTest().catch(console.error);