// Simple

type Obj = Record<string, any>
type Void = () => void

type VTypes = `boolean` | `number` | `string` | `array` | `object` | `function` | `enum`

// Props

type FileProps = {
  old?: any
  file: any
  name: string
  path?: string
  deep: number
}

type GameObjectProps = {
  old?: any
  object: any
  name: string
  deep: number
}

type InspectorSectionProps = {
  text: string
  remove?: Void
  childs?: Obj[]
  element?: React.ReactNode
}

type TypeInputProps = {
  object: Obj
  access: string
  type: strig
  refresh: Void
}

type StringInputProps = {
  object: Obj
  access: string
}

type TransformProps = {
  object: Obj
}

type AddScriptProps = {
  object: Obj
  value: string
  refresh: Void
}

type ScriptProps = {
  object: Obj
  refresh: Void
}

type AddComponentProps = {
  text: string
  onClick: Void
}
