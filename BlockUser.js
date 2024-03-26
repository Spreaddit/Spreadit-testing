import { wdOpts } from './config.js';
import { remote } from 'webdriverio';
import login from './LoginWithEmail.js';
import { expect } from 'expect-webdriverio';

async function runTest() {
  const driver = await remote(wdOpts);
  try {

    await login(driver);

    await driver.pause(7000);

    const el2 = await driver.$("id:com.reddit.frontpage:id/search_view");
    // e1.waitForExist({ timeout: 5000 });
    await el2.click();

    const el5 = await driver.$("id:com.reddit.frontpage:id/search");
    await el5.addValue("u/No_Total3397");

    const el6 = await driver.$("id:com.reddit.frontpage:id/search_icon");
    await el6.click();

    const el7 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/community_name\" and @text=\"u/No_Total3397\"]");
    await el7.click();

    const el8 = await driver.$("accessibility id:More");
    await el8.click();

    const el9 = await driver.$("xpath://android.widget.TextView[@resource-id=\"com.reddit.frontpage:id/option_label\" and @text=\"Block account\"]");
    await el9.click();

    const el10 = await driver.$("id:android:id/button1");
    await el10.click();
    
    const el0 = await driver.$("xpath://*[@text=\"The author of this post has been blocked\"]");
    expect(el0).toExist();

  } finally {
    await driver.pause(3000);
    // await driver.deleteSession();
  }
}

runTest().catch(console.error);