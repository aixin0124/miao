# miao

---


### 项目简介
miao 是一个基于 Supabase 云端存储的高颜值极简留言板，支持多用户实时互动，适合情侣、朋友或小团体进行留言交流。项目采用现代 Web 技术，界面采用青绿与粉色渐变，体验温馨且高端。所有数据存储于云端，支持多端同步，安全可靠。

### 主要功能
- 云端存储，所有访问者共享同一数据，支持多端实时同步。
- 留言、回复、编辑、删除等完整互动功能。
- 支持留言筛选（全部、今天、最近7天），方便查找。
- 密码门禁，防止恶意访问，提升安全性。
- “在一起天数”自动统计，适合情侣纪念日等场景。
- 高级渐变美观界面，响应式设计，移动端友好。
- 支持自定义 Supabase 后端，灵活扩展。

### 技术栈
- 前端：HTML5、CSS3、JavaScript（原生，无框架依赖）
- 后端：Supabase（Postgres + Realtime 数据同步）

### 快速开始
1. 克隆仓库：
	```shell
	git clone https://github.com/aixin0124/miao.git
	```
2. 打开 `index.html` 文件，即可在浏览器访问。
3. 输入密码进入留言板。

### 部署与自定义
- 如需自建 Supabase 后端，请在 `index.html` 顶部配置你的 Supabase 项目 URL 和 anon key。
- 支持自定义表结构与安全策略，满足不同场景需求。

### 目录结构
```
├── index.html   # 主页面
├── README.md    # 项目说明
```

### 使用说明
1. 选择作者身份（太妙/学妹），输入留言内容，点击发送。
2. 支持留言回复、编辑、删除，双击内容可快速编辑。
3. 支持按全部/今天/最近7天筛选留言。
4. “在一起天数”自动统计，纪念每一天。
5. 支持分页浏览，适合大量留言场景。

### 贡献方式
欢迎提交 issue 或 pull request，完善功能或优化体验。欢迎提出建议与反馈，共同打造更好产品。

### 许可证
MIT 开源协议，欢迎自由使用与二次开发。

---


### Project Introduction
miao is a high-end minimalist message board powered by Supabase cloud storage, designed for real-time multi-user interaction. The project features a modern web UI with green-pink gradient, providing a warm and elegant experience. All data is stored in the cloud and synchronized across devices, making it secure and reliable. Suitable for couples, friends, or small groups to leave messages and communicate.

### Main Features
- Cloud storage: all visitors share the same data, supporting multi-device real-time sync.
- Full interaction: message, reply, edit, delete.
- Message filtering: view all, today, or last 7 days for easy search.
- Password gate to prevent malicious access and enhance security.
- "Days together" auto counter, perfect for couples and anniversaries.
- Advanced gradient UI, responsive design, mobile-friendly.
- Customizable Supabase backend for flexible extension.

### Tech Stack
- Frontend: HTML5, CSS3, JavaScript (vanilla, no framework)
- Backend: Supabase (Postgres + Realtime)

### Quick Start
1. Clone the repository:
	```shell
	git clone https://github.com/aixin0124/miao.git
	```
2. Open `index.html` in your browser.
3. Enter password to access the board.

### Deployment & Customization
- To use your own Supabase backend, configure your Supabase project URL and anon key at the top of `index.html`.
- You can customize table structure and security policies for different scenarios.

### Directory Structure
```
├── index.html   # Main page
├── README.md    # Project documentation
```

### Usage
1. Choose author (太妙 / 学妹), enter your message, and click send.
2. Supports reply, edit, delete; double-click content to edit quickly.
3. Filter messages by all/today/last 7 days.
4. "Days together" auto counter, commemorating every day.
5. Pagination supported for large message volumes.

### Contributing
Feel free to submit issues or pull requests to improve features or optimize user experience. Suggestions and feedback are welcome to build a better product together.

### License
MIT License. Free to use and modify.
