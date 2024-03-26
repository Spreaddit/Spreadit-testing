// config.js

const capabilities = {
    "platformName": "Android",
    "appium:deviceName": "emulator-5554",
    // "appium:appPackage": "com.reddit.frontpage",
    // "appium:appActivity": "launcher.default",
    "appium:automationName": "UiAutomator2",
    // "appium:noReset": true
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities
};

module.exports = { wdOpts };
