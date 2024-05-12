import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login, MainActivity } from './Helper.js';

/*
    options = {
        title: "Title",
        subreddit: "Subreddit",
        text: "Text",
        spoiler: true,
        nsfw: false
    }
*/
async function createTextPost(driver, options) {
    try {

        await driver.pause(500);
        
        const el1 = await driver.$("xpath://android.view.View[contains(@content-desc, 'Create')]");
        await el1.click();
        
        const el2 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.widget.EditText");
        await el2.click();
        await driver.pause(1000);
        await el2.addValue(options.title);
        await driver.pause(1000);
        
        if (options.hasOwnProperty("text"))
        {
            const el3 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View/android.widget.EditText");
            await el3.click();
            await driver.pause(1000);
            await el3.addValue(options.text);
        }

        const el4 = await driver.$("accessibility id:Next");
        await el4.click();
        
        const el9 = await driver.$("class name:android.widget.EditText");
        await el9.click();
        await driver.pause(1000);
        await el9.addValue(options.subreddit);
        
        const el10 = await driver.$("accessibility id:" + options.subreddit);
        await el10.click();
        
        const el14 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.view.View/android.widget.EditText");
        await el14.click();

        const el6 = await driver.$("accessibility id:Add tags");
        await el6.click();
        await driver.pause(1000);

        if (options.hasOwnProperty("spoiler") && options.spoiler)
        {
            const el8 = await driver.$("xpath://android.view.View/android.widget.Switch[1]");
            await el8.click();
        }

        if (options.hasOwnProperty("nsfw") && options.nsfw)
        {
            const el7 = await driver.$("xpath://android.view.View/android.widget.Switch[2]");
            await el7.click();
        }

        const el5 = await driver.$("class name:android.widget.Button");
        await el5.click();

        const postBtn = await driver.$("accessibility id:Post");
        await postBtn.click();

    } catch (error) {
        console.error(`Failed to post.`);
        console.error(error);
    }
}
/*
    options = {
        title: "Title",
        subreddit: "Subreddit",
        spoiler: true,
        nsfw: false
    }
*/
async function createImagePost(driver, options) {
    try {

        await driver.pause(500);
        
        const el1 = await driver.$("xpath://android.view.View[contains(@content-desc, 'Create')]");
        await el1.click();
        
        const el2 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.widget.EditText");
        await el2.click();
        await driver.pause(1000);
        await el2.addValue(options.title);
        await driver.pause(1000);
        
        if (options.hasOwnProperty("text"))
        {
            const el3 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View/android.widget.EditText");
            await el3.click();
            await driver.pause(1000);
            await el3.addValue(options.text);
        }

        const imgBtn = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[2]");
        await imgBtn.click();

        const chosenImg = await driver.$("id:com.google.android.providers.media.module:id/icon_thumbnail");
        await chosenImg.click();

        const el4 = await driver.$("accessibility id:Next");
        await el4.click();
        
        const el9 = await driver.$("class name:android.widget.EditText");
        await el9.click();
        await driver.pause(1000);
        await el9.addValue(options.subreddit);
        
        const el10 = await driver.$("accessibility id:" + options.subreddit);
        await el10.click();
        
        const el14 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.view.View/android.widget.EditText");
        await el14.click();

        const el6 = await driver.$("accessibility id:Add tags");
        await el6.click();
        await driver.pause(1000);

        if (options.hasOwnProperty("spoiler") && options.spoiler)
        {
            const el8 = await driver.$("xpath://android.view.View/android.widget.Switch[1]");
            await el8.click();
        }

        if (options.hasOwnProperty("nsfw") && options.nsfw)
        {
            const el7 = await driver.$("xpath://android.view.View/android.widget.Switch[2]");
            await el7.click();
        }

        const el5 = await driver.$("class name:android.widget.Button");
        await el5.click();

        const postBtn = await driver.$("accessibility id:Post");
        await postBtn.click();

    } catch (error) {
        console.error(`Failed to post.`);
        console.error(error);
    }
}

