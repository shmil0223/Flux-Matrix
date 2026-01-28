# Smart Problem Box 后端

## 依赖

- Node.js 18+
- Supabase 项目（已启用 Auth）

## 初始化数据库

在 Supabase SQL Editor 中执行 `schema.sql`。

## 配置环境变量

复制 `.env.example` 为 `.env`，填写：

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PORT=3001
```

## 启动

```
npm install
npm start
```

启动后端：`http://localhost:3001`

## 主要接口

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/bootstrap`
- `POST /api/favorites/toggle`
- `POST /api/folders`
- `DELETE /api/nodes/:id`
- `DELETE /api/problems/:id`
- `POST /api/profile`
