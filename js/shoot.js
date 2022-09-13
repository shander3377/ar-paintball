AFRAME.registerComponent("shoot-bullet", {
	init: function () {
		this.shootBullets();
	},

	shootBullets: function () {
        window.addEventListener("keydown", (e) => {
            
            if (e.key === "z") {
            console.log(e)

				var scene = document.querySelector("#scene");
				var camera = document.querySelector("#camera-rig");
				var bullet = document.createElement("a-entity");
				var campos = camera.getAttribute("position"); //getting pos of the camera
				var cam3d = document.querySelector("#camera").object3D; //getting object of cam
				var directionObj = new THREE.Vector3(); //making a new empty direction var
				cam3d.getWorldDirection(directionObj); //adding values of direction of cam to directionObj variable

				bullet.setAttribute("geometry", { primitive: "sphere", radius: 0.1 });
				bullet.setAttribute("material", { color: "black" });
				bullet.setAttribute("position", campos); //giving pos of cam to the bullet
				bullet.setAttribute("velocity", directionObj.multiplyScalar(-20)); //giving velocity to bulllet in the direction of the  camera with speed 20
				bullet.setAttribute("dynamic-body", { shape: "sphere", mass: 0 });
                bullet.addEventListener("collide", this.bulletCollide);
                console.log(bullet)
                scene.appendChild(bullet)
                this.shootSound()
			}
		});
	},

    shootSound: function () {
        var sound_el = document.querySelector("#sound1")
		sound_el.components.sound.playSound()
    },

    bulletCollide: function (e) {
        var scene = document.querySelector("#scene")
        var bullet = e.detail.target.el
        var objHit = e.detail.body.el
        var paint = document.createElement("a-entity")
        var bulletPos = bullet.getAttribute("position")
        var bulletRot = objHit.getAttribute("rotation")
        paint.setAttribute("position", {
            x: bulletPos.x,
            y: bulletPos.y,
            z: bulletPos.z,
          });
          paint.setAttribute("rotation", {
            x: bulletRot.x,
            y: bulletRot.y,
            z: bulletRot.z,
          });
          paint.setAttribute("scale", {
            x: 2,
            y: 2,
            z: 2,
          });
          var colorNum = parseInt(Math.random() * 8 + 1)

          paint.setAttribute("material", {
            opacity: 1,
            transparent: true,
            src: "./images/paint splash-0" + colorNum + ".png"
          });
      
          paint.setAttribute("geometry", {
            primitive: "plane",
            width: 0.5,
            height: 0.5
          });
        
        scene.appendChild(paint)
        bullet.removeEventListener("collide", this.bulletCollide);
    scene.removeChild(bullet);

    }

    
});
