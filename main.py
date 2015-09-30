#-*- coding: utf-8 -*-
from contextlib import closing
from flask import Flask, render_template, g, url_for, redirect, request
from models import Post, PostRoot
from datetime import datetime

import time

# configuration
DATABASE = 'tmp/heekmsg.db'
DEBUG = False
SECRET_KEY = 'development key'

app = Flask(__name__)
app.config.from_object(__name__)

def getMessage():
	heekPost = PostRoot(key_name='heek', version=2)
	
	query = Post.all()
	query.ancestor(heekPost)
	query.order('-datetime')

	for post in query.run(limit=1):
        	return post.text

def getSatTime():
        now = datetime.now()
        sat = datetime(2014, 11, 13, 8, 40)
        interval = sat - now

        days = interval.days
        hours = interval.seconds / 60 / 60
        minutes = interval.seconds / 60 % 60
        seconds = interval.seconds % 60
        ms = interval.microseconds % 1000

	pre = u"히익"
	sattime = u"%d일 %d시간 %d분 %d초 %d" % (days, hours, minutes, seconds, ms)
	msg = getMessage()
	return pre + "\n" + sattime + "\n" + msg

@app.route('/')
def index():
	msg = getMessage()
	return render_template('index.html', entry=msg)

@app.route('/submit_entry', methods=['POST'])
def submit_entry():
	heekPost = PostRoot(key_name='heek', version=2)

	post = Post(parent=heekPost)
	post.text = request.form['message'][0:128]
	post.datetime = datetime.now()

	post.put()	

	return redirect(url_for('index'))

@app.route('/history', methods=['GET'])
def history():
	show_count = 50
	startPage = int(request.args.get('page', 1))
	
	prevpage = startPage - 1
	if prevpage <= 0:
		prevpage = None	
	nextpage = startPage + 1

	startOffset = startPage * show_count - show_count
	nextOffset = nextpage * show_count - show_count
	
	heekPost = PostRoot(key_name='heek', version=2)
	query = Post.all()
	query.ancestor(heekPost)
	query.order('-datetime')


	rows = [dict(text=post.text) for post in query.run(offset=startOffset, limit=show_count)]

	next_cnt = query.count(offset=nextOffset, limit=show_count)
	if next_cnt == 0:
		nextpage = None

	return render_template('history.html', contents=rows, prevpage=prevpage, nextpage=nextpage)

