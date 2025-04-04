## Integrated Research Internship and Scholarship Management System

### Software Engineering Course Project

### Local Setup:

Clone:
```
git clone https://github.com/chrisrex007/IRISMS.git
```

Redis setup:
```
sudo apt install redis-server
redis-server
```
Setup Postgres:
```
sudo apt -y install postgresql
psql -U postgres -h localhost -p 5432
CREATE DATABASE mydb;
```
Then add `DATABASE_URL` and Admin password and username accordindgly in `.env` file

Run prisma migration:
```
npx prisma migrate --name dev
```

Start the server:
```
cd IRISMS
npm install
npm run dev
```


### Presentation at [Canva](https://www.canva.com/design/DAGjLprcP5o/iySfC4BCEU4zs_dV1o3WNw/view?utm_content=DAGjLprcP5o&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4fa9b2209c)
