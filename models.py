from google.appengine.ext import db


class PostRoot(db.Model):
    version = db.IntegerProperty()


class Post(db.Model):
    text = db.TextProperty()
    datetime = db.DateTimeProperty(auto_now_add=True)
