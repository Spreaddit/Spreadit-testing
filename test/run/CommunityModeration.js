import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { logout } from './Logout.js';
import { login, searchFor, moveSeekBar, MainActivity } from './Helper.js';

// Discovery does not work
// Contetn Tags does not work
// Can not post or schedule post by any moderator unless approved.
// Can not schedule Spoiler tagged posts
// No search for moderators
// Could not find the location of the subbreddit

async function changeDescription(driver, set = true, description = "") {
    try {

        const descriptionBtn = await driver.$("accessibility id:Description");
        await descriptionBtn.click();

        const txtBox = await driver.$("class name:android.widget.EditText");
        await txtBox.click();

        if (set) {
            await txtBox.clearValue();
            await driver.pause(2000);
            await txtBox.addValue(description);
        }

        let txt = await txtBox.getText();

        await driver.pause(1000);

        if (set) {
            const save = await driver.$("accessibility id:Save");
            await save.click();
        }
        else {
            await driver.$("xpath://android.widget.Button[1]").click();
        }

        return txt;

    } catch (error) {
        console.error(`Failed to create.`);
        console.error(error);
    }
}

async function changeCommunityType(driver, type = 0, adult = false) {
    try {

        const btn = await driver.$("accessibility id:Community type");
        await btn.click();

        await driver.pause(3000);

        // 0 for public, 0.5 for restricted ,0.9 for private
        await moveSeekBar(driver, "xpath://android.widget.SeekBar", type);

        await driver.pause(2000);

        let element = await driver.$("//android.widget.Switch");

        if (adult) {
            if (await element.getAttribute("checked") != "true") {
                await element.click();
            }
        }
        else {
            if (await element.getAttribute("checked") != "false") {
                await element.click();
            }
        }

        await driver.pause(1000);

        const save = await driver.$("accessibility id:Save");
        await save.click();

        await driver.pause(3000);

    } catch (error) {
        console.error(`Failed to create.`);
        console.error(error);
    }
}

async function changePostTypes(driver, set = true, option = "any", polls = true) {
    try {

        const btn = await driver.$("accessibility id:Post types");
        await btn.click();

        await driver.pause(3000);

        let txt = '';

        if (set) {
            const slctBox = await driver.$("xpath://android.widget.Button[contains(@content-desc, 'Post Options')]");
            await slctBox.click();

            await driver.pause(2000);

            await driver.$("accessibility id:" + option).click();

            await driver.pause(1000);
        }
        else {
            txt = await driver.$("xpath://android.widget.Button[contains(@content-desc, '" + option + "')]").isExisting();
        }

        let element = await driver.$("//android.widget.Switch");

        if (polls) {
            if (await element.getAttribute("checked") != "true") {
                await element.click();
            }
        }
        else {
            if (await element.getAttribute("checked") != "false") {
                await element.click();
            }
        }

        await driver.pause(1000);

        const save = await driver.$("accessibility id:Save");
        await save.click();

        await driver.pause(3000);

        return txt;

    } catch (error) {
        console.error(`Failed to Save.`);
        console.error(error);
    }
}
/*
    options = {
        title: "Title",
        text: "Text",
        spoiler: true,
        nsfw: false
    }
*/
async function schedulePost(driver, options) {
    try {

        await driver.pause(500);

        const createBtn = await driver.$("xpath://android.widget.ScrollView/following-sibling::*[1]");
        await createBtn.click();

        const tags = await driver.$("accessibility id:Add tags");
        await tags.click();
        await driver.pause(1000);

        if (options.hasOwnProperty("spoiler") && options.spoiler) {
            const spoiler = await driver.$("xpath://android.view.View/android.widget.Switch[1]");
            await spoiler.click();
        }

        if (options.hasOwnProperty("nsfw") && options.nsfw) {
            const nsfw = await driver.$("xpath://android.view.View/android.widget.Switch[2]");
            await nsfw.click();
        }

        await driver.$("class name:android.widget.Button").click();

        const title = await driver.$("xpath://android.widget.EditText[contains(@hint, 'Title')]");
        await title.click();
        await driver.pause(1000);
        await title.addValue(options.title);
        await driver.pause(1000);

        if (options.hasOwnProperty("text")) {
            const txt = await driver.$("xpath://android.widget.EditText[contains(@hint, 'body text (optional)')]");
            await txt.click();
            await driver.pause(1000);
            await txt.addValue(options.text);
        }

        const scheduleBtn = await driver.$("//android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[2]");
        await scheduleBtn.click();

        await driver.pause(1000);

        await driver.$("xpath://android.view.View[@content-desc='Schedule Post']").click();

        await driver.pause(1000);

        await driver.$("//android.view.View[@content-desc='Starts on date']/android.widget.Button").click();

        await driver.$("accessibility id:17, Friday, May 17, 2024").click();

        await driver.$("accessibility id:OK").click();

        await driver.pause(1000);

        await driver.$("accessibility id:Save").click();

        await driver.pause(1000);

        await driver.pressKeyCode(4);

        await driver.pause(1000);

        await driver.$("accessibility id:Schedule").click();

        await driver.pause(1000);

    } catch (error) {
        console.error(`Failed to post.`);
        console.error(error);
    }
}

