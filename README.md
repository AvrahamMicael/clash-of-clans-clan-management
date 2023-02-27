# coc-clan-management

An Express website to manage clan members promotions.

## Table of Contents

- [Features](#features)
- [Motivation](#motivation)
- [Setup](#setup)
- [Admin](#admin)
- [ExtraData](#extra-data)

## Features

- Show members that can be promoted.
- Can use criteria not provided by COC API, such as wars and war leagues amount which a member participated in the clan.

## Motivation

This project was created to handle with data which are not provided in game and can be hard to note. Moreover, it gives (if you want to) elders, coLeaders and leader another responsability to update members' *Extradata*.

## Setup

1. Clone the repo with `git clone https://github.com/AvrahamMicael/clash-of-clans-clan-management.git`.
2. Go to 'clash-of-clans-clan-management' folder: `cd clash-of-clans-clan-management`.
3. Copy `.env.example` and paste to `.env` file and change the environment variables:
    * `NODE_ENV`: `development|production`. `production` won't show error details other than basic message.
    * `CLAN_NAME`: your clan's name.
    * `CLAN_TAG`: your clan's tag without `#`.
    * `MIN_ADMIN_ACCESS`: `elder|coLeader|leader`. This defines the minimum role level to update another members *ExtraData* and change promotion requirements.
    * `LOCALE`: app language to be displayed. Need to create a json file on `/locales` with the same name, if not found, it will default to English. The `pt.json` file can be used as reference when creating your locale.  
    * `COC_API_KEY`: your app key you get [here](https://developer.clashofclans.com).
    * `COOKIES_SECRET`: signed cookies secret.
    * `MONGO_URI`: mongoDB connection string for production.
    * `MONGO_URI_TEST`: mongoDB connection string for development.
4. Install dependencies: `npm i`.
5. Setup static JS and CSS: `npm run build`.
6. Run `npm run dev`.

## Admin

On `/admin` you can log in with your tag and API token, if you're allowed you'll be redirected to home.

Admins can update *ExtraData* on home and promotion requirements on `/promotions`. Promotions to a role can be toggled by clicking on the checkbox.

## ExtraData

Data which is not provided by COC API, so members with admin access need to add manually.
