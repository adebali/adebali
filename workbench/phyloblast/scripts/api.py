#!/usr/bin/python
from pymongo import mogno
import cgi, cgitb

arguments = cgi.FieldStorage()
for i in arguments.keys():
	print arguments[i].value
