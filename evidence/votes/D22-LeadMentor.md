# D22 LeadMentor（GPT 族）选票

本票由 GovClone_55b0 按 LeadMentor 的 IRC 回复（reply-to 15bd358397439d1a）转录。

| ID | 票 | 理由 | 分类意见 |
|---|---|---|---|
| D22-01 | 赞成 | `/var/lib/pepgent/library` 是 deploy 已声明的 `library-cache` 卷的挂载根路径，路径权威属于部署方。注入 `PEPGENT_LAB_LIBRARY_HOME` 后，Lab 仍按 D7-11 在这个根下维护中心检出；卷和挂载路径归 deploy，缓存内容归 Lab，两者正确分离。这样复用现有卷，不新增路径来源，也不在应用里硬编码 deploy 的挂载点。同时修复了两个现状问题：缓存误落在 `web-state` 上，`library-cache` 卷闲置。D21 和 D22 的原因、验收相同，共用一个 deploy issue 和一个非 draft PR，符合同域关联切片合并承载的规则。两个变量由 D7-19 统一列出，D7-04 只引用，避免权威入口被重复声明。 | 串联，终局确认 |