async function checkScheduledPosts(driver) {
    try {

        const btn = await driver.$("//android.widget.Button[@content-desc='Scheduled posts']");
        await btn.click();

        await driver.pause(3000);

    } catch (error) {
        console.error(`Failed to Save.`);
        console.error(error);
    }
}

// state = "add" or "remove"
async function manageMod(driver, state = "add", username = "farouq12", permissions = {}) {
    try {
        
        await driver.$("//android.widget.Button[@content-desc='Moderators']").click();

        await driver.pause(2000);

        if (state == "add") {

            await driver.$("//android.view.View[contains(@content-desc, 'Moderators')]/following-sibling::*[1]/following-sibling::*[1]").click();
            
            await driver.pause(2000);

            let usernameBox = await driver.$("//*[contains(@hint, 'Enter Username')]/parent::*");
            await usernameBox.click();
            await usernameBox.click();
            await driver.pause(2000);
            usernameBox = await driver.$("//android.widget.EditText");
            await usernameBox.clearValue();
            await usernameBox.addValue(username);

            if (permissions.ManagePostsComments == false) {
                await driver.$("//android.widget.CheckBox[@content-desc='Manage Posts and Comments']").click();
            }

            if (permissions.ManageUsers == false) {
                await driver.$("//android.widget.CheckBox[@content-desc='Manage Users']").click();
            }

            if (permissions.ManageSettings == false) {
                await driver.$("//android.widget.CheckBox[@content-desc='Manage Settings']").click();
            }

            await driver.pause(2000);

            await driver.$("accessibility id:Add").click();

        }

        if (state == "remove") {

            await driver.$("accessibility id:Editable").click();
            
            await driver.pause(2000);

            await driver.$("//android.view.View[contains(@content-desc, '" + username + "')]/android.widget.Button").click();
            
            await driver.pause(2000);

            await driver.$("accessibility id:Remove").click();

        }

    } catch (error) {
        console.error(`Failed to create.`);
        console.error(error);
    }
}

async function acceptCommunityInvite(driver, community) {

    const inbox = await driver.$("xpath://android.view.View[contains(@content-desc, 'Inbox')]");
    await inbox.click();

    await driver.pause(2000);

    await driver.$("(//android.widget.Button[@content-desc='Accept invitation'])[1]").click();

    await driver.pause(2000);

    await driver.$("accessibility id:Accept").click();

}

async function approveUser(driver, username, action = "approve") {

    try {
        
        await driver.$("//android.widget.Button[@content-desc='Approved users']").click();

        await driver.pause(2000);

        if (action == "approve") {

            await driver.$("//android.view.View[contains(@content-desc, 'Approved Users')]/following-sibling::*[1]").click();
            
            await driver.pause(2000);

            let usernameBox = await driver.$("//android.widget.EditText");
            await usernameBox.click();
            await driver.pause(2000);
            await usernameBox.clearValue();
            await usernameBox.addValue(username);

            await driver.pause(2000);

            await driver.$("accessibility id:Add").click();

        }

        if (action == "remove") {

            let usernameBox = await driver.$("//android.widget.EditText");
            await usernameBox.click();
            await usernameBox.clearValue();
            await usernameBox.addValue(username);
            
            await driver.pause(2000);

            await driver.$("//android.view.View[contains(@content-desc, '" + username + "')]/android.widget.Button").click();
            
            await driver.pause(2000);

            await driver.$("accessibility id:Remove").click();

            await driver.pause(2000);
            
            await driver.$("accessibility id:Remove").click();

        }

    } catch (error) {
        console.error(`Failed to create.`);
        console.error(error);
    }

}

