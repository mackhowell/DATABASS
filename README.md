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


Technical nonsense

* Install [Homebrew](http://brew.sh/)
* Once homebrew is installed, run Ruby script to fix linking (just in case homebrew linking is borked)

From your code directory in Terminal run the following and press Return when asked

	ruby homebrewlinkfix.rb


* Install libevent <http://stackoverflow.com/questions/7630388/how-can-i-install-the-python-library-gevent-on-mac-os-x-lion/19574385#19574385>

		brew install libevent

* Run the following command to prepare libevent for Gevent (copy everything, it is a single line command)	
	
		export CFLAGS="-I /usr/local/Cellar/libevent/2.0.21/include -L /usr/local/Cellar/libevent/2.0.21/lib"

* Install gevent

		pip install gevent


* create virutalenv, activate and install requirements

		virtualenv venv
		. venv/bin/activate
		pip install -r requirements



 	