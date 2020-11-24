import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# selenium tests for frontend code
class tests(unittest.TestCase):
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(
            "../../node_modules/.bin/chromedriver", options=chrome_options
        )

    def test_landing(self):
        # test buttons on landing page
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        assert self.driver.title == "Burnin' Up"
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[2]/button[1]"
        )[0].click()
        assert "https://burninup.me/cities" in self.driver.current_url
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[2]/button[2]"
        )[0].click()
        assert "https://burninup.me/countries" in self.driver.current_url
        self.driver.get("https://burninup.me")
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[2]/button[3]"
        )[0].click()
        assert "https://burninup.me/years" in self.driver.current_url

    def test_navBar(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # test home page button
        self.driver.find_elements_by_xpath("/html/body/div/"
        +"div/div[1]/nav/a")[0].click()
        assert "https://burninup.me" in self.driver.current_url
        # test about button
        self.driver.find_elements_by_xpath("/html/body/div/div"
        +"/div[1]/nav/div/a[1]")[0].click()
        assert "https://burninup.me/about" in self.driver.current_url
        # test cities button
        self.driver.find_elements_by_xpath("/html/body/div/div"
        +"/div[1]/nav/div/a[2]")[0].click()
        assert "https://burninup.me/cities" in self.driver.current_url
        # test countries button
        self.driver.find_elements_by_xpath("/html/body/div/"
        +"div/div[1]/nav/div/a[3]")[0].click()
        assert "https://burninup.me/countries" in self.driver.current_url
        # test annual climate change button
        self.driver.find_elements_by_xpath("/html/body/div/div"
        +"/div[1]/nav/div/a[4]")[0].click()
        assert "https://burninup.me/years" in self.driver.current_url
        # test how to help button
        self.driver.find_elements_by_xpath("/html/body/div/div"
        +"/div[1]/nav/div/a[5]")[0].click()
        assert "https://burninup.me/howtohelp" in self.driver.current_url
        # test visualizations button
        self.driver.find_elements_by_xpath("/html/body/div/div"
        +"/div[1]/nav/div/a[6]")[0].click()
        assert "https://burninup.me/visualizations" in self.driver.current_url
        # test provider visualizations button
        self.driver.find_elements_by_xpath("/html/body/div/"
        +"div/div[1]/nav/div/a[7]")[0].click()
        assert ("https://burninup.me/provider-visualizations"
            in self.driver.current_url)
        # test search bar button
        self.driver.find_elements_by_xpath("/html/body/div/"
        +"div/div[1]/nav/form/button")[0].click()
        assert "https://burninup.me/search/q=" in self.driver.current_url

    def test_about(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(10)
        # go to about us page via nav bar
        self.driver.find_elements_by_xpath("/html/body/div/"
        +"div/div[1]/nav/div/a[1]")[0].click()
        assert ("https://burninup.me/about"
            in self.driver.current_url)
        title = self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/h3"
        )[0].text
        assert title == "About Us" # verify title
        # test links on about page
        self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/div[7]/"+
            "div[1]/div/div[1]/h2/a")[0].click()
        assert (
            "https://documenter.getpostman.com/view/12123261/TVRdAWse"
            in self.driver.current_url)

    def test_cities(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to cities general page
        self.driver.find_elements_by_xpath("/html/body/div/"
        +"div/div[1]/nav/div/a[2]")[0].click()
        assert "cities" in self.driver.current_url
        # test filter button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div/div/div[1]/div[2]/span/button"
        )[0].click()
        # test clicking on row
        self.driver.get("https://burninup.me/cities")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath("/html/body/div/div/"
        +"div[2]/div/div/div/div[3]/table/tbody/tr[3]")[0].click()
        assert ("https://burninup.me/cities/id=3539" 
            in self.driver.current_url)
        self.driver.get("https://burninup.me/cities")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/"
        +"div/div/div/table/tfoot/tr/td/div/div/div/div[3]/button[2]"
        )[0].click()

    def test_countries(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to countries general page
        self.driver.find_elements_by_xpath("/html/body/div/div"
        +"/div[1]/nav/div/a[3]")[0].click()
        assert "countries" in self.driver.current_url
        # test filter button and filter option
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div/div/div[1]/div[2]/span/button"
        )[0].click()
        self.driver.find_elements_by_xpath("/html/body/div[2]/div[3]/div"
        +"/div[2]/div[1]/div/div[2]/div[1]/label/span[1]/span[1]/input"
        )[0].click()
        # test clicking on row
        self.driver.get("https://burninup.me/countries")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/"
        +"div/div/div/div[3]/table/tbody/tr[3]")[0].click()
        assert "https://burninup.me/countries/id=39" in self.driver.current_url
        self.driver.get("https://burninup.me/countries")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/div/div/"
        +"div/table/tfoot/tr/td/div/div/div/div[3]/button[2]")[0].click()

    def test_years(self):
        self.driver.get("https://burninup.me")
        self.driver.implicitly_wait(20)
        # navigate to years general page
        self.driver.find_elements_by_xpath("/html/body/div/"
        +"div/div[1]/nav/div/a[4]")[0].click()
        assert "years" in self.driver.current_url
        # test filter button
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div/div/div[1]/div[2]/span/button"
        )[0].click()
        # test filter option
        self.driver.find_elements_by_xpath(
            "/html/body/div[2]/div[3]/div/div[2]/div[1]"
            +"/div/div[2]/div[1]/label/span[1]/span[1]/input"
        )[0].click()
        # test clicking on row
        self.driver.get("https://burninup.me/years")
        self.driver.implicitly_wait(20)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div/div/div[3]/table/tbody/tr[1]"
        )[0].click()
        assert "https://burninup.me/years/id=1880" in self.driver.current_url
        self.driver.get("https://burninup.me/years")
        self.driver.implicitly_wait(20)
        # test going to next page
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div/div/"
            +"table/tfoot/tr/td/div/div/div/div[3]/button[2]"
        )[0].click()

    def test_city_instance(self):
        self.driver.get("https://burninup.me/cities/id=3538")
        self.driver.implicitly_wait(15)
        # click on country link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[3]/header/div[1]/h3[2]/a"
        )[0].click()
        assert "https://burninup.me/countries/id=206" in self.driver.current_url
        self.driver.get("https://burninup.me/cities/id=3538")
        # click on year of highest annual temperature link
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div[4]/div/a"
        )[0].click()
        assert "https://burninup.me/years/id=2013" in self.driver.current_url

    def test_country_instance(self):
        self.driver.get("https://burninup.me/countries/id=1")
        self.driver.implicitly_wait(15)
        # test link to capital city
        self.driver.find_elements_by_xpath(
        "/html/body/div/div/div[2]/div[3]/header/div[6]/a")[0].click()
        assert "https://burninup.me/cities/id=3492" in self.driver.current_url
        self.driver.get("https://burninup.me/countries/id=1")
        # test link to year of highest emissions
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div[7]/div/a"
        )[0].click()
        assert "https://burninup.me/years/id=2007" in self.driver.current_url

    def test_year_instance(self):
        # go to years instance page
        self.driver.get("https://burninup.me/years/id=1880")
        self.driver.implicitly_wait(15)
        # test links on years instance page
        self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/div[1]"
        +"/header/div/div[7]/div/div/div[2]/table/tbody/tr[5]")[0].click()
        assert "https://burninup.me/cities/id=3132" in self.driver.current_url
        self.driver.get("https://burninup.me/years/id=1880")
        self.driver.find_elements_by_xpath("/html/body/div/div/div[2]/div[1]"+
        "/header/div/div[7]/div/div/div[2]/table/tbody/tr[1]")[0].click()
        assert "https://burninup.me/cities/id=1568" in self.driver.current_url

    def test_how_to_help(self):
        # go to how to help page
        self.driver.get("https://burninup.me/howtohelp")
        self.driver.implicitly_wait(5)
        # click on organization links
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div/div[1]/div/a"
        )[0].click()
        assert "https://www.rainforestcoalition.org/" in self.driver.current_url
        self.driver.get("https://burninup.me/howtohelp")

    def test_search(self):
        # go to search results for "united"
        self.driver.get("https://burninup.me/search/q=united")
        self.driver.implicitly_wait(20)
        # test first city result for "united"
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[4]/main/div/div/div[1]/div/div/a/u/div"
        )[0].click()
        assert "https://burninup.me/cities/id=2349" in self.driver.current_url
        # test first country result for "united"
        self.driver.get("https://burninup.me/search/q=united")
        self.driver.implicitly_wait(15)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[5]/main/div/div/div[1]/div/div/a/u/div"
        )[0].click()
        assert "https://burninup.me/countries/id=180" in self.driver.current_url
        # test first year result for "united"
        self.driver.get("https://burninup.me/search/q=united")
        self.driver.implicitly_wait(15)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[6]/main/div/div/div[1]/div/div/a/u/div"
        )[0].click()
        assert "https://burninup.me/years/id=2019" in self.driver.current_url

    def test_our_visualizations(self):
        # go to visualizations page and click on the three tabs
        self.driver.get("https://burninup.me/visualizations")
        self.driver.implicitly_wait(5)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div/div/button[1]"
        )[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div/div/button[2]"
        )[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div/div/button[3]"
        )[0].click()

    def test_customer_visualizations(self):
        # go to customer visualizations page and click on the three tabs
        self.driver.get("https://burninup.me/provider-visualizations")
        self.driver.implicitly_wait(5)
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div/div/button[1]"
        )[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div/div/button[2]"
        )[0].click()
        self.driver.find_elements_by_xpath(
            "/html/body/div/div/div[2]/div[1]/header/div/div/div/button[3]"
        )[0].click()

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()