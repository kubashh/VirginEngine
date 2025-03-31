import { Header } from "../../lib/components"

const SceneContent = () => <div>Docs</div>

export const Scene = () => {
  return (
    <section className="scene">
      <Header text="Scene" />
      <SceneContent />
    </section>
  )
}
