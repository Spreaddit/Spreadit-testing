import { wdOpts } from './config.js';
import { remote } from 'webdriverio';
import { login, goToSettings } from './Helper.js';

var user = "farouq12";

async function isBlocked(driver)
{
  const el0 = await driver.$("accessibility id:" + user).isExisting();

  if (el0)
  {
    console.log("User blocked added to the list.");
  }
  else
  {
    console.log("Faild to block the user.");
  }
}


async function headToBlockedContacts(driver) {

  await goToSettings(driver);

  const el23 = await driver.$("xpath://android.widget.Button[contains(@content-desc, \"Account Settings \")]");
  await el23.click();
  
  const el24 = await driver.$("accessibility id:Manage blocked accounts");
  await el24.click();

}

async function block(driver) {

  // describe("Clock/Unblock test case", async () => {

  // it("Testing the blocking process...", async () => {

  const optionsBtn = await driver.$("xpath://android.widget.ScrollView/android.view.View/android.view.View/android.view.View[1]/android.view.View[1]/android.widget.Button[2]");
  await optionsBtn.click();

  const blkBtn = await driver.$("accessibility id:Block account");
  await blkBtn.click();


  const el10 = await driver.$("xpath://android.view.View[contains(@content-desc, \"You blocked \")]");
  
  user = await el10.getAttribute("content-desc");
  user = user.split(" ").pop();

  let exist = await el10.isExisting();
  await driver.pause(2000);
  
  if (exist)
  {
    console.log("User blocked successfuly.");
  }
  else
  {
    console.log("Faild to block the user.");
  }

  // expect(el10).toExist();

  // });

  // it("Testing that the user was added to the block list...", async () => {

  // });
}

async function unblock(driver) {

  let userToUnblock = user;

  const unblockBtn = await driver.$('//android.view.View[@content-desc="' + userToUnblock + '"]//android.widget.Button[@content-desc="Unblock"]');
  
  if (await unblockBtn.isExisting())
  {
    await unblockBtn.click();
    console.log("User " + userToUnblock +" unblocked.");
  }
  else
  {
    console.log("User was not found in the block list.\n");
  }
}

async function runTest() {
  const driver = await remote(wdOpts);
  let user = "farouq12";
  try {

    let isLogged = 1;
    if (await !isLogged) {
      console.log("Logging in first...");
      // "farouq12", "12345678"
      await login(driver);
      await driver.pause(3000);
    }

    // console.log("Searching for the user to block...");
    // await searchForUser(driver, user);

    // await pressOnProfileMenue(driver);

    await block(driver);

    await driver.pause(1000);

    // await leaveProfile(driver);

    console.log("Checking the block list...");
    await headToBlockedContacts(driver);

    await driver.pause(1000);

    await isBlocked(driver, user);

    await driver.pause(2000);

    // await MainActivity(driver);

    // console.log("Getting to the other user profile...");
    // await logout(driver);
    
    // await driver.pause(1000);
  
    // await login(2, driver); // 2 for loginWithinTheApp

    // console.log("Searching for the blocking user...");
    // await searchForUser(driver, "No_Total3397");

    // await driver.pause(1000);

    // console.log("Posts and comments are hidden.");

    // await MainActivity(driver);

    // console.log("Getting back to the other profile...");
    // await logout(driver);
    
    // await driver.pause(1000);
  
    // "No_Total3397", "asd123ASD"
    // await login(2, driver, "testing5781111", "pass@2024"); // 2 for loginWithinTheApp
    // await driver.pause(3000);

    // await headToBlockedContacts(driver);

    // console.log("Unblocking the user...");
    // await unblock(driver, user);

    // await MainActivity(driver);

    // await searchForUser(driver, user);

    // console.log("Posts and comments are visible again.");

  } finally {
    await driver.pause(3000);
    // await driver.deleteSession();
  }
}

runTest().catch(console.error);