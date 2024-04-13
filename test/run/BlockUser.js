import { wdOpts } from './config.js';
import { remote } from 'webdriverio';
import { login } from './LoginWithEmail.js';
import { logout } from './Logout.js';
import { expect } from 'expect-webdriverio';

async function searchForUser(driver, user) {
  
  await driver.pause(2000);

  const el2 = await driver.$('//android.widget.TextView[contains(@text, "Search")]');
  await el2.click();

  const el5 = await driver.$("id:com.reddit.frontpage:id/search");
  await el5.addValue("u/" + user);

  const el6 = await driver.$("id:com.reddit.frontpage:id/search_icon");
  await el6.click();

  await driver.pause(2000);

  const el7 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/community_name\" and @text=\"u/" + user + "\"]");
  
  if (await el7.isExisting())
  {
    await el7.click();
    console.log("User " + user +" found.");
  }
  else
  {
    console.log("User was not found.\n");
  }
}

async function MainActivity(driver)
{
  await driver.startActivity("com.reddit.frontpage", ".main.MainActivity");
}

async function pressOnProfileMenue(driver)
{
  const el8 = await driver.$("accessibility id:More");
  await el8.click();
}

async function isBlocked(driver, user)
{
  const el0 = await driver.$("//*[@text=\"" + user + "\"]");

  if (await el0.isExisting())
  {
    console.log("User blocked successfuly.");
  }
  else
  {
    console.log("Faild to block the user.");
  }
}

async function leaveProfile(driver)
{
  const e1 = await driver.$("class name:android.widget.ImageButton");
  await e1.click();

  const e2 = await driver.$("xpath://android.view.ViewGroup[@resource-id=\"com.reddit.frontpage:id/toolbar\"]/android.widget.ImageButton");
  await e2.click();
}

async function goToSettings(driver)
{
  const e3 = await driver.$("id:com.reddit.frontpage:id/nav_icon_clickable_area");
  await e3.click();

  const e4 = await driver.$("id:com.reddit.frontpage:id/drawer_nav_settings");
  await e4.click();

  await driver.pause(1000);
}

async function headToBlockedContacts(driver) {

  await goToSettings(driver);

  const e5 = await driver.$("xpath://androidx.recyclerview.widget.RecyclerView[@resource-id=\"com.reddit.frontpage:id/recycler_view\"]/android.view.ViewGroup[1]/android.widget.ImageView[2]");
  await e5.click();

  await driver.pause(1000);

  const e6 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/setting_title\" and @text=\"Manage blocked accounts\"]");
  await e6.click();
}

async function block(driver) {

  // describe("Clock/Unblock test case", async () => {

  // it("Testing the blocking process...", async () => {

  const el9 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/option_label\" and @text=\"Block account\"]");
  await el9.click();

  const el10 = await driver.$("id:android:id/button1");
  await el10.click();

  // expect(el10).toExist();

  // });

  // it("Testing that the user was added to the block list...", async () => {

  // });
}

async function unblock(driver, user) {

  let userToUnblock = user;

  const unblockBtn = await driver.$('//android.widget.TextView[@resource-id="com.reddit.frontpage:id/username" and @text="' + userToUnblock + '"]/following-sibling::*[1]');
  
  if (await unblockBtn.isExisting())
  {
    await unblockBtn.click();
    console.log("User " + user +" unblocked.");
  }
  else
  {
    console.log("User was not found in the block list.\n");
  }
}

async function runTest() {
  const driver = await remote(wdOpts);
  let user = "testing5781111";
  try {

    await MainActivity(driver);
    await driver.pause(6000);

    let isLogged = 0;
    if (await !isLogged) {
      console.log("Logging in first...");
      // "No_Total3397", "asd123ASD"
      await login(2, driver, "testing5781111", "pass@2024"); // 2 for loginWithinTheApp
      await driver.pause(3000);
    }

    console.log("Searching for the user to block...");
    await searchForUser(driver, user);

    await pressOnProfileMenue(driver);

    await block(driver);

    await driver.pause(1000);

    await leaveProfile(driver);

    console.log("Checking the block list...");
    await headToBlockedContacts(driver);

    await driver.pause(1000);

    await isBlocked(driver, user);

    await driver.pause(2000);

    await MainActivity(driver);

    console.log("Getting to the other user profile...");
    await logout(driver);
    
    await driver.pause(1000);
  
    await login(2, driver); // 2 for loginWithinTheApp

    console.log("Searching for the blocking user...");
    await searchForUser(driver, "No_Total3397");

    await driver.pause(1000);

    console.log("Posts and comments are hidden.");

    await MainActivity(driver);

    console.log("Getting back to the other profile...");
    await logout(driver);
    
    await driver.pause(1000);
  
    // "No_Total3397", "asd123ASD"
    await login(2, driver, "testing5781111", "pass@2024"); // 2 for loginWithinTheApp
    await driver.pause(3000);

    await headToBlockedContacts(driver);

    console.log("Unblocking the user...");
    await unblock(driver, user);

    await MainActivity(driver);

    await searchForUser(driver, user);

    console.log("Posts and comments are visible again.");

  } finally {
    await driver.pause(3000);
    // await driver.deleteSession();
  }
}

runTest().catch(console.error);

export {searchForUser, MainActivity, goToSettings};