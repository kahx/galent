const { By } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const axios = require('axios').default;

(async function example() {
   
    let driver = new webdriver.Builder().forBrowser('firefox').build();
    try {
        // Navigate to Url
        driver.manage().window().maximize();
        await driver.get('https://www.linkedin.com/jobs/search?keywords=Game%20Dev&location=T%C3%BCrkiye&geoId=102105699&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0');
        

        var bodyText = '';
        for (let index = 1; index < 21; index++) {
            await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.css(`[data-row="${index}"]`), 10000))).click();
            await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.className('details-pane__content'), 10000)));    
            await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.className('show-more-less-html__button'), 10000))).click();
            
            var body = await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.className('show-more-less-html__markup'), 10000)));
            bodyText += await body.getText();
            var company = await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.className('topcard__org-name-link'), 10000))).getText();
            var companyCity = await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.className('topcard__flavor--bullet'), 10000))).getText();
            var jobTitle = await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.className('top-card-layout__title'), 10000))).getText();
            var companyLogo = await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.xpath('/html/body/div[1]/div/section/div[2]/section/div/a/img'), 10000))).getAttribute('src');
            var jobLink = await driver.getCurrentUrl();
            await axios.post('http://192.168.0.31:3000/jobs', {
                companyName: company,
                companyCity: companyCity,
                companyLogo: companyLogo,
                companyMail: '',
                jobTitle: jobTitle,
                jobBody: bodyText,
                jobLink: jobLink,
              })
              .then(function (response) {
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error.response.data);
              });
            bodyText = '';
            await driver.sleep(5000)

        }
        
        
        
    }
    finally {
        await driver.quit();
    }
})();