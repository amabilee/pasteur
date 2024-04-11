import Sequelize from 'sequelize';

const db = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123qweasd',
  database: 'pastuer',
});


db.authenticate()
  .then(() => {
    console.log('Conexão com o MySQL estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar-se ao MySQL:', err.message);
  });

export default db;