/*
    options = {
        title: "Title",
        subreddit: "Subreddit",
        spoiler: true,
        nsfw: false,
        link: "https://www.google.com" [VALID LINK]
    }
*/
async function createLinkPost(driver, options) {
    try {

        await driver.pause(500);
        
        const el1 = await driver.$("xpath://android.view.View[contains(@content-desc, 'Create')]");
        await el1.click();
        
        const el2 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.widget.EditText");
        await el2.click();
        await driver.pause(1000);
        await el2.addValue(options.title);
        await driver.pause(1000);
        
        if (options.hasOwnProperty("text"))
        {
            const el3 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View/android.widget.EditText");
            await el3.click();
            await driver.pause(1000);
            await el3.addValue(options.text);
        }

        const linkBtn = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[1]");
        await linkBtn.click();

        const link = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View/android.widget.EditText");
        await link.click();
        await driver.pause(1000);
        await link.addValue(options.link);

        const el4 = await driver.$("accessibility id:Next");
        await el4.click();
        
        const el9 = await driver.$("class name:android.widget.EditText");
        await el9.click();
        await driver.pause(1000);
        await el9.addValue(options.subreddit);
        
        const el10 = await driver.$("accessibility id:" + options.subreddit);
        await el10.click();
        
        const el14 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.view.View/android.widget.EditText");
        await el14.click();

        const el6 = await driver.$("accessibility id:Add tags");
        await el6.click();
        await driver.pause(1000);

        if (options.hasOwnProperty("spoiler") && options.spoiler)
        {
            const el8 = await driver.$("xpath://android.view.View/android.widget.Switch[1]");
            await el8.click();
        }

        if (options.hasOwnProperty("nsfw") && options.nsfw)
        {
            const el7 = await driver.$("xpath://android.view.View/android.widget.Switch[2]");
            await el7.click();
        }

        const el5 = await driver.$("class name:android.widget.Button");
        await el5.click();

        const postBtn = await driver.$("accessibility id:Post");
        await postBtn.click();

    } catch (error) {
        console.error(`Failed to post.`);
        console.error(error);
    }
}

