// const { remote } = require('webdriverio');
// const { wdOpts } = require('./config');

export async function login(driver) {

    await driver.pause(5000);
    try {
        const el = await driver.$("id:com.android.permissioncontroller:id/permission_allow_button");
        // e1.waitForExist({ timeout: 10000 });
        await el.click();
    } catch(e) {
        await driver.pause(7000);
    }

    let el1;
    try {
        el1 = await driver.$("id:com.reddit.frontpage:id/sso_login_button");
        await el1.click();
    } catch (e) {
        // console.log(e);
        
        try {
            const el6 = await driver.$("~Profile avatar");
            await el6.click();
        } catch(e)
        {
            console.log("Logged in already.");
            return;
        }

        await driver.pause(1500);

        let el1 = await driver.$("id:com.reddit.frontpage:id/drawer_nav_item_title");
        await el1.click();
        
        el1 = await driver.$("id:com.reddit.frontpage:id/login_cta");
        await el1.click();
    }

    await driver.pause(2500);

    try {
        const el2 = await driver.$("id:com.reddit.frontpage:id/username");
        await el2.addValue("testing5781111");

        const el3 = await driver.$("id:com.reddit.frontpage:id/password");
        await el3.addValue("pass@2024");

        const el4 = await driver.$("id:com.reddit.frontpage:id/confirm");
        await el4.click();

        await driver.pause(2000);
    } catch(e)
    {
        await driver.pause(2000);
        const el2 = await driver.$("xpath://androidx.recyclerview.widget.RecyclerView[@resource-id=\"com.reddit.frontpage:id/account_picker_accounts\"]/android.view.ViewGroup[1]");
        await el2.click();
    }

    console.log('Logged in successfully.');
}

// async function runTest() {
//     const driver = await remote(wdOpts);
//     try {

//         await login(driver);

//     } finally {
//         await driver.pause(3000);
//         await driver.deleteSession();
//     }
// }

// runTest().catch(console.error);

// module.exports = login;

export default login;