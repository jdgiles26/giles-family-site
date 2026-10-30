"""Shared <head> snippet used when authoring pages (pages are plain static HTML)."""
def head(title, desc, css=()):
    links = ''.join(f'<link rel="stylesheet" href="assets/css/{c}.css">' for c in css)
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:image" content="assets/img/og-card.png"><meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#efe4c9">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml"><link rel="icon" href="assets/img/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="assets/css/fonts.css"><link rel="stylesheet" href="assets/css/site.css">{links}
</head>
'''
