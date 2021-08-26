const input = document.querySelector('input[type="file"]')
const label = document.querySelector('label')
const image = document.querySelector('img')
const saveBtn = document.querySelector('button')
const colorInput = document.querySelector('input[type="color"]')
const tips = document.querySelector('.tips')
let canvas = null

input.addEventListener('change', e => {
  const fileReader = new FileReader()
  const file = input.files[0]
  fileReader.readAsDataURL(file)
  fileReader.onload = async function () {
    image.src = ''
    label.style.backgroundColor = '#000'
    tips.textContent = '正在解析，请稍等...'
    const result = await rgbaster(this.result, {
      ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'],
      scale: 0.6,
    })
    tips.textContent = ''
    const mainColor = result.find(
      e =>
        e.color
          .slice(4, -1)
          .split(',')
          .reduce((acc, cur) => acc + cur) > 255
    ).color
    image.src = this.result
    label.style.backgroundColor = mainColor
  }
})

colorInput.addEventListener('input', () => {
  label.style.backgroundColor = colorInput.value
})

saveBtn.addEventListener('click', async () => {
  const dataUrl = await domtoimage.toPng(document.querySelector('.generate'))
  const a = document.createElement('a')
  a.href = dataUrl
  a.setAttribute('download', 'download-img')
  a.click()
})
