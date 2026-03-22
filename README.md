# ReSparkX 主站

resparkx.com 的落地页。Read Aloud 子应用通过代理挂载在 /readaloud。

## 部署步骤

1. **新建 Vercel 项目**：导入 resparkx 仓库，部署为主站
2. **域名绑定**：将 resparkx.com 绑定到**本主站项目**（从 Read Aloud 项目移除）
3. **确认代理目标**：vercel.json 中 `/readaloud` 和 `/api` 代理到 `read-aloud-sigma.vercel.app`，若你的 Read Aloud 地址不同，请修改

## 本地运行

```bash
npm install
npm run dev
```
