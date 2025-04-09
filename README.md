# Dota 2 Challenge - Gamestate Integration Draft HUD

## Overview
This project consists of a web application that displays a Dota 2 Draft process making use of live data supplied by GSI.

## How to setup

### Configure Dota 2 to send data

##### 1. Locate the **`gamestate_integration_draft.cfg`** file in /stuff;
##### 2. **[OPTIONAL]:** If you wish to change the location the data is sent to, modify **`gamestate_integration_draft.cfg`** (If you do this, you will need to change client and server environment variables to accomodate the changes);
##### 3. Paste it into  **`C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta/game/dota/cfg/gamestate_integration`** or your Dota 2 game location folder;
##### 4. In Steam, Library, right click Dota 2. In General, Startup options, paste **`-gamestateintegration`**.

### Project setup
##### 1. Clone this repo;
##### 2. Run **`npm install`**;
##### 3. **[OPTIONAL]:** If you wish to change the location where both server and client run, you can change the values inside **`.env`** and **`/frontend/.env`**;
##### 4. Run **`npm start`**.


## Development Process

The design was based of a Figma mockup I created before-hand:

![Dota 2 Draft Mockup](/stuff/mockup.png)

![Dota 2 Draft Mockup - Picks and Bans types](/stuff/types.png)
