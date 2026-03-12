document.addEventListener("DOMContentLoaded", () => {
  const waterLevel_box = document.querySelector(".waterLevel-box");
  const waterContainer = document.querySelector(".container");
  const water_qtys = document.querySelectorAll(".water-qty");
  const resets = document.querySelectorAll(".resetLevel-btn");
  const main = document.querySelector("main");
  const goalSection = document.querySelector(".goal-achieved-section");
  const targetWater = 3000;
  function getWaterLevelData() {
    return JSON.parse(localStorage.getItem("waterLevelData"));
  }
  function setWaterLevelData(waterLevelData) {
    localStorage.setItem("waterLevelData", JSON.stringify(waterLevelData));
  }
  let waterLevelData = getWaterLevelData();
  const today = new Date();
  if (!waterLevelData || waterLevelData.date !== today.getDate()) {
    waterLevelData = {
      waterLevel: 0,
      date: today.getDate(),
      targetWater,
    };
    setWaterLevelData(waterLevelData);
    waterLevel_box.style.height = `${(waterLevelData.waterLevel / targetWater) * 100}%`;
  }
  if (waterLevelData) {
    waterLevel_box.style.height = `${(waterLevelData.waterLevel / targetWater) * 100}%`;
  }
  waterContainer.addEventListener("click", () => {
    let currentWaterLevel = waterLevelData.waterLevel;
    if (currentWaterLevel <= 3000) {
      currentWaterLevel = currentWaterLevel + 250;
      waterLevelData.waterLevel = currentWaterLevel;
      setWaterLevelData(waterLevelData);
      waterLevel_box.style.height = `${(currentWaterLevel / 3000) * 100}%`;
    }
    if (currentWaterLevel >= 3000) {
      waterLevel_box.style.height = "100%";
      main.style.display = "none";
      goalSection.style.transform = "translateY(15vh)";
    }
  });

  water_qtys.forEach((water_qty) => {
    water_qty.addEventListener("click", (e) => {
      const qtyValue = e.target.innerText.split("ml")[0];
      let currentWaterLevel = waterLevelData.waterLevel;
      if (currentWaterLevel <= 3000) {
        currentWaterLevel = currentWaterLevel + Number(qtyValue);
        waterLevelData.waterLevel = currentWaterLevel;
        setWaterLevelData(waterLevelData);
        waterLevel_box.style.height = `${(currentWaterLevel / 3000) * 100}%`;
      }
      if (currentWaterLevel >= 3000) {
        waterLevel_box.style.height = "100%";
        main.style.display = "none";
        goalSection.style.transform = "translateY(15vh)";
      }
    });
  });

  
});
