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
##### 3. Run **`cd frontend && npm install`**;
##### 4. **[OPTIONAL]:** If you wish to change the location where both server and client run, you can change the values inside **`.env`** and **`/frontend/.env`**;
##### 5. Run **`npm run build`** to create a build version of the frontend (a build is included in the repo, but it should not be used as it will not work);
##### 6. Run **`npm start`**.
##### 7. Access **`http://localhost:3006`** (by default).


## Structure

### GSI communication:

Once Dota 2 is configured to send data to our server, the server will listen for incoming data, digest it using the **`digest()`** function from **`"dotagsi"`**, which basically transforms the data into something more readable.

```typescript
// GSI POST route
fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
	const data = request.body as Dota2Raw 
	const digested = GSI.digest(data)
	const processed = processData(digested, data)

	if (io) {
		io.emit('data', processed)
		readings++
	}

	console.clear()
	console.log("Data readings: ", readings)

	return { received: true }
})
```

After that, we use **`processData`**, a custom function that adds a `league` object to the data. This step is optional and was added because the data received from GSI does not contain any information about the league the game is being played in.

```typescript
export function processData(digested: any, data: any): any {
	const league = data?.league || {}

	return {
		...digested,
		league: {
			dire: league.dire ?? null,
			radiant: league.radiant ?? null,
			description: league.description ?? '',
			name: league.name ?? '',
			series_type: league.series_type ?? null,
		},
	}
}
```

The data is then sent to the frontend using websockets.

## Development Process

The design was based of a Figma mockup I created before-hand:

![Dota 2 Draft Mockup](/stuff/mockup.png)

Picks and Bans can be represented by 3 different states:

![Dota 2 Draft Mockup - Picks and Bans types](/stuff/types.png)

The color palette used for this project is the following:

![Dota 2 Draft Mockup - Color palette](/stuff/palette.png)
