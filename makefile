.DEFAULT_GOAL := all
MAKEFLAGS     += --no-builtin-rules
SHELL         := bash

# ifeq ($(shell uname -s), Darwin)
#     ASTYLE        := astyle
#     BOOST         := /usr/local/include/boost
#     CHECKTESTDATA := checktestdata
#     CPPCHECK      := cppcheck
#     CXX           := g++-9
#     CXXFLAGS      := -fprofile-arcs -ftest-coverage -pedantic -std=c++14 -O3 -I/usr/local/include -Wall -Wextra
#     LDFLAGS       := -lgtest -lgtest_main
#     DOXYGEN       := doxygen
#     GCOV          := gcov-9
#     VALGRIND      := valgrind
# else ifeq ($(shell uname -p), unknown)
#     ASTYLE        := astyle
#     BOOST         := /usr/include/boost
#     CHECKTESTDATA := checktestdata
#     CPPCHECK      := cppcheck
#     CXX           := g++
#     CXXFLAGS      := -fprofile-arcs -ftest-coverage -pedantic -std=c++14 -O3 -Wall -Wextra
#     LDFLAGS       := -lgtest -lgtest_main -pthread
#     DOXYGEN       := doxygen
#     GCOV          := gcov
#     VALGRIND      := valgrind
# else
#     ASTYLE        := astyle
#     BOOST         := /usr/include/boost
#     CHECKTESTDATA := checktestdata
#     CPPCHECK      := cppcheck
#     CXX           := g++-9
#     CXXFLAGS      := -fprofile-arcs -ftest-coverage -pedantic -std=c++14 -O3 -Wall -Wextra
#     LDFLAGS       := -lgtest -lgtest_main -pthread
#     DOXYGEN       := doxygen
#     GCOV          := gcov-9
#     VALGRIND      := valgrind
# endif

# FILES :=                                      \
#     RunDarwin                              \
#     TestDarwin

CFILES :=                                     \
    .gitignore                                \
    .gitlab-ci.yml                            

# TFILES := `ls darwin-tests/*.in`

# darwin-tests:
# 	git clone https://gitlab.com/gpdowning/cs371p-darwin-tests.git darwin-tests

# darwin-tests/%:
# 	./RunDarwin < $@.in > RunDarwin.tmp
# 	-diff RunDarwin.tmp $@.out

# html: Doxyfile Darwin.hpp
# 	$(DOXYGEN) Doxyfile

# Darwin.log:
# 	git log > Darwin.log

# # you must edit Doxyfile and
# # set EXTRACT_ALL     to YES
# # set EXTRACT_PRIVATE to YES
# # set EXTRACT_STATEIC to YES
# Doxyfile:
# 	$(DOXYGEN) -g

# RunDarwin: Constants.hpp Species.hpp Species.cpp Creature.hpp Creature.cpp Darwin.cpp Darwin.hpp RunDarwin.cpp
# 	-$(CPPCHECK) RunDarwin.cpp
# 	-${CPPCHECK} Species.cpp
# 	-${CPPCHECK} Creature.cpp
# 	-${CPPCHECK} Darwin.cpp
# 	$(CXX) $(CXXFLAGS) Species.cpp Creature.cpp Darwin.cpp RunDarwin.cpp -o RunDarwin

# RunDarwin.cppx: RunDarwin
# 	./RunDarwin < RunDarwin.in > RunDarwin.tmp
# 	-diff RunDarwin.tmp RunDarwin.out

# TestDarwin: Constants.hpp Species.hpp Species.cpp Creature.hpp Creature.cpp Darwin.cpp Darwin.hpp TestDarwin.cpp
# 	-${CPPCHECK} Species.cpp
# 	-${CPPCHECK} Creature.cpp
# 	-${CPPCHECK} Darwin.cpp
# 	-$(CPPCHECK) TestDarwin.cpp
# 	$(CXX) $(CXXFLAGS) Species.cpp Creature.cpp Darwin.cpp TestDarwin.cpp -o TestDarwin $(LDFLAGS)

# TestDarwin.cppx: TestDarwin
# 	$(VALGRIND) ./TestDarwin
# 	$(GCOV) -b TestDarwin.cpp | grep -A 5 "File '.*TestDarwin.cpp'"

# darwin-tests/%: RunDarwin
# 	./RunDarwin < $@.in > RunDarwin.tmp
# 	diff RunDarwin.tmp $@.out

all: $(FILES)

check: $(CFILES)

# clean:
# 	rm -f *.gcda
# 	rm -f *.gcno
# 	rm -f *.gcov
# 	rm -f *.plist
# 	rm -f *.tmp
# 	rm -f RunDarwin
# 	rm -f TestDarwin

# config:
# 	git config -l

