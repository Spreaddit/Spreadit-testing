import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { pressSideMenu, pressBack, login, MainActivity, postInfo } from './Helper.js';

async function savePost(driver) {
    try {

        const postOptions = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.Button[2]");
        await postOptions.click();

        const saveBtn = await driver.$("xpath://android.view.View[@content-desc='Save']");
        await saveBtn.click();

        await driver.pause(2000);

    } catch (error) {
        console.error(`Failed to save the post.`);
        console.error(error);
    }
}

async function unsaveComment(driver, username = 'galal12') {
    try {

        const postOptions = await driver.$("xpath://android.view.View[*[contains(@content-desc, '" + username + "')]]/android.widget.Button[1]");
        await postOptions.click();

        const unsaveBtn = await driver.$("xpath://android.view.View[@content-desc='Unsave']");
        await unsaveBtn.click();

        await driver.pause(2000);

    } catch (error) {
        console.error(`Failed to unsave the comment.`);
        console.error(error);
    }
}

async function unsavePost(driver, username) {
    try {

        const postOptions = await driver.$("xpath://android.view.View[*[contains(@content-desc, '" + username + "')]]/android.widget.Button[2]");
        await postOptions.click();

        const unsaveBtn = await driver.$("xpath://android.view.View[@content-desc='Unsave']");
        await unsaveBtn.click();

        await driver.pause(2000);

    } catch (error) {
        console.error(`Failed to unsave the post.`);
        console.error(error);
    }
}

async function saveOpenedPost(driver, username) {
    try {

        const postcard = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]");
        await postcard.click();

        await driver.pause(1000);

        const postOptions = await driver.$("xpath://android.view.View[*[contains(@content-desc, '" + username + "')]]/android.widget.Button[2]");
        await postOptions.click();

        const saveBtn = await driver.$("xpath://android.view.View[@content-desc='Save']");
        await saveBtn.click();

        await driver.pause(2000);

    } catch (error) {
        console.error(`Failed to save the post.`);
        console.error(error);
    }
}

async function saveComment(driver) {
    try {

        const postcard = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]");
        await postcard.click();

        await driver.pause(20000);

        const postOptions = await driver.$("xpath://android.view.View[*[contains(@content-desc, 'galal12')]]/android.widget.Button[2]");
        await postOptions.click();

        const saveBtn = await driver.$("xpath://android.view.View[@content-desc='save']");
        await saveBtn.click();

        await driver.pause(2000);

    } catch (error) {
        console.error(`Failed to save the post.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        // await MainActivity(driver);

        // await driver.pause(3000);

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }

        // try {
        //     console.log("Saving a post...");

        //     let info = await postInfo(driver);

        //     let community = info[0],
        //         username = info[1];

        //     await savePost(driver);

        //     await driver.pause(2000);

        //     await pressSideMenu(driver);

        //     const savedBtn = await driver.$("accessibility id:Saved");
        //     await savedBtn.click();

        //     await driver.pause(3000);

        //     const el0 = await driver.$("accessibility id:" + community).isExisting();
        //     const el1 = await driver.$("accessibility id:" + username).isExisting();

        //     if (el0 && el1)
        //     {
        //         console.log("Post added to the list.");
        //     }
        //     else
        //     {
        //         console.log("Faild to save the post.");
        //     }

        //     await driver.pause(1000);

        //     await unsavePost(driver, username);


        // } catch (e) {
        //     console.log("Failed to save the post.");
        //     console.error(e);
        // }

        // await driver.pause(3000);

        // await MainActivity(driver);

        // await driver.pause(5000);

        // try {
        //     console.log("Saving an opened post...");

        //     let info = await postInfo(driver);

        //     let community = info[0],
        //         username = info[1];

        //     await saveOpenedPost(driver, username);

        //     await driver.pause(2000);

        //     await pressBack(driver);

        //     await driver.pause(2000);

        //     await pressSideMenu(driver);

        //     const savedBtn = await driver.$("accessibility id:Saved");
        //     await savedBtn.click();

        //     await driver.pause(3000);

        //     const el0 = await driver.$("accessibility id:" + community).isExisting();
        //     const el1 = await driver.$("accessibility id:" + username).isExisting();

        //     if (el0 && el1)
        //     {
        //         console.log("Post added to the list.");
        //     }
        //     else
        //     {
        //         console.log("Faild to save the post.");
        //     }

        //     await driver.pause(1000);

        //     await unsavePost(driver, username);

        // } catch (e) {
        //     console.log("Failed to save the post.");
        //     console.error(e);
        // }

        // await driver.pause(3000);

        // await MainActivity(driver);

        // await driver.pause(5000);

        try {
            console.log("Saving a comment...");

            let info = await postInfo(driver);

            let community = info[0],
                username = info[1];

            await saveComment(driver);

            await driver.pause(2000);

            await pressBack(driver);

            await driver.pause(2000);

            await pressSideMenu(driver);

            const savedBtn = await driver.$("accessibility id:Saved");
            await savedBtn.click();

            await driver.pause(3000);

            const comments = await driver.$("accessibility id:Comments");
            await comments.click();

            await driver.pause(3000);

            const el0 = await driver.$("//android.view.View[contains(@content-desc, '" + community + "')]").isExisting();
            const el1 = await driver.$("//android.view.View[contains(@content-desc, 'galal12')]").isExisting();

            if (el0 && el1)
            {
                console.log("Comment added to the list.");
            }
            else
            {
                console.log("Faild to save the comment.");
            }

            await driver.pause(1000);

            await unsaveComment(driver);

        } catch (e) {
            console.log("Failed to save the comment.");
            console.error(e);
        }

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
