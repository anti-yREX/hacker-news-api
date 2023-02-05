# Hacker News API with caching

**Problem Statement:** Use the Hacker News API available to build the API backend for the users with endpoints `/top-stories` , `/past-stories` and `/comments` .

## Get Started

**Steps :**

1. Run command `git clone https://github.com/anti-yREX/hacker-news-api.git`
2. Install Node v14.16.1 or later
3. In repo directory, run `npm install` .
4. Copy contents from `.env.example` file and paste in new file named `.env`.
5. Change Database credentials in `.env` file as per requirement.
6. Run `npm start` .

## Endpoints

### Top Stories:

This enpoint can be accessed using `/top-stories` appended to `baseURL` ie. `http://localhost:3000/top-stories` .

**Response Content:** Top 10 stories in last 15 minutes in form of an array. 

Each element of array has contents as follows:

Key|Descriptions
---|------------
id|The item's unique id.
title|The title of the story in HTML.
url|The URL of the story.
score|The story's score.
creationTime|Creation date of the item, in Unix Time.
user|The username of the item's author.

---

### Past Stories:

This enpoint can be accessed using `/past-stories` appended to `baseURL` ie. `http://localhost:3000/past-stories` .

**Response Content:** All past stories that were served by `/top-stories` endpoint in the form of an array. Each element of array has contents exactly as same as `/top-stories`.

---

### Comments:

This enpoint can be accessed using `/comments` appended to `baseURL` along with id added as query ie. `http://localhost:3000/comments?id=<id>` . Replace `<id>` with story id.

Note: `id` is a required parameter.

**Response Content:** Comments are listed in form of an array for the story specified using `id` query. The comments are sorted on the basis of the count of children comments.

Each element of array has contents as follows:

Key|Descriptions
---|------------
text|Content of the comment.
user|The username of the comment's author.

---
