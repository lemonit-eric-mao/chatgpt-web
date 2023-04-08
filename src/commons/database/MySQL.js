/* =-=-=-=-=-=-=-=-=-= 此文件是链接 mysql 的配置文件 =-=-=-=-=-=-=-=-=-=-= */
import mysql from 'mysql'

/**
 * 创建mysql连接池
 * @type {Pool}
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 100,
    connectTimeout: 60 * 60 * 100000,
    aquireTimeout: 60 * 60 * 100000,
    timeout: 60 * 60 * 100000
});

class MySQL {

    /**
     * 连接数据库 (无事务写法)
     *
     * @param sql
     */
    query(sql) {

        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                /**
                 * err: 异常信息
                 * resultSet: 结果集
                 * fields: 每一列的详细信息
                 */
                connection.query(sql, (err, resultSet, fields) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(resultSet)
                    }
                    // 释放连接
                    connection.release();
                });

            });
        });
    }

    /** ------------------------------------------------------------------------------------------------------------- */

    /**
     * 开启事务
     * @returns {Promise<unknown>}
     */
    startTransaction() {
        return new Promise((resolve, reject) => {
            // 链接层
            pool.getConnection((err, connection) => {
                if (err) {
                    // 释放连接
                    connection.release();
                    reject(err);
                    return;
                }
                // 事务层
                connection.beginTransaction((err) => {
                    if (err) {
                        // 释放连接
                        connection.release();
                        reject(err);
                        return;
                    }
                    resolve(connection);
                });
            });
        });
    }

    /**
     * 在事务中执行SQL
     * @param connection
     * @param sql
     * @returns {Promise<unknown>}
     */
    queryTransaction(connection, sql) {

        return new Promise((resolve, reject) => {

            /**
             * err: 异常信息
             * resultSet: 结果集
             * fields: 每一列的详细信息
             */
            connection.query(sql, (err, resultSet, fields) => {
                if (err) {
                    // 事务回滚
                    connection.rollback(() => {
                        // 释放连接
                        connection.release();
                        reject(err)
                    });
                }
                resolve(resultSet);
            });
        });
    }

    /**
     * 提交事务
     * @param connection
     */
    endTransaction(connection) {
        return new Promise((resolve, reject) => {
            connection.commit((err) => {
                if (err) {
                    // 事务回滚
                    connection.rollback(() => {
                        reject(err)
                    });
                } else {
                    resolve()
                }
                // 释放连接
                connection.release();
            });
        });
    }
}

export default new MySQL()
