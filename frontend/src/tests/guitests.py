import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


class tests(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument('--no-sandbox')
        self.driver = webdriver.Chrome(
            '../../node_modules/.bin/chromedriver', options=chrome_options)

    def test_landing(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        assert(self.driver.title == "Burnin' Up")

        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[2]/div[1]/a")[0].click()

        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[2]/div[2]/a")[0].click()

        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[2]/div[3]/a")[0].click()

    def test_navBar(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # test first button
        self.driver.find_elements_by_xpath(
            "//*[@id='root']/div/div[1]/nav/a")[0].click()
        self.driver.get("https://burninup.me")
        # test second button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[1]")[0].click()
        self.driver.get("https://burninup.me")
        # test third button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[2]")[0].click()
        self.driver.get("https://burninup.me")
        # test fourth button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[3]")[0].click()
        self.driver.get("https://burninup.me")
        # test fifth button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[4]")[0].click()
        # test search bar button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/form/button")[0].click()

    def test_about(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # go to about us page via nav bar
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[1]")[0].click()
        assert "about" in self.driver.current_url
        # verify title
        title = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/h3")[0].text
        assert title == "About Us"
        # test the postman image link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[5]/h2[1]/a")[0].click()
        assert "https://documenter.getpostman.com/view/12123261/TVRdAWse" in self.driver.current_url
        self.driver.get("https://burninup.me/about")
        self.driver.implicitly_wait(20)
        # test gitlab image link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[5]/h2[2]/a")[0].click()
        assert "gitlab.com/caitlinlien/cs373-sustainability/" in self.driver.current_url
        self.driver.get("https://burninup.me/about")
        self.driver.implicitly_wait(20)
        # test API link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[5]/div/li[1]/a")[0].click()
        assert "https://developers.google.com/places/web-service/photos" in self.driver.current_url
        self.driver.get("https://burninup.me/about")
        self.driver.implicitly_wait(20)
        # test tools link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[3]/div[1]/a/img")[0].click()
        assert "https://reactjs.org/" in self.driver.current_url
        self.driver.get("https://burninup.me/about")

    def test_cities(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to cities general page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/nav/div/a[2]")[0].click()
        assert "cities" in self.driver.current_url
        # test filter button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/div[1]/div[2]/span[3]/button")[0].click()
        # test filter option
        self.driver.find_elements_by_xpath(
            "/html/body/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/label/span[1]/span[1]/input")[0].click()
        # test clicking on row
        self.driver.get("https://burninup.me/cities")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/div[3]/table/tbody/tr[1]/td[4]/div[2]")[0].click()
        assert "https://burninup.me/cities/id=3537" in self.driver.current_url
        self.driver.get("https://burninup.me/cities")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/table/tfoot/tr/td/div/div/div/div[3]/button[2]")[0].click()

    def test_countries(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to countries general page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/nav/div/a[3]")[0].click()
        assert "countries" in self.driver.current_url
        # test filter button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/div[1]/div[2]/span[3]/button")[0].click()
        # test filter option
        self.driver.find_elements_by_xpath(
            "/html/body/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/label/span[1]/span[1]/input")[0].click()
        # test clicking on row
        self.driver.get("https://burninup.me/countries")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/div[3]/table/tbody/tr[1]/td[2]")[0].click()
        assert "https://burninup.me/countries/id=203" in self.driver.current_url
        self.driver.get("https://burninup.me/countries")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/table/tfoot/tr/td/div/div/div/div[3]/button[2]")[0].click()

    # def test_years(self):
    #     self.driver.get("https://burninup.me")
    #     self.driver.implicitly_wait(20)
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/div[1]/nav/div/a[4]")[0].click()
    #     assert "years" in self.driver.current_url
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/form/div/form/button")[0].click()
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/form/div/div/div[1]/button")[0].click()
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/form/div/div/div[2]/button")[0].click()
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/form/div/div/div[3]/button")[0].click()
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/form/div/div/div[4]/button")[0].click()
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/form/div/div/div[5]/button")[0].click()
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/nav/ul/li[2]/a")[0].click()

    # def test_city_instance(self):
    #     self.driver.get("https://burninup.me/cities/id=2240")
    #     self.driver.implicitly_wait(20)
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/table/tbody/tr[1]/td[2]/a")[0].click()
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/table/tbody/tr[7]/td[2]/a")[0].click()

    # def test_country_instance(self):
    #     self.driver.get("https://burninup.me/countries/id=1")
    #     self.driver.implicitly_wait(20)
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/table/tbody/tr[3]/td[2]/a")[0].click()
    #     self.driver.get("https://burninup.me/countries/id=1")
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/table/tbody/tr[7]/td[2]/a")[0].click()
    #     self.driver.get("https://burninup.me/countries/id=1")

    # def test_year_instance(self):
    #     self.driver.get("https://burninup.me/years/name=1880")
    #     self.driver.implicitly_wait(20)
    #     # country link
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/div[1]/table/tr[1]/td/a")[0].click()
    #     self.driver.get("https://burninup.me/years/name=1880")
    #     # city link
    #     self.driver.find_elements_by_xpath(
    #         "/html/body/div/div/header/table[2]/tbody/tr[1]/td[1]/a")[0].click()
    #     self.driver.get("https://burninup.me/years/name=1880")

    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    unittest.main()
