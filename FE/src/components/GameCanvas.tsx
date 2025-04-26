import { useEffect, useRef } from 'react'
import Phaser from 'phaser'

const GameCanvas = () => { const gameRef = useRef<HTMLDivElement>(null)

useEffect(() => { class SimpleScene extends Phaser.Scene { player!: Phaser.Physics.Arcade.Sprite cursors!: Phaser.Types.Input.Keyboard.CursorKeys
preload() {
    this.load.image('bg', '/assets/Image1.jpg')
    this.load.spritesheet('player', '/assets/Walk.png', {
      frameWidth: 128,
      frameHeight: 128,
    })
  }

  create() {
    console.log(this.textures.exists('player')) // should be true
    console.log(this.textures.exists('bg')) // should be true
    this.add.image(400, 300, 'bg').setScale(1)

    this.player = this.physics.add.sprite(400, 300, 'player')
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'walk-side',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 6, // 7 frames total
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.player.play('walk-side', true)

    this.cursors = this.input.keyboard!.createCursorKeys()
  }

  update() {
    const speed = 150
    const { up, down, left, right } = this.cursors

    this.player.setVelocity(0)

    if (left?.isDown) {
      this.player.setVelocityX(-speed)
      this.player.setFlipX(true)
      this.player.anims.play('walk-side', true)
    } else if (right?.isDown) {
      this.player.setVelocityX(speed)
      this.player.setFlipX(false)
      this.player.anims.play('walk-side', true)
    }

    if (up?.isDown) {
      this.player.setVelocityY(-speed)
      this.player.anims.play('walk-side', true)
    } else if (down?.isDown) {
      this.player.setVelocityY(speed)
      this.player.anims.play('walk-side', true)
    }

    if (!left?.isDown && !right?.isDown && !up?.isDown && !down?.isDown) {
      this.player.anims.stop()
    }
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: gameRef.current!,
  physics: {
    default: 'arcade',
    arcade: { debug: true },
  },
  scene: SimpleScene,
}

const game = new Phaser.Game(config)
return () => game.destroy(true)
}, [])

return <div ref={gameRef} className="w-full h-full" /> }

export default GameCanvas