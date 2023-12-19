const cp = require(`child_process`)
const fs = require(`fs`)

const icon = `${__dirname}/app/favicon.ico` // 图标
const out = `steup.exe` // 输出文件名

const cmd = `lib\\winrar a -r -ep1 -inul -ibck -y -sfx -iicon"${icon}" -z"${getComment()}" ${out} app/*`
console.log(cmd)

cp.execSync(cmd, {stdio: `inherit`})

function getComment() {
  const toPath = `app_${Date.now()}` // 解压到哪里
  const os = require(`os`)
  const comment = `${os.tmpdir}/comment.txt`
  fs.writeFileSync(comment, `
    Path=${toPath}
    Setup=main
    Silent=1
    Overwrite=1
    Update=U
  `.split(`\n`).map(item => item.trim()).join(`\n`).trim())
  return comment
}
