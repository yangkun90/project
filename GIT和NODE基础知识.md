## GIT和NODE基础知识

> 安装很方便默认进行path 路径配置

1. 如果安装不了，可以直接拷贝安装包，然后配置path路径
2. 验证是否安装成功 简单 在dos命令界面是否有node这个命令 npm默认也进行了安装，这个是node比较重要的模块

## node基础的概念

1. node并不是一门语言他是一个工具或者环境

   - 基于V8引擎渲染和解析js代码 

   - 单线程
   - 无阻塞 
   - 事件驱动
   - 。。。。

2. 之所以称之为服务器端语言，是因为node给予JavaScript服务器的能力，我们在服务器端安装node，只用js完成服务器端需要处理的一些事情，最后把写好的js代码交给node环境运行即可

3. 在node环境中执行JavaScript代码  

   > REPL 命令模式 就是控制台执行模式
   >
   > 基于node xxxx.js命令执行
   >
   > 基于wb这类编辑器工具进行直接的执行

   基于node命令执行，我们需要先找到当前文件所在的文件夹，然后再装个目录下打开DOS窗口，再窗口中执行node xxx.js，这样就相当于在node环境下把js文件中的代码执行了

   

## DOS命令

> 简单不列举，简单可以用到的时候学

## npm包管理器

安装完成node后，会自动带有一个npm包管理器

常规来说需要下载对应的包或者类库进行安装  缺点就是资源浪费

- 可以基于第三方包管理器进行下载（yarn/bower都是第三方包管理器）

1. npm下载的资源都是在https://www.npmjs.com中下载的

   `npm install xxx`: 把资源或者第三方模块下载到当前目录下

   `npm install xxx -g (--global)`:把资源或者第三方资源安装到全局作用域下，目的是以后可以基于命令来操作一些事情。

   `npm uninstall xxx/npm uninstall xxxx -g` :从本地或者全局卸载

   > 基于npm安装的一些细节点：
   >
   > 需要联网获取，从npm国外的服务器下载速度比较慢
   >
   > 下载成功后当前目录中增加一个node_modules文件夹，这个文件夹中有安装的模块
   >
   > 一般来说，下载下来的内容包括源码版本和发行版本

2. 解决下载慢的问题

   `基于nrm切换到国内下载源，一般是淘宝镜像`

   > 首先安装nrm，而且要安装到全局环境下，使用nrm提供的命令
   >
   > npm install nrm -g
   >
   > 安装完成后我们可以使用nrm命令
   >
   > nrm ls 查看当前可用源
   >
   > nrm user xxx 使用某个源
   >
   > 实际上nrm切换的只是获取代码库的地址
   >
   > 切完源后还是使用npm 进行下载库操作

   `基于yarn来安装管理`

   > 安装yarn 安装到全局，然后根据yarn的内部命令进行部署
   >
   > npm install yarn -g 
   >
   > 基于yarn安装的只能是本地的不能是全局的
   >
   > yarn add xxx
   >
   > yarn remove xxx

   `基于cnpm淘宝镜像来处理`

   > 淘汰了，直接被nrm替代

3. 解决安装版本问题

   > 查看当前模块的历史版本信息
   >
   > `npm view jquery > jquery.version.json` 把当前的模块的的历史信息输出到具体的某个文件中，文件名自己取名的
   >
   > 安装指定版本模块
   >
   > `yarn add jquery@1.11.3`: npm和yarn 都是采用这种方式指定安装模块的版本符号的

## github使用

GitHub是一个公共的代码管理平台，类似于传统的SVN这类内部使用软件。

不同的是GitHub的代码是开源的公用的，不受版权限制的。当然也有私有的库限制，这种公司内部服务。

国内的网站如coding和码云



## git基础知识

git是一个分布式代码管理控制器

SVN：在git诞生前就已经存在的版本控制器，集中式，但是配置后也可以设置分布式。

## git的工作原理和基本操作

在本地仓库管理我们的代码

> 初次使用git 我们现在本地配置一些基础信息
>
> git config -l	 查看当前git本地的一些信息
>
> git config --global  user .name 'xxxx'
>
> git config --global user.email 'xxxx'

1. `git int`  创建一个空的git的目录
2. 在当前目录创建 `.gitignore` 文件  这里存放了git提交的时候所忽略的文件

> node_modules
>
> /coverage
>
> /build
>
> .DS_Store
>
> .env.local
>
> .env.development.local
>
> .env.test.local
>
> .evn.production.local
>
> npm-debug.log*
>
> yarn-debug.log*
>
> yarn-error.log*
>
> .idea
>
> .... 常见不提交内容

## git的工作流程

> 每个git 长裤都划分为三个区域
>
> 工作区： 编辑代码的地方
>
> 暂存区：临时存储要生产的版本	代码的地方
>
> 历史区: 存储的生成的每一个代码版本



### 工作区提交到暂存区

> `git status`
>
> 查看代码或者文件的状态（当前处于哪个区域）：红色（当前处于工作区，代码还没有提交到暂存区） 绿色（处于暂存区），如果没有文件表示的是三个区域的代码同步，历史版本也在历史区生成了。
>
> `git add .  `包含修改的和增加的不包含删除的
>
> `git add -u `包含修改和删除的，但是不包含新增的
>
> `git add -A` 同时具备. 和 -u 的功能就是所有的



### 暂存区到历史区

> `git commit`
>
> 这样执行后弹框然后希望我们加入备注注释
>
> 操作的方式类似vim
>
> `git commit -m` '自己写的信息'
>
> `git log` 查看提交记录
>
> `git reflog` 查看所有的历史记录 包括历史区回滚后
>
> `git diff` 工作区vs 暂存区 这个是针对代码级别的查看
>
> `git diff master` 工作区 vs 历史区master分支  这个也是代码级别查看的区别
>
> `git diff --cached` 暂存区vs历史区 这个也是代码级别区别查看





## GitHub同步

1. 让本地的git和远程的GitHub关联

   `git remote -v `

   查看所有关联信息

   `git remote add xxxx[远程仓库地址]`

   建立关系

   `git remote remove xxxx` 

   移除关联

   关联的仓库名称一般起名是origin(起源本质) ，也可以使用其他的名称

2. 本地的代码推送到远程仓库上，或者从远程仓库上拉取最新的信息到本地仓库

   我们本地推送和拉取的信息，既有代码也有版本信息，所以与其所推送和拉取，不如说代码仓库的保持信息的同步。

   推送之前我们一定要先拉取，否则报错

   `git pull origin(这个名字就是远程仓库关联的仓库的名称，一般是自己定义的为主) master` 从远程仓库的master分支拉取信息

   `git push origin master`

   把自己本地的信息推送到远程仓库的master分支下

   如果名字是origin,分支也是master，后面都可以不写，也就是可以执行`git pull/git push`	

3. 推送的代码需要完全提交到历史区域才行。中央区同步的都是历史版本

----

以上是操作的知识点，真实的流程是建立好中心仓库，然后再只用

`git clone 地址` 拷贝代码到本地

这个时候我们可以直接使用和提交

设置团队账号管理 其实就是添加协作开发者





