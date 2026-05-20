
### 一、 需求精简复述

这是一个纯前端的单页面在线图书管理系统（SPA），核心考察点在于 **TypeScript 类型体操、Redux 状态管理流、以及组件化设计能力**。

* **核心功能**：图书的 CRUD（增、删、改、查）。
* **视图层**：
* 主视图：展示图书列表（书名、价格、分类、行级删除按钮）及顶部的“添加书籍”入口。
* 交互视图：复用的弹窗（Popup），支持“新增”与“编辑”模式（包含书名、价格、分类、描述等字段）。


* **数据层**：无后端，全量数据在前端内存（Redux Store 的 Array）中闭环。
* **技术栈硬性约束**：React + TypeScript + Redux。
* **加分挑战**：批量删除（Checkbox）、列表排序（Sort By）、GitHub Pages 自动化部署。

---

### 二、 核心实现思路 (Data Flow & State)

既然评价标准重在“代码结构”和“可维护性”，我们的思路必须是**数据驱动视图**，而不是用视图去强行操作数据。

1. **State 结构设计 (Redux)**
* 我们需要一个 `booksSlice`。
* 状态应该不仅包含 `bookList`（图书数组），还应包含 UI 状态，例如 `sortOrder`（排序规则）、`selectedBookIds`（用于批量删除的选中项集合）。
* 为了保证弹窗的解耦，弹窗的可见性 (`isModalOpen`) 和当前操作的上下文 (`editingBookId`) 也可以交给一个独立的 `uiSlice` 或者整合在 feature slice 中。


2. **组件拆解 (Component Tree)**
* `App` (根容器)
* `Header` (操作区：添加按钮、排序下拉框、批量删除触发按钮)
* `BookList` (展示区，负责渲染列表)
* `BookItem` (单行木偶组件，只接收 props 和回调)
* `BookModal` (单一数据源的表单弹窗，根据是否有传入的 `book` 数据判断是新增还是编辑模式)


3. **数据流向 (Unidirectional Data Flow)**
* 所有对图书的修改（新增、更新、单条/批量删除）统一封装为 Redux Toolkit (RTK) 的 `reducers`。组件内只做 `dispatch(action)`，绝对不直接操作本地 state。



---

### 三、 框架与技术基建讨论

在现代企业级开发中，我们不会使用原生的、充满 boilerplate 的老版 Redux，这既不优雅也容易出错。

#### 1. 核心技术选型

* **状态管理**：**Redux Toolkit (RTK)**。这是官方目前的客观最佳实践，内置 Immer.js，让我们可以用 mutating 的语法写出 immutable 的状态更新，大幅度提高开发效率。
* **类型系统**：**TypeScript Strict Mode**。从底层定义 `IBook` 接口，在 RTK 的 PayloadAction 和组件 Props 中严格约束，杜绝 `any`。
* **UI 组件库 / CSS**：由于重点在于业务逻辑和架构，建议使用 **Tailwind CSS + Shadcn UI**（或者直接上 Ant Design）。这样可以最快构建出高颜值的 Popup 和 Table/List，把核心精力放在 Redux 流转和代码结构上。
* **构建工具**：**Vite**。企业级的主流选择，配合 GitHub Actions 部署到 GitHub Pages 极其丝滑。

#### 2. 目录结构 (Feature-Driven Design)

为了拿满“代码结构”和“可维护性”的分数，建议抛弃传统的按类型分层（actions/reducers/components），采用按功能模块划分：

```text
src/
├── store/                 # Redux 根配置
│   ├── index.ts           # configureStore
│   └── hooks.ts           # typed useSelector & useDispatch (TS 必备)
├── features/              # 业务模块
│   └── books/
│       ├── booksSlice.ts  # RTK Slice (State, Reducers, Actions)
│       ├── types.ts       # IBook, SortOption 等类型定义
│       └── components/    # 仅该模块使用的组件 (BookList, BookModal)
├── components/            # 全局公共组件 (Button, Input, Layout)
├── App.tsx
└── main.tsx

```
