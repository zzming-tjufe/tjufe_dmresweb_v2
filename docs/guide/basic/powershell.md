---
title: "PowerShell 基础使用指南"
description: "PowerShell 基础使用指南 page"
sidebar_position: 1
---

# PowerShell 基础使用指南

---

## 1. 打开 PowerShell

- 按 `Win + R`，输入 `powershell`，回车。
- 按 `Win + X`，选择 `终端`。
- 或在开始菜单搜索 “PowerShell” 并打开。

---

## 2. 常用别名（同 Linux 或 Mac ）

| 命令                          | 作用                               |
| ----------------------------- | ---------------------------------- |
| `pwd`                         | 显示当前所在文件夹路径             |
| `ls` 或 `dir`                 | 列出当前文件夹里的所有文件和文件夹 |
| `cd 文件夹名`                 | 进入某个文件夹                     |
| `cd ..`                       | 返回上一级文件夹                   |
| `cd \`                        | 回到磁盘根目录（如 C:\）           |
| `mkdir 名字`                  | 创建一个新文件夹                   |
| `ni 文件名`                   | 创建一个空文件                     |
| `cat 文件名` 或 `type 文件名` | 查看文件内容                       |
| `cp 源文件 目标文件`          | 复制文件                           |
| `mv 原名字 新名字`            | 移动文件或重命名                   |
| `rm 文件名`                   | 删除文件                           |
| `rm -r 文件夹名`              | 删除整个文件夹（含内容）           |
| `clear` 或 `cls`              | 清空屏幕                           |

> 💡 提示：`ni` 是 `New-Item` 的别名，可以用来创建文件或文件夹。

---

## 3. 简单示例

```powershell
# 列出所有内容
ls

# 进入 Documents 文件夹
cd Documents

# 创建一个叫 homework 的文件夹
mkdir homework

# 进入 homework
cd homework

# 创建一个空文件 note.txt
ni note.txt

# 查看文件内容（目前为空）
cat note.txt

# 写点内容进去（先用记事本编辑，或后面学 echo）
notepad note.txt

# 返回上一级
cd ..

# 删除刚建的文件夹（会删掉里面所有东西！）
rm -r homework
```

---

## 4. 小技巧

- 按 `Tab` 键可以自动补全文件名或文件夹名。
- 按方向键 ↑ 可以调出之前输入过的命令。
- 文件名或文件夹名如果有空格，要用引号括起来，例如：  
  `cd "My Documents"`

---
# PowerShell 高级使用指南
---

## 1. 查看和筛选进程

```powershell
# 查看所有运行的程序（进程）
ps

# 按名称查找特定进程（比如 Chrome）
ps chrome

# 强制结束某个进程（谨慎使用！）
kill -Name notepad
```

> 💡 `ps` 是 `Get-Process` 的别名，`kill` 是 `Stop-Process` 的别名。

---

## 2. 查看服务状态

```powershell
# 列出所有 Windows 服务
gsv

# 查找某个服务（如 Windows Update）
gsv wuauserv

# 启动/停止服务（需管理员权限）
Start-Service wuauserv
Stop-Service wuauserv
```

> 💡 `gsv` = `Get-Service`

---

## 3. 管道 + 筛选：组合命令处理数据

```powershell
# 列出当前目录下所有 .txt 文件
ls *.txt

# 找出占用内存最多的前 3 个程序
ps | sort WS -Descending | select -First 3

# 查看最近修改的 5 个文件
ls | sort LastWriteTime -Descending | select -First 5 Name, LastWriteTime
```

> ✅ 关键点：用 `|`（管道）把命令连起来，像流水线一样处理数据。

---

## 4. 快速查看系统信息

```powershell
# 查看操作系统版本
$PSVersionTable

# 查看本机 IP 地址（简单方式）
ipconfig | sls IPv4

# 或用 PowerShell 原生命令（稍高级）
(gwmi Win32_NetworkAdapterConfiguration | ? { $_.IPEnabled }).IPAddress
```

> 💡 `sls` = `Select-String`（类似 Linux 的 `grep`），用于搜索文本。

---

## 5. 下载文件（无需浏览器）

```powershell
# 从网上下载一个文件到本地
curl https://example.com/file.zip -OutFile file.zip
```

> 💡 `curl` 在 PowerShell 中是 `Invoke-WebRequest` 的别名（PowerShell 7+ 更完整）。

---

## 6. 查找文件内容

```powershell
# 在当前目录所有 .txt 文件中搜索包含 "error" 的行
ls *.txt | sls error
```

等价于 Linux 的 `grep "error" *.txt`。

---

## 7. 获取命令帮助（非常重要！）

```powershell
# 查看某个命令怎么用
help ps
help ls -Examples
```

或使用：

```powershell
man curl   # 和 help 一样
```

---

## 8. 快速清空或写入文件

```powershell
# 创建或覆盖文件内容
echo "Hello" > hello.txt

# 追加一行到文件末尾
echo "World" >> hello.txt

# 清空文件（变为空文件）
echo $null > log.txt
```

> 💡 `echo` 是 `Write-Output` 的别名。

---

## 9. 查看环境变量

```powershell
# 查看所有环境变量
ls env:

# 查看 PATH 路径
$env:PATH
```

---

## 10. 重启或关机（需管理员权限）

```powershell
# 10 秒后关机
shutdown /s /t 10

# 取消关机
shutdown /a

# 重启电脑
restart-computer
```

> ⚠️ 谨慎使用！建议先保存所有工作。

---

## 小结：值得记住的高级别名

| 别名            | 全名                | 用途                  |
| --------------- | ------------------- | --------------------- |
| `ps`            | `Get-Process`       | 查看进程              |
| `gsv`           | `Get-Service`       | 查看服务              |
| `sls`           | `Select-String`     | 文本搜索（类似 grep） |
| `curl` / `wget` | `Invoke-WebRequest` | 下载文件              |
| `man` / `help`  | `Get-Help`          | 获取帮助              |
| `echo`          | `Write-Output`      | 输出文本              |
| `kill`          | `Stop-Process`      | 结束进程              |

---

> ✅ **建议**：先熟练使用这些命令中的 3–5 个，比如 `ps`、`sls`、`curl`、`help`，就能完成很多实用任务，而无需写复杂脚本。


> 本指南由居居明维护，如有疑问请联系：`zzming2019@hotmail.com`  
> 最后更新：2026年1月21日