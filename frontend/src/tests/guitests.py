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
        # test buttons on landing page
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
        self.driver.implicitly_wait(10)
        # go to about us page via nav bar
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[1]/nav/div/a[1]")[0].click()
        assert "about" in self.driver.current_url
        # verify title
        title = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/h3")[0].text
        assert title == "About Us"
        # test links on about page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[5]/div/li[3]/a")[0].click()
        assert "https://datahelpdesk.worldbank.org/knowledgebase/articles/"
        +"898599-indicator-api-queries" in self.driver.current_url
        self.driver.get("https://burninup.me/about")
        self.driver.implicitly_wait(10)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[5]/div/li[8]/a")[0].click()
        assert "https://www.algolia.com/" in self.driver.current_url

    def test_cities(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to cities general page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/nav/div/a[2]")[0].click()
        assert "cities" in self.driver.current_url
        # test filter button
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/header/div[2]/div/div[1]/div[2]/span[3]/button")[0].
        click()
        # test clicking on row
        self.driver.get("https://burninup.me/cities")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/header/div[2]/div/div[3]/table/"+
        "tbody/tr[1]/td[4]/div[2]")[0].click()
        assert "https://burninup.me/cities/id=3537" in self.driver.current_url
        self.driver.get("https://burninup.me/cities")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/header/div[2]/div/table/"+
        "tfoot/tr/td/div/div/div/div[3]/button[2]")[0].click()

    def test_countries(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to countries general page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/nav/div/a[3]")[0].click()
        assert "countries" in self.driver.current_url
        # test filter button
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/header/div[2]/div/div[1]/div[2]/span[3]/button")[0].
        click()
        # test filter option
        self.driver.find_elements_by_xpath(
        "/html/body/div[2]/div[3]/div/div[2]/div[1]/"+
        "div/div[2]/div[1]/label/span[1]/span[1]/input")[0].click()
        # test clicking on row
        self.driver.get("https://burninup.me/countries")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/div[3]/"+
            "table/tbody/tr[1]/td[2]")[0].click()
        assert "https://burninup.me/countries/id=203" in self.driver.current_url
        self.driver.get("https://burninup.me/countries")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/table/"+
            "tfoot/tr/td/div/div/div/div[3]/button[2]")[0].click()

    def test_years(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to countries general page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div/nav/div/a[4]")[0].click()
        assert "years" in self.driver.current_url
        # test filter button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/"+
            "div[1]/div[2]/span[3]/button")[0].click()
        # test filter option
        self.driver.find_elements_by_xpath(
            "/html/body/div[2]/div[3]/div/div[2]/div[3]/div/"+
            "div[2]/div[1]/label/span[1]/span[1]/input")[0].click()
        # test clicking on row
        self.driver.get("https://burninup.me/years")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/div[3]/"+
            "table/tbody/tr[1]")[0].click()
        assert "https://burninup.me/years/id=1880" in self.driver.current_url
        self.driver.get("https://burninup.me/years")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/div[2]/div/table/"+
            "tfoot/tr/td/div/div/div/div[3]/button[2]")[0].click()

    def test_city_instance(self):
        # go to city instance page
        self.driver.get("https://burninup.me/cities/id=3538")
        self.driver.implicitly_wait(15)
        # click on country link
        self.driver.find_elements_by_xpath("/html/body/div/div/header/table/"+
        "tbody/tr[1]/td[2]/a")[0].click()
        assert "https://burninup.me/countries/id=206" in self.driver.current_url
        self.driver.get("https://burninup.me/cities/id=3538")
        # click on year of highest annual temperature link
        self.driver.find_elements_by_xpath("/html/body/div/div/header/table/"+
        "tbody/tr[6]/td[2]/a")[0].click()
        assert "https://burninup.me/years/id=2013" in self.driver.current_url
        
    def test_country_instance(self):
        self.driver.get("https://burninup.me/countries/id=1")
        self.driver.implicitly_wait(15)
        # test link to capital city
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table/tbody/tr[3]/td[2]/a")[0].click()
        assert "https://burninup.me/cities/id=3492" in self.driver.current_url
        self.driver.get("https://burninup.me/countries/id=1")
        # test link to year of highest emissions
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table/tbody/tr[7]/td[2]/a")[0].click()
        assert "https://burninup.me/years/id=2007" in self.driver.current_url
        self.driver.get("https://burninup.me/countries/id=1")

    def test_year_instance(self):
        # go to years instance page
        self.driver.get("https://burninup.me/years/id=1880")
        self.driver.implicitly_wait(15)
        # test links on years instance page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table[2]/tbody/tr[8]/td[1]/a")[0].click()
        assert "https://burninup.me/cities/id=437" in self.driver.current_url
        self.driver.get("https://burninup.me/years/id=1880")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/header/table[2]/tbody/tr[2]/td[1]/a")[0].click()
        assert "https://burninup.me/cities/id=2307" in self.driver.current_url
    
    
    def test_how_to_help(self):
        # go to how to help page
        self.driver.get("https://burninup.me/howtohelp")
        self.driver.implicitly_wait(5)
        # click on organization links
        self.driver.find_elements_by_xpath("/html/body/div/div/"+
        "div[2]/div/div[1]/div/a")[0].click()
        assert "https://www.rainforestcoalition.org/" in self.driver.current_url
        self.driver.get("https://burninup.me/howtohelp")
        self.driver.implicitly_wait(5)
        self.driver.find_elements_by_xpath("/html/body/div/div/"+
        "div[2]/div/div[2]/div/a")[0].click()
        assert "https://www.catf.us/" in self.driver.current_url
        
    def test_search(self):
        # go to search results for "united"
        self.driver.get("https://burninup.me/search/q=united")
        self.driver.implicitly_wait(10)
        # test first city result for "united"
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/main[1]/div/div/"+
            "ul/li[1]/div/a")[0].click()
        assert "https://burninup.me/cities/id=3402" in self.driver.current_url
        # test first country result for "united"
        self.driver.get("https://burninup.me/search/q=united")
        self.driver.implicitly_wait(10)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/main[2]/div/div/"+
            "ul/li[1]/div/a")[0].click()
        assert "https://burninup.me/countries/id=180" in self.driver.current_url
        # test first year result for "united"
        self.driver.get("https://burninup.me/search/q=united")
        self.driver.implicitly_wait(10)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/main[3]/div/div/"+
            "ul/li[1]/div/a")[0].click()
        assert "https://burninup.me/years/id=2018" in self.driver.current_url
        # go to search results for "2017"
        self.driver.get("https://burninup.me/search/q=2017")
        self.driver.implicitly_wait(10)
        # test first city result for "2017"
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/main[1]/div/"+
            "div/ul/li[1]/div/a")[0].click()
        assert "https://burninup.me/cities/id=2082" in self.driver.current_url
        # test first country result for "2017"
        self.driver.get("https://burninup.me/search/q=2017")
        self.driver.implicitly_wait(10)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/main[2]/div/div/"+
            "ul/li[1]/div/a")[0].click()
        assert "https://burninup.me/countries/id=174" in self.driver.current_url
        # test first year result for "2017"
        self.driver.get("https://burninup.me/search/q=2017")
        self.driver.implicitly_wait(10)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/main[3]/div/div/"+
            "ul/li[1]/div/a")[0].click()
        assert "https://burninup.me/years/id=2017" in self.driver.current_url

    def tearDown(self):
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()