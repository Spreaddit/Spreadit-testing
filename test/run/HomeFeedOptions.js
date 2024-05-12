import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { login, goToSettings, MainActivity } from './Helper.js';

async function sortByHot(driver) {
    try {

        const sortBtn = await driver.$("accessibility id:Sort Home By");
        await sortBtn.click();

        const hotOption = await driver.$("accessibility id:hot");
        await hotOption.click();

        const done = await driver.$("accessibility id:Done");
        await done.click();

        console.log("Sorted by hot.");

    } catch (error) {
        console.error(`Failed to sort by hot.`);
        console.error(error);
    }
}

async function sortByNew(driver) {
    try {

        const sortBtn = await driver.$("accessibility id:Sort Home By");
        await sortBtn.click();

        const newOption = await driver.$("accessibility id:newposts");
        await newOption.click();

        const done = await driver.$("accessibility id:Done");
        await done.click();

        console.log("Sorted by new.");

    } catch (error) {
        console.error(`Failed to sort by new.`);
        console.error(error);
    }
}

async function sortByTop(driver, duration = "") {
    try {

        const sortBtn = await driver.$("accessibility id:Sort Home By");
        await sortBtn.click();

        const topOption = await driver.$("accessibility id:top");
        await topOption.click();

        // const btn = await driver.$("xpath://android.widget.TextView[@text='" + duration + "']");
        // await btn.click();

        const done = await driver.$("accessibility id:Done");
        await done.click();

        console.log("Sorted by Top. Duration: " + duration);

    } catch (error) {
        console.error(`Failed to sort by top. Duration: ` + duration);
        console.error(error);
    }
}

async function sortByBest(driver, duration = "") {
    try {

        const sortBtn = await driver.$("accessibility id:Sort Home By");
        await sortBtn.click();

        const option = await driver.$("accessibility id:best");
        await option.click();

        // const btn = await driver.$("xpath://android.widget.TextView[@text='" + duration + "']");
        // await btn.click();

        const done = await driver.$("accessibility id:Done");
        await done.click();

        console.log("Sorted by best. Duration: " + duration);

    } catch (error) {
        console.error(`Failed to sort by best. Duration: ` + duration);
        console.error(error);
    }
}

async function sortRandomly(driver) {
    try {

        const sortBtn = await driver.$("accessibility id:Sort Home By");
        await sortBtn.click();

        const hotOption = await driver.$("accessibility id:random");
        await hotOption.click();

        const done = await driver.$("accessibility id:Done");
        await done.click();

        console.log("Sorted randomly.");

    } catch (error) {
        console.error(`Failed to sort randomly.`);
        console.error(error);
    }
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        // await MainActivity(driver);

        await driver.pause(3000);

        let isLogged = 0;
        if (!isLogged) {
            console.log("Logging in first...");
            await login(driver);
            await driver.pause(3000);
        }

        console.log("Sorting by hot...");
        await goToSettings(driver);
        await sortByHot(driver);

        await driver.pause(2000);

        await MainActivity(driver);

        console.log("Sorting by new...");
        await goToSettings(driver);
        await sortByNew(driver);
        
        await driver.pause(2000);

        // console.log("Sorting by top in the past hour...");
        // await sortByTop(driver, "Past hour");
        
        // await driver.pause(2000);

        // console.log("Sorting by top in the past 24 hours...");
        // await sortByTop(driver, "Past 24 hours");
        
        // await driver.pause(2000);

        // console.log("Sorting by top in the past week...");
        // await sortByTop(driver, "Past week");
        
        // await driver.pause(2000);

        // console.log("Sorting by top in the past month...");
        // await sortByTop(driver, "Past month");
        
        // await driver.pause(2000);

        // console.log("Sorting by top in the past year...");
        // await sortByTop(driver, "Past year");
        
        // await driver.pause(2000);

        // console.log("Sorting by top in all time...");
        // await sortByTop(driver, "All time");

        await MainActivity(driver);

        console.log("Sorting randomly...");
        await goToSettings(driver);
        await sortRandomly(driver);

        // console.log("Sorting by Controversial in the past hour...");
        // await sortByControversial(driver, "Past hour");
        
        // await driver.pause(2000);

        // console.log("Sorting by Controversial in the past 24 hours...");
        // await sortByControversial(driver, "Past 24 hours");
        
        // await driver.pause(2000);

        // console.log("Sorting by Controversial in the past week...");
        // await sortByControversial(driver, "Past week");
        
        // await driver.pause(2000);

        // console.log("Sorting by Controversial in the past month...");
        // await sortByControversial(driver, "Past month");
        
        // await driver.pause(2000);

        // console.log("Sorting by Controversial in the past year...");
        // await sortByControversial(driver, "Past year");
        
        // await driver.pause(2000);

        // console.log("Sorting by Controversial in all time...");
        // await sortByControversial(driver, "All time");

        await driver.pause(2000);
        
        await MainActivity(driver);

        console.log("Sorting by best...");
        await goToSettings(driver);
        await sortByBest(driver);

        await driver.pause(2000);
        
        await MainActivity(driver);

        console.log("Sorting by top...");
        await goToSettings(driver);
        await sortByTop(driver);

    } finally {
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);
