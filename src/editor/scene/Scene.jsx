import { Header } from "../../lib/components"

const SceneContent = () => <div>Docs</div>

export const Scene = () => {
  return (
    <section id="scene">
      <Header text="Scene" />
      <SceneContent />
    </section>
  )
}
