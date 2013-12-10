Welcome to DATABASS!
<br>
<br>
Databass is an online bass gallery where friends can meet, mingle, and mix. chat function coming soon!

by [mack](http://mackhowell.com) and [sarah](http://sarahrothberg.com)


[GO THERE](www.database.herokuapp.com)

## HOW TO:

Open the code directory in your Terminal

* get rediscloud into .env

		heroku config -s > .env

From your code directory in Terminal run the following and press Return when asked

	ruby homebrewlinkfix.rb

### Install libevent

* Install libevent <http://stackoverflow.com/questions/7630388/how-can-i-install-the-python-library-gevent-on-mac-os-x-lion/19574385#19574385>

		brew install libevent

* Run the following command to prepare libevent for Gevent (copy everything, it is a single line command)	
	
		export CFLAGS="-I /usr/local/Cellar/libevent/2.0.21/include -L /usr/local/Cellar/libevent/2.0.21/lib"

### Finally, install GEvent

* Install gevent (this is really just for peace of mind...it should install correctly)

		pip install gevent


## Install web app requirements

This will create virutalenv, activate and install requirements

	virtualenv venv
	. venv/bin/activate
	pip install -r requirements

## Start the server

	foreman start

## Visit at <http://localhost:5000>

## Push to Heroku

	git push heroku master

Visit web app

	heroku open
 	