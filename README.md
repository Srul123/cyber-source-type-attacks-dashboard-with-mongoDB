# cyber-source-type-attacks-dashboard
MEAN Stack Technologies - MongoDB + ExpressJS + Angular + NodeJS


## Clone repo:
git clone https://github.com/Srul123/cyber-source-type-attacks-dashboard-with-mongoDB.git

## Installation server side:
    cd server 
    npm install

## Run server
    npm start

## Installation client side:
    npm install -g @angular/cli
    cd client
    npm install

## Run client dev server
    ng serve
    
    
    
## MongoDB server wiring connection instruction (Optional):
    1. create DB with name 'cyber-sources' which running on mongodb://127.0.0.1:27017/cyber-sources
    2. Create collection with name 'attacksourcetypes' under 'cyber-sources' DB
    3. Load to 'attacksourcetypes' collection the following file: 
       server\assets\data.json
	- see example in screenshot below
    4. Go to following path inside server project 'server\src\routers\attack-info.js' and uncomment lines 58-67:
		const readData = async () => {
		  const cacheDataKey = "attackTypesResource";
		  if (myCache.has(cacheDataKey)) {
		    const timeCache = myCache.get(cacheDataKey);
		    return timeCache;
		  }
		  const attackTypesResource = await AttackSourceTypes.find();
		  myCache.set(cacheDataKey, attackTypesResource);
		  return attackTypesResource;
		}
     5. Go to lines 43-51 and comment these lines:
        // async function readData() {
		// const cacheDataKey = "attackTypesResource";
		//   if (myCache.has(cacheDataKey)) {
		//     return myCache.get(cacheDataKey);
		//   }
		//   const dataFromDB = JSON.parse(readFileSync("assets/data.json"));
		//   myCache.set(cacheDataKey, dataFromDB);
		//   return dataFromDB;
	// }
	
## Done - MongoDB connected 

		
![image](https://user-images.githubusercontent.com/31043411/198828452-170d268d-496d-43e8-a90a-2ae09a30b7c7.png)


![image](https://user-images.githubusercontent.com/31043411/198828471-3ae78552-2e2e-4bdf-96e4-7880c1873aaf.png)