async function banUser(driver, username, action = "ban", reason = "", comment = "", msg = "", period = "") {
    try {
        
        await driver.$("//android.widget.Button[@content-desc='Banned users']").click();

        await driver.pause(2000);

        if (action == "ban") {

            await driver.$("//android.view.View[contains(@content-desc, 'Banned Users')]/following-sibling::*[1]").click();
            
            await driver.pause(2000);

            let usernameBox = await driver.$("//android.widget.EditText[1]");
            await usernameBox.click();
            await driver.pause(2000);
            await usernameBox.clearValue();
            await usernameBox.addValue(username);

            await driver.pause(2000);

            await driver.$("xpath://android.view.View[contains(@hint,'Pick')]").click();

            await driver.pause(2000);

            await driver.$("xpath://android.view.View[contains(@content-desc,'" + reason +"')]").click();

            await driver.pause(2000);

            let modCommentBox = await driver.$("//android.widget.EditText[contains(@hint, 'mods only')]");
            await modCommentBox.click();
            await driver.pause(2000);
            await modCommentBox.clearValue();
            await modCommentBox.addValue(comment);
            
            if (period != "") {
                let howLong = await driver.$("xpath://android.view.View[@content-desc='How Long?']/following-sibling::*[1]");
                await howLong.click();
                await driver.pause(1000);
                await howLong.addValue(period);
            }
            
            await driver.pause(2000);

            await driver.pressKeyCode(4);

            await driver.pause(1000);

            let msgBox = await driver.$("//android.widget.EditText[contains(@hint, 'user will receive')]");
            await msgBox.click();
            await driver.pause(2000);
            await msgBox.clearValue();
            await msgBox.addValue(msg);
            
            await driver.pause(2000);

            await driver.$("accessibility id:Add").click();

        }

        if (action == "unban") {

            let usernameBox = await driver.$("//android.widget.EditText");
            await usernameBox.click();
            await usernameBox.clearValue();
            await usernameBox.addValue(username);
            
            await driver.pause(2000);

            await driver.$("//android.view.View[contains(@content-desc, '" + username + "')]/android.widget.Button").click();
            
            await driver.pause(2000);

            await driver.$("accessibility id:Unban").click();
            
            await driver.pause(2000);

            await driver.$("accessibility id:Unban").click();

        }

    } catch (error) {
        console.error(`Failed to create.`);
        console.error(error);
    }
}


async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let isLogged = 1;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver, "farouq12");
            await driver.pause(3000);

            await searchFor(driver, "CodeCrafters", "Communities");

            await driver.pause(2000);

            const modToolsBtn = await driver.$("accessibility id:Mod Tools");
            await modToolsBtn.click();
            await driver.pause(2000);
        }

        // Change description
        // let description = "Testing this part.";
        // await changeDescription(driver, true, description);
        // await driver.pause(2000);

        // let chk = await changeDescription(driver, false);

        // if (chk == description)
        // {
        //     console.log("Description changed successfully.");
        // }
        // else
        // {
        //     console.log("Description change failed.");
        // }

        // Change community type
        let type = 0;
        await changeCommunityType(driver, type);
        await driver.pause(2000);

        let txt;

        if (type == 0.5)
        {
            txt = "Restricted";
        }
        else if (type == 0)
        {
            txt = "Public";
        } else {
            txt = "Private";
        }

        const btn = await driver.$("accessibility id:Community type");
        await btn.click();

        await driver.pause(2000);

        let chk = await driver.$("accessibility id:" + txt);

        if (await chk.isExisting())
        {
            console.log("Type changed successfully.");
        }
        else
        {
            console.log("Type change failed.");
        }

        // await driver.pressKeyCode(4);

        // Change post types
        // let pstType = "text posts only"; // any, text posts only, links only
        // await changePostTypes(driver, true, pstType, true);
        // await driver.pause(2000);

        // let chk = await changePostTypes(driver, false, pstType);

        // if (chk)
        // {
        //     console.log("Post type changed successfully.");
        // }
        // else
        // {
        //     console.log("Post type change failed.");
        // }

        // Check scheduled posts
        // await schedulePost(driver, {
        //         title: "Scheduling a post in a community",
        //         subreddit: "CodeCrafters",
        //         text: "",
        //         spoiler: true,
        //         nsfw: true
        // });

        // await driver.pressKeyCode(4);
        // await driver.pause(2000);
        // await driver.pressKeyCode(4);

        // await driver.$("accessibility id:Mod Tools").click();
        // await driver.pause(2000);

        // await checkScheduledPosts(driver);

        // await driver.pause(2000);

        // Adding and removing a mod
        // await manageMod(driver, "add", "basma12", {
        //     ManagePostsComments: false,
        //     ManageUsers: true,
        //     ManageSettings: true
        // });

        // await driver.pause(2000);

        // await MainActivity(driver);

        // await logout(driver);

        // await login(driver, "basma12");

        // await acceptCommunityInvite(driver, "CodeCrafters");

        // await driver.pause(2000);

        // await MainActivity(driver);

        // await logout(driver);

        // await login(driver, "farouq12");

        // await driver.pause(5000);

        // await searchFor(driver, "CodeCrafters", "Communities");

        // await driver.pause(2000);

        // const modToolsBtn = await driver.$("accessibility id:Mod Tools");
        // await modToolsBtn.click();
        // await driver.pause(2000);

        // await manageMod(driver, "remove", "basma12");

        // Approving a user
        // await approveUser(driver, "basma12", "approve");

        // await driver.pause(2000);

        // await driver.pressKeyCode(4);

        // await driver.pause(2000);

        // await approveUser(driver, "basma12", "remove");


        // Banning a user
        // await banUser(driver, "basma12", "ban", "Spam", "This is a spam account.", "You have been banned for spamming.", "");

        // await driver.pause(6000);

        // await driver.pressKeyCode(4);

        // await driver.pause(2000);

        // await banUser(driver, "basma12", "unban");

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
