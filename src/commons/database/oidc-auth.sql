-- 创建测试库
CREATE DATABASE IF NOT EXISTS oidc_auth DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;

-- 使用数据库
USE oidc_auth;

-- 创建测试表
CREATE TABLE IF NOT EXISTS  `users` (
  `id` varchar(64) NOT NULL,
  `username` varchar(64) DEFAULT NULL COMMENT '用户名',
  `password` varchar(64) DEFAULT NULL COMMENT '密码',
  `enabled` INT DEFAULT NULL COMMENT '是否启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入测试数据
INSERT INTO `users` VALUES ('00001','张三', '123456', 0), ('00002','李四', '123456', 1)