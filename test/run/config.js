// import { expect } from 'expect-webdriverio';
// import { remote } from 'webdriverio';

const capabilities = {
    "platformName": "Android",
    "appium:deviceName": "emulator-5554",
    "appium:automationName": "UiAutomator2",
    "appium:appPackage": "com.example.spreadit_cross",
    "appium:appActivity": "MainActivity"
    // "appium:noReset": true
};

export const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info', //silent
    capabilities
};

// module.exports = { wdOpts };

export default wdOpts;
