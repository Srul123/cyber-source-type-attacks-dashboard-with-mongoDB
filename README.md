# cyber-source-type-attacks-dashboard
MEAN Stack Technologies - MongoDB + ExpressJS + Angular + NodeJS

![image](https://user-images.githubusercontent.com/31043411/198828746-5b0e0a0b-da70-4780-9817-857799de47b2.png)




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
    // open http://localhost:4200/ in browser
    
## You are done (-:
    
## Dashboard panel project screenshot example:		
![image](https://user-images.githubusercontent.com/31043411/198828452-170d268d-496d-43e8-a90a-2ae09a30b7c7.png)    

# Optional Docker with image container of NodeJS 16 Server
![image](https://user-images.githubusercontent.com/31043411/202275317-17ac04df-91fd-4d5a-8b36-27b114824892.png)


1. Make sure you already installed Docker on your local machine
2. Run from server folder project (cyber-source-type-attacks-dashboard-with-mongoDB/server): 
       docker compose up

# Optional - MongoDB server:
![image](https://user-images.githubusercontent.com/31043411/202291201-538a4c55-a6c1-4544-a36d-bb679de1ddfc.png)

    1. Create local DB with name 'cyber-sources' which running on port mongodb://127.0.0.1:27017/cyber-sources
    2. Create collection with name 'attacksourcetypes' under 'cyber-sources' DB
    3. Load to 'attacksourcetypes' collection the following file: 
       server\assets\data.json
	- see example in screenshot below
    4. Go to following path inside server project 'server\src\routers\attack-info.js' and uncomment lines 58-67:
		const readData = async () => {
		  const cacheDataKey = "attackTypesResource";
		  if (myCache.has(cacheDataKey)) {
		    const dataFromDB = myCache.get(cacheDataKey);
    		    return dataFromDB;
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
	



## MongoDB setup example:
![image](https://user-images.githubusercontent.com/31043411/198828471-3ae78552-2e2e-4bdf-96e4-7880c1873aaf.png)

