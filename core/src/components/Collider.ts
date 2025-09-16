export default class Collider implements TCollider {
  private gameObject

  constructor(props: ColliderProps, gameObject: TGameObject) {
    this.gameObject = gameObject
  }
}
