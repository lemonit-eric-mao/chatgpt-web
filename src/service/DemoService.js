import DemoDao from "../dao/DemoDao"

/**
 * Service Demo
 * @Author: Eric.Mao
 * @Date: 2021/01/17 21:38
 */
class DemoService {

    constructor() {
        this.demoDao = new DemoDao()
    }

    /**
     * 根据OpenId判断用户是否已经存在, 包含被删除的用户
     *
     * @return true 已存在， false 不存在
     */
    async getUserList() {

        let result = await this.demoDao.getUserList()
        return result;
    };

}

export default DemoService
