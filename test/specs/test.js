describe("Clock/Unblock test case", async () => {

    it("Block/Unblock user", async () => {
        const el6 = await $("id:com.reddit.frontpage:id/nav_icon_clickable_area");
        await el6.click();

        let el1 = await $("id:com.reddit.frontpage:id/drawer_nav_item_title");
        await el1.click();
        
        el1 = await $("id:com.reddit.frontpage:id/login_cta");
        await el1.click();

        expect(el1).toExist();
    });

});