# ctd-check:
# 	$(CHECKTESTDATA) RunDarwin.ctd RunDarwin.in

# ctd-generate:
# 	$(CHECKTESTDATA) -g RunDarwin.ctd RunDarwin.tmp

docker:
	docker run -it -v $(PWD):/usr/burninup -w /usr/burninup caitlinlien/burninup
	

docker-images:


# format:
# 	$(ASTYLE) Darwin.hpp
# 	$(ASTYLE) RunDarwin.cpp
# 	$(ASTYLE) TestDarwin.cpp

# init:
# 	git init
# 	git remote add origin git@gitlab.com:gpdowning/cs371p-darwin.git
# 	git add README.md
# 	git commit -m 'first commit'
# 	git push -u origin master

# pull:
# 	make clean
# 	@echo
# 	git pull
# 	git status

# push:
# 	make clean
# 	@echo
# 	git add .gitignore
# 	git add .gitlab-ci.yml
# 	git add Darwin.hpp
# 	-git add Darwin.log
# 	-git add html
# 	git add makefile
# 	git add README.md
# 	git add RunDarwin.cpp
# 	git add RunDarwin.ctd
# 	git add RunDarwin.in
# 	git add RunDarwin.out
# 	git add TestDarwin.cpp
# 	git commit -m "another commit"
# 	git push
# 	git status

# run: RunDarwin.cppx

# scrub:
# 	make clean
# 	rm -f  Darwin.log
# 	rm -f  Doxyfile
# 	rm -rf collatz-tests
# 	rm -rf html
# 	rm -rf latex

# status:
# 	make clean
# 	@echo
# 	git branch
# 	git remote -v
# 	git status

# sync:
# 	make clean
# 	@pwd
# 	@rsync -r -t -u -v --delete            \
#     --include "Darwin.hpp"              \
#     --include "RunDarwin.cpp"           \
#     --include "RunDarwin.ctd"           \
#     --include "RunDarwin.in"            \
#     --include "RunDarwin.out"           \
#     --include "TestDarwin.cpp"          \
#     --exclude "*"                          \
#     ~/projects/cpp/darwin/ .
# 	@rsync -r -t -u -v --delete            \
#     --include ".gitignore"                 \
#     --include ".gitlab-ci.yml"             \
#     --include "Darwin.hpp"              \
#     --include "makefile"                   \
#     --include "RunDarwin.cpp"           \
#     --include "RunDarwin.ctd"           \
#     --include "RunDarwin.in"            \
#     --include "RunDarwin.out"           \
#     --include "TestDarwin.cpp"          \
#     --exclude "*"                          \
#     . downing@$(CS):cs/git/cs371p-darwin/

# test: TestDarwin.cppx

# tests: darwin-tests RunDarwin
# 	for v in $(TFILES); do make $${v/.in/}; done

# versions:
# 	@echo "% shell uname -p"
# 	@echo  $(shell uname -p)
# 	@echo
# 	@echo "% shell uname -s"
# 	@echo  $(shell uname -s)
# 	@echo
# 	@echo "% which $(ASTYLE)"
# 	@which $(ASTYLE)
# 	@echo
# 	@echo "% $(ASTYLE) --version"
# 	@$(ASTYLE) --version
# 	@echo
# 	@echo "% grep \"#define BOOST_VERSION \" $(BOOST)/version.hpp"
# 	@grep "#define BOOST_VERSION " $(BOOST)/version.hpp
# 	@echo
# 	@echo "% which $(CHECKTESTDATA)"
# 	@which $(CHECKTESTDATA)
# 	@echo
# 	@echo "% $(CHECKTESTDATA) --version"
# 	@$(CHECKTESTDATA) --version
# 	@echo
# 	@echo "% which $(CXX)"
# 	@which $(CXX)
# 	@echo
# 	@echo "% $(CXX) --version"
# 	@$(CXX) --version
# 	@echo "% which $(CPPCHECK)"
# 	@which $(CPPCHECK)
# 	@echo
# 	@echo "% $(CPPCHECK) --version"
# 	@$(CPPCHECK) --version
# 	@echo
# 	@$(CXX) --version
# 	@echo "% which $(DOXYGEN)"
# 	@which $(DOXYGEN)
# 	@echo
# 	@echo "% $(DOXYGEN) --version"
# 	@$(DOXYGEN) --version
# 	@echo
# 	@echo "% which $(GCOV)"
# 	@which $(GCOV)
# 	@echo
# 	@echo "% $(GCOV) --version"
# 	@$(GCOV) --version
# ifneq ($(shell uname -s), Darwin)
# 	@echo "% which $(VALGRIND)"
# 	@which $(VALGRIND)
# 	@echo
# 	@echo "% $(VALGRIND) --version"
# 	@$(VALGRIND) --version
# endif
