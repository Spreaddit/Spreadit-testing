const { remote } = require('webdriverio');
const { wdOpts } = require('./config');

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        const el1 = await driver.$("id:com.reddit.frontpage:id/email_button");
        await el1.click();

        const el2 = await driver.$("id:com.reddit.frontpage:id/email");
        await el2.addValue("abdelrahmanayman3002@gmail.com");

        const el4 = await driver.$("id:com.reddit.frontpage:id/password");
        await el4.addValue("pass@2024");

        const el3 = await driver.$("id:com.reddit.frontpage:id/username");
        await el3.addValue("testing57811111");

        await driver.pause(3000);

        const el5 = await driver.$("id:com.reddit.frontpage:id/confirm");
        await el5.click();

        await driver.pause(6000);

        const el10 = await driver.$("id:com.reddit.frontpage:id/action_skip");
        await el10.click();

        console.log('Account created successfully.');

        const el6 = await driver.$("accessibility id:Logged in avatar");
        await el6.click();

        await driver.pause(500);

        const el7 = await driver.$("id:com.reddit.frontpage:id/nav_user_name_container");
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
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);