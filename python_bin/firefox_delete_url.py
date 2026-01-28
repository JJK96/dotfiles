# run in ~/Library/Application Support/Firefox/Profiles/<profile>
import sqlite3

def delete_url(url):
    con = sqlite3.connect("places.sqlite")
    cur = con.cursor()
    cur.execute("delete from moz_places where url LIKE :url;", (url,))
    cur.execute("delete from moz_origins where host like :url;", (url,))
    con.commit()
    con.close()

    con = sqlite3.connect("favicons.sqlite")
    cur = con.cursor()
    cur.execute("delete from moz_icons where icon_url like :url;", (url,))
    cur.execute("delete from moz_pages_w_icons where page_url like :url;", (url,))
    con.commit()
    con.close()

    con = sqlite3.connect("weave/bookmarks.sqlite")
    cur = con.cursor()
    cur.execute("delete from urls where url like :url;", (url,))
    con.commit()
    con.close()

    con = sqlite3.connect("webappsstore.sqlite")
    cur = con.cursor()
    cur.execute("delete from webappsstore2 where value like :url;", (url,))
    con.commit()
    con.close()

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("url")
args = parser.parse_args()

delete_url(args.url)
