cd dist

git init

@REM 关联远程仓库
git remote add origin git@github.com:guanghuijs/windows-mini.git

git pull

@REM 删除远程pages分支
git push git@github.com:guanghuijs/windows-mini.git --delete pages

@REM 创建新的pages分支并切换
git checkout -b pages

@REM 提交
git add .
git commit -m 'build'

@REM 推送到远程
git push origin pages