const render = () => {
  // clear
  ctx.fillStyle = `black`
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // all objects .render()
  ctx.fillStyle = `white`
  ctx.font = `22px serif`

  ctx.fillText(`Update ${updatesLegit}`, 10, 30)
  ctx.fillText(`Render ${framesLegit}`, 10, 60)

  // recall render
  frames++
  requestAnimationFrame(render)
}