/*
    options = {
        title: "Title",
        subreddit: "Subreddit",
        spoiler: true,
        nsfw: false,
        options: ["Option 1", "Option 2", "Option 3"]
    }
*/
async function createPollPost(driver, options) {
    try {

        await driver.pause(500);
        
        const el1 = await driver.$("xpath://android.view.View[contains(@content-desc, 'Create')]");
        await el1.click();
        
        const el2 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.widget.EditText");
        await el2.click();
        await driver.pause(1000);
        await el2.addValue(options.title);
        await driver.pause(1000);
        
        if (options.hasOwnProperty("text"))
        {
            const el3 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View/android.widget.EditText");
            await el3.click();
            await driver.pause(1000);
            await el3.addValue(options.text);
        }

        const el4 = await driver.$("accessibility id:Next");
        await el4.click();
        
        const el9 = await driver.$("class name:android.widget.EditText");
        await el9.click();
        await driver.pause(1000);
        await el9.addValue(options.subreddit);
        
        const el10 = await driver.$("accessibility id:" + options.subreddit);
        await el10.click();

        const pollBtn = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button[4]");
        await pollBtn.click();

        for (let i = 1; i <= options.options.length; i++)
        {
            if (i > 2)
            {
                const el4 = await driver.$("accessibility id:Add option");
                await el4.click();
            }
            const pollOpt = await driver.$("xpath://android.view.View[@content-desc=\"Poll ends in\"]/android.widget.EditText[" + i + "]");
            await pollOpt.click();
            await pollOpt.addValue(options.options[i - 1]); 
            await driver.pressKeyCode(4);
            await driver.pause(600);
        }
        
        const el14 = await driver.$("xpath://android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.view.View/android.widget.EditText");
        await el14.click();

        const el6 = await driver.$("accessibility id:Add tags");
        await el6.click();
        await driver.pause(1000);

        if (options.hasOwnProperty("spoiler") && options.spoiler)
        {
            const el8 = await driver.$("xpath://android.view.View/android.widget.Switch[1]");
            await el8.click();
        }

        if (options.hasOwnProperty("nsfw") && options.nsfw)
        {
            const el7 = await driver.$("xpath://android.view.View/android.widget.Switch[2]");
            await el7.click();
        }

        const el5 = await driver.$("class name:android.widget.Button");
        await el5.click();

        const postBtn = await driver.$("accessibility id:Post");
        await postBtn.click();

    } catch (error) {
        console.error(`Failed to post.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }
        
        /*
        console.log("Creating a normal post without a description...");

        await createTextPost(driver, {
            title: "This is a normal test post. Nothing suspicious here.",
            subreddit: "CodeGeeks"
        });

        await driver.pause(3000);

        await MainActivity(driver);

        console.log("Creating a normal post with a description...");

        await createTextPost(driver, {
            title: "This is a normal test post. Nothing suspicious here.",
            subreddit: "CodeGeeks",
            text: "Bla bla bla."
        });

        await driver.pause(3000);

        await MainActivity(driver);

        console.log("Creating a spoiler post...");

        await createTextPost(driver, {
            title: "This is a spoiler test post",
            subreddit: "ScienceExplorersClub",
            text: "This is a test post.",
            spoiler: true
        });

        await driver.pause(3000);

        await MainActivity(driver);

        console.log("Creating a NSFW post...");

        await createTextPost(driver, {
            title: "This is a nsfw test post",
            subreddit: "CodeCrafters",
            text: "This is a test post.",
            nsfw: true
        });

        await driver.pause(3000);

        await MainActivity(driver);

        console.log("Creating a NSFW and spoiler post...");

        await createTextPost(driver, {
            title: "This is a nsfw and spoiler test post",
            subreddit: "CodeGeeks",
            text: "This is a test post.",
            nsfw: true,
            spoiler: true
        });

        console.log("All text posts done.");

        await driver.pause(3000);
        */
        
        /*
        console.log("Creating a post with one image...");

        // await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a post with one image",
            subreddit: "SpaceAndAstronomyLovers"
        });

        await driver.pause(3000);
        
        console.log("Creating a nsfw post with one image...");

        await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a nsfw post with one image",
            subreddit: "My profile",
            nsfw: true
        });

        await driver.pause(3000);

        console.log("Creating a spoiler post with one image...");

        await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a spoiler post with one image",
            subreddit: "My profile",
            spoiler: true
        });

        await driver.pause(3000);

        console.log("Creating a spoiler and nsfw post with one image...");

        await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a spoiler and nsfw post with one image",
            subreddit: "My profile",
            spoiler: true,
            nsfw: true
        });

        await driver.pause(3000);

        console.log("Creating a post with multiple images...");

        await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a post with multiple images",
            subreddit: "My profile",
            multi: true
        });

        await driver.pause(3000);

        console.log("Creating a nsfw post with multiple images...");

        await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a nsfw post with multiple images",
            subreddit: "My profile",
            nsfw: true,
            multi: true
        });

        await driver.pause(3000);

        console.log("Creating a spoiler post with multiple images...");

        await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a spoiler post with multiple images",
            subreddit: "My profile",
            spoiler: true,
            multi: true
        });

        await driver.pause(3000);

        console.log("Creating a spoiler and nsfw post with multiple images...");

        await MainActivity(driver);

        await createImagePost(driver, {
            title: "This is a spoiler and nsfw post with multiple images",
            subreddit: "My profile",
            spoiler: true,
            nsfw: true,
            multi: true
        });

        await driver.pause(3000);

        await MainActivity(driver);

        */

        /*
        console.log("Creating a post with a link...");

        await createLinkPost(driver, {
            title: "This is a post with a valid link",
            subreddit: "CodeGeeks",
            link: "https://www.google.com",
            nsfw: true,
            spoiler: true
        });

        await driver.pause(3000);

        await MainActivity(driver);

        console.log("Creating a post with invalid link...");

        await createLinkPost(driver, {
            title: "This is a post with invalid link",
            subreddit: "CodeGeeks",
            link: "http://www",
            nsfw: true,
            spoiler: true
        });
        */

        console.log("Creating a post with a poll of 2 options...");

        await createPollPost(driver, {
            title: "This is a post with a poll",
            subreddit: "CodeGeeks",
            nsfw: true,
            spoiler: true,
            options: ["Opt 1", "Opt 2"]
        });

        console.log("Creating a post with a poll of 3 options...");

        await driver.pause(3000);
        
        await MainActivity(driver);
        
        await createPollPost(driver, {
            title: "This is a post with a poll of 3 options.",
            subreddit: "CodeGeeks",
            nsfw: true,
            spoiler: true,
            options: ["Opt 1", "Opt 2", "Opt 3"]
        });

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
