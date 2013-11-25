# Python Websockets Example: Chat

This is a simple application that serves tasty WebSockets to your users
with Flask, Flask-Sockets, Gevent, and Gunicorn.


Check out the [live demo](http://flask-chat.herokuapp.com) or [read the docs](https://devcenter.heroku.com/articles/python-websockets).


* create repo

		git init
		git add .
		
		git commmit -am "initial commit"

* create heroku app, install rediscloud, enable websockets

		heroku create
		heroku addons:add rediscloud
		heroku labs:enable websockets

* get rediscloud into .env

		heroku config -s > .env

## Getting GEvent installed

I had some issues installing GEvent - here are all the steps that worked for me

### Homebrew, you need it.

* Install [Homebrew](http://brew.sh/)

### Fix homebrew, just in case

* Once homebrew is installed, run Ruby script to fix linking (just in case homebrew linking is borked)

From your code directory in Terminal run the following and press Return when asked

	ruby homebrewlinkfix.rb

### Install libevent

* Install libevent <http://stackoverflow.com/questions/7630388/how-can-i-install-the-python-library-gevent-on-mac-os-x-lion/19574385#19574385>

		brew install libevent

* Run the following command to prepare libevent for Gevent (copy everything, it is a single line command)	
	
		export CFLAGS="-I /usr/local/Cellar/libevent/2.0.21/include -L /usr/local/Cellar/libevent/2.0.21/lib"

### Finally, install GEvent

* Install gevent

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
 	