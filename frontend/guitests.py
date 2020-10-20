import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By


class tests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("guitests/chromedriver")

    def test_landing(self):
        self.driver.get("https://burninup.me")
        assert(self.driver.title == "Burnin' Up")

        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div/div[1]/a")[0].click()
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div/div[2]/a")[0].click()
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/body/div[2]/div/div[3]/a")[0].click()

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
        self.driver.find_elements_by_xpath("/html/body/div/div/div[1]/nav/div/a[1]")[0].click()
        assert "about" in self.driver.current_url
        title = self.driver.find_elements_by_xpath("/html/body/div/div/body/div[1]/h3")[0].text
        assert title == "About Us"
        self.driver.find_elements_by_xpath("/html/body/div/div/body/div[5]/h2[1]/a/img")[0].click()
        assert "documenter.getpostman.com/view/12123261/TVRdAWse" in self.driver.current_url
        self.driver.get("https://burninup.me/about")
        self.driver.find_elements_by_xpath("/html/body/div/div/body/div[5]/h2[2]/a/img")[0].click()
        assert "gitlab.com/caitlinlien/cs373-sustainability/" in self.driver.current_url

    def test_cities(self):
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath("/html/body/div/div/div[1]/nav/div/a[2]")[0].click()
        assert "cities" in self.driver.current_url

    # def test_countries(self):
    #     pass

    # def test_years(self):
    #     pass

    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    unittest.main()
