import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By


class tests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome(
            'node_modules/.bin/chromedriver')

    def test_landing(self):
        self.driver.get("https://burninup.me")
        assert(self.driver.title == "Burnin' Up")

        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div[1]/a")[0].click()

        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div[2]/a")[0].click()
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div[3]/a")[0].click()

    def test_navBar(self):
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "//*[@id='root']/div/div[1]/nav/a")[0].click()
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[1]")[0].click()
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[2]")[0].click()
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[3]")[0].click()
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[4]")[0].click()

    def test_about(self):
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[1]")[0].click()
        assert "about" in self.driver.current_url
        title = self.driver.find_elements_by_xpath(
            "/html/body/div/div/body/div[1]/h3")[0].text
        assert title == "About Us"
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/body/div[5]/h2[1]/a/img")[0].click()
        assert "https://documenter.getpostman.com/view/12123261/TVRdAWse" in self.driver.current_url
        self.driver.get("https://burninup.me/about")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/body/div[5]/h2[2]/a/img")[0].click()
        assert "gitlab.com/caitlinlien/cs373-sustainability/" in self.driver.current_url

    def test_cities(self):
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[2]")[0].click()
        assert "cities" in self.driver.current_url
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/form/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[1]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[2]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[3]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[4]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[5]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/nav/ul/li[2]/a")[0].click()

    def test_countries(self):
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[3]")[0].click()
        assert "countries" in self.driver.current_url
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form[1]/div/form/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form[1]/div/div/div[1]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form[1]/div/div/div[2]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form[1]/div/div/div[3]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form[1]/div/div/div[4]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form[1]/div/div/div[5]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/nav/ul/li[2]/a")[0].click()

    def test_years(self):
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[4]")[0].click()
        assert "years" in self.driver.current_url
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/form/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[1]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[2]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[3]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[4]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/form/div/div/div[5]/button")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/nav/ul/li[2]/a")[0].click()

    def test_city_instance(self):
        self.driver.get("https://burninup.me/cities/id=2240")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table/tbody/tr[1]/td[2]/a")[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table/tbody/tr[7]/td[2]/a")[0].click()

    def test_country_instance(self):
        self.driver.get("https://burninup.me/countries/id=1")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table/tbody/tr[3]/td[2]/a")[0].click()
        self.driver.get("https://burninup.me/countries/id=1")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table/tbody/tr[7]/td[2]/a")[0].click()
        self.driver.get("https://burninup.me/countries/id=1")

    def test_year_instance(self):
        self.driver.get("https://burninup.me/years/name=1880")
        self.driver.implicitly_wait(20)
        # country link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[1]/table/tr[1]/td/a")[0].click()
        self.driver.get("https://burninup.me/years/name=1880")
        # city link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table[2]/tbody/tr[1]/td[1]/a")[0].click()
        self.driver.get("https://burninup.me/years/name=1880")

    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    unittest.main()
