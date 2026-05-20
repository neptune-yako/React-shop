架构底座既然已经对齐，接下来最重要的就是**执行路径的原子化拆解**。

作为一个有着严谨工程操守的开发者，我们绝不会把 UI 和逻辑揉在一起写。我们采取“自底向上（Bottom-Up）”的开发策略：先打桩（基建与类型），再接线（状态与数据流），最后画皮（UI 与交互）。

这是为你量身定制的 `开发步骤.md`，你可以直接把它作为我们后续沟通的 Checklist：

---

### 📚 图书管理系统 (SPA) 开发实施路径

#### Phase 1: 工程基建与类型定义 (Infrastructure & Types)

*目标：搭建零配置的现代化开发环境，并用 TypeScript 确立领域模型。*

* **Step 1.1**: 使用 Vite 初始化 React + TS 项目。
* **Step 1.2**: 清理冗余代码，配置绝对路径别名（`@/` 指向 `src/`）。
* **Step 1.3**: 引入 Tailwind CSS（或所选 UI 库）完成全局样式重置。
* **Step 1.4**: 编写核心类型文件 `src/features/books/types.ts`，定义 `IBook` 接口、排序枚举以及 Slice 的 State 结构。

#### Phase 2: 状态管理与数据流 (Data Layer - Redux Toolkit)

*目标：在脱离 UI 的情况下，闭环跑通所有 CRUD 业务逻辑。*

* **Step 2.1**: 安装 `@reduxjs/toolkit` 和 `react-redux`。
* **Step 2.2**: 编写 `booksSlice.ts`，初始化 mock 数据，并实现核心 Reducers：
* `addBook` (新增)
* `updateBook` (编辑)
* `deleteBook` (单条删除)
* `deleteBooks` (批量删除 - 加分项)
* `setSortOrder` (排序 - 加分项)


* **Step 2.3**: 配置全局 `store/index.ts`，并导出强类型的 `useAppDispatch` 和 `useAppSelector`。

#### Phase 3: 核心视图层开发 (View Layer - Components)

*目标：将 Redux 数据映射到 DOM，完成纯展示与简单交互。*

* **Step 3.1**: 开发 `Header` 组件，包含“添加书籍”按钮和“排序”下拉框。
* **Step 3.2**: 开发 `BookItem` 木偶组件，负责单行数据的渲染和“编辑/删除”按钮的点击事件抛出。
* **Step 3.3**: 开发 `BookList` 容器组件，订阅 Redux Store，遍历渲染 `BookItem`。

#### Phase 4: 复杂交互与表单 (Modal & Form)

*目标：实现业务中最复杂的数据输入与回填逻辑。*

* **Step 4.1**: 封装通用的 `BookModal` 弹窗组件。
* **Step 4.2**: 在弹窗内实现受控表单（或引入 `react-hook-form` 保证性能），包含书名、价格、分类、描述字段。
* **Step 4.3**: 联调弹窗状态：根据传入的是否有 `bookId` 判断是“新增模式”还是“编辑回填模式”，并在提交时 Dispatch 对应的 Redux Action。

#### Phase 5: 进阶加分项与部署 (Bonus & CI/CD)

*目标：拉开差距，展现完整的工程化交付能力。*

* **Step 5.1**: 在 `BookList` 中集成 Checkbox，打通批量删除链路。
* **Step 5.2**: 在 Selector 中实现基于 `sortOrder` 的派生状态（Derived State），确保列表渲染是有序的。
* **Step 5.3**: 配置 `vite.config.ts` 的 `base` 路径，编写 GitHub Actions 工作流，自动化构建并部署到 GitHub Pages。

---

严格的数据模型是一切业务逻辑的基石，就像后端建表必须先确定 Schema 一样。

**我们第一步先从 Phase 1 开始，你是希望我直接给出 `types.ts` 和 Redux Store 的代码骨架，还是你想先自行定义一下 `IBook` 的字段结构我们再做 review？**