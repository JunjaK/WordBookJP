create table word(
  id INT(10) NOT NULL UNIQUE primary key AUTO_INCREMENT, 
  word varchar(100) not null, 
  mean varchar(100) not null, 
  pronounce varchar(100) not null, 
  regDt timestamp, 
  wrong boolean, 
  userId INT(10),
  category varchar(30),
  testNum int(10),
  foreign key (userId) references user (id), 
  foreign key (testNum) references testResults (testnum)
);

alter table word
  add constraint FK_CATEGORY_WORD
  foreign key (category)
  references categories(category)
  on update cascade;


create table user(
  id INT(10) NOT NULL UNIQUE primary key AUTO_INCREMENT, 
  userId varchar(20) not null UNIQUE, 
  password varchar(30) NOT NULL, 
  email varchar(100) not null UNIQUE, 
  nickname varchar(15) UNIQUE, 
  regDt timestamp
);


create table testResults(
  testNum int(10) not null UNIQUE primary key AUTO_INCREMENT, 
  tetName varchar(100) not null, 
  collect int(5) DEFAULT 0, 
  wrong int(5) DEFAULT 0, 
  userId INT(10),
  foreign key (userId) references user (id)
);

alter table testResults
  add constraint FK_USER_TESTRESULTS
  foreign key (userId)
  references user(userId)


create table categories(
  id INT(10) NOT NULL UNIQUE primary key AUTO_INCREMENT,
  category varchar(30) not null UNIQUE,
  userId INT(10),
  foreign key (userId) references user (id)
);

