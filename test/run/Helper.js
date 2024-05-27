async function pressSideMenu(driver) {
    const el1 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[4]");
    await el1.click();
}

async function getToMyProfile(driver) {
    await pressSideMenu(driver);

    const myProfileBtn = await driver.$("accessibility id:My profile");
    await myProfileBtn.click();
}

async function moveSeekBar(driver, element, percentage) {
    // Locate the seekbar element
    const seekbar = await driver.$(element);

    // Get seekbar location and size
    const location = await seekbar.getLocation();
    const size = await seekbar.getSize();
    const startX = location.x; // Start swipe from 0% of the seekbar width
    const endX = location.x + size.width * percentage;   // End swipe at X% of the seekbar width
    const centerY = location.y + size.height / 2; // Swipe along the vertical center of the seekbar

    console.log("StartX: " + startX + " EndX: " + endX + " CenterY: " + centerY);
    // Select till which position you want to move the seekbar
    let action = await driver.action('pointer')
        .move({ duration: 1000, seekbar, x: endX, y: centerY })
        .down({ button: 0 })
        .pause(10)
        .up({ button: 0 })
        .perform();

}

async function postInfo(driver) {
    const community = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.view.View[1]").getAttribute("content-desc");
    const username = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.view.View[2]").getAttribute("content-desc");

    return [community, username];

}

async function pressBack(driver) {
    const e1 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button");
    await e1.click();
}

async function search(driver, query) {

    const el1 = await driver.$("//android.widget.Button[@content-desc='home']/following-sibling::*[1]");
    await el1.click();

    const el2 = await driver.$('//android.widget.EditText');
    await el2.click();
    await el2.clearValue();
    await driver.pause(2000);
    await el2.addValue(query);

}

async function searchForUser(driver, user) {

    await driver.pause(2000);

    await search(user);

    await driver.pause(5000);

    const el6 = await driver.$("accessibility id:" + user);

    await driver.pause(2000);

    if (await el6.isExisting()) {
        await el6.click();
        console.log("User " + user + " found.");
    }
    else {
        console.log("User was not found.\n");
    }
}

// type: Posts, Communities, Comments, Media, People
async function searchFor(driver, query, type) {

    await driver.pause(2000);

    await search(driver, query);

    await driver.pause(5000);

    const searchFor = await driver.$("xpath://android.view.View[contains(@content-desc, 'Search for')]");
    await searchFor.click();

    // Posts, Communities, Comments, Media, People
    const section = await driver.$("accessibility id:" + type);
    await section.click();

    await driver.pause(4000);

    let object;
    if (type == "Media") {
        object = await driver.$("xpath://android.widget.ImageView[contains(@content-desc, '" + query + "')]");
    }
    else {
        object = await driver.$("xpath://android.view.View[contains(@content-desc, '" + query + "')]");
    }

    await driver.pause(2000);

    if (await object.isExisting()) {
        await object.click();
        console.log(query + " found.");
    }
    else {
        console.log(query + " was not found.\n");
    }
}

async function MainActivity(driver) {
    await driver.startActivity("com.example.spreadit_cross", ".MainActivity");
}

async function pressOnProfileMenue(driver) {
    const el8 = await driver.$("//android.widget.ScrollView/android.widget.Button[6]");
    await el8.click();
}

async function leaveProfile(driver) {
    const e1 = await driver.$("class name:android.widget.ImageButton");
    await e1.click();

    const e2 = await driver.$("xpath://android.view.ViewGroup[@resource-id=\"com.reddit.frontpage:id/toolbar\"]/android.widget.ImageButton");
    await e2.click();
}

async function goToSettings(driver) {
    const el21 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[4]");
    await el21.click();

    const el22 = await driver.$("accessibility id:Settings");
    await el22.click();

    await driver.pause(1000);
}

async function enterUserData(driver, user, pass) {
    const el2 = await driver.$("xpath://android.widget.FrameLayout[@resource-id=\"android:id/content\"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[1]");
    await el2.click();

    await driver.pause(2000);

    await el2.addValue(user);

    await driver.pause(2000);

    const el3 = await driver.$("//android.widget.ScrollView/android.widget.EditText[2]");
    await el3.click();
    await driver.pause(2000);
    await el3.addValue(pass);

    await driver.pause(2000);

    const el4 = await driver.$("xpath://android.widget.Button[@content-desc=\"Continue\"]");
    await el4.click();
}

async function firstTimeLogin(driver, user, pass, msg = "") {
    await driver.pause(5000);

    const el1 = await driver.$("xpath://android.widget.Button[contains(@accessibility-id, *)][2]");
    await el1.click();

    await driver.pause(2500);

    await enterUserData(driver, user, pass);

    let chk = await driver.$("xpath://android.view.View[contains(@content-desc, \"Authentication failed\")]").isExisting();

    if (chk) {
        console.log(msg);
        return;
    }
    else {
        await driver.pause(2000);

        // In case of allowing notification permission
        try {
            const el = await driver.$("id:com.android.permissioncontroller:id/permission_allow_button");
            // e1.waitForExist({ timeout: 10000 });
            await el.click();
        } catch (e) {
            await driver.pause(3000);
        }
    }

}

// "No_Total3397", "asd123ASD"

async function login(driver, user = "amiraelgarf", pass = "12345678", msg = "") {

    try {
        await firstTimeLogin(driver, user, pass, msg);
    } catch (e) {
        console.log(e);
        return;
    }
    await driver.pause(3000);

    // Check if logged in successfully
    if (await driver.$("xpath://android.widget.Button[@content-desc='home']").isExisting()) {
        console.log('Logged in successfully.');
    } else {
        console.log('Failed to login.');
    }
}

export { moveSeekBar, searchFor, postInfo, pressSideMenu, pressBack, getToMyProfile, enterUserData, firstTimeLogin, login, searchForUser, pressOnProfileMenue, leaveProfile, goToSettings, MainActivity };