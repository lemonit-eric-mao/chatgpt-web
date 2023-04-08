import MySQL from "../commons/database/MySQL";

/**
 * Dao Demo
 * @Author: Eric.Mao
 * @Date: 2021/01/17 21:38
 */
class DemoDao {

    constructor() {
    }

    /**
     * 根据OpenId判断用户是否已经存在, 包含被删除的用户
     *
     * @return true 已存在， false 不存在
     */
    async getUserList() {
        let sql = `
            SELECT
                *
            FROM
                users;
        `;
        let result = await MySQL.query(sql);

        await this.updateUser();

        return result;
    };

    /**
     * 测试事务处理
     */
    async updateUser() {
        let sql = `
            UPDATE
                users
            SET
                username='6',
                password='6',
                enabled='6'
            WHERE
                id='string';
        `;
        // 开启事务
        let connection = await MySQL.startTransaction()
        // 执行SQL
        await MySQL.queryTransaction(connection, sql)
        // 提交事务
        await MySQL.endTransaction(connection)
    };

}

export default DemoDao
