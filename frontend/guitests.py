import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By


class tests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome("guitests/chromedriver")

    def test_landing(self):
        self.driver.get("https://burninup.me")
        print(self.driver.title)
        assert(self.driver.title == "Burnin' Up")

    def test_navBar(self):
        self.driver.find_element(By.CSS_CLASS, "OurNavbar").click()
        self.driver.find_element(By.LINK_TEXT, "Cities").click()

    # def test_cities(self):
    #     pass

    # def test_countries(self):
    #     pass

    # def test_years(self):
    #     pass

    # def test_about(self):
    #     pass

    def tearDown(self):
        self.driver.quit()


if __name__ == '__main__':
    unittest.main()
