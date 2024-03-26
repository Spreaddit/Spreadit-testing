const { remote } = require('webdriverio');
const { wdOpts } = require('./config');

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        // accessibility id:Logged in avatar
        const el6 = await driver.$("id:com.reddit.frontpage:id/nav_icon_clickable_area");
        await el6.click();

        await driver.pause(1500);

        await driver.execute("mobile: clickGesture", { 
            x: 79, y: 141
        });

        const el7 = await driver.$('id:com.reddit.frontpage:id/nav_user_name');
        await el7.click();

        await driver.pause(500);

        const el8 = await driver.$("id:com.reddit.frontpage:id/account_remove");
        await el8.click();

        await driver.pause(3000);

        const el9 = await driver.$("id:com.reddit.frontpage:id/confirm_remove_account_logout");
        await el9.click();

        console.log('Logged Out.');

    } finally {
        await driver.pause(3000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);