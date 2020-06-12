create table wordbook(
  word varchar(100) not null primary key, 
  mean varchar(100), 
  pronounce varchar(100), 
  created timestamp, 
  wrong boolean, 
  userid varchar(20),
  category varchar(30),
  testnum int(5),
  foreign key (userid) references user (id), 
  foreign key (category) references categories (category), 
  foreign key (testnum) references testresults (testnum)
);

create table wordbook(
  word varchar(100) not null primary key, 
  mean varchar(100), 
  pronounce varchar(100), 
  created timestamp, 
  wrong boolean, 
  userid varchar(20),
  category varchar(30),
  testnum int(5),
  foreign key (userid) references user (id), 
  foreign key (category) references categories (category), 
  foreign key (testnum) references testresults (testnum)
);


create table wordbook(
  word varchar(100) not null primary key, 
  mean varchar(100), 
  pronounce varchar(100), 
  created timestamp, 
  wrong boolean, 
  userid varchar(20),
  category varchar(30),
  testnum int(5),
  foreign key (userid) references user (id), 
  foreign key (category) references categories (category), 
  foreign key (testnum) references testresults (testnum)
);


create table wordbook(
  word varchar(100) not null primary key, 
  mean varchar(100), 
  pronounce varchar(100), 
  created timestamp, 
  wrong boolean, 
  userid varchar(20),
  category varchar(30),
  testnum int(5),
  foreign key (userid) references user (id), 
  foreign key (category) references categories (category), 
  foreign key (testnum) references testresults (testnum)
);


alter table word add constraint word_category foreign key (category) references categories (category) on delete cascade on update cascade;
alter table word add constraint word_testNum foreign key (testnum) references testresults (testnum) on delete set null on update cascade;

alter table categories add column userid varchar(20) after category;
alter table categories add constraint fk_category_userid foreign key  (userid) references user (id) ON DELETE CASCADE on update cascade;

alter table testresults add column userid varchar(20) after testnum;
alter table testresults add column testname varchar(30) after userid;
alter table testresults add constraint fk_testresults_userid foreign key  (userid) references user (id) ON DELETE CASCADE on update cascade;


alter table word 