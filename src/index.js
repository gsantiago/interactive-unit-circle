const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const center = { x: width / 2, y: height / 2 }

const RADIUS = 250

const toRad = deg => deg * Math.PI / 180
const toDeg = rad => rad * 180 / Math.PI

const mouse = { x: 0, y: 0 }

let angle = 0

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX - canvas.offsetLeft
  mouse.y = e.clientY - canvas.offsetTop
})

function renderAxis () {
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, center.y)
  ctx.lineTo(width, center.y)
  ctx.moveTo(center.x, 0)
  ctx.lineTo(center.x, height)
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.closePath()

  ctx.font = 'italic 20px Bitstream'
  ctx.fillStyle = 'black'
  ctx.fillText('X', 10, center.y - 10)
  ctx.fillText('Y', center.x + 10, 25)
}

function renderCircle () {
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(
    center.x,
    center.y,
    RADIUS,
    0,
    toRad(360)
  )
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.closePath()

  ctx.font = 'italic 40px Bitstream'
  ctx.fillStyle = 'black'

  const measure1 = ctx.measureText('I')
  ctx.fillText('I', center.x + RADIUS / 2 - measure1.width * 2, center.y - RADIUS / 2 + measure1.width * 2)

  const measure2 = ctx.measureText('II')
  ctx.fillText('II', center.x - RADIUS / 2, center.y - RADIUS / 2 + measure2.width)

  ctx.fillText('III', center.x - RADIUS / 2, center.y + RADIUS / 2)

  const measure4 = ctx.measureText('IV')
  ctx.fillText('IV', center.x + RADIUS / 2 - measure4.width, center.y + RADIUS / 2)
}

function renderMousePosition () {
  ctx.beginPath()
  ctx.strokeStyle = 'deepskyblue'
  ctx.moveTo(center.x, center.y)
  ctx.lineTo(mouse.x, mouse.y)
  ctx.stroke()
  ctx.closePath()
}

function renderRadius () {
  ctx.lineWidth = 5
  const x = center.x + Math.cos(angle) * RADIUS
  const y = center.y - Math.sin(angle) * RADIUS
  const secant = center.x + 1 / Math.cos(angle) * RADIUS
  const cosecant = center.y - 1 / Math.sin(angle) * RADIUS
  const angleDeg = toDeg(angle) < 0
    ? Math.round(360 + toDeg(angle)) + 'º'
    : Math.round(toDeg(angle)) + 'º'

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(center.x, center.y)
  ctx.strokeStyle = 'black'
  ctx.stroke()
  ctx.closePath()

  // Sine
  ctx.beginPath()
  ctx.moveTo(center.x, center.y)
  ctx.lineTo(x, center.y)
  ctx.strokeStyle = 'red'
  ctx.stroke()

  ctx.fillStyle = 'red'
  ctx.font = '22px Arial'
  ctx.fillText(`sin(${angleDeg}): ${Math.sin(angle).toFixed(2)}`, 30, 30)

  // Cosine
  ctx.beginPath()
  ctx.moveTo(x, center.y)
  ctx.lineTo(x, y)
  ctx.strokeStyle = 'blue'
  ctx.stroke()
  ctx.closePath()

  ctx.fillStyle = 'blue'
  ctx.font = '22px Arial'
  ctx.fillText(`cos(${angleDeg}): ${Math.cos(angle).toFixed(2)}`, 30, 60)


  ctx.beginPath()
  ctx.fillStyle = 'deepskyblue'
  ctx.arc(x, y, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  // Tangent
  ctx.beginPath()
  ctx.strokeStyle = 'limegreen'
  ctx.moveTo(x, y)
  ctx.lineTo(secant, center.y)
  ctx.stroke()
  ctx.closePath()

  ctx.fillStyle = 'limegreen'
  ctx.font = '22px Arial'
  ctx.fillText(`tan(${angleDeg}): ${Math.tan(angle).toFixed(2)}`, 30, 90)

  // Secant
  ctx.beginPath()
  ctx.strokeStyle = 'hotpink'
  ctx.moveTo(center.x, center.y + 15)
  ctx.lineTo(secant, center.y + 15)
  ctx.setLineDash([5])
  ctx.stroke()
  ctx.closePath()
  ctx.setLineDash([])

  ctx.fillStyle = 'hotpink'
  ctx.font = '22px Arial'
  ctx.fillText(`sec(${angleDeg}): ${(1 / Math.cos(angle)).toFixed(2)}`, 30, 120)

  // Cosecant
  ctx.beginPath()
  ctx.moveTo(center.x, center.y)
  ctx.lineTo(center.x, cosecant)
  ctx.strokeStyle = 'gold'
  ctx.stroke()
  ctx.closePath()

  ctx.fillStyle = 'gold'
  ctx.font = '22px Arial'
  ctx.fillText(`cosec(${angleDeg}): ${(1 / Math.sin(angle)).toFixed(2)}`, 30, 150)

  // Cotangent
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(center.x, cosecant)
  ctx.strokeStyle = 'aqua'
  ctx.stroke()
  ctx.closePath()

  ctx.fillStyle = 'aqua'
  ctx.font = '22px Arial'
  ctx.fillText(`cotan(${angleDeg}): ${(1 / Math.tan(angle)).toFixed(2)}`, 30, 180)
}

function update () {
  const y = center.y - mouse.y
  const x = mouse.x - center.x
  angle = Math.atan2(y, x)
  console.log(toDeg(angle))
}

function render () {
  ctx.clearRect(0, 0, width, height)
  renderAxis()
  renderCircle()
  renderRadius()
}

function animate () {
  update()
  render()
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
