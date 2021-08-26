const input = document.querySelector('input[type="file"]')
const label = document.querySelector('label')
const image = document.querySelector('img')
const saveBtn = document.querySelector('button')
const colorInput = document.querySelector('input[type="color"]')
let canvas = null

input.addEventListener('change', e => {
  const fileReader = new FileReader()
  const file = input.files[0]
  fileReader.readAsDataURL(file)
  fileReader.onload = async function () {
    const result = await rgbaster(this.result, {
      ignore: ['rgb(255,255,255)', 'rgb(0,0,0)'],
      scale: 0.6,
    })
    const mainColor = result[0].color
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
