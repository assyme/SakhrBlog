/* Prepare dummy data. */

Insert into Users(UserName) values('Asad')
Insert into Users(UserName) values('Sayeed')

Insert into Blogs (UserId) values(1) 
Insert into Blogs (UserId) values(2) 

Insert into Categories (Name,BlogId) Values ('Nodejs',1)
Insert into Categories (Name,BlogId) Values ('Angularjs',1)
Insert into Categories (Name,BlogId) Values ('JQuery',1)

Insert into Categories (Name,BlogId) Values ('Nodejs',2)
Insert into Categories (Name,BlogId) Values ('Angularjs',2)

Insert into Posts (Name,PostDetail)Values ('Creating Modules','This is a great way to create NodeJs Modules')
Insert into Posts (Name,PostDetail)Values ('Routing in Nodejs','Routing is node js is an amazing way for moving across applications')
Insert into Posts (Name,PostDetail)Values ('Deferred Objects in Jquery','I promise to show you when to use defereds')

Insert into Posts_Categories Values (1,1)
Insert into Posts_Categories Values (2,1)
Insert into Posts_Categories Values (3,3)
Insert into Posts_Categories Values (3,1)