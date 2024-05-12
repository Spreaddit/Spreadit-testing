import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { searchFor, login, pressBack } from './Helper.js';

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        await driver.pause(3000);

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }

        // Posts, Communities, Comments, Media, People
        // console.log("Searching for DNA in Posts...");
        // await searchFor(driver, "DNA", "Posts");
        
        // await driver.pause(3000);

        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // console.log("Searching for ScienceExplorersClub in Communities...");
        // await searchFor(driver, "ScienceExplorersClub", "Communities");

        // await driver.pause(3000);
        
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // console.log("Searching for Comments in Comments...");
        // await searchFor(driver, "DNA sequencing technology", "Comments");

        // await driver.pause(3000);
        
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        // await driver.pause(1000);
        // await driver.pressKeyCode(4);
        console.log("Searching for Debugging in Media...");
        await searchFor(driver, "Debugging", "Media");

        await driver.pause(3000);
        
        await driver.pressKeyCode(4);
        await driver.pause(1000);
        await driver.pressKeyCode(4);
        await driver.pause(1000);
        await driver.pressKeyCode(4);
        await driver.pause(1000);
        await driver.pressKeyCode(4);
        console.log("Searching for abdullah12 in People...");
        await searchFor(driver, "abdullah12", "People");

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
