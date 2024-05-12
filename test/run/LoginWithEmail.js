// const { remote } = require('webdriverio');
// const { wdOpts } = require('./config');
import { remote } from 'webdriverio';
import { wdOpts } from './config.js';
import { logout } from './Logout.js';
import { enterUserData, firstTimeLogin, login } from './Helper.js';

async function wrongCredintials(driver) {
    // Wrong username
    await login(driver, "amira", "12345678", "Passed: Wrong username.");
    // console.log("Passed: Wrong username.");

    // Wrong password
    await driver.startActivity("com.example.spreadit_cross", ".MainActivity");
    await driver.pause(3000);
    await login(driver, "amiraelgarf", "123459", "Passed: Wrong password.");
    // console.log("Passed: Wrong password.");

    // Wrong username and password
    await driver.startActivity("com.example.spreadit_cross", ".MainActivity");
    await driver.pause(3000);
    await login(driver, "amira", "123459", "Passed: Wrong username and password.");
    // console.log("Passed: Wrong username and password.");

    // Empty fields
    await driver.startActivity("com.example.spreadit_cross", ".MainActivity");
    await driver.pause(3000);
    await login(driver, "", "", "Passed: Empty fields.");
    // console.log("Passed: Empty fields.");
}

async function runTest() {
    const driver = await remote(wdOpts);
    try {

        // Normal login
        await login(driver);

        await driver.pause(3000);

        await logout(driver);

        // Wrong credintials
        await wrongCredintials(driver);

    } finally {
        await driver.pause(3000);
        // await driver.deleteSession();
    }
}

runTest().catch(console.error);