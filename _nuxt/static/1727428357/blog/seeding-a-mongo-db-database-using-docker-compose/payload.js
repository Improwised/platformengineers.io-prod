__NUXT_JSONP__("/blog/seeding-a-mongo-db-database-using-docker-compose", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){return {data:[{blog:{id:b,status:"published",sort:21,date_created:"2024-06-25T07:59:40.788Z",date_updated:"2024-06-25T12:59:49.330Z",slug:"seeding-a-mongo-db-database-using-docker-compose",title:c,description:"\u003Cp\u003ESeeding a MongoDB Database using Docker Compose\u003C\u002Fp\u003E",seo_title:c,seo_description:c,content:"\u003Cp dir=\"ltr\"\u003EWhen working on a development project, it is often necessary to have a pre-populated database for testing and development purposes. This process is known as seeding the database.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003ESeeding, in the context of databases, refers to the process of populating a database with initial data sets. This data serves as a foundation for testing functionalities, demonstrating application behavior, and providing a starting point for development. Seeding is particularly useful during:\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EApplication Development: Seeding allows developers to test application logic against a populated database, ensuring functionalities interact with data as intended.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EIntegration Testing: During integration testing, seed data can be used to simulate real-world scenarios and verify proper data flow between different components of the system.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EDemonstration Environments: Seeding a database with sample data can be beneficial for showcasing application features and functionalities in a demonstration environment.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E\u003Cstrong\u003EPrerequisites : Before we begin, ensure you have the following prerequisites:\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EDocker and Docker Compose are installed on your machine.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EA MongoDB image pulled from Docker Hub.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EA JSON file containing the data you want to seed into the database.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003ECreating a Docker Compose File\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EThe first step is to create a Docker Compose file that defines the services required for our project. In this case, we need a MongoDB service. Create a file named \u003Ccode\u003E docker-compose.yml\u003C\u002Fcode\u003E and add the following code:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003Eversion: '3'\nservices:\n  mongodb:\n    image: mongo\n    container_name: mongodb\n    ports:\n      - \"27017:27017\"\n    volumes:\n      - .\u002Fdata:\u002Fdata\u002Fdb\n      - .\u002Fseed.js:\u002Fdocker-entrypoint-initdb.d\u002Fseed.js\n    environment:\n      MONGO_INITDB_ROOT_USERNAME: root\n      MONGO_INITDB_ROOT_PASSWORD: example\n    command: [\"mongod\", \"--auth\"]\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EIn the above code, we define a service named \u003Ccode\u003Emongodb\u003C\u002Fcode\u003E that uses the official MongoDB image from Docker Hub. We also specify a container name, expose port 27017, and mount two volumes. The first volume mounts the \u003Ccode\u003E.\u002Fdata\u003C\u002Fcode\u003E directory on the host machine to the \u003Ccode\u003E\u002Fdata\u002Fdb\u003C\u002Fcode\u003E directory inside the container. This allows us to persist data between container restarts. The second volume mounts the \u003Ccode\u003Eseed.js\u003C\u002Fcode\u003E file to the \u003Ccode\u003E\u002Fdocker-entrypoint-initdb.d\u003C\u002Fcode\u003E directory inside the container. This directory is used by the MongoDB image to execute scripts during container startup.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EWe also specify an empty command to disable MongoDB's built-in authentication. This is not recommended for production environments, but it simplifies our setup for development purposes.\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003E\u002F\u002F seed.js\ndb = db.getSiblingDB('mydb');\n\n\ndb.mycollection.insert({\n   \"name\": \"John Doe\",\n   \"age\": 30,\n   \"city\": \"New York\",\n   \"has_children\": false,\n   \"children\": null\n});\n\n\nprint(\"Data has been written to the collection\");\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Cstrong\u003EExplanation:\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EImport the \u003Ccode\u003Ejson\u003C\u002Fcode\u003E module: This module provides functionalities to work with JSON data.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EPrepare the data: Ensure your data is in a dictionary or list format.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003ESpecify the file path: Determine where you want to save the JSON file.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\" aria-level=\"1\"\u003E\n\u003Cp dir=\"ltr\" role=\"presentation\"\u003EWrite the data to a JSON file:\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cul\u003E\n\u003Cli dir=\"ltr\"\u003E\n\u003Cp\u003EOpen the file in write mode.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli dir=\"ltr\"\u003E\n\u003Cp\u003EUse \u003Ccode\u003Ejson.dump()\u003C\u002Fcode\u003E to write the data to the file.\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003EThe \u003Ccode\u003Eindent\u003C\u002Fcode\u003E parameter is optional but makes the JSON file more readable.\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fol\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EStarting the MongoDB Service\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003ENow that we have our Docker Compose file, seed script, and JSON data file, we can start our MongoDB service. Run the following command in the same directory as your docker-compose.yml file:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003Edocker-compose up -d\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis will start the MongoDB service in detached mode, which means it will run in the background.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EChecking the Database\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003ETo verify that our seed script has populated the database with data, we can use the MongoDB shell to connect to our instance and query the \u003Ccode\u003Emycollection\u003C\u002Fcode\u003E collection. Run the following command:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003Edocker exec -it mongodb mongosh -u root -p example\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis will open the MongoDB shell and connect to our \u003Ccode\u003Emydb\u003C\u002Fcode\u003E database. Once connected, run the following command to query the \u003Ccode\u003Emycollection\u003C\u002Fcode\u003E collection:\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003Euse mydb;\ndb.mycollection.find().pretty();\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003E\u003Cstrong\u003EThis should output the following:\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cpre\u003E\u003Ccode\u003E[\n  {\n    _id: ObjectId('667936bf4690147f33a26a13'),\n    name: 'John Doe',\n    age: 30,\n    city: 'New York',\n    has_children: false,\n    children: null\n  }\n]\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp dir=\"ltr\"\u003EThis confirms that our seed script has successfully populated the database with data.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003E\u003Cstrong\u003EHandling Errors\u003C\u002Fstrong\u003E\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EIt is important to handle errors that may occur during the seeding process. In the above code, we have added error handling to ensure that the script exits with a non-zero exit code if an error occurs. This can be useful for integrating the seeding process into a larger build or deployment pipeline.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EFor example, we can use the \u003Ccode\u003E&&\u003C\u002Fcode\u003E operator to ensure that the MongoDB service is only started if the seed script completes successfully. Add the following code to the end of your \u003Ccode\u003Edocker-compose.yml\u003C\u002Fcode\u003E file:\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EThis will run the \u003Ccode\u003Enpm install\u003C\u002Fcode\u003E command to install any dependencies required by the seed script, followed by the \u003Ccode\u003Enpm run seed\u003C\u002Fcode\u003E command to execute the seed script. Finally, the \u003Ccode\u003Eexec mongod\u003C\u002Fcode\u003E command will start the MongoDB service.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003E\u003Cstrong\u003ESeeding a MongoDB database using Docker Compose offers several significant advantages for development and testing workflows. Here are some key benefits:\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EAutomated Initialization\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EDocker Compose allows you to automate the database initialization process by defining seed data and executing it alongside other containerized services. This ensures that the database is populated with the necessary data every time a new environment is spun up, which is particularly useful when setting up new development environments or testing scenarios.\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EConsistent Environments\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EBy using Docker Compose, you can ensure consistent database states across different environments (development, testing, production) by seeding data as part of your container setup. This consistency is crucial for predictable behavior during application development and testing phases.\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EHighly Repeatable and Quick Environment Setup\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EDocker Compose simplifies the process of setting up a MongoDB container and seeding it with initial data. This makes it easy to quickly spin up new development environments with the exact same configuration, reducing the time spent on setup and ensuring that all team members work with the same data.\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EReduced Development Setup Time\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EBy automating the seeding process, Docker Compose significantly reduces the time spent on setting up a development environment. This allows developers to focus on writing code rather than manually populating the database every time they start a new project or environment.\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EDefault Data in Repository\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EWhen using Docker Compose, the seed data is stored in the repository, ensuring that new environments automatically receive the default data. This eliminates the need for manual data population and ensures that all environments start with the same baseline data.\u003C\u002Fp\u003E\n\u003Ch3 dir=\"ltr\"\u003EConclusion\u003C\u002Fh3\u003E\n\u003Cp dir=\"ltr\"\u003EWe have explored how to seed a MongoDB database using Docker Compose. We have created a Docker Compose file that defines a MongoDB service, a seed script that populates the database with data, and a JSON data file containing the data we want to seed.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EBy following these steps, you can easily pre-populate your MongoDB database for testing and development purposes. It is important to note that the above approach is suitable for development and testing environments only. In production environments, it is recommended to use a more secure and robust method for seeding data, such as using a dedicated seeding service or using MongoDB's built-in tools for data import and export.\u003C\u002Fp\u003E\n\u003Cp dir=\"ltr\"\u003EIt is important to ensure that the data being seeded is properly sanitized and validated to prevent any potential security vulnerabilities or data inconsistencies. This can be achieved by using a data validation library or by implementing custom validation logic in the seed script.\u003Cstrong id=\"docs-internal-guid-f442dc52-7fff-0b43-b394-20fb952978bb\"\u003E\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E",tags:a,time_to_read:"5 mins",user_created:{id:d,first_name:e,last_name:f,email:h,password:i,location:a,title:j,description:a,tags:a,avatar:g,language:a,tfa_secret:a,status:k,role:l,token:a,last_access:m,last_page:n,provider:o,external_identifier:a,auth_data:a,email_notifications:p,appearance:a,theme_dark:a,theme_light:a,theme_light_overrides:a,theme_dark_overrides:a},user_updated:{id:d,first_name:e,last_name:f,email:h,password:i,location:a,title:j,description:a,tags:a,avatar:g,language:a,tfa_secret:a,status:k,role:l,token:a,last_access:m,last_page:n,provider:o,external_identifier:a,auth_data:a,email_notifications:p,appearance:a,theme_dark:a,theme_light:a,theme_light_overrides:a,theme_dark_overrides:a},image:{id:"da202f75-7671-4a1d-afc0-2f9852f8c6ee",storage:"AMZ",filename_disk:"da202f75-7671-4a1d-afc0-2f9852f8c6ee.png",filename_download:"Untitled_design__3_-removebg-preview.png",title:"Untitled Design  3  Removebg Preview",type:"image\u002Fpng",folder:"33b4de25-d0f2-4999-ba32-6883f9932c34",uploaded_by:d,created_on:q,modified_by:a,modified_on:"2024-06-25T07:25:12.361Z",charset:a,filesize:"221194",width:r,height:r,duration:a,embed:a,description:a,location:a,tags:a,metadata:{},focal_point_x:a,focal_point_y:a,tus_id:a,tus_data:a,uploaded_on:q},authors:[{id:30,pe_blog_id:b,directus_users_id:{first_name:e,last_name:f,avatar:g}},{id:31,pe_blog_id:b,directus_users_id:{first_name:"Satish",last_name:"Annavar ",avatar:"33d28adb-eb7a-47f1-adc1-2233c7f06711"}}]},_img:{"/_ipx/f_png/img/plateform-engineers.png":"\u002F_nuxt\u002Fimage\u002Fe7b705.png","/_ipx/f_png,s_68x55/img/plateform-engineers.png":"\u002F_nuxt\u002Fimage\u002F418082.png","/_ipx/f_png,s_32x40/https://data.improwised.com/assets/20d037d1-41ee-4efd-b034-1350a3ce336d":"\u002F_nuxt\u002Fimage\u002Fa07868.png","/_ipx/f_png,s_32x40/https://data.improwised.com/assets/33d28adb-eb7a-47f1-adc1-2233c7f06711":"\u002F_nuxt\u002Fimage\u002F32d461.png","/_ipx/h_400,f_png/https://data.improwised.com/assets/da202f75-7671-4a1d-afc0-2f9852f8c6ee":"\u002F_nuxt\u002Fimage\u002Fd6ee3c.png","/_ipx/f_png,h_400/https://data.improwised.com/assets/da202f75-7671-4a1d-afc0-2f9852f8c6ee":"\u002F_nuxt\u002Fimage\u002Ff90fff.png"}}],fetch:{},mutations:[]}}(null,23,"Seeding a MongoDB Database using Docker Compose","f6ae4b64-c3c4-4f35-8b41-9f48088de4b1","Angita","Shah","20d037d1-41ee-4efd-b034-1350a3ce336d","angita.shah@improwised.com","**********","SEO Specialist","active","5ef170ac-f2e9-4b93-a9ea-5c54fcf0fa40","2024-09-20T10:17:43.182Z","\u002Fcontent\u002Fteam","default",true,"2024-06-25T07:25:11.692Z",500)));